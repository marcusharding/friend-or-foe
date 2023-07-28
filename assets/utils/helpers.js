import QRCode from 'qrcode';

const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    color: {
        dark:"#1d1d1f",
        light:"#FDFDFD"
    }
}

export const generateQr = async url => {

    try {

        const qr = await QRCode.toDataURL(url, qrOptions);
        return qr;

    } catch (err) {

        console.error(err);
    }
}
