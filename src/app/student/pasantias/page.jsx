'use client';

import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";
import CustomBox from "@/components/CustomBox";
import TitleValue from "@/components/TitleValue";
import ModalActivityPasantias from '@/components/ModalActivityPasantias';
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
import { useAuthStore } from "@/hooks/useAuthStore";

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.pasantias.PasantiasDashboard },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.pasantias.PasantiasDocument },
  { text: 'Salir', icon: <LogoutIcon />, route: RouterLinks.student.StudentDashboard },
];

const horasCumplir = 320

const pasantiasActivities = [
  {
    id: 'activity_1',
    activity: 'Actividad 1',
    startDate: '2024-04-01',
    endDate: '2024-04-10',
    hours: 40
  },
  {
    id: 'activity_2',
    activity: 'Actividad 2',
    startDate: '2024-04-12',
    endDate: '2024-04-20',
    hours: 30
  },
];

const studentData = {
  name: 'Maria',
  lastname: 'Diaz',
  ci: '30318748',
  phoneNumber: '04140416579',
  email: 'maria@email.com',
};

const studentPasantias = {
  title: 'proyecto bigchungo',
  empresa: 'FUPAGUA',
  tutorAcademico: 'Adriana Roa',
  tutorEmpresarial: 'Melissa Farfan',
  hour: 0,
  estatus: 'Pendiente'
};

//Actividades
const PasantiasDashboard = () => {
  const [activities, setActivities] = useState(pasantiasActivities);
  const [student, setStudent] = useState(studentPasantias);
  const [totalHours, setTotalHours] = useState(studentPasantias.hour);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);
  const [canDownload, setCanDownload] = useState(false);

  const { user } = useAuthStore();

  //Horas
  useEffect(() => {
    const newTotalHours = activities.reduce((total, activity) => total + (+activity.hours), 0);
    setTotalHours(newTotalHours);
    if (newTotalHours >= 320) {
      setCanDownload(true);
    } else {
      setCanDownload(false);
    }
    // Actualizar el estatus
    if (newTotalHours >= 320 && student.estatus !== 'Completado') {
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

  return (
    <PageTemplate>
      <Sidebar title="Estudiante Pasantias" links={links}
        profileName={user.name}
        profileImage={user.avatarUrl} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomBox>
                <Typography variant="h6" gutterBottom>Datos del Estudiante</Typography>
                <TitleValue title="Nombre y Apellido" value={`${user.name} ${user.lastName}`} />
                <TitleValue title="Cedula" value={user.CI} />
                <TitleValue title="Empresa" value={user.empresa} />
                <TitleValue title="Tutor Academico" value={user.tutorAcademico} />
                <TitleValue title="Tutor Empresarial" value={user.tutorEmpresarial} />
              </CustomBox>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomBox>
                <Typography variant="h6" gutterBottom>Horas</Typography>
                <TitleValue title="Horas a Cumplir" value={horasCumplir} />
                <TitleValue title="Total Acumulado" value={activities.reduce((total, activity) => total + parseInt(activity.hours), 0)} />
                <TitleValue title="Estatus" value={student.estatus} />
              </CustomBox>
            </Grid>
          </Grid>


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
        <ModalActivityPasantias open={openModal} onClose={handleCloseModal} onAddActivity={handleAddActivity} />
        <ModalActivityPasantias open={openEditModal} onClose={handleCloseEditModal} onEditActivity={handleEditActivitySubmit} editedActivity={editedActivity} />
      </div>

      <TableStyled hover>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Fecha de Fin</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.startDate}</TableCell>
                <TableCell>{activity.endDate}</TableCell>
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

      <br />

    </PageTemplate>
  );
};

export default PasantiasDashboard;