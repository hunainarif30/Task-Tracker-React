import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: "Task 1",
      date: "02-04-2025",
      reminder: false,
    },
    {
      id: 2,
      text: "Task 2",
      date: "02-04-2025",
      reminder: true,
    },
    {
      id: 3,
      text: "Task 3",
      date: "02-04-2025",
      reminder: false,
    },
  ]);
  const deleteTask = (id) => {
    setTask(tasks.filter((task) => task.id != id));
  };
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  const addTask = (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Generate ID based on last task's ID
    const newTask = { id, ...task };
    setTask([...tasks, newTask]);
  };

  return (
    <div className="container">
      <Header title="Task Tracker" onAdd = {()=> setShowAddTask(!showAddTask)}/>
      {showAddTask && <AddTask onAdd={addTask} />}
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
