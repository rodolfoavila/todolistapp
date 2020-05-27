import { TaskService } from './../../services/task.service';
import { Task } from './../../Task';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;
  constructor(private taskservice: TaskService) {
    this.taskservice.getTask()
    .subscribe(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  ngOnInit(): void {
  }
addTask(event){
  event.preventDefault();
  const newTask: Task = {
     title: this.title,
     isDone: false
   };
  this.taskservice.addTask(newTask)
    .subscribe( task => {
      this.tasks.push(task);
      console.log(this.tasks);
      this.title='';
    });
}
deleteTask(id){
  const response = confirm('Estas seguro de eliminar la tarea');
  if (response){
    const tasks = this.tasks;
    this.taskservice.deleteTask(id)
     .subscribe( data => {
       if (data.n == 1) {
         for (let i = 0; i < tasks.length; i++) {
           if ( tasks[i]._id == id){
             tasks.splice(i, 1);
            }
          }
        }
    });
  }
}
updateTask(task: Task) {
const newTask = {
     _id: task._id,
     title: task.title,
     isDone: !task.isDone
  };

this.taskservice.updateTask(newTask)
  .subscribe( res => {
      task.isDone = !task.isDone;
});
}
}
