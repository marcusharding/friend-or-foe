import QRCode from 'qrcode';

const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    color: {
      dark:"#505050",
      light:"#E3E3E1"
    }
}

export const generateQr = async url => {
    try {
        const qr = await QRCode.toDataURL(url, qrOptions);
        return qr;
    } catch (err) {
        console.error(err)
    }
}