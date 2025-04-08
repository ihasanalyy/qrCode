import express from 'express';
const router = express.Router();
import { uploadQrCode, createQrCodeRecord, getQrCode, scanQrCode,getQrCodeById ,getScannedQrCode, getQrCodesByTypeAndUserId, getScansByQrAndCompany, deleteQrCode, updateQrCode, statusQrCode } from '../Controllers/qrCodeController.js';

router.post('/upload/qrcode/:id', uploadQrCode) // upload QR code   /////////////////
router.get('/qrcode/details/:userId', getQrCode) // Get QR code details    ////////////////
router.get('/singleqrcode/details/:id', getQrCodeById) // Get QR code details by id    ////////////////
router.post('/qrcode/scan/:id', scanQrCode) // Scan QR code        ///////////
router.get('/getscannedqrcode/:id', getScannedQrCode) // Get scanned views
router.post('/create/qrcode', createQrCodeRecord) // Create QR code ////////////
router.get('/getqrcode/bytype/:userId/:type', getQrCodesByTypeAndUserId); // Fetch QR codes by type
router.get("/getscannedDetails/bycompany/:userId/:name?", getScansByQrAndCompany); // Dynamically get scans based on filters 
router.delete('/delete/qrcode/:id', deleteQrCode) // Delete QR code
router.put('/update/qrcode/:id', updateQrCode) // Update QR code
router.put('/status/qrcode/:id', statusQrCode)
export default router;