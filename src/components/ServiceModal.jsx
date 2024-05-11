import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "@/hooks/useForm";

const serviceFormField = {
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorEmpresarial: '',
}

const ServiceModal = ({ open, onClose }) => {
    const { title, empresa, tutorAcademico, tutorEmpresarial, onInputChange} = useForm(serviceFormField)
    const [formData, setFormData] = useState({
        title: '',
        empresa: '',
        tutorAcademico: '',
        tutorEmpresarial: '',
    });

    const handleSave = () => {
        console.log({ title, empresa, tutorAcademico, tutorEmpresarial});
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: 20 }}>
                <Typography variant="h5" component="h2" gutterBottom style={{ marginBottom: 20, textAlign: 'center' }}>
                    Crear Solicitud de Servicio
                </Typography>
                <TextField
                    label="Título"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    name="empresa"
                    value={empresa}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Tutor Académico"
                    fullWidth
                    name="tutorAcademico"
                    value={tutorAcademico}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="Tutor Empresarial"
                    fullWidth
                    name="tutorEmpresarial"
                    value={tutorEmpresarial}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default ServiceModal;