import { getAllPosts } from "@/lib/blog/db";
import { PostList } from "./_components/PostList";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getAllPosts();
  return <PostList posts={posts} />;
}
