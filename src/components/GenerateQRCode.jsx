import QRCode from 'qrcode';

export const generateQRCode = async (text) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    if (!qrCodeDataUrl) {
      throw new Error('La URL de la imagen del código QR no está definida.');
    }
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Error generando el código QR:', err);
    throw err;
  }
};
