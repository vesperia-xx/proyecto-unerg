'use client';
import PageTemplate from "@/components/PageTemplate";
import React from "react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
    { text: 'Mi perfil', icon: <PersonIcon />, route: RouterLinks.student.StudentDashboard },
	{ text: 'Salir', icon: <LogoutIcon />, route: "/" },
];

const DashboardStudent = () => {
	return (
		<PageTemplate>
			<Sidebar title="Estudiante" links={links} />
			todos los items del Dashboard aqui

			<br />

			<Link href={RouterLinks.student.pasantias.PasantiasDashboard}>Pasantias</Link>

			<br />

			<Link href={RouterLinks.student.servicio.ServicioDashboard}>Servicio</Link>

			<br />

		</PageTemplate>
	);
};

export default DashboardStudent;