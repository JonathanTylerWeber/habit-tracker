import { useState } from "react";
import { Button } from "./ui/button";
import { HabitTrackerRow } from "./HabitRow";
import { useHabits } from "@/context/useHabits";

export default function HomePage() {
  const { habits, addHabit, resetAll } = useHabits();
  const [name, setName] = useState("");

  const onAdd = () => {
    if (!name.trim()) return;
    addHabit(name);
    setName("");
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit name"
          className="border rounded px-3 py-2 bg-background text-foreground"
          aria-label="New habit name"
        />
        <Button onClick={onAdd}>Add Habit</Button>
        <Button variant="outline" onClick={resetAll}>
          Reset Week
        </Button>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-3">
        {habits.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No habits yet. Add one above!
          </p>
        ) : (
          habits.map((h) => <HabitTrackerRow key={h.id} habitId={h.id} />)
        )}
      </div>
    </div>
  );
}
