import supabase from "@/lib/supabase";

export async function createComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      post_id: postId,
      content: content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
