import CommentItem from "@/components/comment/comment-item";

export default function CommentList() {
  return (
    <div className="flex flex-col gap-5">
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}
