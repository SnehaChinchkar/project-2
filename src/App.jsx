import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import WeatherSidebar from './components/WeatherSiderbar';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/auth/authSlice';
import './App.css';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="app-wrapper">
      <header className="app-header text-white text-center py-3">
        <h1>Task Manager + Weather</h1>
      </header>

      <div className="container-fluid app-content py-4">
        <div className="row">
          {/* Main Task Section */}
          <div className="col-md-8 mb-4">
            <div className="task-section p-4 rounded shadow-sm bg-white">
              {isAuthenticated ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Your Tasks</h4>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </button>
                  </div>
                  <TaskInput />
                  <TaskList />
                </>
              ) : (
                <div className="text-center">
                  <p>Please log in to access your tasks.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(login())}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Weather Sidebar */}
          <div className="col-md-4">
            <div className="weather-section shadow-sm rounded p-4 bg-light">
              <WeatherSidebar />
            </div>
          </div>
        </div>
      </div>

      <footer className="app-footer text-center py-3">
        <p className="mb-0 small">© {new Date().getFullYear()} YourAppName — Built with ❤️</p>
      </footer>
    </div>
  );
};

export default App;
