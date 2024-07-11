'use client';

import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";
import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from "@/hooks/useAuthStore";
import { useServicioStore } from "@/hooks/useServicioStore";

import withAuth from "@/helpers/withAuth";

const links = [
    { text: 'Estudiantes', icon: <PeopleAltIcon />, route: RouterLinks.admin.servicio.ServicioEstudiantes },
    { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const ServicioEstudiantes = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const { user } = useAuthStore();
    const { loading, servicios, getServicios, startCrearServicio } = useServicioStore();

    useEffect(() => {
        getServicios();
    }, );

    const handleContextMenu = (event, id) => {
        event.preventDefault();
        setSelectedRequestId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const acceptRequest = () => {
        handleCloseMenu();
        alert('Ha aceptado al alumno.');
    };

    const rejectRequest = () => {
        handleCloseMenu();
        alert('Ha rechazado al alumno.');
    };

    return (
        <PageTemplate>
            <Sidebar
                title="Admin Servicio"
                links={links}
                profileName={`${user.name} ${user.lastName}`}
                profileImage={user.avatarUrl || "/perfil.jpg"}
            />

            <TableStyled hover>
                <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Nombre y Apellido</TableCell>
                            <TableCell>Cédula</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Tutor Académico</TableCell>
                            <TableCell>Tutor Comunitario</TableCell>
                            <TableCell>Estatus</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servicios.map((request, index) => (
                            <TableRow key={request._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{`${request.user.name} ${request.user.lastname}`}</TableCell>
                                <TableCell>{request.user.CI}</TableCell>
                                <TableCell>{request.user.phoneNumber}</TableCell>
                                <TableCell>{request.title}</TableCell>
                                <TableCell>{request.empresa}</TableCell>
                                <TableCell>{request.tutorAcademico}</TableCell>
                                <TableCell>{request.tutorComunitario}</TableCell>
                                <TableCell>{request.estatus}</TableCell>
                                <TableCell onContextMenu={(e) => handleContextMenu(e, request._id)}>
                                    <MoreVertIcon />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedRequestId === request._id}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={acceptRequest} style={{ color: '#4079ED' }}>Aceptar</MenuItem>
                                        <MenuItem onClick={rejectRequest} style={{ color: '#EB5757' }}>Rechazar</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableStyled>
        </PageTemplate>
    );
};

export default withAuth(ServicioEstudiantes, ['AdminServicio']);
