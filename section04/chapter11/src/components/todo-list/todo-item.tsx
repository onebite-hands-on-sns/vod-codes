import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import type { Todo } from "@/types";
import { Link } from "react-router";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");
  if (!todo) throw new Error("Todo Data Undefined");
  const { content, isDone } = todo;

  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const { mutate: updatedTodo } = useUpdateTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const handleCheckboxClick = () => {
    updatedTodo({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeleteTodoPending}
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={isDone}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
