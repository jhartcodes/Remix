import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

const getPosts = async () => {
  return prisma.post.findMany({
    select: { title: true, slug: true, markdown: true },
  });
};

export const loader = async () => {
  const posts = await getPosts();
  console.log(posts, "posts");
  return json({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  console.log("posts", posts);
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
