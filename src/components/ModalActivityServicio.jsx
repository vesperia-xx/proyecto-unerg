import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

const ModalActivityServicio = ({ open, onClose, onAddActivity, onEditActivity, editedActivity }) => {
  const [activityData, setActivityData] = useState({
    activity: '',
    week: '',
    date: '',
    hours: ''
  });

  useEffect(() => {
    if (editedActivity) {
      setActivityData({
        activity: editedActivity.activity || '',
        week: editedActivity.week || '',
        date: editedActivity.date || '',
        hours: editedActivity.hours || ''
      });
    } else {
      setActivityData({
        activity: '',
        week: '',
        date: '',
        hours: ''
      });
    }
  }, [editedActivity]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = name === 'hours' || name === 'week' ? parseInt(value, 10) : value;
    setActivityData({ ...activityData, [name]: numericValue });
  };

  const handleAction = () => {
    if (activityData.activity && activityData.week && activityData.date && activityData.hours) {
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
            type="number"
            name="week"
            label="Semana"
            variant="outlined"
            value={activityData.week}
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            name="date"
            label="Fecha"
            variant="outlined"
            value={activityData.date}
            InputLabelProps={{ shrink: true }}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" style={{ backgroundColor: '#4079ED', color: '#FFFFFF' }} onClick={handleAction}>
              {editedActivity ? 'Editar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalActivityServicio;