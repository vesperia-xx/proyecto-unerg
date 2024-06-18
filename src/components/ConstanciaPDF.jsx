import jsPDF from 'jspdf';

export const ConstanciaPDF = (qrCodeImageUrl) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'cm',
        format: 'a4'
    });

    // Datos del estudiante
    const studentData = {
        name: 'María José',
        lastname: 'Díaz Quiñones',
        ci: '30.318.748',
        projectTitle: 'Proyecto de Fortalecimiento para los Sistemas de Información de la Fundación de Personas Autistas de Guárico (FUPAGUA)',
        foundation: 'FUPAGUA',
        academicTutor: 'Prof.ª Liliana Alcalá',
    };

    const margin = 2.5;

    var img2 = new Image();
    img2.src = 'https://pbs.twimg.com/profile_images/1211703453736722432/gVVrcbrS_400x400.jpg';
    doc.addImage(img2, 'PNG', margin, margin, 3, 3);

    // Header
    doc.setFont('helvetica');
    doc.setFontSize(8);

    var img1 = new Image();
    img1.src = 'https://pbs.twimg.com/profile_images/1315726857/AIS_400x400.jpg';
    doc.addImage(img1, 'PNG', doc.internal.pageSize.width - 2 - margin, 0.5 + margin, 2, 2);

    // Organismo
    doc.text(`REPÚBLICA BOLIVARIANA DE VENEZUELA\nMINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA,\nCIENCIA Y TECNOLOGÍA\nUNIVERSIDAD NACIONAL EXPERIMENTAL “RÓMULO GALLEGOS”\nVICERRECTORADO ACADÉMICO\nÁREA DE INGENIERÍA DE SISTEMAS\nCOORDINACIÓN SERVICIO COMUNITARIO (COSECA)`, 8.5 + margin, margin, { align: 'center' });

    // Título
    doc.setFontSize(16);
    doc.text('CONSTANCIA APROBACIÓN TALLER SERVICIO COMUNITARIO', 8 + margin, 6 + margin, { align: 'center' });

    // Datos del estudiante
    const { name, lastname, ci, projectTitle, foundation, academicTutor } = studentData;

    // Cuerpo del texto
    doc.setFontSize(12);
    const bodyText = `Quienes suscriben, hacen constar por medio de la presente que el (la) ciudadano (a) Bachiller: ${name} ${lastname}, titular de la Cédula de Identidad N° ${ci}, estudiante del Área de Ingeniería de Sistemas, CURSÓ Y APROBÓ el taller: INTRODUCCIÓN AL SERVICIO COMUNITARIO, dictado en fecha: 02 de noviembre del año 2022, con una duración de 08 horas académicas, de acuerdo a lo establecido en la Ley de Servicio Comunitario Del Estudiante de Educación Superior y el Reglamento de Servicio Comunitario del Estudiante de la Universidad Nacional Experimental de los Llanos Centrales “Rómulo Gallegos”.`;
    doc.text(bodyText, margin, 8 + margin, { maxWidth: 21 - 2 * margin, align: 'justify' });

    // Texto del pie de página
    const currentDate = new Date();
    const footerText = `Constancia que se expide a petición de la parte interesada en San Juan de los Morros; a los ${currentDate.getDate()} del mes de ${currentDate.toLocaleDateString('es-VE', { month: 'long' })} del ${currentDate.getFullYear()}.`;
    doc.text(footerText, margin, 14 + margin, { maxWidth: 21 - 2 * margin });

    // Firmas
    doc.text('Dr. LEOPOLDO ARVELAIZ\nDECANO', margin, 23 + margin - 6);
    doc.text('DRA. AHOLIMAR HERNÁNDEZ\nCOORD. COSECA AIS', 12, 23 + margin - 6);

    // Calcular posición para el código QR
    const qrWidth = 3;
    const qrHeight = 3;
    const qrX = margin;
    const qrY = doc.internal.pageSize.height - margin - qrHeight - 1;

    // Añadir código QR
    doc.addImage(qrCodeImageUrl, 'PNG', qrX, qrY, qrWidth, qrHeight);

    // Guardar y abrir el PDF
    doc.save('constancia_servicio_comunitario.pdf');
};