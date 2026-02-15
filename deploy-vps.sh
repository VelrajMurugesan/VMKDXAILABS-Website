#!/bin/bash
# ============================================
# VMKD X AI LABS - VPS Deployment Script
# Run this in your Hostinger VPS terminal
# ============================================

set -e

DOMAIN="vmkdxailabs.com"
REPO="https://github.com/VelrajMurugesan/VMKDXAILABS-Website.git"
SITE_DIR="/var/www/vmkdxailabs"
NGINX_PORT=8080

echo "=== Step 1: Install dependencies ==="
apt update -y
apt install -y nginx nodejs npm git

# Install Node 20 if old version
if ! node -v | grep -q "v2[0-9]"; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

echo "=== Step 2: Clone & build site ==="
rm -rf /tmp/vmkd-build
git clone "$REPO" /tmp/vmkd-build
cd /tmp/vmkd-build/webpage
npm install
npm run build

echo "=== Step 3: Deploy dist files ==="
mkdir -p "$SITE_DIR"
rm -rf "$SITE_DIR"/*
cp -r dist/* "$SITE_DIR"/

echo "=== Step 4: Configure nginx on port $NGINX_PORT ==="
cat > /etc/nginx/sites-available/vmkdxailabs <<NGINX
server {
    listen $NGINX_PORT;
    server_name $DOMAIN www.$DOMAIN;

    root $SITE_DIR;
    index index.html;

    # SPA routing - all routes serve index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|mp4|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length 1000;
}
NGINX

# Enable the site
ln -sf /etc/nginx/sites-available/vmkdxailabs /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

echo "=== Step 5: Configure Traefik routing ==="
# Check if Traefik is running via Docker
if docker ps | grep -q traefik; then
  echo "Traefik detected via Docker."
  echo ""
  echo "Add this to your Traefik docker-compose.yml labels or dynamic config:"
  echo ""
  cat <<'TRAEFIK_CONFIG'
# --- Add to Traefik dynamic configuration file ---
# (usually /etc/traefik/dynamic.yml or similar)

http:
  routers:
    vmkdxailabs:
      rule: "Host(\`vmkdxailabs.com\`) || Host(\`www.vmkdxailabs.com\`)"
      entryPoints:
        - websecure
      service: vmkdxailabs
      tls:
        certResolver: letsencrypt

  services:
    vmkdxailabs:
      loadBalancer:
        servers:
          - url: "http://localhost:8080"
TRAEFIK_CONFIG
  echo ""
  echo "Then restart Traefik: docker restart traefik"
else
  echo "Traefik not found as Docker container."
  echo "Setting up nginx directly on port 80/443..."

  # Reconfigure nginx to listen on 80 directly
  sed -i "s/listen $NGINX_PORT/listen 80/" /etc/nginx/sites-available/vmkdxailabs

  # Install certbot for SSL
  apt install -y certbot python3-certbot-nginx
  nginx -t && systemctl restart nginx

  echo "Getting SSL certificate..."
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email info@vmkdxailabs.com

  systemctl restart nginx
fi

echo "=== Step 6: Open firewall port ==="
if command -v ufw &> /dev/null; then
  ufw allow $NGINX_PORT/tcp
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw reload
fi

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "  Site: https://$DOMAIN"
echo "  Nginx serving on port: $NGINX_PORT"
echo "  Files: $SITE_DIR"
echo "============================================"
echo ""
echo "To update the site later, run:"
echo "  cd /tmp/vmkd-build && git pull && cd webpage && npm run build && cp -r dist/* $SITE_DIR/"
