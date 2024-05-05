const RouterLinks = {
    
	landing: "/",
	auth: {
		login: "/auth/login",
		registro: "/auth/registro",
	},
	student: {
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
			PasantiasDocsAdd: "/admin/pasantias/document",
		},
		servicio: {
			ServicioEstudiantes: "/admin/servicio",
			ServcioDocsAdd: "/admin/servicio/document",
		},
	},
};

export default RouterLinks;