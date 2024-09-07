import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import Accordion from "./Accordion";

const userOptions = ["All", "Today", "Tomorrow"];

function getStoredTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setStoredTasks(tasks) {
  return localStorage.setItem("tasks", JSON.stringify(tasks));
}

function App() {
  const [open, setOpen] = useState(true);
  const [userOption, setUserOption] = useState(userOptions[0]);
  const [openForm, setOpenForm] = useState(true);
  const [formChange, setFormChange] = useState({
    period: "",
    taskTitle: "",
    taskDetail: "",
  });
  const [inputValue, setInputValue] = useState(getStoredTasks());
  const [filteredTask, setFilteredTask] = useState(inputValue);

  function handleIconChange() {
    setOpen(!open);
  }

  function handleUserOptionChange(e) {
    const target = e.target.dataset.tab;
    setFilteredTask(
      target === "All"
        ? inputValue
        : inputValue.filter((task) => task.period === target)
    );

    setOpen(!open);
    setUserOption(target);
  }
  // ------------------ form open ------------------ //

  function handleFormOpen() {
    setOpenForm(!openForm);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormChange((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTask(e) {
    e.preventDefault();
    const newTask = { id: inputValue.length + 1, ...formChange };
    setInputValue([...inputValue, newTask]);
    setFilteredTask([...inputValue, newTask]);
    setStoredTasks([...inputValue, newTask]);
    setFormChange({ period: "", taskTitle: "", taskDetail: "" });
    setOpenForm(!openForm);
  }

  function handleDeleteTask(index) {
    if (index === 0 && inputValue.length > 0) {
      const updatedTasks = inputValue.slice(1);
      setInputValue(updatedTasks);
      setFilteredTask(updatedTasks);
      setStoredTasks(updatedTasks);
    }
  }

  return (
    <div id="wrapper" className="wrapper">
      <h1>Take your Schedule in your control</h1>
      <div className="todo-container">
        <nav className="todo-nav">
          <div className="nav-btn-container">
            <button
              className="nav-btn"
              aria-label="open navbar"
              onClick={handleIconChange}
            >
              {open ? <RxHamburgerMenu /> : <TfiClose />}
            </button>
          </div>

          <h2 className="schedule-day" aria-label="user schedule">
            {userOption}
          </h2>

          <aside
            role="navigation and settings"
            className="side-nav"
            style={{ width: !open ? "100%" : "0%" }}
          >
            <div className="sidenav-container">
              <div className="user-space">
                <img src="" alt="UN" width="100%" height="100%" />
                <p>Account name</p>
              </div>

              <ul className="side-nav-btn-container">
                {userOptions.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        data-tab={item}
                        onClick={handleUserOptionChange}
                        aria-label={item}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </nav>

        <div className="user-form-todo">
          <TodoForm
            openForm={openForm}
            setOpenForm={setOpenForm}
            handleFormChange={handleFormChange}
            value={formChange}
            handleAddTask={handleAddTask}
          />
        </div>

        <div className="todo-list-item-container">
          {filteredTask.map((task, index) => {
            return (
              <Accordion
                task={task}
                handleDeleteTask={() => handleDeleteTask(index)}
                index={index}
                key={task.id}
              />
            );
          })}
        </div>
      </div>

      <div className="task-form-btn">
        <button
          className="todo-btn open-form"
          aria-label="open task form"
          onClick={handleFormOpen}
        >
          {openForm ? <AiOutlinePlus /> : <TfiClose />}
        </button>
      </div>
    </div>
  );
}
export default App;
