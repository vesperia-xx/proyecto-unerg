import jsPDF from 'jspdf';

// Function to get month name
const getMonthName = (monthIndex) => {
    const monthNames = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return monthNames[monthIndex];
};

// Function to determine semester based on date
const getSemesterPeriod = (startDate, endDate) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    const getSemester = (year, month) => {
        if (month >= 0 && month <= 4) { // January to May
            return { year, semester: 1 };
        } else if (month >= 8 && month <= 11) { // September to December
            return { year, semester: 2 };
        } else {
            return { year, semester: 0 }; // Vacation months
        }
    };

    const startSemester = getSemester(startYear, startMonth);
    const endSemester = getSemester(endYear, endMonth);

    if (startSemester.semester === 0 || endSemester.semester === 0) {
        return 'Periodo especial';
    }

    if (startSemester.semester === 1 && endSemester.semester === 1) {
        return `Primer semestre del año ${startSemester.year}`;
    } else if (startSemester.semester === 2 && endSemester.semester === 2) {
        return `Segundo semestre del año ${startSemester.year}`;
    } else if (startSemester.semester === 1 && endSemester.semester === 2) {
        return `Desde el primer hasta el segundo semestre del año ${startSemester.year}`;
    } else {
        return 'Periodo especial';
    }
};

export const ActaPDF = (user, student, qrCodeImageUrl) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'cm',
        format: 'a4'
    });

    // Get current date
    const today = new Date();
    const currentDate = `${today.getDate()} de ${getMonthName(today.getMonth())} de ${today.getFullYear()}`;

    // Datos del estudiante
    const studentData = {
        startDate: new Date(2024, 1, 14),
        endDate: new Date(2024, 7, 7)
    };

    const margin = 2.5;

    // Add University Logo
    const img2 = new Image();
    img2.src = 'https://pbs.twimg.com/profile_images/1211703453736722432/gVVrcbrS_400x400.jpg';
    img2.onload = () => {
        doc.addImage(img2, 'PNG', margin, margin, 3, 3);

        // Add another logo
        const img1 = new Image();
        img1.src = 'https://pbs.twimg.com/profile_images/1315726857/AIS_400x400.jpg';
        img1.onload = () => {
            doc.addImage(img1, 'PNG', doc.internal.pageSize.width - 2 - margin, 0.5 + margin, 2, 2);

            doc.setFont('helvetica');
            doc.setFontSize(8);
            doc.text(
                `REPÚBLICA BOLIVARIANA DE VENEZUELA\nMINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA,\nCIENCIA Y TECNOLOGÍA\nUNIVERSIDAD NACIONAL EXPERIMENTAL “RÓMULO GALLEGOS”\nVICERRECTORADO ACADÉMICO\nÁREA DE INGENIERÍA DE SISTEMAS\nCOORDINACIÓN SERVICIO COMUNITARIO (COSECA)`,
                8.5 + margin,
                margin,
                { align: 'center' }
            );

            // Title
            doc.setFontSize(16);
            doc.text('ACTA DE CONCLUSIÓN DEL SERVICIO COMUNITARIO', 8 + margin, 5 + margin, { align: 'center' });

            // Student data and body text
            doc.setFontSize(12);
            const semesterPeriod = getSemesterPeriod(studentData.startDate, studentData.endDate);
            const bodyText = `Hoy, a los ${today.getDate()} días del mes de ${getMonthName(today.getMonth())} del año ${today.getFullYear()}, los miembros de la Comunidad Universitaria y Comunidad Beneficiaria involucrados en la ejecución del “${student.title}”, desarrollado en la fundación ${student.empresa}, ubicado en la Parroquia San Juan de los Morros, del Municipio Juan Germán Roscio del Estado Guárico, en acto público de reflexión, y acompañando a la Bachiller: ${user.name} ${user.lastName}. C.I.: ${user.CI}, adscrito al Proyecto antes mencionado, damos fe de: “haber cumplido plena y satisfactoriamente las 120 horas mínimas de la prestación del Servicio Comunitario de conformidad con la Ley de Servicio Comunitario del Estudiante de Educación Superior, y demás reglamentos que regulan la materia en nuestra Casa de Estudios, en el periodo del ${semesterPeriod} desde ${studentData.startDate.getDate()} de ${getMonthName(studentData.startDate.getMonth())} de ${studentData.startDate.getFullYear()} hasta ${studentData.endDate.getDate()} de ${getMonthName(studentData.endDate.getMonth())} de ${studentData.endDate.getFullYear()}”. Para los efectos legales pertinentes, y en constancia de lo antes expuesto, firman.`;
            doc.text(bodyText, margin, 6.5 + margin, { maxWidth: 21 - 2 * margin, align: 'justify' });

            // Additional text
            const additionalText1 = `Tutor (a) Académico (a): ${student.tutorAcademico}`;
            const additionalText2 = `FIRMA: ______________________`;
            const additionalText3 = `Tutor (a) Comunitario (a): ${student.tutorComunitario}`;
            const additionalText4 = `FIRMA: ______________________`;
            const additionalText5 = `SELLO INSTITUCIONAL`;
            const additionalText6 = `Estudiante: ${user.name} ${user.lastName} V-${user.CI}`;
            const additionalText7 = `FIRMA: ______________________`;

            const textYStart = doc.internal.pageSize.height - margin - 11;
            const lineSpacing = 1; // Spacing between lines

            doc.text(additionalText1, margin, textYStart);
            doc.text(additionalText2, margin, textYStart + lineSpacing);
            doc.text(additionalText3, margin, textYStart + 2 * lineSpacing);
            doc.text(additionalText4, margin, textYStart + 3 * lineSpacing);
            doc.text(additionalText5, margin, textYStart + 4 * lineSpacing);
            doc.text(additionalText6, margin, textYStart + 5 * lineSpacing);
            doc.text(additionalText7, margin, textYStart + 6 * lineSpacing);

            // QR Code
            const qrWidth = 3;
            const qrHeight = 3;
            const qrX = margin;
            const qrY = doc.internal.pageSize.height - margin - qrHeight - 1;

            doc.addImage(qrCodeImageUrl, 'PNG', qrX, qrY, qrWidth, qrHeight);

            // Generate PDF and create a Blob URL
            const pdfBlob = doc.output('blob');
            const pdfURL = window.URL.createObjectURL(pdfBlob);

            // Open the PDF in a new window
            window.open(pdfURL, '_blank');
        };
    };
};
