import React, { useState } from 'react';

function TaskTable({ tasks, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Customize this for pagination size

  // Handle change in search box
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(task => {
    return (
      task.assignedTo.toLowerCase().includes(searchTerm) ||
      task.status.toLowerCase().includes(searchTerm) ||
      task.priority.toLowerCase().includes(searchTerm) ||
      task.comments.toLowerCase().includes(searchTerm)
    );
  });

  // Pagination Logic
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));

  return (
    <div>
      {/* Search Box */}
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Assigned To, Status, Priority, or Comments"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Task Table */}
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            <th scope="col">Priority</th>
            <th scope="col">Comments</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No tasks found</td>
            </tr>
          ) : (
            currentTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{indexOfFirstTask + index + 1}</td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments || 'N/A'}</td>
                <td>
                  <button className="btn btn-primary btn-sm mr-2" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(task)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <span>{totalTasks} records found</span>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToFirstPage}>First</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPrevPage}>Prev</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToNextPage}>Next</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToLastPage}>Last</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TaskTable;
