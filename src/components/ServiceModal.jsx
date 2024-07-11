'use client'
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "@/hooks/useForm";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import { useServicioStore } from "@/hooks/useServicioStore";
import { useAuthStore } from "@/hooks/useAuthStore";

const serviceFormField = {
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorComunitario: '',
    user: '',
}

const ServiceModal = ({ open, onClose, onRegister }) => {
    const { title, empresa, tutorAcademico, tutorComunitario, onInputChange, formState, setFormState, onResetForm } = useForm(serviceFormField);
    const { startCrearServicio, error } = useServicioStore();
    const [openAlert, setOpenAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.uid) {
            setFormState(prevState => ({
                ...prevState,
                user: user.uid
            }));
        }
    }, [user, setFormState]);
    
    const handleSave = async () => {
        if (!title || !empresa || !tutorAcademico || !tutorComunitario) {
            setOpenAlert(true);
            return;
        }

        try {
            await startCrearServicio(formState);
            setShowConfirmation(true);
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Te has registrado al servicio correctamente.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        onRegister();
                        onResetForm();
                        onClose(); // 
                    }
                });
            }, 500);
        } catch (error) {
            console.error('Error al crear el servicio:', error);
        }
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
                {error && <Alert severity="error" style={{ marginTop: 20 }}>{error}</Alert>}
            </div>
        </Modal>
    );
};

export default ServiceModal;
