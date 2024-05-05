import React from 'react';
import { Link } from '@mui/material';
import RouterLinks from '@/routes/RouterLinks';

export default function Home() {
	return (
    <>
      <Link href={RouterLinks.auth.login}>Login</Link>
      
			<br />

      <Link href={RouterLinks.auth.registro}>Registro</Link>

			<br />

      <Link href={RouterLinks.student.StudentDashboard}>Estudiante</Link>

      <br />

      <Link href={RouterLinks.admin.pasantias.PasantiasEstudiantes}>Admin Pasantias</Link>

      <br />

      <Link href={RouterLinks.admin.servicio.ServicioEstudiantes}>Admin servicio</Link>

      <br />


    </>
	);
}
