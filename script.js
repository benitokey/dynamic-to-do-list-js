document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Step 1: Load tasks from the browser's memory
  loadTasks();

  // Step 2: When the add button is clicked
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    } else {
      alert('Please enter a task.');
    }
  });

  // Step 3: Add task when user presses Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      } else {
        alert('Please enter a task.');
      }
    }
  });

  // Step 4: Function to add a task
  function addTask(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    removeButton.onclick = () => {
      taskList.removeChild(li);
      removeFromStorage(taskText);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // Step 5: Load saved tasks
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Step 6: Remove from storage
  function removeFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
