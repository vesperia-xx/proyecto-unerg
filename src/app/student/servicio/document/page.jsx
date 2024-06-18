'use client';
import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';

import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableStyled from '@/components/TableStyled';

import Sidebar from '@/components/Sidebar';
import RouterLinks from '@/routes/RouterLinks';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.servicio.ServicioDashboard },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.servicio.ServicioDocument },
  { text: 'Salir', icon: <LogoutIcon />, route: RouterLinks.student.StudentDashboard },
];

const user = { name: 'Maria Diaz', avatarUrl: '/perfil.jpg' };

const documentServicio = [
  { id: 1, name: 'CONSTANCIA APROBACIÓN TALLER SERVICIO COMUNITARIO', url: '/pdf/ConstanciaAprobacion.pdf' },
  { id: 2, name: 'REGISTRO DE ACTIVIDADES, SEGUIMIENTO Y CONTROL DE ASISTENCIA', url: '/pdf/RegistroActividades.pdf' },
  { id: 3, name: 'ADSCRIPCIÓN AL ESTUDIANTE AL SERVICIO COMUNITARIO', url: '/pdf/AdscripcionEstudiante.pdf' },
];

 const ServicioDocument = () => {
    // Función para manejar la descarga 
    const handleDownloadPDF = (url) => {
      // lógica para descargar 
      window.open(url, '_blank');
    };

  return (
    <PageTemplate>
      <Sidebar
        title="Documentos"
        links={links}
        profileName={user.name}
        profileImage={user.avatarUrl}
      />
      <TableStyled hover>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell align="center">Descargar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentServicio.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell align="center">

                <IconButton
                    onClick={() => handleDownloadPDF(doc.url)}
                    aria-label="download PDF"
                    sx={{ color: '#444A6D' }}
                  >
                    <GetAppIcon />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default ServicioDocument;



