import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

export default function BasicModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Editar Estudiante</Typography>
          <form>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Nombre"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Apellido"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="CI"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Email"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="number"
              label="Telefono"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="titulo"
              variant="outlined"
            />
            <br />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Empresa"
              variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary">
              save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
