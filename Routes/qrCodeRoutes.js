import express from 'express';
const router = express.Router();
import { fetchQrCode, generateQrCode, getQrCode, scanQrCode, getScaannedQrCodes, fetchQrCodesByType, getScansByQrAndCompany } from '../Controllers/qrCodeController.js';

router.get('/fetch/qrcode/:id', fetchQrCode) // Fetch QR code   /////////////////
router.get('/qrcode/details/:id', getQrCode) // Get QR code details    ////////////////
router.get('/qrcode/scan/:id', scanQrCode) // Scan QR code        ///////////
router.get('/getscannedviews/:id', getScaannedQrCodes) // Get scanned views
router.post('/generate/qrcode', generateQrCode) // Create QR code ////////////
router.get('/getqrcode/type/:type', fetchQrCodesByType); // Fetch QR codes by type
router.get("/scans/:id/:company?", getScansByQrAndCompany); // Dynamically get scans based on filters 



export default router;