import "./App.css";

const TodoForm = ({ openForm, handleFormChange, value, handleAddTask }) => {
  return (
    <div
      className="form-container"
      style={{ width: !openForm ? "100%" : "0%" }}
    >
      <form onSubmit={handleAddTask}>
        <select
          name="period"
          value={value.period}
          aria-label="select the task period"
          autoComplete="off"
          onChange={handleFormChange}
          required
        >
          <option value=" ">Select Period</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
        </select>

        <input
          type="text"
          name="taskTitle"
          value={value.taskTitle}
          placeholder="Your Task"
          aria-label="task title input"
          pattern="[a-zA-Z0-9\s:.@]{1,40}"
          title="MIN characters 1 & MAX characters 40"
          autoComplete="off"
          required
          onChange={handleFormChange}
        />
        <textarea
          name="taskDetail"
          value={value.taskDetail}
          placeholder="Your Task Details"
          aria-label="task detail input"
          title="Provide additional details about the task (optional)"
          cols="35"
          rows="5"
          autoComplete="off"
          onChange={handleFormChange}
        />

        <button type="submit" aria-label="schdule task button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
