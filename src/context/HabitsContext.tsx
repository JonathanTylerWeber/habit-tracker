import { createContext } from "react";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Habit = {
  id: string;
  name: string;
  completedDays: boolean[]; // convention: 7
  offDays: boolean[]; // convention: 7
  createdAt: number;
};

export type HabitsContextValue = {
  habits: Habit[];
  addHabit: (name: string) => void;
  renameHabit: (id: string, name: string) => void;
  removeHabit: (id: string) => void;
  toggleDay: (id: string, day: DayIndex) => void;
  setCompletedDays: (id: string, days: Habit["completedDays"]) => void;
  resetAll: () => void;

  // Days off controls
  setOffDays: (id: string, days: Habit["offDays"]) => void;
  toggleOffDay: (id: string, day: DayIndex) => void;
};

export const HabitsContext = createContext<HabitsContextValue | null>(null);
