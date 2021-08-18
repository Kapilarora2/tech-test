import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'om-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  todoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private todoService: TodoService,public dialogRef: MatDialogRef<CreateTodoComponent>) { }

  ngOnInit(): void {
     this.todoForm = this.formBuilder.group({
      label: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      done: [false],
     });
  }

  addTodo() {
    this.todoService.addTodo(this.todoForm.value)
    .subscribe((result: any) => {
      this.dialogRef.close({event:'Add'});
      }, (err: any) => {
        
      });
    };
  }


