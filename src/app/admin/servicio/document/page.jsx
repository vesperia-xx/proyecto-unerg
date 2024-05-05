'use client'

import React, { useState } from "react";

import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

import TableStyled from "@/components/TableStyled";
import PageTemplate from "@/components/PageTemplate";
import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
  { text: 'Estudiantes', icon: <PeopleAltIcon />, route: RouterLinks.admin.servicio.ServicioEstudiantes },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.admin.servicio.ServcioDocsAdd },
  { text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const ServicioDocsAdd = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    let newDocuments = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newDocuments.push({ id: uploadedDocuments.length + 1, name: file.name });
    }
    setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
  };

  const handleDeleteDocument = (id) => {
    const updatedDocuments = uploadedDocuments.filter(doc => doc.id !== id);
    setUploadedDocuments(updatedDocuments);
  };

  return (
    <PageTemplate>
      <Sidebar title="Admin Servicio" links={links} />
      <div style={{ padding: '20px' }}>
        <input
          accept=".pdf"
          style={{ display: 'none' }}
          id="upload-button"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-button">
          <Button color="primary" variant="contained" component="span" startIcon={<CloudUploadIcon />}>
            Subir Documentos
          </Button>
        </label>
      </div>
      <TableStyled>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedDocuments.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ color: '#EB5757' }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default ServicioDocsAdd;