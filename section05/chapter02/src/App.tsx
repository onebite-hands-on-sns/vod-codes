import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">한입 로그 코드 템플릿</h1>
      <Button>버튼 테스트</Button>
      <Button variant={"destructive"}>버튼 테스트</Button>
    </div>
  );
}
