import { IoIosArrowDown } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import "./App.css";
import { useState } from "react";

const Accordion = ({ task, handleDeleteTask }) => {
  const { period, taskTitle, taskDetail } = task;
  const [detailFold, setDetailFold] = useState(false);

  function handleDetailFold(e) {
    setDetailFold(!detailFold);
  }

  return (
    <>
      <div className="todo-list-items">
        <p className="day">{period}</p>
        <p className="todo-title">
          <span className="title">{taskTitle} </span>

          <span className="status-btn">
            <button className="delete" onClick={handleDeleteTask}>
              <FaTrashAlt />
            </button>
          </span>
        </p>

        <button
          aria-label="detail button"
          className="detail-show-btn"
          onClick={handleDetailFold}
        >
          <IoIosArrowDown className="arrow" />
        </button>

        <div
          className="todo-detail"
          style={{
            height: !detailFold ? "0" : "100%",
            opacity: !detailFold ? "0" : "1",
          }}
        >
          <p className="detail">{taskDetail}</p>
        </div>
      </div>
    </>
  );
};

export default Accordion;
