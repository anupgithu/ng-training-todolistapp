import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManager from './components/TaskManager';
import BackgroundVideo from './components/BackgroundVideo'; 

function App() {
  return (
    <div>
     {/* Background video */}
     <BackgroundVideo />

    <div className="container mt-4">
      <TaskManager />
    </div>
    </div>
  );
}

export default App;
