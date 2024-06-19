import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "@/hooks/useForm";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";

const serviceFormField = {
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorComunitario: '',
}

const ServiceModal = ({ open, onClose, onRegister }) => {
    const { title, empresa, tutorAcademico, tutorComunitario, onInputChange } = useForm(serviceFormField);
    const [openAlert, setOpenAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSave = () => {
        if (!title || !empresa || !tutorAcademico || !tutorComunitario) {
            setOpenAlert(true);
            return;
        }

        console.log({ title, empresa, tutorAcademico, tutorComunitario });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Te has registrado en el servicio comunitario correctamente.',
            }).then((result) => {
                if (result.isConfirmed) {
                    onRegister();
                    onClose();
                }
            });
        }, 500);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: 20 }}>

                {openAlert && (
                    <Alert severity="error" onClose={() => setOpenAlert(false)}>
                        Por favor, complete todos los campos.
                    </Alert>
                )}

                {showConfirmation && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <CheckCircleIcon style={{ color: 'green', marginRight: 10 }} />
                        <Typography variant="body1" style={{ color: 'green' }}>
                            Guardado exitoso
                        </Typography>
                    </div>
                )}

                <TextField
                    label="Título"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                    required
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    name="empresa"
                    value={empresa}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                    required
                />
                <TextField
                    label="Tutor Académico"
                    fullWidth
                    name="tutorAcademico"
                    value={tutorAcademico}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                    required
                />
                <TextField
                    label="Tutor Comunitario"
                    fullWidth
                    name="tutorComunitario"
                    value={tutorComunitario}
                    onChange={onInputChange}
                    style={{ marginBottom: 20 }}
                    required
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
};

export default ServiceModal;