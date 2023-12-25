import { display } from "./main";
import { Task } from "./task";
import { TaskList } from "./taskList";

export function createDeleteElement(taskList: TaskList, task: Task) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  const iTag = document.createElement("i");
  iTag.className = "ph-bold ph-trash";

  deleteButton.appendChild(iTag);

  deleteButton.addEventListener("click", () => {
    taskList.removeTask(task.id);
    display();
  });

  return deleteButton;
}

export function createEditElement(
  input: HTMLInputElement,
  taskList: TaskList,
  task: Task
) {
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  const iTag = document.createElement("i");
  iTag.className = "ph-bold ph-pencil";

  editButton.appendChild(iTag);

  editButton.addEventListener("click", () => {
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      input.className = "task-title";
      input.focus();
      iTag.className = "ph-bold ph-check";
    } else {
      taskList.editTask(task.id, input.value);
      input.setAttribute("readonly", "readonly");
      input.className = "task-title mouse-none";
      iTag.className = "ph-bold ph-pencil";

      display();
    }
  });

  return editButton;
}
