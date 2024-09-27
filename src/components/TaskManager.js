import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import TaskFormModal from './TaskFormModel';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Task to be edited
  const [taskToDelete, setTaskToDelete] = useState(null); // Task to be deleted
  const [showTaskModal, setShowTaskModal] = useState(false); // Controls task form modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controls delete confirmation modal

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle showing the task modal for edit or new task
  const handleShowModal = (task = null) => {
    setSelectedTask(task); // If task is null, it is for adding new, else editing
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null); // Reset selected task after closing the modal
  };

  // Function to handle adding or updating a task
  const handleSaveTask = async (taskData) => {
    if (selectedTask) {
      // Edit Task
      try {
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${selectedTask._id}`,
          taskData
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === response.data._id ? response.data : task
          )
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      // Add New Task
      try {
        const response = await axios.post(
          'http://localhost:5000/api/tasks',
          taskData
        );
        setTasks((prevTasks) => [...prevTasks, response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    handleCloseModal();
  };

  // Function to handle task deletion
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskToDelete._id)
      );
      setTaskToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{backgroundColor:'#ffd152',padding:'20px',borderRadius:'12px'}}>
      <h1>Task Manager</h1>
      <button
      style={{backgroundColor:'#d69e04'}}
        className="btn btn-warning mb-3"
        onClick={() => handleShowModal()}
      >
        New Task
      </button>
      <TaskTable
        tasks={tasks}
        onEdit={handleShowModal}
        onDelete={(task) => {
          setTaskToDelete(task);
          setShowDeleteModal(true);
        }}
      />
      <TaskFormModal
        show={showTaskModal}
        handleClose={handleCloseModal}
        onSaveTask={handleSaveTask}
        task={selectedTask}
      />
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteTask}
        task={taskToDelete}
      />
    </div>
  );
}

export default TaskManager;
