import { Filter, Type } from "./interface.ts";
import "./reset.css";
import "./style.css";
import "./task.ts";
import { TaskList } from "./taskList.ts";

const todoInput = document.querySelector<HTMLInputElement>(".todo-input");
const addButton = document.querySelector<HTMLButtonElement>(".todo-button");
const search = document.querySelector<HTMLInputElement>("#search");
const todoList = document.querySelector<HTMLUListElement>(".todo-list");
const all = document.querySelector<HTMLLIElement>("#all");
const completed = document.querySelector<HTMLLIElement>("#completed");
const remaining = document.querySelector<HTMLLIElement>("#remaining");

let state: Filter = {
  type: "all",
  searchQuery: ""
};

const taskList = new TaskList();

function addTask() {
  const value = todoInput?.value;
  if (!value) return;

  taskList.addTask(value);
  todoInput!.value = "";

  resetFilterButtons();
  state = { ...state, type: "all" };
  display();
}

function filterTasks(type: Type) {
  resetFilterButtons();
  all!.className = `list-item ${type === "all" ? "list-item--active" : ""}`;
  completed!.className = `list-item ${
    type === "completed" ? "list-item--active" : ""
  }`;
  remaining!.className = `list-item ${
    type === "remaining" ? "list-item--active" : ""
  }`;

  state = { ...state, type };
  display();
}

function handleSearch() {
  const searchQuery = search?.value;
  state = { ...state, searchQuery };
  display();
}

function resetFilterButtons() {
  if (all && remaining && completed) {
    all.className = "list-item list-item--active";
    remaining.className = "list-item";
    completed.className = "list-item";
  }
}

export function display() {
  const taskElements = taskList.getTaskElement(state);
  todoList?.replaceChildren(...taskElements);
}

addButton?.addEventListener("click", addTask);
all?.addEventListener("click", () => filterTasks("all"));
completed?.addEventListener("click", () => filterTasks("completed"));
remaining?.addEventListener("click", () => filterTasks("remaining"));
search?.addEventListener("input", handleSearch);

// Initial display
display();
