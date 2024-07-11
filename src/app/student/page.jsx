'use client';
import React, { useState, useEffect } from "react";
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
import Swal from "sweetalert2";
import withAuth from "@/helpers/withAuth";

import { usePasantiasStore } from "@/hooks/usePasantiasStore";
import { useAuthStore } from "@/hooks/useAuthStore";
import PasantiasModal from "@/components/PasantiasModal ";
import { useServicioStore } from "@/hooks/useServicioStore";

const links = [
    { text: 'Mi perfil', icon: <PersonIcon />, route: RouterLinks.student.StudentDashboard },
    { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const DashboardStudent = () => {
    const { user, startLogout } = useAuthStore();
    const {getPasantias, pasantias} = usePasantiasStore();  
    const {getServicio, servicio} = useServicioStore();
    const [isServiceRegistered, setIsServiceRegistered] = useState(false);
    const [isPasantiasRegistered, setIsPasantiasRegistered] = useState(false);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [openPasantiasModal, setOpenPasantiasModal] = useState(false);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const checkRegistrations = async () => {
            try {
                await getPasantias();
                await getServicio(); 
                setDataLoaded(true);  
            } catch (error) {
                console.error('Error fetching data:', error);
                setDataLoaded(true);  
            }
        };

        if (!dataLoaded) {
            checkRegistrations();
        }
    }, [dataLoaded, getPasantias, getServicio]);

    useEffect(() => {
        if (dataLoaded && pasantias?.length > 0) {
            if (pasantias.some(pasantia => pasantia.user === user.uid)) {
                setIsPasantiasRegistered(true);
            }
        }
    }, [dataLoaded, pasantias, user.uid]);

    useEffect(() => {
        if (dataLoaded && servicio?.user === user.uid) {  
            setIsServiceRegistered(true);
        }
    }, [dataLoaded, servicio, user.uid]);

    // Funciones de manejo de modales
    const handleOpenServiceModal = () => setOpenServiceModal(true);
    const handleCloseServiceModal = () => setOpenServiceModal(false);
    const handleOpenPasantiasModal = () => setOpenPasantiasModal(true);
    const handleClosePasantiasModal = () => setOpenPasantiasModal(false);

    const handleServiceRegistered = () => {
        setIsServiceRegistered(true);
        handleCloseServiceModal();
    };

    const handlePasantiasRegistered = () => {
        setIsPasantiasRegistered(true); 
        handleClosePasantiasModal();
    };

    const handleFailedRegistration = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Ocurrió un error al intentar registrarte. Por favor, inténtalo nuevamente.',
        });
    };

    const handleLogout = () => {
        startLogout();
    };

    return (
        <PageTemplate>
            <Sidebar
                title="Estudiante"
                links={links}
                profileName={`${user.name} ${user.lastName}`}
                handleLogout={handleLogout}
                profileImage={user.avatarUrl || "/perfil.jpg"}
            />
            <Grid container spacing={2} className="dashboard-links">
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Pasantias
                            </Typography>
                            {isPasantiasRegistered ? (
                                <Link href={RouterLinks.student.pasantias.PasantiasDashboard}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Ir a Pasantias
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="contained" color="primary" fullWidth onClick={handleOpenPasantiasModal}>
                                    Comenzar
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Servicio Comunitario
                            </Typography>
                            {isServiceRegistered ? (
                                <Link href={RouterLinks.student.servicio.ServicioDashboard}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Ir a Servicio
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="contained" color="primary" fullWidth onClick={handleOpenServiceModal}>
                                    Comenzar
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <ServiceModal
                open={openServiceModal}
                onClose={handleCloseServiceModal}
                onRegister={handleServiceRegistered}
                onError={handleFailedRegistration}
            />
            <PasantiasModal
                open={openPasantiasModal}
                onClose={handleClosePasantiasModal}
                onRegister={handlePasantiasRegistered}
                onError={handleFailedRegistration}
            />
        </PageTemplate>
    );
};

export default withAuth(DashboardStudent, ['User']);