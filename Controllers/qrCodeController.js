// import qrCodeModel from '../Models/qrCodeSchema.js';
// import QRCode from 'qrcode';
// import path from 'path';

// // Fetch QR code
// export const fetchQrCode = async (req,res) =>{
//     console.log("fetchQrCode");
//     try {
//         const { id } = req.params;
//         console.log("id",id);
//         const qrRecord = await qrCodeModel.findById(id);
//         console.log("qrRecord",qrRecord);
//         if (!qrRecord) return res.status(404).json({ error: "QR Code not found" });
    
//         const qrCodePath = path.join(__dirname, "qrcodes", `${id}.png`);
//         console.log("qrCodePath",qrCodePath);
//         await QRCode.toFile(qrCodePath, id);
    
//         qrRecord.qrCodeImage = qrCodePath;
//         await qrRecord.save();
    
//         res.json({ qrCodeImage: qrCodePath });
//       } catch (error) {
//         res.status(500).json({ error: "Server error" });
//       }
// }

// // Create QR code
// export const generateQrCode = async (req, res) => {
//         try {
//           const { name, type, text, pickupDetails } = req.body;
//           if (!name || !type || (type === "text" && !text) || (type === "location" && !pickupDetails)) {
//             return res.status(400).json({ error: "Missing required fields" });
//           }
      
//           const qrRecord = new qrCodeModel({ name, type, text, pickupDetails });
//           await qrRecord.save();
      
//           res.json({ id: qrRecord._id });
//         } catch (error) {
//           res.status(500).json({ error: "Server error" });
//         }
// }

// // get details of a qr code
// export const getQrCode = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const qrRecord = await qrCodeModel.findById(id);
//         if (!qrRecord) return res.status(404).json({ error: "QR Code not found" });
    
//         res.json(qrRecord);
//       } catch (error) {
//         res.status(500).json({ error: "Server error" });
//       }
// }

import qrCodeModel from '../Models/qrCodeSchema.js';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fetch QR code
export const fetchQrCode = async (req, res) => {
    console.log("fetchQrCode");
    try {
        const { id } = req.params;
        console.log("id", id);
        const qrRecord = await qrCodeModel.findById(id);
        console.log("qrRecord", qrRecord);
        if (!qrRecord) return res.status(404).json({ error: "QR Code not found" });

        const qrCodePath = path.join(__dirname, "../qrcodes", `${id}.png`);
        await QRCode.toFile(qrCodePath, id); // Generate QR code only id 

        qrRecord.qrCodeImage = qrCodePath;
        await qrRecord.save();

        res.json({ qrCodeImage: qrCodePath });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create QR code
export const generateQrCode = async (req, res) => {
    try {
        const { name, type, text, pickupDetails } = req.body;
        if (!name || !type || (type === "text" && !text) || (type === "location" && !pickupDetails)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const qrRecord = new qrCodeModel({ name, type, text, pickupDetails });
        await qrRecord.save();

        res.json({ id: qrRecord._id });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get QR code details
export const getQrCode = async (req, res) => {
    console.log("getQrCode");
    try {
        const { id } = req.params;
        console.log("id", id);
        const qrRecord = await qrCodeModel.findById(id);
        console.log("qrRecord", qrRecord);
        if (!qrRecord) return res.status(404).json({ error: "QR Code not found" });

        res.json(qrRecord);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
