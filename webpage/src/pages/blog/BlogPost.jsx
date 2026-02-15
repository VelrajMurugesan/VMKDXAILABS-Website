import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { Helmet } from "react-helmet-async";

export default function BlogPost() {
  const { slug } = useParams();

  const blogFiles = import.meta.glob("../../blogs/*.md", {
    as: "raw",
    eager: true
  });

  const file = blogFiles[`../../blogs/${slug}.md`];

  if (!file) return <h1>Blog not found</h1>;

  const { data, content } = matter(file);

  return (
    <article>
      <Helmet>
        <title>{data.title} | VMKD X AI LABS</title>
        <meta name="description" content={data.description} />
        <link
          rel="canonical"
          href={`https://www.vmkdxailabs.com/blog/${slug}`}
        />
      </Helmet>

      <h1>{data.title}</h1>
      <p>{data.date}</p>

      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}