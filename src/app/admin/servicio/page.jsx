'use client';

import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import PageTemplate from "@/components/PageTemplate";
import TableStyled from "@/components/TableStyled";

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

const ServicioEstudiantes = () => {
    const studentData = {
        name: 'Maria',
        lastname: 'Diaz',
        ci: '30318748',
        phoneNumber: '13213131',
        email: 'maria@email',
    };

    const studentServicio = {
        title: 'proyecto bigchungo',
        empresa: 'FUPAGUA',
        tutorAcademico: 'Adriana Roa',
        tutorEmpresarial: 'Melissa Farfan',
        hour: 0,
        estatus: 'Pendiente'
    };

    return (
        <PageTemplate>
            <Sidebar title="Admin Servicio" links={links} />
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
                            <TableCell>{ }</TableCell>
                            <TableCell>{`${studentData.name} ${studentData.lastname}`}</TableCell>
                            <TableCell>{studentData.ci}</TableCell>
                            <TableCell>{studentData.email}</TableCell>
                            <TableCell>{studentData.phoneNumber}</TableCell>
                            <TableCell>{studentServicio.title}</TableCell>
                            <TableCell>{studentServicio.empresa}</TableCell>
                            <TableCell>{studentServicio.tutorAcademico}</TableCell>
                            <TableCell>{studentServicio.tutorEmpresarial}</TableCell>
                            <TableCell>{studentServicio.hour}</TableCell>
                            <TableCell>{studentServicio.estatus}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableStyled>
        </PageTemplate>
    );
};

export default ServicioEstudiantes;