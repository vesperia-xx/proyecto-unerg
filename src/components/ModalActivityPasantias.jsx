import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalActivityPasantias = ({ open, onClose, onAddActivity, onEditActivity, editedActivity }) => {
  const [activityData, setActivityData] = useState({
    activity: '',
    startDate: '',
    endDate: '',
    hours: ''
  });

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
    const numericValue = name === 'hours' && !isNaN(value) ? parseInt(value, 10) : value;
    setActivityData({ ...activityData, [name]: numericValue });
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
      alert('Por favor complete todos los campos.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
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
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="startDate"
            label="Fecha de Inicio"
            variant="outlined"
            value={activityData.startDate}
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="endDate"
            label="Fecha de Fin"
            variant="outlined"
            value={activityData.endDate}
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="number"
            name="hours"
            label="Horas"
            variant="outlined"
            value={activityData.hours}
            onChange={handleChange}
            required
          />
          <br />
          <Button variant="contained" color="primary" onClick={handleAction}>
            {editedActivity ? 'Editar' : 'Guardar'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalActivityPasantias;