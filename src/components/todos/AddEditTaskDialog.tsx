import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { AddTodoType } from '../../types/globalTypes';
import { createTodo, updateTodo } from '../../api/todoTasks/todoApi';

interface AddEditTaskDialogProps {
  open: boolean;
  handleClose: () => void;
  task?: AddTodoType | null;
  handleRefresh: () => void;
}

const AddEditTaskDialog: React.FC<AddEditTaskDialogProps> = ({
  open,
  handleClose,
  task,
  handleRefresh
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task]);

  const validate = () => {
    let tempErrors: { title?: string; description?: string } = {};

    if (!title) tempErrors.title = 'Title is required';
    if (!description) tempErrors.description = 'Description is required';

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);

      try {
        if (task?.id) {
          const res = await updateTodo(task.id, {
            title,
            description,
            status: task.status
          });
          if (res.success) {
            handleRefresh();
          }
        } else {
          const res = await createTodo({ title, description, status: 'TODO' });
          if (res.success) {
            handleRefresh();
          }
        }
        handleClose();
        resetFields();
      } finally {
        setLoading(false);
      }
    }
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const handleDialogClose = () => {
    resetFields(); 
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth='xs'>
      <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column' gap={2} sx={{py:2, minHeight: '400px'}} >
          <TextField
            label='Title'
            value={title}
            onChange={(e) => {setTitle(e.target.value); setErrors((pre) => ({...pre,title :''}))}}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <TextField
            label='Description'
            value={description}
            onChange={(e) => {setDescription(e.target.value); setErrors((pre) => ({...pre,description :''}))}}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='success'
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          style={{textTransform: 'none'}}
        >
          {loading ? '' : task ? 'Save' : 'Save'}
        </Button>
        <Button onClick={handleClose} variant='contained' color='error' style={{textTransform: 'none'}}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTaskDialog;
