'use client';
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";

const PasantiasEstudiantes = () => {
  const students = [
    {
      id: 1,
      name: 'Ricardo',
      lastname: 'Aguilera',
      ci: '12896748',
      phoneNumber: '123-456-7890',
      title: 'Título 1',
      empresa: 'Empresa A',
      tutorPasantias: 'Profesor X',
      tutorEmpresarial: 'Ana',
      hour: '4',
      status: 'en progreso',
      email: 'ricardo@example.com'
    }
  ];

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
            {students.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{`${row.name} ${row.lastname}`}</TableCell>
                <TableCell>{row.ci}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.empresa}</TableCell>
                <TableCell>{row.tutorPasantias}</TableCell>
                <TableCell>{row.tutorEmpresarial}</TableCell>
                <TableCell>{row.hour}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default PasantiasEstudiantes;
