import React, { useState } from "react";

function DashboardDemo() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 2L Water", streak: 5, completed: false },
    { id: 2, name: "Workout 30 mins", streak: 12, completed: true },
    { id: 3, name: "Read 20 pages", streak: 3, completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progressPercent = (completedCount / habits.length) * 100;

  return (
    <div className="bg-dark text-light min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-black shadow-sm px-4">
        <span className="navbar-brand fw-bold">📝 HabitTracker</span>
        <button className="btn btn-success">+ Add Habit</button>
      </nav>

      <div className="container py-4">

        {/* Welcome Section */}
        <div className="mb-4">
          <h2>Welcome back 👋</h2>
          <p className="text-secondary">
            Today’s Progress: {completedCount}/{habits.length} habits completed
          </p>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Today's Habits */}
        <div className="card bg-secondary bg-opacity-10 border-0 mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">🔥 Today's Habits</h5>

            {habits.map((habit) => (
              <div
                key={habit.id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                  />
                  <span
                    style={{
                      textDecoration: habit.completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {habit.name}
                  </span>
                </div>
                <span className="badge bg-warning text-dark">
                  🔥 {habit.streak} days
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card bg-black border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-secondary">Current Streak</h6>
                <h3>12 Days</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-black border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-secondary">Completion Rate</h6>
                <h3>78%</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-black border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-secondary">Total Habits</h6>
                <h3>{habits.length}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardDemo;
