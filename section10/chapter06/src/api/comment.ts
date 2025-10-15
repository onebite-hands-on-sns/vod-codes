import supabase from "@/lib/supabase";

export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

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

export async function updateComment({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .update({
      content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(id: number) {
  const { data, error } = await supabase
    .from("comment")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
