'use client';

import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";
import CustomBox from "@/components/CustomBox";
import TitleValue from "@/components/TitleValue";
import ModalActivityServicio from "@/components/ModalActivityServicio";
import ContextMenu from "@/components/ContextMenu";

import { Add as AddIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Grid, Typography, Button } from '@mui/material';
import TableStyled from "@/components/TableStyled";

import Sidebar from "@/components/Sidebar";

import RouterLinks from "@/routes/RouterLinks";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.servicio.ServicioDashboard},
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.servicio.ServicioDocument},
  { text: 'Salir', icon: <LogoutIcon />, route: RouterLinks.student.StudentDashboard},
];


// import { generarCartaCulminacionPDF } from './utils/pdfGenerator';

//Constantes
const initialActivities = [
  {
    id: 'activity_1',
    activity: 'Actividad 1',
    week: 1,
    date: '2024-04-01',
    hours: 40
  },
  {
    id: 'activity_2',
    activity: 'Actividad 2',
    week: 2,
    date: '2024-04-12',
    hours: 30
  },
];

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

//Actividades
const ServicioDashboard = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [student, setStudent] = useState(studentServicio);
  const [totalHours, setTotalHours] = useState(studentServicio.hour);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);
  const [canDownload, setCanDownload] = useState(false);

//Horas
  useEffect(() => {
    const newTotalHours = activities.reduce((total, activity) => total + (+activity.hours), 0);
    setTotalHours(newTotalHours);
    if (newTotalHours >= 120) {
      setCanDownload(true);
    } else {
      setCanDownload(false);
    }
// Actualizar el estatus
    if (newTotalHours >= 120 && student.estatus !== 'Completado') {
      setStudent(prevStudent => ({ ...prevStudent, estatus: 'Completado' }));
    }
  }, [activities, student.estatus]);

//Borrar actividad
  const handleDeleteActivity = (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
  };
  
//Editar pdf
  const handleEditActivity = (activityId) => {
    const editedActivity = activities.find(activity => activity.id === activityId);
    setEditedActivity(editedActivity);
    setOpenEditModal(true);
  };

//Modal
  const handleOpenModal = () => {
    if (student.estatus !== 'Completado') {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleAddActivity = (newActivity) => {
    // No permitir agregar actividades si el estatus es 'Completado'
    if (student.estatus !== 'Completado') {
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      setOpenModal(false);
    }
  };

  const handleEditActivitySubmit = (editedActivity) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === editedActivity.id) {
        return editedActivity;
      } else {
        return activity;
      }
    });
    setActivities(updatedActivities);
    setOpenEditModal(false);
  };

  //Generar pdf
  const handleDownloadCompletionLetter = () => {
    generarCartaCulminacionPDF(studentData, student, activities);
  };

  return (
    <PageTemplate>
    <Sidebar title="Estudiante Servicio" links={links} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomBox>
                <Typography variant="h6" gutterBottom>Datos del Estudiante</Typography>
                <TitleValue title="Nombre y Apellido" value={`${studentData.name} ${studentData.lastname}`} />
                <TitleValue title="Cedula" value={studentData.ci} />
                <TitleValue title="Teléfono" value={studentData.phoneNumber} />
                <TitleValue title="Email" value={studentData.email} />
                <TitleValue title="Empresa" value={student.empresa} />
                <TitleValue title="Tutor Academico" value={student.tutorAcademico} />
                <TitleValue title="Tutor Empresarial" value={student.tutorEmpresarial} />
              </CustomBox>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomBox>
                <Typography variant="h6" gutterBottom>Horas</Typography>
                <TitleValue title="Total Acumulado" value={activities.reduce((total, activity) => total + parseInt(activity.hours), 0)} />
                <TitleValue title="Estatus" value={student.estatus} />
              </CustomBox>
            </Grid>
          </Grid>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Button
          variant="outlined"
          style={{ color: '#47AD64', borderColor: '#47AD64', textTransform: 'none' }}
          startIcon={<GetAppIcon style={{ color: '#47AD64' }} />}
          // onClick={handleDownloadCompletionLetter} 
          disabled={!canDownload} 
        >
          Decargar carta de culminación
        </Button>
          </div>

        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: 10, marginTop: 10 }}>
        <Grid item xs={12}>
          <CustomBox>
            <Typography variant="h6" gutterBottom>Proyecto</Typography>
            <TitleValue title="Título del Proyecto" value={student.title} />
          </CustomBox>
        </Grid>
      </Grid>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button
          variant="outlined"
          style={{ color: '#4079ED', borderColor: '#4079ED', textTransform: 'none' }}
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          disabled={student.estatus === 'Completado' || canDownload}
        >
          Agregar nueva actividad
        </Button>
        <ModalActivityServicio open={openModal} onClose={handleCloseModal} onAddActivity={handleAddActivity} />
        <ModalActivityServicio open={openEditModal} onClose={handleCloseEditModal} onEditActivity={handleEditActivitySubmit} editedActivity={editedActivity} />
      </div>

      <TableStyled>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Semana (Número)</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.week}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.hours}</TableCell>
                <TableCell>
                  <ContextMenu
                    onDelete={() => handleDeleteActivity(activity.id)}
                    onEdit={() => handleEditActivity(activity.id)}
                    canDownload={canDownload}
                    studentStatus={student.estatus}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableStyled>

    </PageTemplate>
  );
};

export default ServicioDashboard;