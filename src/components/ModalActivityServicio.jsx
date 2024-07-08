'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useForm } from "@/hooks/useForm";

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  transition: 'transform 0.3s ease-in-out',
};

const initialActivityState = {
  activity: '',
  week: '',
  date: '',
  hours: ''
};

const ModalActivityServicio = ({ open, onClose, onAddActivity, onEditActivity, editedActivity }) => {
  const [formState, setFormState] = useState(initialActivityState);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (editedActivity) {
      setFormState(editedActivity);
    } else {
      setFormState(initialActivityState);
    }
  }, [editedActivity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = () => {
    const { activity, week, date, hours } = formState;
    if (!activity || !week || !date || !hours) {
      setAlertMessage('Por favor, complete todos los campos.');
      setOpenAlert(true);
      return;
    }

    console.log({ activity, week, date, hours });
 

    if (editedActivity) {
      onEditActivity({ ...formState, id: editedActivity.id });
    } else {
      onAddActivity({ ...formState, id: Date.now().toString() });
    }

    onClose();
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setAlertMessage('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {openAlert && (
            <Alert severity="error" onClose={handleCloseAlert} style={{ width: '100%', marginTop: '10px' }}>
              {alertMessage}
            </Alert>
          )}

          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            name="activity"
            label="Actividad"
            variant="outlined"
            value={formState.activity}
            onChange={handleInputChange}
            required
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="number"
            name="week"
            label="Semana"
            variant="outlined"
            value={formState.week}
            onChange={handleInputChange}
            required
            inputProps={{ min: "0" }}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="date"
            label="Fecha"
            variant="outlined"
            value={formState.date}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            required
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="number"
            name="hours"
            label="Horas"
            variant="outlined"
            value={formState.hours}
            onChange={handleInputChange}
            required
            inputProps={{ min: "0" }}
          />

          <Button
            variant="contained"
            style={{ backgroundColor: '#4079ED', color: '#FFFFFF', marginTop: '10px' }}
            onClick={handleSave}
          >
            {editedActivity ? 'Editar' : 'Guardar'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalActivityServicio;

