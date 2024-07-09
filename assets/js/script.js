// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

//Retrieve tasks inputs from add task form
const titleInput = $('#title');
const dateInput = $('#date');
const descriptionInput = $('#description');


// A function that generates a unique task id
function generateTaskId() {
    let taskId = crypto.randomUUID();
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


    
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    $('#date').datepicker({
        changeMonth: true,
        changeYear: true,
      });

      const submitBtn = $('#submit-btn');
      
      submitBtn.on('click', createTaskCard())
});
