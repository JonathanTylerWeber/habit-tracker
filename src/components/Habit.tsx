import { useParams, Link, useNavigate } from "react-router";
import { useHabits } from "@/context/useHabits";
import { Button } from "./ui/button";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export default function HabitSettings() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { habits, toggleOffDay, setOffDays } = useHabits();

  const habit = habits.find((h) => h.id === id);
  if (!habit) {
    return (
      <div className="p-6">
        <p className="mb-4">Habit not found.</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    );
  }

  const toggle = (day: 0 | 1 | 2 | 3 | 4 | 5 | 6) =>
    toggleOffDay(habit.id, day);

  const allOn = () =>
    setOffDays(habit.id, [false, false, false, false, false, false, false]);
  const weekdaysOff = () =>
    setOffDays(habit.id, [true, true, true, true, true, false, false]);
  const weekendsOff = () =>
    setOffDays(habit.id, [false, false, false, false, false, true, true]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{habit.name} — Days Off</h1>
        <Link to="/" className="underline underline-offset-4">
          Back
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {(habit.offDays ?? Array(7).fill(false)).map((isOff, i) => (
          <button
            key={i}
            onClick={() => toggle(i as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
            className={[
              "h-20 rounded-lg border text-sm font-medium",
              isOff
                ? "bg-muted border-muted-foreground/40 text-muted-foreground"
                : "bg-background border-border hover:bg-accent/40",
            ].join(" ")}
            aria-pressed={isOff}
            aria-label={`Toggle ${dayLabels[i]} off`}
            title={isOff ? `${dayLabels[i]} is OFF` : `${dayLabels[i]} is ON`}
          >
            <div className="mb-2">{dayLabels[i]}</div>
            <div className="text-xs">{isOff ? "Off" : "On"}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={allOn}>
          All On
        </Button>
        <Button variant="outline" onClick={weekdaysOff}>
          Weekdays Off
        </Button>
        <Button variant="outline" onClick={weekendsOff}>
          Weekends Off
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Off days will appear <span className="opacity-70">grayed out</span> on
        the main tracker and cannot be toggled.
      </p>
    </div>
  );
}
