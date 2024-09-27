import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TaskFormModal({ show, handleClose, onSaveTask, task }) {
  const [formData, setFormData] = useState({
    assignedTo: 'User 1',
    status: 'Not Started',
    dueDate: '',
    priority: 'Low',
    comments: '',
  });

  // Pre-fill form for editing a task
  useEffect(() => {
    if (task) {
      setFormData({
        assignedTo: task.assignedTo || 'User 1',
        status: task.status || 'Not Started',
        dueDate: task.dueDate || '',
        priority: task.priority || 'Low',
        comments: task.comments || '',
      });
    } else {
      // Reset form when adding a new task
      setFormData({
        assignedTo: 'User 1',
        status: 'Not Started',
        dueDate: '',
        priority: 'Low',
        comments: '',
      });
    }
  }, [task]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTask(formData); // Save or update the task
    handleClose(); // Close modal after save
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="assignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              as="select"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="User 1">User 1</option>
              <option value="User 2">User 2</option>
              <option value="User 3">User 3</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {task ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskFormModal;
