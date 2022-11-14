const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const ulOfTask = document.querySelector(".tasks");
const line = document.querySelector(".line");
let arrayOfTasks = [];
input.focus();

window.addEventListener("keydown", () => {
  if (event.key == "Enter") {
    runApp();
  }
});

if (localStorage.getItem("tasks")) {
  let data = localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
    toPage(arrayOfTasks);
  }
}
submit.addEventListener("click", () => runApp());

function runApp() {
  if (input.value.trim() !== "") {
    makeTask(input.value);
    input.value = "";
    line.style.width = "0%";
    removeTask();
    doneTask();
  }
}

function makeTask(text) {
  const task = {
    id: Date.now(),
    title: text,
    done: false,
  };
  arrayOfTasks.push(task);
  toPage(arrayOfTasks);
}

function toPage(array) {
  ulOfTask.innerHTML = "";
  array.forEach((task) => {
    const li = document.createElement("li");
    const i = document.createElement("i");
    li.className = "task";
    if (task.done) {
      li.className = " task done";
    }
    li.textContent = task.title;
    li.setAttribute("data-id", task.id);
    li.setAttribute("done", task.done);
    i.className = "fa-solid fa-trash";
    li.appendChild(i);
    ulOfTask.appendChild(li);
  });
  toLocal(arrayOfTasks);
}

function toLocal(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}

//remove task
function removeTask() {
  document.querySelectorAll("i").forEach((icon) => {
    icon.addEventListener("click", () => {
      setTimeout(function () {
        icon.parentElement.remove();
      }, 300);
      icon.parentElement.classList.add("removeme");
      removeLocal(icon.parentElement.dataset.id);
    });
  });
}
removeTask();
function removeLocal(taskid) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);
  toLocal(arrayOfTasks);
}

// done the task

function doneTask() {
  Array.from(document.querySelector(".tasks").children).forEach((task) => {
    task.addEventListener("click", () => {
      task.classList.toggle("done");
      doneIt(task.dataset.id);
    });
  });
}
doneTask();

function doneIt(done) {
  arrayOfTasks.forEach((task) => {
    if (task.id === Number(done)) {
      if (task.done) {
        task.done = false;
      } else {
        task.done = true;
      }
    }
    toLocal(arrayOfTasks);
    console.log(arrayOfTasks);
  });
}

// line fill

let current = input.getAttribute("maxlength");
input.addEventListener("input", () => {
  line.style.width = `${(input.value.length / current) * 80}%`;
});
