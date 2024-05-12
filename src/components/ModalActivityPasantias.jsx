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

const ModalActivityPasantias = ({ open, onClose, onAddActivity, onEditActivity, editedActivity }) => {
  const [activityData, setActivityData] = useState({
    activity: '',
    startDate: '',
    endDate: '',
    hours: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (editedActivity) {
      setActivityData({
        activity: editedActivity.activity || '',
        startDate: editedActivity.startDate || '',
        endDate: editedActivity.endDate || '',
        hours: editedActivity.hours || ''
      });
    } else {
      setActivityData({
        activity: '',
        startDate: '',
        endDate: '',
        hours: ''
      });
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
      const endDate = new Date(activityData.endDate);
      const startDate = new Date(value);

      if (startDate > endDate) {
        setAlertMessage('La fecha de inicio no puede ser posterior a la fecha de fin.');
        return;
      }
    }

    if (name === 'endDate') {
      const startDate = new Date(activityData.startDate);
      const endDate = new Date(value);

      if (endDate < startDate) {
        setAlertMessage('La fecha de fin no puede ser anterior a la fecha de inicio.');
        return;
      }
    }

    setActivityData({ ...activityData, [name]: numericValue });
    setAlertMessage(null); 
  };

  const handleAction = () => {
    if (activityData.activity && activityData.startDate && activityData.endDate && activityData.hours) {
      if (editedActivity) {
        onEditActivity({ ...editedActivity, ...activityData });
      } else {
        onAddActivity({ ...activityData, id: Date.now().toString() });
      }
      onClose();
    } else {
      setAlertMessage('Por favor, complete todos los campos.');
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
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
            value={activityData.activity}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="startDate"
            variant="outlined"
            value={activityData.startDate}
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
            value={activityData.endDate}
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
            value={activityData.hours}
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

