let todoItemsContainerEl = document.getElementById('todoItemsContainer');
let saveTodoButtonEl = document.getElementById("saveTodoButton");

// local storage section
function todoListGetFunction() {
    let getTodoListEl = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(getTodoListEl);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = todoListGetFunction();
saveTodoButtonEl.addEventListener('click', () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
});
// local storage section

// save todo main function
function createAndSaveChange(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelContentEl = document.getElementById(labelId);
    labelContentEl.classList.toggle('checked');

    let todoObjectIndex = todoList.findIndex((eachtodo) => {
        let eachtodoId = "list" + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        }
        else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    }
    else {
        todoObject.isChecked = true;
    }

}
// save todo main function

// delete todo main function
function deleteTodo(todoId) {
    let todoItemId = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoItemId);
    let deleteIndex = todoList.findIndex((eachItem) => {
        let eachItemId = eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        }
        else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}
// delete todo main function

// append section
function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "list" + todo.uniqueNo;

    let listEl = document.createElement('li');
    listEl.id = todoId;
    listEl.classList.add('todo-item-container', 'd-flex', 'flex-row');
    todoItemsContainerEl.appendChild(listEl);

    let inputEl = document.createElement('input');
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.classList.add('checkbox-input');
    // save todo callback funtion
    inputEl.onclick = function () {
        createAndSaveChange(checkboxId, labelId, todoId);
    };
    listEl.appendChild(inputEl);

    let labelContainerEl = document.createElement('div');
    labelContainerEl.classList.add('label-container', 'd-flex', 'flex-row');
    listEl.appendChild(labelContainerEl);

    let labelEl = document.createElement('label');
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    labelEl.setAttribute("for", checkboxId);
    labelEl.classList.add('checkbox-label');
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainerEl.appendChild(labelEl);

    let deleteIconContainer = document.createElement('div');
    deleteIconContainer.classList.add('delete-icon-container');
    labelContainerEl.appendChild(deleteIconContainer);

    let deleteIconEl = document.createElement('i');
    deleteIconEl.classList.add('far', 'fa-trash-alt', 'delete-icon');
    // delete todo callback function
    deleteIconEl.onclick = function () {
        deleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIconEl);
}
// append section

// loop section
for (let todo of todoList) {
    createAndAppendTodo(todo);
}
// loop section

// add main function
let addToButton = document.getElementById('addToButton');
let todoCount = todoList.length;

addToButton.addEventListener('click', function () {
    let todoUserInputEl = document.getElementById('todoUserInput');
    let userInputValue = todoUserInputEl.value;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount + 1,
        isChecked: false,
    };
    if (userInputValue === "") {
        alert("Enter a Valid Input");
        return;
    }
    createAndAppendTodo(newTodo);
    todoList.push(newTodo);
    todoUserInputEl.value = "";
});
// add main function