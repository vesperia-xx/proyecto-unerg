'use client';
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";
import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from "@/hooks/useAuthStore";
// Importa solo el hook necesario para obtener datos
import { usePasantiasStore } from "@/hooks/usePasantiasStore";

import withAuth from "@/helpers/withAuth";

const links = [
  { text: 'Estudiantes', icon: <PeopleAltIcon />, route: RouterLinks.admin.pasantias.PasantiasEstudiantes },
  { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const PasantiasEstudiantes = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const { user } = useAuthStore();
  const { pasantias, getPasantias } = usePasantiasStore();

  useEffect(() => {
    // Simulación de obtener las pasantías sin hacer una llamada a la API
    const fetchPasantias = async () => {
      await getPasantias();  // Llama al hook para obtener datos
    };
    fetchPasantias();
  }, [getPasantias]);

  const handleContextMenu = (event, requestId) => {
    event.preventDefault();
    setSelectedRequestId(requestId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAcceptRequest = () => {
    if (selectedRequestId) {
      // Simular aceptación de la solicitud actualizando el estado local
      const updatedPasantias = pasantias.map(pasantia =>
        pasantia._id === selectedRequestId ? { ...pasantia, status: 'Aceptada' } : pasantia
      );
      // Aquí puedes simular una actualización, en un caso real deberías hacer una llamada a la API
      console.log("Solicitud aceptada:", updatedPasantias);
      // Actualiza la vista con las solicitudes simuladas
      getPasantias(); // Simulación de actualización de datos
      handleCloseMenu();
      alert('Solicitud aceptada.');
    }
  };

  const handleRejectRequest = () => {
    if (selectedRequestId) {
      // Simular rechazo de la solicitud eliminando el usuario de la vista
      const updatedPasantias = pasantias.filter(pasantia => pasantia._id !== selectedRequestId);
      // Aquí puedes simular una eliminación, en un caso real deberías hacer una llamada a la API
      console.log("Solicitud rechazada:", updatedPasantias);
      // Actualiza la vista con las solicitudes simuladas
      getPasantias(); // Simulación de actualización de datos
      handleCloseMenu();
      alert('Solicitud rechazada.');
    }
  };

  return (
    <PageTemplate>
      <Sidebar 
        title="Admin Pasantias" 
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
              <TableCell>Tutor Empresarial</TableCell>
              <TableCell>Estatus</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pasantias.map((pasantia, index) => {
              const { user, title, empresa, tutorPasantias, tutorEmpresarial, status } = pasantia;
              if (!user) {
                return (
                  <TableRow key={pasantia._id}>
                    <TableCell colSpan={10}>Datos del usuario no disponibles</TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow key={pasantia._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
                  <TableCell>{user.CI}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{empresa}</TableCell>
                  <TableCell>{tutorPasantias}</TableCell>
                  <TableCell>{tutorEmpresarial}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>
                    <MoreVertIcon
                      onClick={(e) => handleContextMenu(e, pasantia._id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedRequestId === pasantia._id)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          marginTop: '45px', // Ajusta el margen si es necesario
                          marginLeft: '10px',
                        },
                      }}
                    >
                      <MenuItem onClick={handleAcceptRequest} style={{ color: '#4079ED' }}>Aceptar</MenuItem>
                      <MenuItem onClick={handleRejectRequest} style={{ color: '#EB5757' }}>Rechazar</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default withAuth(PasantiasEstudiantes, ['AdminPasantias']);




