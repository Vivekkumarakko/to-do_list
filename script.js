// JavaScript Functions
let listContainer = document.getElementById("list-container");
let inputBox = document.getElementById("input-box");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        let timestamp = new Date().toLocaleString();
        li.innerHTML = `${inputBox.value} <span class="timestamp">${timestamp}</span>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.addEventListener("dblclick", function () {
            let newTask = prompt("Edit your task:", li.firstChild.textContent.trim());
            if (newTask) {
                li.firstChild.textContent = newTask;
                saveData();
            }
        });
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

function clearAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

function filterTasks(filter) {
    let tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
        switch (filter) {
            case "all":
                task.style.display = "block";
                break;
            case "completed":
                task.style.display = task.classList.contains("checked") ? "block" : "none";
                break;
            case "incomplete":
                task.style.display = task.classList.contains("checked") ? "none" : "block";
                break;
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function saveData() {
    let tasks = [];
    let items = listContainer.getElementsByTagName("li");
    for (let item of items) {
        tasks.push({
            text: item.firstChild.textContent.trim(),
            completed: item.classList.contains("checked"),
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let task of tasks) {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("checked");
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
        li.addEventListener("dblclick", function () {
            let newTask = prompt("Edit your task:", li.firstChild.textContent.trim());
            if (newTask) {
                li.firstChild.textContent = newTask;
                saveData();
            }
        });
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
    }
}

showTask();
