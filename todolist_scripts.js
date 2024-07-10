document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <span class="edit" data-index="${index}">Edit</span>
                <span class="delete" data-index="${index}">Delete</span>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = (task) => {
        tasks.push(task);
        saveTasks();
        renderTasks();
    };

    const editTask = (index, newTask) => {
        tasks[index] = newTask;
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const newTask = prompt('Edit task:', tasks[index]);
            if (newTask) {
                editTask(index, newTask.trim());
            }
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(index);
            }
        }
    });

    renderTasks();
});
