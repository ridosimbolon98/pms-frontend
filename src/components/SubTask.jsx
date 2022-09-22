import React, { useState, useEffect } from 'react';
import axios from "axios";

const SubTask = (props) => {
  const [subTask, setSubTask] = useState([]);
  useEffect(() => {
    getSubTask();
  }, []);

  const getSubTask = async () => {
    const response = await axios.get(`http://192.168.10.30:9000/subtasks/${props.taskid}`);
    setSubTask(response.data);
  };

  return (
    <div>
      <ul className="list-group">

      {subTask.map((item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          {item.subtask_name}
          <span className="badge badge-primary badge-pill">
            {item.name?.split(" ")[0]}
          </span>
        </li>
      ))}

      </ul>
    </div>
  );
};

export default SubTask;

