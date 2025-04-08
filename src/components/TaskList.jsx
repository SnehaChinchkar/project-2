import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.taskList);
  const dispatch = useDispatch();
//   sort task by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    const priority = { High: 1, Medium: 2, Low: 3 };
    return priority[a.priority] - priority[b.priority];
  });

  return (
    <ul className="list-group">
      {sortedTasks.map((task, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>[{task.priority}]</strong> {task.text}
          </div>
          <button onClick={() => dispatch(deleteTask(index))} className="btn btn-sm btn-danger">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
