'use client'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
  startDate: '',
  endDate: '',
  hours: ''
};

const ModalActivityPasantias = ({ open, onClose, onAddActivity, onEditActivity, editedActivity }) => {
  const [formState, setFormState] = useState(initialActivityState);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (editedActivity) {
      setFormState(editedActivity);
    } else {
      setFormState(initialActivityState);
    }
  }, [editedActivity]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'hours' && (isNaN(value) || parseFloat(value) < 0)) {
      return;
    }

    let numericValue = value;

    if (name === 'hours') {
      numericValue = parseInt(value, 10);
    }

    if (name === 'startDate') {
      const endDate = new Date(formState.endDate);
      const startDate = new Date(value);

      if (startDate > endDate) {
        setAlertMessage('La fecha de inicio no puede ser posterior a la fecha de fin.');
        return;
      }
    }

    if (name === 'endDate') {
      const startDate = new Date(formState.startDate);
      const endDate = new Date(value);

      if (endDate < startDate) {
        setAlertMessage('La fecha de fin no puede ser anterior a la fecha de inicio.');
        return;
      }
    }

    setFormState({ ...formState, [name]: numericValue });
    setAlertMessage('');
  };

  const handleAction = () => {
    const { activity, startDate, endDate, hours } = formState;

    // Validate all fields are filled
    console.log({ activity, startDate, endDate, hours });
    if (activity && startDate && endDate && hours) {
      if (editedActivity) {
        onEditActivity({ ...editedActivity, ...formState });
      } else {
        onAddActivity({ ...formState, id: Date.now().toString() });
      }
      onClose();
    } else {
      setAlertMessage('Por favor, complete todos los campos.');
    }
  };

  const handleCloseAlert = () => {
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
          {alertMessage && (
            <Alert severity="error" action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
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
            onChange={handleChange}
            required
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="startDate"
            variant="outlined"
            value={formState.startDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            label="Fecha de Inicio"
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="endDate"
            variant="outlined"
            value={formState.endDate}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            label="Fecha de Fin"
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="number"
            name="hours"
            label="Horas"
            variant="outlined"
            value={formState.hours}
            onChange={handleChange}
            required
            inputProps={{ min: "0" }}
          />
          <Button variant="contained" style={{ backgroundColor: '#4079ED', color: '#FFFFFF', marginTop: '10px' }} onClick={handleAction}>
            {editedActivity ? 'Editar' : 'Guardar'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalActivityPasantias;

