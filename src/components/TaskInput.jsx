import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasks/taskSlice';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text, priority }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
      <input 
        type="text" 
        className="form-control" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Add a task..." 
      />
      <select 
        className="form-select" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

export default TaskInput;
