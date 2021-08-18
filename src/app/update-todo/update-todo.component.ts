import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo/service/todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodo } from '../interfaces/todo.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'om-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  todoForm: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public selectedTodo: ITodo,private formBuilder: FormBuilder,private todoService: TodoService,public dialogRef: MatDialogRef<UpdateTodoComponent>) { }

  ngOnInit(): void {console.log(this.selectedTodo)
     this.todoForm = this.formBuilder.group({
      label: [this.selectedTodo.label, Validators.compose([Validators.required])],
      description: [this.selectedTodo.description, Validators.compose([Validators.required])],
      category: [this.selectedTodo.category, Validators.compose([Validators.required])],
      done: [this.selectedTodo.done],
     });
  }

  updateTodo() {
    this.todoService.updateTodo(this.todoForm.value,this.selectedTodo.id)
    .subscribe((result: any) => {
      this.dialogRef.close({event:'Update'});
      }, (err: any) => {
        
      });
    };
  }
