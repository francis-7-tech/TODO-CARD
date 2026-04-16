document.addEventListener('DOMContentLoaded', () => {

  // Element Selection

  const card = document.querySelector('[data-testid="test-todo-card"]');
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const description = document.querySelector('[data-testid="test-todo-description"]');
  const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
  const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
  const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
  const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
  const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
  const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
  const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');
  const collapsibleSection = document.querySelector('[data-testid="test-todo-collapsible-section"]');
  const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
  const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');
  const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
  const editTitle = document.querySelector('[data-testid="test-todo-edit-title-input"]');
  const editDescription = document.querySelector('[data-testid="test-todo-edit-description-input"]');
  const editPriority = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
  const editDueDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
  const saveButton = document.querySelector('[data-testid="test-todo-save-button"]');
  const cancelButton = document.querySelector('[data-testid="test-todo-cancel-button"]');
  const dueDateDisplay = document.querySelector('[data-testid="test-todo-due-date"]');

  // State Variables

  let currentTitle = title.textContent.trim();
  let currentDescription = description.textContent.trim();
  let currentPriority = priorityBadge.textContent.trim();
  let currentStatus = statusControl.value;
  let currentDueDate = '2026-04-16T00:00';
  let dueDate = new Date(currentDueDate);
  let timerInterval = null;

  // Priority Indicator

  function updatePriorityIndicator(priority) {
    card.classList.remove('priority-high');

    if (priority === 'High') {
      priorityIndicator.textContent = '🔴';
      card.classList.add('priority-high');
    } else if (priority === 'Medium') {
      priorityIndicator.textContent = '🟡';
    } else {
      priorityIndicator.textContent = '🟢';
    }
  }


  // Expand and Collapse
  

  const COLLAPSE_THRESHOLD = 100;

  function initExpandCollapse() {
    if (description.textContent.trim().length > COLLAPSE_THRESHOLD) {
      collapsibleSection.style.display = 'none';
      expandToggle.setAttribute('aria-expanded', 'false');
      expandToggle.textContent = 'Show More';
    } else {
      expandToggle.style.display = 'none';
    }
  }

  expandToggle.addEventListener('click', () => {
    const isExpanded = expandToggle.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      collapsibleSection.style.display = 'none';
      expandToggle.setAttribute('aria-expanded', 'false');
      expandToggle.textContent = 'Show More';
    } else {
      collapsibleSection.style.display = 'block';
      expandToggle.setAttribute('aria-expanded', 'true');
      expandToggle.textContent = 'Show Less';
    }
  });

  // Status Logic

  function updateStatus(newStatus) {
    currentStatus = newStatus;

    statusBadge.textContent = newStatus;
    statusControl.value = newStatus;
    checkbox.checked = newStatus === 'Done';

    card.classList.remove('todo-done', 'status-in-progress');

    if (newStatus === 'Done') {
      card.classList.add('todo-done');
    } else if (newStatus === 'In Progress') {
      card.classList.add('status-in-progress');
    }

    // Update time when status changes
    updateTimeRemaining();
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      updateStatus('Done');
    } else {
      updateStatus('Pending');
    }
  });

  statusControl.addEventListener('change', () => {
    updateStatus(statusControl.value);
  });

  // Time Logic

  function updateTimeRemaining() {
    if (currentStatus === 'Done') {
      timeRemaining.textContent = 'Completed';
      overdueIndicator.textContent = '';
      card.classList.remove('todo-overdue');

      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      return;
    }

    const now = new Date();
    const diffMs = dueDate - now;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMs < 0) {
      const overdueMins = Math.round(Math.abs(diffMs) / 60000);
      const overdueHours = Math.round(Math.abs(diffMs) / 3600000);
      const overdueDays = Math.round(Math.abs(diffMs) / 86400000);

      if (overdueMins < 60) {
        timeRemaining.textContent = `Overdue by ${overdueMins} minutes`;
      } else if (overdueHours < 24) {
        timeRemaining.textContent = `Overdue by ${overdueHours} hours`;
      } else {
        timeRemaining.textContent = `Overdue by ${overdueDays} days`;
      }

      overdueIndicator.textContent = 'Overdue';
      card.classList.add('todo-overdue');

    } else {
      if (diffMins < 60) {
        timeRemaining.textContent = `Due in ${diffMins} minutes`;
      } else if (diffHours < 24) {
        timeRemaining.textContent = `Due in ${diffHours} hours`;
      } else {
        timeRemaining.textContent = `Due in ${diffDays} days`;
      }

      overdueIndicator.textContent = '';
      card.classList.remove('todo-overdue');
    }
  }

  // Edit Mode

  function openEditForm() {
    editTitle.value = currentTitle;
    editDescription.value = currentDescription;
    editPriority.value = currentPriority;
    editDueDate.value = currentDueDate;
    editForm.classList.add('active');
    editTitle.focus();
  }

  function closeEditForm() {
    editForm.classList.remove('active');
    editButton.focus();
  }

  editButton.addEventListener('click', () => {
    openEditForm();
  });

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();

    currentTitle = editTitle.value.trim();
    currentDescription = editDescription.value.trim();
    currentPriority = editPriority.value;
    currentDueDate = editDueDate.value;

    title.textContent = currentTitle;
    description.textContent = currentDescription;
    priorityBadge.textContent = currentPriority;
    priorityBadge.setAttribute('aria-label', `Priority: ${currentPriority}`);

    dueDate = new Date(currentDueDate);
    const dateObj = new Date(currentDueDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dueDateDisplay.textContent = `Due: ${dateObj.toLocaleDateString('en-US', options)}`;

    updatePriorityIndicator(currentPriority);
    updateTimeRemaining();
    closeEditForm();
  });

  cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeEditForm();
  });

  // Delete Button

  deleteButton.addEventListener('click', () => {
    card.remove();
  });

  // Initialize Payload

  updatePriorityIndicator(currentPriority);
  initExpandCollapse();
  updateStatus(currentStatus);
  timerInterval = setInterval(updateTimeRemaining, 30000);


});