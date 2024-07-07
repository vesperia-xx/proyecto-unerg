import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "@/hooks/useForm";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import { usePasantiasStore } from "@/hooks/usePasantiasStore";
import { useAuthStore } from "@/hooks/useAuthStore";

const pasantiasFormField = {
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorEmpresarial: '',
    user: '',
};

const PasantiasModal = ({ open, onClose, onRegister }) => {
    const { title, empresa, tutorAcademico, tutorEmpresarial, onInputChange, formState, onResetForm } = useForm(pasantiasFormField);
    const { startCrearPasantia, loading, error } = usePasantiasStore();
    const [openAlert, setOpenAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.uid) {
            formState.user = user.uid; // Actualizamos el campo user directamente en formState
        }
    }, [user, formState]);

    const handleSave = async () => {
        if (!title || !empresa || !tutorAcademico || !tutorEmpresarial) {
            setOpenAlert(true);
            return;
        }

        try {
            await startCrearPasantia(formState);
            setShowConfirmation(true);
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Te has registrado a las pasantias correctamente.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        onRegister();
                        onResetForm();
                        onClose(); // Cierra el modal al confirmar el registro exitoso
                    }
                });
            }, 500);
        } catch {
            // Error handling if needed
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
                    label="Tutor Empresarial"
                    fullWidth
                    name="tutorEmpresarial"
                    value={tutorEmpresarial}
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

export default PasantiasModal;