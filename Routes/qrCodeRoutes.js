import express from 'express';
const router = express.Router();
import { fetchQrCode, generateQrCode, getQrCode, scanQrCode } from '../Controllers/qrCodeController.js';

router.get('/fetch/qrcode/:id', fetchQrCode)
router.get('/qrcode/details/:id', getQrCode)
router.get('/qrcode/scan/:id', scanQrCode)
router.post('/generate/qrcode', generateQrCode)



export default router;