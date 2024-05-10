'use client';
import React, { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Sidebar from "@/components/Sidebar";
import ServiceModal from "@/components/ServiceModal";
import PageTemplate from "@/components/PageTemplate";

import RouterLinks from "@/routes/RouterLinks";

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
    { text: 'Mi perfil', icon: <PersonIcon />, route: RouterLinks.student.StudentDashboard },
    { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const user = { name: 'Maria Diaz', avatarUrl: '/perfil.jpg' };

const DashboardStudent = () => {
    const [isPasantiasAccepted, setIsPasantiasAccepted] = useState(true); // Simulación de que las pasantías ya han sido aceptadas
    const [isServiceRegistered, setIsServiceRegistered] = useState(false); // Simulación de que el estudiante aún no está inscrito en el servicio
    const [openServiceModal, setOpenServiceModal] = useState(false);

    const handleOpenServiceModal = () => {
        setOpenServiceModal(true);
    };

    const handleCloseServiceModal = () => {
        setOpenServiceModal(false);
    };

    const handleServiceRegistered = () => {
        setIsServiceRegistered(true);
        handleCloseServiceModal(); // Cerrar el modal después de que el estudiante se registre en el servicio
    };

    return (
        <div>
            <PageTemplate>
                <Sidebar title="Estudiante" links={links}
                    profileName={user.name}
                    profileImage={user.avatarUrl}
                />
                <Grid container spacing={2} className="dashboard-links">
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Pasantias
                                </Typography>
                                {isPasantiasAccepted ? (
                                    <Link href={RouterLinks.student.pasantias.PasantiasDashboard}>
                                        <Button variant="contained" color="primary" fullWidth>
                                            Ir a Pasantías
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant="contained" color="primary" fullWidth disabled>
                                        No disponible
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {isServiceRegistered ? (
                            <Link href={RouterLinks.student.servicio.ServicioDashboard}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Ir a Servicio
                                </Button>
                            </Link>
                        ) : (
                            <CardLink
                                title="Servicio"
                                onClick={handleOpenServiceModal}
                            />
                        )}
                    </Grid>
                </Grid>

                <ServiceModal open={openServiceModal} onClose={handleCloseServiceModal} onRegister={handleServiceRegistered} />
            </PageTemplate>
        </div>
    );
};

const CardLink = ({ title, onClick }) => {
    return (
        <Card>
            <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={onClick}>
                    Comenzar
                </Button>
            </CardContent>
        </Card>
    );
};

export default DashboardStudent;






