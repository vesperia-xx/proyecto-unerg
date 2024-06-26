const RouterLinks = {
    
	landing: "/",
	auth: {
		login: "/auth/login",
		registro: "/auth/registro",
	},
	student: {
		StudentDashboard: "/student",
		pasantias:{
			PasantiasDashboard: "/student/pasantias",
			PasantiasDocument: "/student/pasantias/document",
		},
		servicio:{
			ServicioDashboard: "/student/servicio",
			ServicioDocument: "/student/servicio/document",
		}
	},
	admin: {
		pasantias: {
			PasantiasEstudiantes: "/admin/pasantias",
		},
		servicio: {
			ServicioEstudiantes: "/admin/servicio",
		},
	},
};

export default RouterLinks;