var btn = document.getElementById("btn");
var title = document.getElementById("title");
var description = document.getElementById("description");
var data = document.querySelector(".data");
var search = document.getElementById("search");

var todolist = JSON.parse(localStorage.getItem("todos")) || [];
var editIndex = null;

display(); // أول لما الصفحة تفتح

btn.addEventListener("click", function () {
    if (!validateInputs()) {
        alert("Description must be at least 20 characters.");
        return;
    }

    if (editIndex === null) {
        var todo = {
            title: title.value,
            description: description.value,
            completed: false
        };
        todolist.push(todo);
    } else {
        todolist[editIndex].title = title.value;
        todolist[editIndex].description = description.value;
        editIndex = null;
        btn.innerText = "Add";
    }

    saveToLocalStorage();
    clearInputs();
    display();
});

search.addEventListener("input", function () {
    display(this.value.trim().toLowerCase());
});

function display(searchTerm = "") {
    data.innerHTML = "";

    var found = false;

    for (var i = 0; i < todolist.length; i++) {
        if (
            todolist[i].title.toLowerCase().includes(searchTerm) ||
            todolist[i].description.toLowerCase().includes(searchTerm)
        ) {
            found = true;
            data.innerHTML += `
                <div>
                    <h3 style="${todolist[i].completed ? 'text-decoration: line-through;' : ''}">${todolist[i].title}</h3>
                    <p>${todolist[i].description}</p>
                    <button onclick="deleteTodo(${i})">Delete</button>
                    <button onclick="edit(${i})">Edit</button>
                    <button onclick="completeTask(${i})">${todolist[i].completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
        }
    }

    if (!found) {
        data.innerHTML = "<p>No matching tasks found.</p>";
    }
}

function deleteTodo(index) {
    todolist.splice(index, 1);
    saveToLocalStorage();
    display(search.value.trim().toLowerCase());
}

function edit(index) {
    title.value = todolist[index].title;
    description.value = todolist[index].description;
    editIndex = index;
    btn.innerText = "Update";
}

function completeTask(index) {
    todolist[index].completed = !todolist[index].completed;
    saveToLocalStorage();
    display(search.value.trim().toLowerCase());
}

function clearInputs() {
    title.value = "";
    description.value = "";
}

function validateInputs() {
    return description.value.trim().length >= 20;
}

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todolist));
}
