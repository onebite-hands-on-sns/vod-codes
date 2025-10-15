import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";
import { useState } from "react";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [content, setContent] = useState("");

  const handleAddClick = () => {
    if (content.trim() === "") return;
    mutate(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요 ..."
      />
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
