import Controller from "@/components/counter/controller";
import Viewer from "@/components/counter/viewer";

export default function CounterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <Viewer />
      <Controller />
    </div>
  );
}
