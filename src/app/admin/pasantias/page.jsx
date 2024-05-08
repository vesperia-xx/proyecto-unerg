'use client';
import React, { useState } from "react";
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";
import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
  { text: 'Estudiantes', icon: <PeopleAltIcon />, route: RouterLinks.admin.pasantias.PasantiasEstudiantes },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.admin.pasantias.PasantiasDocsAdd},
  { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const user = { name: 'Admin', avatarUrl: '/admin.png' };

const PasantiasEstudiantes = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [inscriptionRequests, setInscriptionRequests] = useState([
    {
      _id: '1',
      studentData_id: '2',
      type: 'Pasantías',
      isAccepted: false
    },
    // Más solicitudes de muestra pueden agregarse aquí
  ]);

  const studentData = {
    id: 1,
    name: 'Ricardo',
    lastname: 'Aguilera',
    ci: '12896748',
    phoneNumber: '123-456-7890',
    email: 'ricardo@example.com'
  };

  const pasantiasData = {
    title: 'Título 1',
    empresa: 'Empresa A',
    tutorPasantias: 'Profesor X',
    tutorEmpresarial: 'Ana',
    hour: '4',
    status: 'en progreso'
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
    setInscriptionRequests(prevRequests =>
      prevRequests.map(request =>
        request._id === selectedRequestId ? { ...request, isAccepted: true } : request
      )
    );
    handleCloseMenu();
    alert('Ha aceptado al alumno.');
  };

  const rejectRequest = () => {
    setInscriptionRequests(prevRequests =>
      prevRequests.filter(request => request._id !== selectedRequestId)
    );
    handleCloseMenu();
    alert('Ha rechazado al alumno.');
  };

  return (
    <PageTemplate>
      <Sidebar title="Admin Pasantias" links={links} 
         profileName={user.name}
         profileImage={user.avatarUrl}
      />

      <TableStyled hover>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre y Apellido</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Tutor Académico</TableCell>
              <TableCell>Tutor Empresarial</TableCell>
              <TableCell>Horas cumplidas</TableCell>
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
                <TableCell>{studentData.email}</TableCell>
                <TableCell>{studentData.phoneNumber}</TableCell>
                <TableCell>{pasantiasData.title}</TableCell>
                <TableCell>{pasantiasData.empresa}</TableCell>
                <TableCell>{pasantiasData.tutorPasantias}</TableCell>
                <TableCell>{pasantiasData.tutorEmpresarial}</TableCell>
                <TableCell>{pasantiasData.hour}</TableCell>
                <TableCell>{pasantiasData.status}</TableCell>
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

export default PasantiasEstudiantes;