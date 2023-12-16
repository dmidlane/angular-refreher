import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  
  validationText: string = '';
  showValidation: boolean = false;
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription?: Subscription;

  constructor(private uiService: UiService) {
    this.uiService.onToggle().subscribe((value) => this.showAddTask = value);

  }

  ngOnInit(): void {}

  onSubmit() {
    
    // validate text
    if (!this.text)
    {
      this.validationText = 'Please add a task name';
      return;
    }

    // emit new task to ui service
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    // clear the form
    this.text = '';
    this.day = '';
    this.reminder = false;
    
    // hide the form and update the button
    this.uiService.toggleAddTaskButton();

  }
}
