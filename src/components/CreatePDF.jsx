import jsPDF from 'jspdf';

export const createPDF = (qrCodeImageUrl) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'cm',
        format: 'a4'
    });

    const margin = 2.5; // Margen en cm

    // Header
    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.text(`REPÚBLICA BOLIVARIANA DE VENEZUELA\nMINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA,\nCIENCIA Y TECNOLOGÍA\nUNIVERSIDAD NACIONAL EXPERIMENTAL “RÓMULO GALLEGOS”\nVICERRECTORADO ACADÉMICO\nÁREA DE INGENIERÍA DE SISTEMAS\nCOORDINACIÓN SERVICIO COMUNITARIO (COSECA)`, 8 + margin, margin, { align: 'center' });

    // Título
    doc.setFontSize(16);
    doc.text('CONSTANCIA CULMINACIÓN SERVICIO COMUNITARIO', 8 + margin, 6 + margin, { align: 'center' });

    // Datos del estudiante
    const studentData = {
        name: 'María José',
        lastname: 'Díaz Quiñones',
        ci: '30.318.748',
        projectTitle: 'Proyecto de Fortalecimiento para los Sistemas de Información de la Fundación de Personas Autistas de Guárico (FUPAGUA)',
        foundation: 'FUPAGUA',
        academicTutor: 'Prof.ª Liliana Alcalá',
    };

    // Cuerpo del texto
    doc.setFontSize(12);
    const bodyText = `Quienes suscriben, hacen constar por medio de la presente que el ciudadano Bachiller: ${studentData.name} ${studentData.lastname}, titular de la Cédula de Identidad N° ${studentData.ci}, estudiante del Área de Ingeniería de Sistemas, CULMINÓ las actividades inherentes a la prestación del Servicio Comunitario según lo establecido en la LEY DE SERVICIO COMUNITARIO DEL ESTUDIANTE DE EDUCACIÓN SUPERIOR y sus REGLAMENTOS, a través de la ejecución del Proyecto: "${studentData.projectTitle}", en la fundación: ${studentData.foundation} con el apoyo de la Tutora Académica: ${studentData.academicTutor}.`;
    doc.text(bodyText, margin, 8 + margin, { maxWidth: 21 - 2 * margin, align: 'justify' });

    // Texto del pie de página
    const currentDate = new Date();
    const footerText = `Constancia que se expide a petición de la parte interesada en San Juan de los Morros; a los ${currentDate.getDate()} del mes de ${currentDate.toLocaleDateString('es-VE', { month: 'long' })} del ${currentDate.getFullYear()}.`;
    doc.text(footerText, margin, 14 + margin, { maxWidth: 21 - 2 * margin });

    // Firmas
    doc.text('TUTOR (A) ACADÉMICO (A)', margin, 23 + margin - 6);
    doc.text('COORDINADOR (A) COSECA AIS', 8.5, 23 + margin - 5);
    doc.text('DECANO (A)', 16, 23 + margin - 6);


    // Texto adicional
    const additionalText = `Folio ______   Número ______`;
    doc.text(additionalText, margin, doc.internal.pageSize.height - margin - 5);

    const yearText = `Año: ${currentDate.getFullYear()}`;
    const yearTextWidth = doc.getStringUnitWidth(yearText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    doc.text(yearText, doc.internal.pageSize.width - margin - yearTextWidth, doc.internal.pageSize.height - margin - 5);

    // Calcular posición para el código QR
    const qrWidth = 3;
    const qrHeight = 3;
    const qrX = margin; // Alineado con el margen izquierdo
    const qrY = doc.internal.pageSize.height - margin - qrHeight - 1;

    // Añadir código QR
    doc.addImage(qrCodeImageUrl, 'PNG', qrX, qrY, qrWidth, qrHeight);

    // Guardar y abrir el PDF
    doc.save('constancia_servicio_comunitario.pdf');
};