import { Link } from "react-router";
import { useHabits } from "@/context/useHabits";
import { Button } from "./ui/button";

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"] as const;

export function HabitTrackerRow({ habitId }: { habitId: string }) {
  const { habits, toggleDay, removeHabit, renameHabit } = useHabits();
  const habit = habits.find((h) => h.id === habitId);

  if (!habit) return null;

  const onRename = () => {
    const next = window.prompt("Rename habit:", habit.name);
    if (next !== null) renameHabit(habit.id, next);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors">
      {/* Habit name (link to settings) + actions */}
      <div className="flex items-center gap-3 pr-3">
        <h3 className="text-foreground font-medium text-balance">
          <Link
            to={`/habit/${habit.id}`}
            className="underline underline-offset-4 hover:opacity-80"
            aria-label={`Open settings for ${habit.name}`}
          >
            {habit.name}
          </Link>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRename}
          aria-label="Rename habit"
        >
          Rename
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeHabit(habit.id)}
          aria-label="Delete habit"
        >
          Delete
        </Button>
      </div>

      {/* 7 toggleable circles on the right */}
      <div className="flex gap-2">
        {habit.completedDays.map((isCompleted, index) => {
          const isOff = habit.offDays?.[index] ?? false;
          return (
            <button
              key={index}
              onClick={() =>
                !isOff &&
                toggleDay(habit.id, index as 0 | 1 | 2 | 3 | 4 | 5 | 6)
              }
              disabled={isOff}
              className={[
                "w-8 h-8 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isOff
                  ? "bg-muted/40 border-muted-foreground/30 text-muted-foreground cursor-not-allowed opacity-60"
                  : isCompleted
                  ? "bg-primary border-primary text-primary-foreground hover:scale-110 hover:cursor-pointer"
                  : "bg-background border-muted-foreground/30 hover:border-muted-foreground/60 hover:scale-110 hover:cursor-pointer",
              ].join(" ")}
              aria-label={`Toggle ${dayLabels[index]} for ${habit.name}`}
              title={isOff ? "Day off" : dayLabels[index]}
            >
              {!isOff && isCompleted && (
                <svg
                  className="w-4 h-4 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
