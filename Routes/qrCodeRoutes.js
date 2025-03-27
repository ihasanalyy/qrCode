import express from 'express';
const router = express.Router();
import { uploadQrCode, createQrCodeRecord, getQrCode, scanQrCode, getScannedQrCodes, getQrCodesByTypeAndUserId, getScansByQrAndCompany } from '../Controllers/qrCodeController.js';

router.post('/upload/qrcode/:id', uploadQrCode) // Fetch QR code   /////////////////
router.get('/qrcode/details/:id', getQrCode) // Get QR code details    ////////////////
router.get('/qrcode/scan/:userId', scanQrCode) // Scan QR code        ///////////
router.get('/getscannedqrcodes/:userId', getScannedQrCodes) // Get scanned views
router.post('/create/qrcode', createQrCodeRecord) // Create QR code ////////////
router.get('/getqrcode/bytype/:userId/:type', getQrCodesByTypeAndUserId); // Fetch QR codes by type
router.get("/getscannedDetails/bycompany/:userId/:name?", getScansByQrAndCompany); // Dynamically get scans based on filters 

export default router;