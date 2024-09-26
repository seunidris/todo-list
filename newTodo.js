class Task {
    constructor(description) {
        this.description = description;
        this.isCompleted = false;
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
}

class TodoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.displayTaskList();
    }

    addTask(description) {
        const newTask = new Task(description);
        this.tasks.push(newTask);
        this.saveToLocalStorage();
        this.displayTaskList();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveToLocalStorage();
        this.displayTaskList();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].toggleCompletion();
        this.saveToLocalStorage();
        this.displayTaskList();
    }

    listTasks() {
        return this.tasks;
    }

    displayTaskList() {
        const display = document.getElementById('displayTaskList');
        display.innerHTML = '';

        this.tasks.forEach((task, i) => {
            const taskClass = task.isCompleted ? 'text-decoration-line-through' : '';
            const completedButtonClass = task.isCompleted ? 'd-none' : '';
            const undoButtonClass = task.isCompleted ? '' : 'd-none';

            display.innerHTML += `
                <li class="list-group-item bg-light m-3 p-2 shadow-sm d-flex justify-content-between align-items-center">
                    <span class="${taskClass}">${task.description}</span>
                    <div>
                        <button class="btn btn-success btn-sm me-2 ${completedButtonClass}" onclick="todoList.toggleTaskCompletion(${i})">Completed</button>
                        <button class="btn btn-warning btn-sm me-2 ${undoButtonClass}" onclick="todoList.toggleTaskCompletion(${i})">Undo</button>
                        <button class="btn btn-danger btn-sm" onclick="todoList.removeTask(${i})">Delete</button>
                    </div>
                </li>`;
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

const todoList = new TodoList();

document.getElementById('todoListForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskDescription = document.getElementById('taskInput').value;
    todoList.addTask(taskDescription);
    document.getElementById('taskInput').value = '';  
});
