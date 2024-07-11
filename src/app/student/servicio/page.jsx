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

import { generateQRCode } from "@/components/GenerateQRCode";
import { createPDF } from "@/components/CreatePDF";
import { ActaPDF } from "@/components/ActaPDF";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useServicioStore } from "@/hooks/useServicioStore";
import withAuth from "@/helpers/withAuth";

import localforage from 'localforage'; 

const links = [
  { text: 'Seguimiento', icon: <DashboardIcon />, route: RouterLinks.student.servicio.ServicioDashboard },
  { text: 'Documentos', icon: <ArticleIcon />, route: RouterLinks.student.servicio.ServicioDocument },
  { text: 'Salir', icon: <LogoutIcon />, route: '/' },
];

const horasCumplir = 120;

const estatus = {
  estatus: 'Pendiente',
}

const ServicioDashboard = () => {
  const { user } = useAuthStore();
  const [activities, setActivities] = useState([]);  
  const [student, setStudent] = useState({
    title: '',
    empresa: '',
    tutorAcademico: '',
    tutorComunitario: '',
    hour: 0,
  });

  const [totalHours, setTotalHours] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);
  const [canDownloadCarta, setCanDownloadCarta] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { loading, error, servicios, getServicios } = useServicioStore();

  useEffect(() => {
    if (!user || !user.uid) return; 
    getServicios();
  }, [getServicios, user]);

  useEffect(() => {
    if (!user || !user.uid) return; 
    const fetchActivities = async () => {
      const storedActivities = await localforage.getItem('activities') || [];
      const userActivities = storedActivities.filter(activity => activity.userId === user.uid);
      setActivities(userActivities);
    };
    fetchActivities();
  }, [user]);

  useEffect(() => {
    if (!user || !user.uid) return; 
    if (!loading && !error && servicios && servicios.length > 0) {
      const userServicio = servicios.find(servicio => servicio.user === user.uid); 
      if (userServicio) {
        const { title, empresa, tutorAcademico, tutorComunitario, hour, status } = userServicio;
        setStudent({
          title,
          empresa,
          tutorAcademico,
          tutorComunitario,
          hour,
        });
      }
    }
  }, [loading, error, servicios, user.uid, user]);

  useEffect(() => {
    if (!user || !user.uid) return; 

    const newTotalHours = activities.reduce((total, activity) => total + (+activity.hours), 0);
    setTotalHours(newTotalHours);
    const currentEstatus = newTotalHours >= horasCumplir ? 'Completado' : estatus.estatus;
    setCanDownloadCarta(newTotalHours >= horasCumplir);
    setStudent(prevStudent => ({
      ...prevStudent,
      estatus: currentEstatus
    }));
    const userActivities = activities.map(activity => ({
      ...activity,
      userId: user.uid
    }));
    localforage.setItem('activities', userActivities); 
  }, [activities, user.uid, user]);

  const handleDeleteActivity = async (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
    // Actualizar localforage
    const userActivities = updatedActivities.map(activity => ({
      ...activity,
      userId: user.uid
    }));
    await localforage.setItem('activities', userActivities);
  };

  const handleEditActivity = (activityId) => {
    const editedActivity = activities.find(activity => activity.id === activityId);
    setEditedActivity(editedActivity);
    setOpenEditModal(true);
  };

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

  const handleAddActivity = async (newActivity) => {
    if (student.estatus !== 'Completado') {
      const updatedActivities = [...activities, { ...newActivity, userId: user.uid }]; 
      setActivities(updatedActivities);
      setOpenModal(false);
      const userActivities = updatedActivities.map(activity => ({
        ...activity,
        userId: user.uid
      }));
      await localforage.setItem('activities', userActivities);
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
    const userActivities = updatedActivities.map(activity => ({
      ...activity,
      userId: user.uid
    }));
    await localforage.setItem('activities', userActivities);
  };

  const handlePreviewPDF = async () => {
    try {
      const qrCodeDataUrl = await generateQRCode(`Nombre: ${user.name} ${user.lastName}\nCI: ${user.CI}\nTotal Horas: ${totalHours}`);
      const pdfBytes = await createPDF(user, student, qrCodeDataUrl);
      if (pdfBytes instanceof Blob) {
      } else {
        console.error('Error: PDF creation returned invalid data.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleDownloadActa = async () => {
    try {
      const qrCodeDataUrl = await generateQRCode(`Nombre: ${user.name} ${user.lastName}\nCI: ${user.CI}\nTotal Horas: ${totalHours}`);
      ActaPDF(user, student, qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating Acta PDF:', error);
    }
  };

  const currentEstatus = totalHours >= horasCumplir ? 'Completado' : estatus.estatus;

  return (
    <PageTemplate>
      <Sidebar
        title="Estudiante Servicio"
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
                <TitleValue title="Tutor Comunitario" value={student.tutorComunitario} />
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

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Button
              variant="outlined"
              style={{ color: '#47AD64', borderColor: '#47AD64', textTransform: 'none', padding: '5px 26px' }}
              startIcon={<GetAppIcon style={{ color: '#47AD64' }} />}
              onClick={handlePreviewPDF}
              disabled={!canDownloadCarta}
            >
              Descargar carta de culminación
            </Button>
          </div>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Button
              variant="outlined"
              style={{ color: '#4079ED', borderColor: '#4079ED', textTransform: 'none', padding: '5px 32px' }}
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={handleDownloadActa}
              disabled={!canDownloadCarta}
            >
              Descargar acta de conclusión
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
          disabled={currentEstatus === 'Completado' || canDownloadCarta}
        >
          Agregar nueva actividad
        </Button>
        <ModalActivityServicio open={openModal} onClose={handleCloseModal} onAddActivity={handleAddActivity} />
        <ModalActivityServicio open={openEditModal} onClose={handleCloseEditModal} onEditActivity={handleEditActivitySubmit} editedActivity={editedActivity} />
      </div>

      <TableStyled hover>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Semana</TableCell>
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
                    canDownload={canDownloadCarta}
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

export default withAuth(ServicioDashboard, ['User']);










