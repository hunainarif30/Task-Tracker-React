import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

const App = () => {
  const [tasks, setTask] = useState([
    {
      id: "1",
      text: "Task 1",
      remember: false,
    },
    {
      id: "2",
      text: "Task 2",
      remember: true,
    },
    {
      id: "3",
      text: "Task 3",
      remember: false,
    },
  ]);
  const deleteTask = (id) => {
    setTask(tasks.filter((task) => task.id != id));
  };
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id == id ? { ...task, remember: !task.remember } : task
      )
    );
  };
  return (
    <div className="container">
      <Header title="Task Tracker" />
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
        />
      ) : (
        "No Tasks to display"
      )}
    </div>
  );
};

export default App;
