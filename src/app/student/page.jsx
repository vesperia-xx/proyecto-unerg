'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useAuthStore } from "@/hooks/useAuthStore";
import Sidebar from "@/components/Sidebar";
import ServiceModal from "@/components/ServiceModal";
import PageTemplate from "@/components/PageTemplate";
import RouterLinks from "@/routes/RouterLinks";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
import withAuth from "@/helpers/withAuth";
import { usePasantiasStore } from "@/hooks/usePasantiasStore";
import PasantiasModal from "@/components/PasantiasModal ";


const links = [
    { text: 'Mi perfil', icon: <PersonIcon />, route: RouterLinks.student.StudentDashboard },
    { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const DashboardStudent = () => {
    const { user, startLogout } = useAuthStore();
    const { getPasantias, pasantias } = usePasantiasStore();

    const [isServiceRegistered, setIsServiceRegistered] = useState(false);
    const [isPasantiasRegistered, setIsPasantiasRegistered] = useState(false);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [openPasantiasModal, setOpenPasantiasModal] = useState(false);

    // Estado local para manejar la carga de datos
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const checkPasantiasRegistration = async () => {
            await getPasantias();
            setDataLoaded(true); // Marcar como cargado después de obtener los datos
        };

        if (!dataLoaded) {
            checkPasantiasRegistration();
        }
    }, [dataLoaded, getPasantias]);

    useEffect(() => {
        if (dataLoaded && pasantias?.length > 0) {
            if (pasantias.some(pasantia => pasantia.user === user.uid)) {
                setIsPasantiasRegistered(true);
            }
        }
    }, [dataLoaded, pasantias, user.uid]);

    const handleOpenServiceModal = () => {
        setOpenServiceModal(true);
    };

    const handleCloseServiceModal = () => {
        setOpenServiceModal(false);
    };

    const handleOpenPasantiasModal = () => {
        setOpenPasantiasModal(true);
    };

    const handleClosePasantiasModal = () => {
        setOpenPasantiasModal(false);
    };

    const handleServiceRegistered = () => {
        setIsServiceRegistered(true);
        handleCloseServiceModal();
    };

    const handlePasantiasRegistered = () => {
        setIsPasantiasRegistered(true); // Marca que las pasantías están registradas
        setOpenPasantiasModal(false); // Cierra el modal de pasantías
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
        <div>
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
                />
            </PageTemplate>
        </div>
    );
};

export default withAuth(DashboardStudent, ['User']);