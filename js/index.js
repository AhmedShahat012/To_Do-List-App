// ~ ====================> Html Elements
var root = document.querySelector(":root");
var model = document.getElementById("modal");
var statuseInput = document.getElementById("status");
var categoryinput = document.getElementById("category");
var titleinput = document.getElementById("title");
var descriptionInput = document.getElementById("description");

var newtaskbtn = document.getElementById("newTask");
var addbtn = document.getElementById("addBtn");
var searchinput = document.getElementById("searchInput");
var updatebtn = document.getElementById("updateBtn");
var sections = document.querySelectorAll("section");
var gridbtn = document.getElementById("gridBtn");
var barsbtn = document.getElementById("barsBtn");
var taskscontainer = document.querySelectorAll(".tasks");
var modebtn = document.getElementById("mode");

// ~ ====================> App varibles
var container = {
  nextUp: document.getElementById("nextUp"),
  inProgress: document.getElementById("inProgress"),
  done: document.getElementById("done"),
};
var countersElement = {
  nextUp: document.querySelector("#nextUp").querySelector("span"),
  inProgress: document.querySelector("#inProgress").querySelector("span"),
  done: document.querySelector("#done").querySelector("span"),
};
var counter = {
  nextUp: 0,
  inProgress: 0,
  done: 0,
};
var tasksArr = getTasksfromlocalStorage();
displayAllTasks();
let updataInex;
const titleRegex = /^[A-Z][a-z]{3,}$/;
const describtionRegex = /\w{25,100}/;

// ~ ====================> Functions
function showmodel() {
  window.scroll(0, 0);
  document.body.style.overflow = "hidden";
  model.classList.replace("d-none", "d-flex");
}
function hidemodel() {
  model.classList.replace("d-flex", "d-none");
  document.body.style.overflow = "auto";
}

function Addtask() {
  if (
    vaildate(titleinput, titleRegex) &&
    vaildate(descriptionInput, describtionRegex)
  ) {
    var task = {
      statuse: statuseInput.value,
      catagery: categoryinput.value,
      title: titleinput.value,
      descrption: descriptionInput.value,
      bgColor: "#0d1117",
    };
    tasksArr.push(task);
    setTasksTolocalStorage();
    displaytask(tasksArr.length - 1);
    hidemodel();
  } else {
    alert("Ylt");
  }
}
function displaytask(index) {
  var taskhtml = `
    <div class="task" style="background-color: ${tasksArr[index].bgColor};"">
    <h3 class="text-capitalize">${tasksArr[index].title}</h3>
    <p class="description text-capitalize">${tasksArr[index].descrption}</p>
    <h4 class="category ${tasksArr[index].catagery} text-capitalize">${tasksArr[index].catagery}</h4>
    <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
    <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
    <li><i class="bi bi-trash-fill" onclick="delettask(${index})"></i></li>
    <li><i class="bi bi-palette-fill" onclick="chaneColorOfTask(event,${index})"></i></li>
    </ul>
    </div>
    `;

  //   console.log(taskhtml);
  container[tasksArr[index].statuse].querySelector(".tasks").innerHTML +=
    taskhtml;
  setCounters(tasksArr[index].statuse);
}
function displayAllTasks() {
  for (let i = 0; i < tasksArr.length; i++) {
    displaytask(i);
  }
}

function setTasksTolocalStorage() {
  localStorage.setItem("Tasks", JSON.stringify(tasksArr));
}

function getTasksfromlocalStorage() {
  return JSON.parse(localStorage.getItem("Tasks")) || [];
}
function setCounters(status) {
  countersElement[status].innerHTML = +countersElement[status].innerHTML + 1;
}

function delettask(index) {
  tasksArr.splice(index, 1);
  setTasksTolocalStorage();
  //rest container
  restContainer();
  //rest counter
  restCounters();
  displayAllTasks();
}
function restContainer() {
  for (x in container) {
    container[x].querySelector(".tasks").innerHTML = "";
    // console.log(container[x]);
  }
}
function restCounters() {
  for (x in countersElement) {
    countersElement[x].innerHTML = 0;
  }
}

function search(params) {
  restContainer();
  restCounters();
  var term = searchinput.value;
  for (let i = 0; i < tasksArr.length; i++) {
    if (
      tasksArr[i].title.toLowerCase().includes(term.toLowerCase()) ||
      tasksArr[i].catagery.toLowerCase().includes(term.toLowerCase())
    ) {
      displaytask(i);
    }
  }
}

// TODO Update Task
function getTaskInfo(index) {
  updataInex = index;

  showmodel();
  console.log(tasksArr[index]);
  statuseInput.value = tasksArr[index].statuse;
  categoryinput.value = tasksArr[index].catagery;
  titleinput.value = tasksArr[index].title;
  descriptionInput.value = tasksArr[index].descrption;

  addbtn.classList.replace("d-block", "d-none");

  updatebtn.classList.replace("d-none", "d-block");
}

function editTaskData() {
  // get user data
  tasksArr[updataInex].statuse = statuseInput.value;
  tasksArr[updataInex].catagery = categoryinput.value;
  tasksArr[updataInex].title = titleinput.value;
  tasksArr[updataInex].descrption = descriptionInput.value;
  //rest localstorage
  setTasksTolocalStorage();
  //rest container
  restContainer();
  //rest counter
  restCounters();
  //display data
  displayAllTasks();
  ///////hide model
  hidemodel();
}

//////////////////////vaildtion//////////
function vaildate(elment, regex) {
  if (regex.test(elment.value)) {
    elment.classList.add("is-valid");
    elment.classList.remove("is-invalid");
    elment.parentElement.nextElementSibling.classList.replace(
      "d-block",
      "d-none"
    );
    return true;
  }
  elment.classList.add("is-invalid");
  elment.classList.remove("is-vaild");
  elment.parentElement.nextElementSibling.classList.replace(
    "d-none",
    "d-block"
  );
  return false;
}
//////////////////////////////////////
const colors = ["#EE4266", "#C5EBAA", "#B7C9F2", "#9BCF53"];

function chaneColorOfTask(e, index) {
  const color = colors[Math.trunc(Math.random() * colors.length)];
  console.log(color);
  tasksArr[index].bgColor = color;

  setTasksTolocalStorage();
  e.target.closest(".task").style.backgroundColor = color;
  // console.log(e.target.closest(".tasks"));
}
///////////////////////////////////////////////

function changsToBarsLayout() {
  gridbtn.classList.remove("active");
  barsbtn.classList.add("active");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("col-md-6", "col-lg-4");
    sections[i].style.overflow = "auto";
  }
  for (let j = 0; j < taskscontainer.length; j++) {
    taskscontainer[j].setAttribute("data-view", "bars");
  }
}
////////////////////dark mode //////////////////////
function changeMode() {
  if (modebtn.classList.contains("bi-brightness-high-fill")) {
    root.style.setProperty("--main-black", "#fff");
    root.style.setProperty("--sec-black", "#eee");
    modebtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
  } else {
    root.style.setProperty("--main-black", "#0d1117");
    root.style.setProperty("--sec-black", "#161b22");
    modebtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
  }
}

// ~ ====================> Events
newtaskbtn.addEventListener("click", showmodel);
addbtn.addEventListener("click", Addtask);

//// 2 way to hide model
model.addEventListener("click", function (e) {
  if (e.target.id == "modal") {
    hidemodel();
  }
});
document.addEventListener("keyup", function (e) {
  if (e.code == "Escape") {
    hidemodel();
  }
});

searchinput.addEventListener("keyup", search);
updatebtn.addEventListener("click", editTaskData);

titleinput.addEventListener("input", function () {
  vaildate(titleinput, titleRegex);
});
descriptionInput.addEventListener("input", function () {
  vaildate(descriptionInput, describtionRegex);
});

barsbtn.addEventListener("click", changsToBarsLayout);
modebtn.addEventListener("click", changeMode);
