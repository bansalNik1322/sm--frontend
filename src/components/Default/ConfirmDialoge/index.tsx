'use client';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import ReactDOM from 'react-dom/client';

interface DialogProps {
  open: boolean;
  message: string;
  onClose: (result: boolean) => void;
}

const ConfirmDialoge: FC<DialogProps> = ({ open, message, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          boxShadow: 'none !important', // Remove the default shadow
          padding: '29px 38px 20px',
          backgroundColor: '#282d47',
          borderRadius: '10px',
          maxWidth: '280px',
        },
        '& .MuiDialogTitle-root': {
          backgroundColor: '#282d47',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& .MuiDialogContent-root': {
          backgroundColor: '#282d47',
        },
        '& .MuiDialogActions-root': {
          backgroundColor: '#282d47',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        },
        '& .MuiButton-root': {
          padding: '7px 15px',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <HelpOutlineIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />
        </Box>
        <Typography variant="h6" color={'white'}>
          {message}
        </Typography>
      </DialogTitle>

      <DialogActions>
        <Button variant="contained" color="error" size="small" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={() => onClose(true)} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

let dialogResolve: (value: boolean) => void;

export const showConfirmDialog = (message: string): Promise<boolean> => {
  return new Promise(resolve => {
    dialogResolve = resolve;

    const dialogElement = document.createElement('div');
    const root = ReactDOM.createRoot(dialogElement);

    const closeDialog = (result: boolean) => {
      root.unmount();
      dialogElement.remove();
      dialogResolve(result);
    };

    root.render(<ConfirmDialoge open={true} message={message} onClose={closeDialog} />);

    document.body.appendChild(dialogElement);
  });
};
