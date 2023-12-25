import { display } from "./main";

interface ITask {
  title: string;
  isCompleted: boolean;
  id: string;
}

export class Task implements ITask {
  title: string;
  isCompleted: boolean;
  id: string;

  constructor(title: string, isCompleted = false) {
    this.id = Date.now().toString();
    this.title = title;
    this.isCompleted = isCompleted;
  }

  toggleIsisCompleted() {
    this.isCompleted = !this.isCompleted;
    display();
  }
}
