import { Dispatch, SetStateAction } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TodoType } from '../../types/globalTypes';
import SingleTodo from './SingleTodo';

interface PropsType {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  pendingTodos: TodoType[];
  setPendingTodos: Dispatch<SetStateAction<TodoType[]>>;
  completedTodos: TodoType[];
  setCompletedTodos: Dispatch<SetStateAction<TodoType[]>>;
  handleOpenDialog: (task: TodoType | null) => void;
  handleRefresh: () => void;
}

const TodoList = ({
  todos,
  setTodos,
  pendingTodos,
  setPendingTodos,
  completedTodos,
  setCompletedTodos,
  handleOpenDialog,
  handleRefresh
}: PropsType) => {
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <Droppable droppableId='todosList'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='w-full border p-4 rounded-lg'
          >
            <h3 className='bg-primary p-2 text-white rounded-sm'>TODO</h3>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo?.id.toString()} 
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                handleOpenDialog={handleOpenDialog}
                handleRefresh={handleRefresh}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='pendingList'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='w-full border p-4 rounded-lg'
          >
            <h3 className='bg-primary p-2 text-white rounded-sm'>IN PROGRESS</h3>
            {pendingTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo?.id.toString()} 
                todo={todo}
                todos={pendingTodos}
                setTodos={setPendingTodos}
                handleOpenDialog={handleOpenDialog}
                handleRefresh={handleRefresh}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='completedList'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='w-full border p-4 rounded-lg'
          >
            <h3 className='bg-primary p-2 text-white rounded-sm'>DONE</h3>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo?.id.toString()} 
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                handleOpenDialog={handleOpenDialog}
                handleRefresh={handleRefresh}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
