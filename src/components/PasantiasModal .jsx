import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PasantiasModal = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        empresa: '',
        tutorPasantias: '',
        tutorEmpresarial: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {

        console.log(formData);
       
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: 20 }}>
                <Typography variant="h5" component="h2" gutterBottom style={{ marginBottom: 20, textAlign: 'center' }}>
                    Crear Solicitud de Pasantías
                </Typography>
                <TextField
                    label="Título"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Tutor de Pasantías"
                    fullWidth
                    name="tutorPasantias"
                    value={formData.tutorPasantias}
                    onChange={handleInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Tutor Empresarial"
                    fullWidth
                    name="tutorEmpresarial"
                    value={formData.tutorEmpresarial}
                    onChange={handleInputChange}
                    style={{ marginBottom: 20 }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default PasantiasModal;