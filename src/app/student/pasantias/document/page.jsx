'use client';
import React from "react";
import PageTemplate from "@/components/PageTemplate";

import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableStyled from "@/components/TableStyled";

import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from '@mui/icons-material/Logout';

const user = { name: 'Maria Diaz', avatarUrl: '/perfil.jpg' };

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.pasantias.PasantiasDashboard },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.pasantias.PasantiasDocument },
  { text: 'Salir', icon: <LogoutIcon />, route: RouterLinks.student.StudentDashboard },
];

const documentPasantias = [
  { id: 1, name: 'Documento 1', url: '/path/to/document1.pdf' },
  { id: 2, name: 'Documento 2', url: '/path/to/document2.pdf' },
  { id: 3, name: 'Documento 3', url: '/path/to/document3.pdf' },
];

const pasantiasDocument = () => {
  // Función para manejar la descarga 
  const handleDownloadPDF = (url) => {
    // lógica para descargar 
    window.open(url, '_blank');
  };

  return (
    <PageTemplate>
      <Sidebar title="Documentos" links={links}
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
            {documentPasantias.map((doc, index) => (
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

export default pasantiasDocument;