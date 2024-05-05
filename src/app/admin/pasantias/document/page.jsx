'use client'
import React, { useState } from "react";
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import TableStyled from "@/components/TableStyled";
import PageTemplate from "@/components/PageTemplate";
import HomeIcon from '@mui/icons-material/Home';
import UsersIcon from '@mui/icons-material/People';

const PasantiasDocsAdd = () => {
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

  const leftPanelLinks = [
    {
      title: 'Dashboard',
      links: [
        { title: 'Home', url: '/home', icon: <HomeIcon /> },
      ],
    },
    {
      title: 'Admin',
      links: [
        { title: 'Users', url: '/admin/users', icon: <UsersIcon /> },
      ],
    },
  ];

  return (
    <PageTemplate>
      
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

export default PasantiasDocsAdd;

