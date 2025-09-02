import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// TODO: react router setup (habits and individual habits with schedule (grayed out if off day))
// TODO: usecontext tailwind theme
// TODO: habit storage with context
// useContext, react router, local storage
// theme context, habit context

function App() {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("count") ?? "0")
  );

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-5xl mb-10">{count}</h1>
      <Button onClick={increment}>Click me</Button>
    </div>
  );
}

export default App;
