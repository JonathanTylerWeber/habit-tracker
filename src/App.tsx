import { Route, Routes } from "react-router";
import HomePage from "./components/Home";
import HabitSettings from "./components/Habit"; // settings page for a single habit
import Layout from "./Layout";
import { ThemeProvider } from "@/components/theme-provider";
import { HabitsProvider } from "./context/HabitsProvider";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <HabitsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              {/* Single habit settings page by id */}
              <Route path="/habit/:id" element={<HabitSettings />} />
            </Route>
          </Routes>
        </HabitsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
