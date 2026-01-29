import { Link } from "react-router-dom";

export default function BlogList() {
  const blogs = [
    {
      slug: "ai-automation-for-small-businesses",
      title: "AI Automation for Small Businesses: A Complete Guide",
      description:
        "Learn how AI automation helps small businesses reduce costs, save time, and scale faster."
    }
  ];

  return (
    <main>
      <h1>AI Automation & Business Insights</h1>

      {blogs.map(blog => (
        <article key={blog.slug}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <Link to={`/blog/${blog.slug}`}>Read More →</Link>
        </article>
      ))}
    </main>
  );
}