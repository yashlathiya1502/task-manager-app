export interface IncomingTodoType {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoType {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTodoType {
  id?: string;
  title: string;
  description: string;
  status: string;
}
