import { useContext } from "react";
import { HabitsContext } from "./HabitsContext";
import type { HabitsContextValue } from "./HabitsContext";

export function useHabits(): HabitsContextValue {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used within a HabitsProvider");
  return ctx;
}
