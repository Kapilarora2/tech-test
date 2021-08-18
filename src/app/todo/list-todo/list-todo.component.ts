import { ViewTodoDialogComponent } from '../view-todo-dialog/view-todo-dialog.component';
import { ITodo } from './../../interfaces/todo.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../service/todo.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { UpdateTodoComponent } from 'src/app/update-todo/update-todo.component';

@Component({
  selector: 'om-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit {
  public todoList$: Observable<ITodo[]>;

  constructor(private todoService: TodoService, public dialog: MatDialog) {
    this.todoList$ = this.todoService.getTodoList();
  }

  ngOnInit(): void {}

  public addTodo = () => {
    
    this.openDialog(null,CreateTodoComponent,'270px','500px');
  }

  public todoDeleteClickHander = (todoID: string) => {
    this.todoService.deleteTodo(todoID);
    this.todoList$ = this.todoService.getTodoList();
  };

  public todoClickHander = (id: string) => {
    this.todoService.getTodoItem(id)
    .subscribe((data: any) => {
       this.openDialog(data,ViewTodoDialogComponent,'300px','300px');
      }, (err: any) => {
       
      });
  };

  public todoUpdateClickHander = (id: string) => {
    this.todoService.getTodoItem(id)
    .subscribe((data: any) => {
       this.openDialog(data,UpdateTodoComponent,'300px','300px');
      }, (err: any) => {
       
      });
  };

  private openDialog(selectedTodo:any,_component:any,height:string,width:string): void {
   
    const dialogRef = this.dialog.open(_component, {
      width: '300px',
      data: selectedTodo,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.todoList$ = this.todoService.getTodoList();
      }else if(result.event == 'Update'){
        this.todoList$ = this.todoService.getTodoList();
      }else if(result.event == 'Delete'){
        //this.deleteRowData(result.data);
      }
    });
  }
}
