'use client';
'use client';
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";
import CustomBox from "@/components/CustomBox";
import TitleValue from "@/components/TitleValue";
import ContextMenu from "@/components/ContextMenu";
import TableStyled from "@/components/TableStyled";
import BasicModal from '@/components/FormModal';

import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const initialActivities = [
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
  phoneNumber: '13213131',
  email: 'maria@email',
};

const studentPasantias = {
  title: 'proyecto bigchungo',
  empresa: 'FUPAGUA',
  tutorAcademico: 'Adriana Roa',
  tutorEmpresarial: 'Melissa Farfan',
  hour: 200,
  estatus: 'Pendiente'
};

const PasantiasDashboard = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [student, setStudent] = useState(studentPasantias);
  const [totalHours, setTotalHours] = useState(studentPasantias.hour);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const newTotalHours = activities.reduce((total, activity) => total + activity.hours, 0);
    setTotalHours(newTotalHours);
  }, [activities]);

  const handleContextMenuOpen = (event, activity) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
  };

  const handleEditActivity = (activityId) => {
    console.log(`Editar actividad con id: ${activityId}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddActivity = (newActivity) => {
    // Aquí puedes agregar la lógica para agregar la nueva actividad al estado de actividades
    // Por ahora, solo mostraremos la nueva actividad por consola
    console.log('Nueva actividad:', newActivity);
    setOpenModal(false); // Cerrar el modal después de agregar la actividad
  };

  return (
    <PageTemplate>
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
                <TitleValue title="Total Acumulado" value={totalHours} />
                <TitleValue title="Estatus" value={student.estatus} />
              </CustomBox>
            </Grid>
          </Grid>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Button
              variant="outlined"
              style={{ color: '#47AD64', borderColor: '#47AD64', textTransform: 'none' }}
              startIcon={<ArticleIcon style={{ color: '#47AD64' }} />}
            >
              Descargar carta de culminación
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
        >
          Agregar nueva actividad
        </Button>
        <BasicModal open={openModal} onClose={handleCloseModal} onAddActivity={handleAddActivity} />
      </div>

      <TableStyled>
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
            {activities.map((activity) => (
              <TableRow key={activity.id} onContextMenu={(event) => handleContextMenuOpen(event, activity)}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.startDate}</TableCell>
                <TableCell>{activity.endDate}</TableCell>
                <TableCell>{activity.hours}</TableCell>
                <TableCell>
                  <ContextMenu onDelete={() => handleDeleteActivity(activity.id)} onEdit={() => handleEditActivity(activity.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableStyled>
    </PageTemplate>
  );
};

export default PasantiasDashboard;