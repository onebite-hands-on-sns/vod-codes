import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentEditor() {
  return (
    <div className="flex flex-col gap-2">
      <Textarea />
      <div className="flex justify-end">
        <Button>작성</Button>
      </div>
    </div>
  );
}
