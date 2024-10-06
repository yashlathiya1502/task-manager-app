import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TodoList from '../../components/todos/TodoList';
import {
  IncomingTodoType,
  TodoType
} from '../../types/globalTypes';
import AddEditTaskDialog from '../../components/todos/AddEditTaskDialog';
import { fetchAllTodos, updateTodoStatus } from '../../api/todoTasks/todoApi';

const TaskManager = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [pendingTodos, setPendingTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TodoType | null>(null);

  const onDragEnd = async (result: DropResult) => {
    // Check if there is a destination
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // Handle dragging within the same list
    if (source.droppableId === destination.droppableId) {
      let items: TodoType[];

    if (source.droppableId === 'todosList') {
      items = Array.from(todos);
    } else if (source.droppableId === 'pendingList') {
      items = Array.from(pendingTodos);
    } else {
      items = Array.from(completedTodos);
    }

    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    if (source.droppableId === 'todosList') {
      setTodos(items);
    } else if (source.droppableId === 'pendingList') {
      setPendingTodos(items);
    } else {
      setCompletedTodos(items);
    }
    } else {
      // Handle moving items between different lists
      let sourceList, destinationList, setSourceList, setDestinationList;
      let newStatus;
  
      if (source.droppableId === 'todosList') {
        sourceList = todos;
        setSourceList = setTodos;
        newStatus = 'TODO';
      } else if (source.droppableId === 'pendingList') {
        sourceList = pendingTodos;
        setSourceList = setPendingTodos;
        newStatus = 'INPROGRESS';
      } else {
        sourceList = completedTodos;
        setSourceList = setCompletedTodos;
        newStatus = 'DONE';
      }
  
      if (destination.droppableId === 'todosList') {
        destinationList = todos;
        setDestinationList = setTodos;
        newStatus = 'TODO';
      } else if (destination.droppableId === 'pendingList') {
        destinationList = pendingTodos;
        setDestinationList = setPendingTodos;
        newStatus = 'INPROGRESS';
      } else {
        destinationList = completedTodos;
        setDestinationList = setCompletedTodos;
        newStatus = 'DONE';
      }
  
      const newSourceList = Array.from(sourceList);
      const newDestinationList = Array.from(destinationList);
  
      const [movedItem] = newSourceList.splice(source.index, 1);
      newDestinationList.splice(destination.index, 0, movedItem);
  
      setSourceList(newSourceList);
      setDestinationList(newDestinationList);
  
      movedItem.status = newStatus;
  
      try {
        const res = await updateTodoStatus(movedItem.id, newStatus);
        if(res.success){
          // getAllTodos()
        }
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
    }
  };

  const handleOpenDialog = (task: TodoType | null = null) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const getAllTodos = async () => {
    try {
      const res = await fetchAllTodos();
      if (res.success) {
        if (res?.data?.length > 0) {
          const resData = res.data;
          const formattedData = resData.map((task: IncomingTodoType) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
          }));
          const todosData = formattedData.filter(
            (task: TodoType) => task.status === 'TODO'
          );
          const inProgressData = formattedData.filter(
            (task: TodoType) => task.status === 'INPROGRESS'
          );
          const completedData = formattedData.filter(
            (task: TodoType) => task.status === 'DONE'
          );
          setTodos(todosData);
          setPendingTodos(inProgressData);
          setCompletedTodos(completedData);
        }else{
          setTodos([]);
          setPendingTodos([]);
          setCompletedTodos([]);
        }
      } else {
        setTodos([]);
        setPendingTodos([]);
        setCompletedTodos([]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className='px-4 max-w-[1200px] m-auto mt-20'>
      <div className='mb-5'>
        <button
          className='bg-primary text-white w-[150px] h-[30px] rounded-md '
          onClick={() => handleOpenDialog()}
        >
          Add task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          pendingTodos={pendingTodos}
          setPendingTodos={setPendingTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          handleOpenDialog={handleOpenDialog}
          handleRefresh={getAllTodos}
        />
      </DragDropContext>
      <AddEditTaskDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        task={selectedTask}
        handleRefresh={getAllTodos}
      />
    </div>
  );
};

export default TaskManager;
