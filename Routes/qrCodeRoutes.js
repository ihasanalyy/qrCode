import express from 'express';
const router = express.Router();
import { fetchQrCode, generateQrCode, getQrCode } from '../Controllers/qrCodeController.js';

router.get('/fetch/qrcode/:id', fetchQrCode)
router.get('/qrcode/details/:id', getQrCode)
router.post('/generate/qrcode', generateQrCode)

export default router;