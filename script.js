document.addEventListener('DOMContentLoaded', () => {

  // Edit and Delete Buttons
  const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
  const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

  editButton.addEventListener('click', () => {
    console.log('edit clicked');
  });

  deleteButton.addEventListener('click', () => {
    alert('Delete clicked');
  });

  // Checkbox 
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const status = document.querySelector('[data-testid="test-todo-status"]');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      title.style.textDecoration = 'line-through';
      status.textContent = 'Done';
    } else {
      title.style.textDecoration = 'none';
      status.textContent = 'In Progress';
    }
  });

  // Time Remaining
  const dueDate = new Date('2026-04-16T00:00:00');
  const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');

  function updateTimeRemaining() {
    const now = new Date();
    const diffMs = dueDate - now;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMs < 0) {
      timeRemaining.textContent = `Overdue by ${Math.abs(diffHours)} hours`;
    } else if (diffMins < 60) {
      timeRemaining.textContent = 'Due now!';
    } else if (diffHours < 24) {
      timeRemaining.textContent = `Due in ${diffHours} hours`;
    } else if (diffDays === 1) {
      timeRemaining.textContent = 'Due tomorrow';
    } else {
      timeRemaining.textContent = `Due in ${diffDays} days`;
    }
  }

  updateTimeRemaining();

});