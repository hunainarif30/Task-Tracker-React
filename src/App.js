import Header from "./components/Header";
import { useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      const data = await fetchFromServer();

      setTask(data);
    };
    getTask();
  }, []);

  const fetchFromServer = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTask(tasks.filter((task) => task.id != id));
  };
  const toggleReminder = async (id) => {
    const beforeUpdate = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await beforeUpdate.json();
    data.reminder = !data.reminder;
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setTask(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  const addTask = async (task) => {
    const add = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await add.json();

    setTask([...tasks, data]);
    // const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Generate ID based on last task's ID
    // const newTask = { id, ...task };
    // setTask([...tasks, newTask]);
  };

  return (
    <div className="container">
      <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} />
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
