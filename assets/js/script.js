// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
// let nextId = JSON.parse(localStorage.getItem("nextId")) || [];

// Retrieve tasks inputs from add task form
const titleInput = $('#title');
const dateInput = $('#date');
const descriptionInput = $('#description');

// a function to read the local storage
function saveTaskstoStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// A function that generates a unique task id
function generateTaskId(taskId) {
    let taskId = crypto.randomUUID(taskId);

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // create elements for the card using bootstrap classes
    // 1. create element, 2. add attributes to element, 3. append element to page
    const taskCard = $('<div>').addClass('card task-card draggable my-3').css('width', '18rem').attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h5').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text text-center').text(task.description);
    const cardDate = $('<p>').addClass('card-text text-center').text(task.dueDate);
    const cardBtn = $('<button>').addClass('btn btn-danger delete mx-auto').attr('data-task-id', task.id).text('Delete');

    // this event calls the deleteTask function on click
    cardBtn.on('click', handleDeleteTask);

    // conditionals that changes card color based on dueDate
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardBtn.addClass('border-light');
        }
    }

    // append all elements of taskCard to the div
    cardBody.append(cardDescription, cardDate, cardBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = taskList;

    // declare the droppable card lanes where tasks will render
    const todoLane = $('#todo-cards');
    // todoLane.empty();
    const inProgressLane = $('#in-progress-cards');
    // inProgressLane.empty();
    const doneLane = $('#done-cards');
    // doneLane.empty();

    // create a taskCard for each task in the taskList array
    for (let task of tasks) {
        if (tasks.status === 'to-do') {
            todoLane.append(createTaskCard(task));
        } else if (project.status === 'in-progress') {
            inProgressLane.append(createProjectCard(task));
        } else if (project.status === 'done') {
            doneLane.append(createProjectCard(task));
        }
    }

    // makes elements draggable that hold the 
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
    })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    // call the id generator function
    generateTaskId(taskId);


    // declare form inputs as variables to gain their values
    const taskTitle = titleInput.val().trim();
    const taskDate = dateInput.val();
    const taskDescription = descriptionInput.val().trim(); // yyyy-mm-dd format

    // create an object out of the addTask form values
    const newTask = {
        id: taskId.val(),
        title: taskTitle,
        dueDate: taskDate,
        description: taskDescription,
        status: 'to-do',
    };

    // pushes new Task to the array
    const tasks = taskList;
    tasks.push(newTask);

    // save newTask to taskList array and render them to page
    saveTaskstoStorage(tasks);
    renderTaskList();

    // clear form inputs
    titleInput.val('');
    dateInput.val('');
    descriptionInput.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-project-id');
    const tasks = taskList;

    // this conditional goes through the taskList array and removes the task with the matching id
    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    // saves the updated taskList and renders them to page
    saveTaskstoStorage(tasks);
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();

    $('#date').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });

    const submitBtn = $('#submit-btn');

    submitBtn.on('click', handleAddTask())
});
