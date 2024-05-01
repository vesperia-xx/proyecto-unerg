
import { createSlice } from '@reduxjs/toolkit'


const tempUser = {
  _id: new Date().getTime(),
  name: 'Maria',
  lastname: 'Chungi',
  ci: '12896748',
  email: 'maria@gmail',
  phoneNumber: '41654646',
  title: 'Título 1',
  empresa: 'Empresa A',
  tutorPasantias: 'Profesor X',
  tutorEmpresarial: 'Ana',
  hour: '4',
  status: 'en progreso'
};

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [
      tempUser
    ],
    activeStudent: null
  },
  reducers: {
    onSetActiveStudent: (state, { payload }) => {
      state.activeStudent = payload;
    },

    onAddNewStudent: (state, { payload }) => {
      state.students.push(payload);
      state.activeStudent = null;
    },
    onUpdateStudent: (state, { payload }) => {
      state.students = state.students.map(student => {
        if (student._id === payload._id) {
          return payload
        }

        return student;
      })
    },

    onDeleteStudent: (state) => {
      if (state.activeStudent) {
        state.students = state.students.filter(student => student._id !== state.activeStudent._id);
        state.activeStudent = null;
      }

    },

  },
},
)

export const { onSetActiveStudent, onAddNewStudent, onUpdateStudent, onDeleteStudent } = studentSlice.actions
