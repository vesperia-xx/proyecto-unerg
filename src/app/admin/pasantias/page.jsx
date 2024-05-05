'use client';

import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";

const PasantiasEstudiantes = () => {
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

  return (
    <PageTemplate>
      <TableStyled>
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
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
            </TableRow>
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default PasantiasEstudiantes;