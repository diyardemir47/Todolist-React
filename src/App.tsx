// App.tsx
import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { todoType } from './apptypes';
import { TodoItem } from './TodoItem';

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [workday, setWorkday] = useState<number>(0);
  const [todolist, setTodolist] = useState<todoType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]); // Yeni eklenen state

  const handlechange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else {
      setWorkday(Number(event.target.value));
    }
  };

  const addNewTask = () => {
    const newTask = { taskName: task, workday: workday, completed: false }; // 'completed' özelliği eklenmiştir
    setTodolist([...todolist, newTask]);
    setTask('');
    setWorkday(0);
  };

  const deleteTask = (nameToDelete: string) => {
    setTodolist(todolist.filter((task) => task.taskName !== nameToDelete));
  };

  const updateWorkday = (nameToUpdate: string, newWorkday: number) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((task) =>
        task.taskName === nameToUpdate ? { ...task, workday: newWorkday } : task
      )
    );
  };

  const updateTaskName = (nameToUpdate: string, newTaskName: string) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((task) =>
        task.taskName === nameToUpdate ? { ...task, taskName: newTaskName } : task
      )
    );
  };


  const markAsCompleted = (nameToUpdate: string) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((task) =>
        task.taskName === nameToUpdate ? { ...task, completed: true } : task
      )
    );
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, nameToUpdate]);
  };
  return (
    <div className="App">
      <div className="card">
        <input
          className="input"
          type="text"
          placeholder="Taskınızı giriniz.."
          value={task}
          name="task"
          onChange={handlechange}
        />
        <input
          className="input"
          type="number"
          placeholder="Kaç günde tamamlamalısınız"
          value={workday}
          name="number"
          onChange={handlechange}
        />
        <button onClick={addNewTask} className="ekle">
          Yeni Task Ekle
        </button>

        {todolist.map((task: todoType, index: number) => (
          <TodoItem
            key={index}
            task={task}
            deleteTask={deleteTask}
            updateWorkday={updateWorkday}
            updateTaskName={updateTaskName}
            markAsCompleted={markAsCompleted} // 'markAsCompleted' fonksiyonu eklenmiştir
          />
        ))}


      </div> <div className="completed-tasks">
        <h2>Tamamlanan Görevler</h2>
        <ul>
          {completedTasks.map((completedTask, index) => (
            <li key={index}>{completedTask}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
