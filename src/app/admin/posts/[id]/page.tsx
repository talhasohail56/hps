import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog/db";
import { PostEditor } from "../_components/PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return <PostEditor post={post} />;
}
