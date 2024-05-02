import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const BasicModal = ({ open, onClose, onAddActivity }) => {
  const [activityData, setActivityData] = useState({
    activity: '',
    startDate: '',
    endDate: '',
    hours: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleAddActivity = () => {
    onAddActivity(activityData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5">Agregar nueva actividad</Typography>
        <form>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            name="activity"
            label="Actividad"
            variant="outlined"
            value={activityData.activity}
            onChange={handleChange}
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
          />
          <br />
          <Button variant="contained" color="primary" onClick={handleAddActivity}>
            Guardar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default BasicModal;