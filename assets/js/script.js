// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// //Retrieve tasks inputs from add task form
// const titleInput = $('#title').val()
// const dateInput = $('#datepicker').val()
// const descriptionInput = $('#description').val()


// A function that generates a unique task id
function generateTaskId(prefix) {
    // sets the starting id number
    let taskIdCounter = 1
    // concatenates the id number and our prefix parameter ('task') 
    const uniqueId = prefix + '-' + taskIdCounter;
    // increments the id number with each task created
    taskIdCounter++;
    return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // create element for the card using jquery + bootstrap
    const taskCard = $('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><button type="button" class="btn btn-success mx-auto" id="delete-btn">Delete</button></div></div>');

    // call generateTaskId function and assign to task card
    const taskId = generateTaskId('task');
    // set the attribute of the task card with unique id
    taskCard.attr('id', taskId)

    // retrieve parent element
    const todoDiv = $('#todo-cards');
    //append taskCard to parent
    todoDiv.append(taskCard);

    console.log(taskId);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    //adds datepicker
    $(function () {
        $("#datepicker").datepicker();
    });

    //makes card <div>s droppable


});

const submitBtn = $('#submit-btn');

submitBtn.on('click', createTaskCard())