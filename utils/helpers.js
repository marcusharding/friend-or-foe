import QRCode from 'qrcode';

export const generateQr = async url => {
    try {
        let qr = await QRCode.toDataURL(url)
        return qr
    } catch (err) {
        console.error(err)
    }
}