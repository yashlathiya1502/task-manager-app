import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { TodoType } from '../../types/globalTypes';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  task?: TodoType | null;
}

const TaskDetailDialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  task
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <DialogTitle>{'Task Details'}</DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          sx={{ py: 2, minHeight: '400px' }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', color: 'black' }}
          >{`Title: ${task?.title}`}</Typography>
          <Typography
            variant='body2'
            sx={{ color: 'grey' }}
          >{`Description: ${task?.description}`}</Typography>
          <Typography
            variant='caption'
            sx={{ color: '#A9A9A9' }}
          >{`Created at: ${moment(task?.createdAt).format(
            'DD/MM/YYYY, HH:mm:ss'
          )}`}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant='contained'
          color='primary'
          style={{ textTransform: 'none' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailDialog;
