import express from 'express';
const router = express.Router();
import { uploadQrCode, createQrCodeRecord, getQrCode, scanQrCode,getQrCodeById ,getScannedQrCodes, getQrCodesByTypeAndUserId, getScansByQrAndCompany } from '../Controllers/qrCodeController.js';

router.post('/upload/qrcode/:id', uploadQrCode) // upload QR code   /////////////////
router.get('/qrcode/details/:userId', getQrCode) // Get QR code details    ////////////////
router.get('/singleqrcode/details/:id', getQrCodeById) // Get QR code details by id    ////////////////
router.get('/qrcode/scan/:userId', scanQrCode) // Scan QR code        ///////////
router.get('/getscannedqrcodes/:userId', getScannedQrCodes) // Get scanned views
router.post('/create/qrcode', createQrCodeRecord) // Create QR code ////////////
router.get('/getqrcode/bytype/:userId/:type', getQrCodesByTypeAndUserId); // Fetch QR codes by type
router.get("/getscannedDetails/bycompany/:userId/:name?", getScansByQrAndCompany); // Dynamically get scans based on filters 

export default router;