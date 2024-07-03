'use client';
import React, { useState } from "react";
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";
import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthStore } from "@/hooks/useAuthStore";

import withAuth from "@/helpers/withAuth";

// Importar aquí la lógica para interactuar con la tabla InscriptionRequest según tu entorno y herramientas (por ejemplo, Axios, GraphQL, etc.)

const links = [
    { text: 'Estudiantes', icon: <PeopleAltIcon />, route: RouterLinks.admin.servicio.ServicioEstudiantes },
    { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const user = { name: 'Admin', avatarUrl: '/admin.png' };

const ServicioEstudiantes = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [inscriptionRequests, setInscriptionRequests] = useState([
        {
            _id: '1',
            studentData_id: '2',
            type: 'Servicio',
            isAccepted: false
        },
        // Más solicitudes de muestra pueden agregarse aquí
    ]);

    const studentData = {
        name: 'nico',
        lastname: 'sterling',
        ci: '13133033',
        phoneNumber: '04140416579',
        email: 'maria@email',
    };

    const studentServicio = {
        title: 'proyecto bigchungo',
        empresa: 'FUPAGUA',
        tutorAcademico: 'Adriana Roa',
        tutorComunitario: 'Melissa Farfan',
        hour: 0,
        estatus: 'Pendiente'
    };

    const handleContextMenu = (event, id) => {
        event.preventDefault();
        setSelectedRequestId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const acceptRequest = () => {
        // Lógica para marcar la solicitud como aceptada en la tabla InscriptionRequest
        // Actualizar el estado según sea necesario
        handleCloseMenu();
        alert('Ha aceptado al alumno.');
    };

    const rejectRequest = () => {
        // Filtrar las solicitudes para mantener solo aquellas cuyo ID no coincida con el ID de la solicitud seleccionada
        const updatedRequests = inscriptionRequests.filter(request => request._id !== selectedRequestId);
        // Actualizar el estado con las solicitudes filtradas
        setInscriptionRequests(updatedRequests);
        handleCloseMenu();
        alert('Ha rechazado al alumno.');
    };

    
  const { user } = useAuthStore();

    return (
        <PageTemplate>

            <Sidebar title="Admin Servicio" links={links} 
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
                        {inscriptionRequests.map((request, index) => (
                            <TableRow key={request._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{`${studentData.name} ${studentData.lastname}`}</TableCell>
                                <TableCell>{studentData.ci}</TableCell>
                                <TableCell>{studentData.phoneNumber}</TableCell>
                                <TableCell>{studentServicio.title}</TableCell>
                                <TableCell>{studentServicio.empresa}</TableCell>
                                <TableCell>{studentServicio.tutorAcademico}</TableCell>
                                <TableCell>{studentServicio.tutorComunitario}</TableCell>
                                <TableCell>{studentServicio.estatus}</TableCell>
                                <TableCell onContextMenu={(e) => handleContextMenu(e, request._id)}>
                                    <MoreVertIcon />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
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

export default withAuth (ServicioEstudiantes,['AdminServicio']);