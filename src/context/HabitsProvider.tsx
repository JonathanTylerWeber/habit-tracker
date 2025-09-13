import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HabitsContext,
  type Habit,
  type HabitsContextValue,
} from "./HabitsContext";

const STORAGE_KEY = "habits.v1";

function loadFromStorage(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((h) => ({
        id: String(h.id),
        name: String(h.name ?? ""),
        completedDays:
          Array.isArray(h.completedDays) && h.completedDays.length === 7
            ? h.completedDays.map(Boolean)
            : [false, false, false, false, false, false, false],
        offDays:
          Array.isArray(h.offDays) && h.offDays.length === 7
            ? h.offDays.map(Boolean)
            : [false, false, false, false, false, false, false],
        createdAt: Number(h.createdAt ?? Date.now()),
      }))
      .filter((h) => h.name.trim().length > 0);
  } catch (e) {
    console.warn("Failed to load habits:", e);
    return [];
  }
}

function saveToStorage(habits: Habit[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (e) {
    console.warn("Failed to save habits:", e);
  }
}

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(habits);
  }, [habits]);

  const addHabit = useCallback<HabitsContextValue["addHabit"]>((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        completedDays: [false, false, false, false, false, false, false],
        offDays: [false, false, false, false, false, false, false],
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const renameHabit = useCallback<HabitsContextValue["renameHabit"]>(
    (id, name) => {
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, name: name.trim() } : h))
      );
    },
    []
  );

  const removeHabit = useCallback<HabitsContextValue["removeHabit"]>((id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const toggleDay = useCallback<HabitsContextValue["toggleDay"]>((id, day) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.offDays[day]) return h; // do nothing if it's an off day
        return {
          ...h,
          completedDays: h.completedDays.map((v, i) => (i === day ? !v : v)),
        };
      })
    );
  }, []);

  const setCompletedDays = useCallback<HabitsContextValue["setCompletedDays"]>(
    (id, days) => {
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, completedDays: days } : h))
      );
    },
    []
  );

  const resetAll = useCallback<HabitsContextValue["resetAll"]>(() => {
    setHabits((prev) =>
      prev.map((h) => ({
        ...h,
        completedDays: [false, false, false, false, false, false, false],
      }))
    );
  }, []);

  const setOffDays = useCallback<HabitsContextValue["setOffDays"]>(
    (id, days) => {
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, offDays: days } : h))
      );
    },
    []
  );

  const toggleOffDay = useCallback<HabitsContextValue["toggleOffDay"]>(
    (id, day) => {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h;
          const nextOff = h.offDays.map((v, i) => (i === day ? !v : v));
          // Optional: when turning a day OFF, also clear its completion
          const nextCompleted = nextOff[day]
            ? h.completedDays.map((v, i) => (i === day ? false : v))
            : h.completedDays;
          return { ...h, offDays: nextOff, completedDays: nextCompleted };
        })
      );
    },
    []
  );

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits,
      addHabit,
      renameHabit,
      removeHabit,
      toggleDay,
      setCompletedDays,
      resetAll,
      setOffDays,
      toggleOffDay,
    }),
    [
      habits,
      addHabit,
      renameHabit,
      removeHabit,
      toggleDay,
      setCompletedDays,
      resetAll,
      setOffDays,
      toggleOffDay,
    ]
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}
