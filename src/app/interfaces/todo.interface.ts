export interface ITodo {
  id?: string;
  label?: string;
  description?: string;
  category?: Category;
  done?: boolean;
}

export class Todo {
  id: string;
  label: string;
  description: string;
  category: Category;
  done: boolean=false;
}
export enum Category {
  BUREAUCRACY = 'bureaucracy',
  HOUSE = 'House',
}
