import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Delete Todo Failed");
  const data: Todo = await response.json();
  return data;
}
