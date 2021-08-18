import { ITodo, Todo } from './../../interfaces/todo.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000';
  
  public getTodoList(): Observable<Array<ITodo>> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<ITodo[]>(url);
  }

  public getTodoItem(id:string): Observable<Array<ITodo>> {
    const url = `${this.apiUrl}/tasks/`;
    return this.http.get<ITodo[]>(url + id);
  }

  public deleteTodo (id:string) {
    this.http.delete(this.apiUrl + "/tasks/" + id).subscribe(data => {
      return data;
    });
  }

  addTodo(todoItem: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/tasks/`;
    return this.http.post<Todo>(url, todoItem).pipe()
  }

  updateTodo(todoItem: Todo,id:any): Observable<Todo> {
    const url = `${this.apiUrl}/tasks/`;
    return this.http.patch<Todo>(this.apiUrl + "/tasks/" + id, todoItem).pipe()
  }
}
