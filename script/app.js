// Trello 2

const addTodo = document.querySelector(".add__todo");
const edit = document.querySelector(".edit");
const modal = document.getElementById("modal_window");
const textarea = document.querySelector(".textarea");
const cancelBtn = document.querySelector(".cancel");
const confirmBtn = document.querySelector(".confirm");
const lists = document.querySelector(".list");
const description = document.querySelector(".description");
const inputTitle = document.querySelector(".input__title");
const deleteAllbtn = document.querySelector(".delete__all");
const listProgress = document.querySelector(".list__progress");
const listDone = document.querySelector(".list__done");

// часы в шапке страницы
function clock() {
  let date = new Date();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  document.querySelector(".time").innerHTML =
    hours + ":" + minutes + ":" + seconds;
}

setInterval(clock, 1000);
clock();

// открытие модального окна
addTodo.addEventListener("click", () => {
  modal.style.display = "flex";
});

// закрытие модаьного окна
function hideModalWindow() {
  modal.style.display = "none";
}

cancelBtn.addEventListener("click", hideModalWindow);

let todoList = [];
let progressList = [];
let doneList = [];
// let draggetItem = 'null';

// счетчик карточек
function count() {
  let counter = document.querySelector(".counter");
  counter.textContent = todoList.length;
}

function addItem(titleValue, areaValue, idNum) {
  const listItem = document.createElement("div");
  listItem.classList.add("list__item");

  const listTop = document.createElement("div");
  listTop.classList.add("list__top");

  const listTitle = document.createElement("p");
  listTitle.classList.add("list__title");
  listTitle.textContent = titleValue;

  const btnTop = document.createElement("div");
  btnTop.classList.add("btn__top");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "delete";

  const listCenter = document.createElement("div");
  listCenter.classList.add("list__center");

  const descriptionInfo = document.createElement("p");
  descriptionInfo.classList.add("description__info");
  descriptionInfo.textContent = areaValue;

  const arrowBtn = document.createElement("button");
  arrowBtn.classList.add("arrow");
  arrowBtn.textContent = "ᐳ";

  const listBottom = document.createElement("div");
  listBottom.classList.add("list__bottom");

  const user = document.createElement("div");
  user.classList.add("user");

  const listTime = document.createElement("div");
  listTime.classList.add("list__time");

  lists.append(listItem);
  listItem.append(listTop, listCenter, listBottom);
  listTop.append(listTitle, btnTop);
  listCenter.append(descriptionInfo, arrowBtn);
  listBottom.append(user, listTime);
  btnTop.append(editBtn, deleteBtn);

  // listItem.draggable = true;
  listItem.setAttribute("id", idNum);

  // удаление карточки
  function delItem() {
    listItem.remove();
    todoList = todoList.filter((element) => element.id != listItem.id);
    localStorage.setItem("todo", JSON.stringify(todoList));
  }

  deleteBtn.addEventListener("click", () => {
    delItem();
    count();
  });

  // editBtn.addEventListener('click', () => {
  //     modal.style.display = 'flex';

  //     contentTitle = todoList.title;
  //     contentDescription = todoList.description;
  //     id = todoList.id;

  //     count();
  // });

  // перенос карточки на другую доску
  function arrow() {
    lists.removeChild(listItem);
    listProgress.appendChild(listItem);
    arrowBtn.remove();
    editBtn.remove();
    deleteBtn.remove();
    listItem.style.backgroundColor = "#CDA4DE";

    const newProgress = todoList.filter((element) => element.id == listItem.id);

    progressList.push(newProgress);

    localStorage.setItem("progress", JSON.stringify(progressList));
    todoList = todoList.filter((element) => element.id != listItem.id);
    localStorage.setItem("todo", JSON.stringify(todoList));
  }

  arrowBtn.addEventListener("click", () => {
    arrow();
    count();
    createBtn();
  });

  function backTodo() {
    listProgress.removeChild(listItem);
    lists.appendChild(listItem);
  }

  function createBtn() {
    backBtn = document.createElement("button");
    backBtn.classList.add("back");
    backBtn.textContent = "back";

    completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.textContent = "complete";

    btnTop.append(backBtn, completeBtn);
  }
}

//добавляет данные в карточки
function addContent() {
  if (localStorage.getItem("todo")) {
    todoList = JSON.parse(localStorage.getItem("todo"));

    todoList.forEach((item) => {
      const contentTitle = item.title;
      const contentDescription = item.description;
      const id = item.id;
      addItem(contentTitle, contentDescription, id);
      count();
    });
  }
}

function idNumber() {
  return Math.round(Math.random() * 100);
}

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleValue = e.target.elements.titleText.value;
  const areaValue = e.target.elements.descriptionText.value;
  const idNum = idNumber();
  clear();
  hideModalWindow();

  const newList = {
    title: titleValue,
    description: areaValue,
    // time: timeValue,
    id: idNum,
  };

  addItem(newList.title, newList.description, newList.id);
  todoList.push(newList);
  localStorage.setItem("todo", JSON.stringify(todoList));

  clear();
  hideModalWindow();
  count();
});

// очищает поле ввода
function clear() {
  inputTitle.value = "";
  textarea.value = "";
}

// добавляет время создания карточки
// function timeList() {
//     let date = new Date();
//     let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
//     let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
//     let timeValue = document.querySelector('.list__time');
//     timeValue.innerHTML = hours + ':' + minutes;
// }

// const list = JSON.parse(localStorage.getItem('todo'));
// const listP = JSON.parse(localStorage.getItem('progress'));

// addContent(listP);
// addContent(list);

addContent();
count();
