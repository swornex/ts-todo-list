import { Filter } from "./interface";
import { Task } from "./task";
import { createDeleteElement, createEditElement } from "./util";

export class TaskList {
  private list: Task[];

  constructor() {
    this.list = [];
  }

  addTask(title: string) {
    this.list.push(new Task(title));
  }

  getTaskElement(filter: Filter) {
    const { searchQuery, type } = filter;

    let filteredList = this.getFilteredType(type);

    if (searchQuery) {
      filteredList = filteredList.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredList.toReversed().map((task) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.id = task.id;
      checkbox.className = "checkbox";
      checkbox.type = "checkbox";
      checkbox.checked = task.isCompleted;
      checkbox.addEventListener("change", () => {
        task.toggleIsisCompleted();
      });

      const label = document.createElement("label");
      label.htmlFor = task.id;
      label.className = "todo-label";

      const input = document.createElement("input");
      input.value = task.title;
      input.className = "task-title mouse-none";
      input.readOnly = true;

      const alterButtons = document.createElement("div");
      alterButtons.className = "alter-buttons";

      const editButton = createEditElement(input, this, task);

      const deleteButton = createDeleteElement(this, task);

      alterButtons.appendChild(editButton);
      alterButtons.appendChild(deleteButton);

      label.appendChild(input);

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(alterButtons);

      return li;
    });
  }

  removeTask(id: string) {
    this.list = this.list.filter((task) => task.id !== id);
  }

  editTask(id: string, title: string) {
    const task = this.list.find((task) => task.id === id);
    if (task) {
      task.title = title;
    }
  }

  getFilteredType(type: "all" | "completed" | "remaining") {
    return this.list.filter((task) => {
      if (type === "all") {
        return true;
      }
      if (type === "completed") {
        return task.isCompleted;
      }
      if (type === "remaining") {
        return !task.isCompleted;
      }
    });
  }
}
