import moment from 'moment';
import { Dispatch, SetStateAction, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { deleteTodo } from '../../api/todoTasks/todoApi';
import { TodoType } from '../../types/globalTypes';
import TaskDetailDialog from './TaskDetailDialog';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface PropsType {
  index: number;
  todo: TodoType;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  handleOpenDialog: (task: TodoType | null) => void;
  handleRefresh: () => void;
}

const SingleTodo = ({
  index,
  todo,
  todos,
  setTodos,
  handleOpenDialog,
  handleRefresh,
}: PropsType) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleDelete = async () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    const res = await deleteTodo(todo.id);
    if (res.success) {
      handleRefresh();
    }
    // Close the confirmation dialog after deletion
    setIsConfirmDialogOpen(false);
  };

  const handleEdit = () => {
    handleOpenDialog(todo);
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='bg-blue-100 p-2 my-2 rounded-md'
          >
            <p className='font-bold'>{todo.title}</p>
            <p className='text-[14px] min-h-[50px]'>{todo.description}</p>
            <p className='text-[10px] font-semibold text-[grey]'>
              Created at:{' '}
              <span>
                {moment(todo?.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
              </span>
            </p>
            <div className='text-[white] flex justify-end gap-1 mt-2'>
              <button
                onClick={() => setIsConfirmDialogOpen(true)} // Show confirmation dialog
                className='bg-red-500 text-[10px] h-[22px] rounded-md px-2'
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className='bg-blue-400 text-[10px] h-[22px] rounded-md px-2'
              >
                Edit
              </button>
              <button
                onClick={() => setIsDialogOpen(true)}
                className='bg-blue-600 text-[10px] h-[22px] rounded-md px-2'
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </Draggable>
      
      <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='contained' color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TaskDetailDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        task={todo}
      />
    </>
  );
};

export default SingleTodo;
