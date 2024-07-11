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
import { usePasantiasStore } from "@/hooks/usePasantiasStore";

import withAuth from "@/helpers/withAuth";
import localforage from 'localforage'; 

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.pasantias.PasantiasDashboard },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.pasantias.PasantiasDocument },
  { text: 'Salir', icon: <LogoutIcon />, route: '/' },
];

const horasCumplir = 320;

const estatus = {
  estatus: 'Pendiente',
}

const PasantiasDashboard = () => {
  const [activities, setActivities] = useState([]);  
  const [student, setStudent] = useState({
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorEmpresarial: '',
    hour: 0,
    estatus: estatus.estatus
  });
  const [totalHours, setTotalHours] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);
  const [canDownload, setCanDownload] = useState(false);

  const { user } = useAuthStore();
  const { loading, error, pasantias, getPasantias } = usePasantiasStore();

  useEffect(() => {
    if (!user || !user.uid) return; 
    getPasantias();
  }, [getPasantias, user]);

  useEffect(() => {
    if (!user || !user.uid) return; 
    const fetchActivities = async () => {
      const storedActivities = await localforage.getItem(`activities_${user.uid}`) || []; 
      setActivities(storedActivities);
    };
    fetchActivities();
  }, [user]);

  useEffect(() => {
    if (!loading && !error && pasantias && pasantias.length > 0) {
      const userPasantia = pasantias.find(pasantia => pasantia.user === user.uid); 
      if (userPasantia) {
        const { title, empresa, tutorAcademico, tutorEmpresarial, hour } = userPasantia;
        setStudent({
          title,
          empresa,
          tutorAcademico,
          tutorEmpresarial,
          hour,
          estatus: hour >= horasCumplir ? 'Completado' : estatus.estatus 
        });
      }
    }
  }, [loading, error, pasantias, user.uid, user]);

  useEffect(() => {
    const newTotalHours = activities.reduce((total, activity) => total + (+activity.hours), 0);
    setTotalHours(newTotalHours);
    setCanDownload(newTotalHours >= horasCumplir);

    const saveActivities = async () => {
      await localforage.setItem(`activities_${user.uid}`, activities); 
    };
    saveActivities();
  }, [activities, user.uid]);

  // Cambiado a estatus constante
  const currentEstatus = totalHours >= horasCumplir ? 'Completado' : estatus.estatus;

  const handleDeleteActivity = async (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
    // Actualizar localforage
    await localforage.setItem(`activities_${user.uid}`, updatedActivities);
  };

  const handleEditActivity = (activityId) => {
    const editedActivity = activities.find(activity => activity.id === activityId);
    setEditedActivity(editedActivity);
    setOpenEditModal(true);
  };

  const handleOpenModal = () => {
    if (currentEstatus !== 'Completado') {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleAddActivity = async (newActivity) => {
    if (currentEstatus !== 'Completado') {
      const updatedActivities = [...activities, { ...newActivity, userId: user.uid }];  
      setActivities(updatedActivities);
      setOpenModal(false);
      // Actualizar localforage
      await localforage.setItem(`activities_${user.uid}`, updatedActivities);
    }
  };

  const handleEditActivitySubmit = async (editedActivity) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === editedActivity.id) {
        return editedActivity;
      } else {
        return activity;
      }
    });
    setActivities(updatedActivities);
    setOpenEditModal(false);
    await localforage.setItem(`activities_${user.uid}`, updatedActivities);
  };

  return (
    <PageTemplate>
      <Sidebar
        title="Estudiante Pasantias"
        links={links}
        profileName={`${user.name} ${user.lastName}`}
        profileImage={user.avatarUrl || "/perfil.jpg"}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomBox>
                <Typography variant="h6" gutterBottom>Datos del Estudiante</Typography>
                <TitleValue title="Nombre y Apellido" value={`${user.name} ${user.lastName}`} />
                <TitleValue title="Cedula" value={user.CI} />
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
                <TitleValue title="Horas a Cumplir" value={horasCumplir} />
                <TitleValue title="Total Acumulado" value={totalHours} />
                <TitleValue title="Estatus" value={currentEstatus} />
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
          disabled={currentEstatus === 'Completado' || canDownload}
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
                    studentStatus={currentEstatus}
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

export default withAuth(PasantiasDashboard, ['User']);



