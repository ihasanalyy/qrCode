// Initialize express router
import qrCodeModel from '../Models/qrCodeSchema.js';
import QRCode from 'qrcode';
import cloudinary from '../Config/cloudinary.js';
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

        const qrCodeURL = `https://res.cloudinary.com/dr6z24wrf/image/upload/qrcodes/${id}.png`;

        // Generate QR code as base64 and upload to Cloudinary
        const qrCodeBase64 = await QRCode.toDataURL(qrCodeURL);
        const uploadResponse = await cloudinary.uploader.upload(qrCodeBase64, {
            folder: 'qrcodes',
            public_id: id,
            overwrite: true,
            resource_type: "auto",
        });

        // Save the Cloudinary URL in the database instead of localhost URL
        qrRecord.qrCodeImage = uploadResponse.secure_url;
        await qrRecord.save();

        res.json({ qrCodeImage: uploadResponse.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Create QR code
export const generateQrCode = async (req, res) => {
    try {
        const { name, type, text, pickupDetails, userId, company } = req.body;
        console.log("name", name, "type", type, "text", text, "pickupDetails", pickupDetails, "userId", userId);
        if (!name || !type || (type === "text" && !text) || (type === "location" && !pickupDetails)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const qrRecord = new qrCodeModel({ name, type, text, pickupDetails, userId, company });
        await qrRecord.save();
        console.log("qrRecord", qrRecord);

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

// Scan QR code save browser details
export const scanQrCode = async (req, res) => {
    const platform = req.headers["sec-ch-ua-platform"] || "Unknown";
    const browser = req.headers["sec-ch-ua"] || "Unknown";

    console.log("Browser Info:", browser);
    console.log("Operating System:", platform);
    try {
        const { id } = req.params;
        console.log("id", id);
        const qrRecord = await qrCodeModel.findById(id);
        if (!qrRecord) return res.status(404).json({ error: "QR Code not found" });
        // Check if the browser already exists in the scannedData array
        const existingBrowserData = qrRecord.scannedData.find(data => data.browser === browser);
        if (existingBrowserData) {
            // If browser already exists, increment its views
            existingBrowserData.views += 1;
        } else {
            // If not, add a new entry for the browser with initial views = 1
            qrRecord.scannedData.push({ browser: browser, views: 1 });
        }

        // Save the updated record
        await qrRecord.save();
        res.status(200).json({ message: "Scan successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getScaannedQrCodes = async (req, res) => {
    const { id } = req.params;
    console.log("id getscannedviews", id);
    try {
        const qrRecords = await qrCodeModel.findById(id);
        console.log("qrRecords", qrRecords);
        if (!qrRecords) return res.status(404).json({ error: "QR Code not found" });
        const scannedDevices = qrRecords.scannedFrom;
        console.log("scannedDevices", scannedDevices);
        res.json(scannedDevices);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

// get all qr codes by type
export const fetchQrCodesByType = async (req, res) => {
    try {
        const { type } = req.params; // Get the 'type' parameter from the request
        console.log("QR Code Type:", type);

        const qrCodes = await qrCodeModel.find({ type }); // Find QR codes by type
        if (qrCodes.length === 0) {
            return res.status(404).json({ message: `No QR codes found for type: ${type}` });
        }
        qrCodes?.map((qrCode)=>res.json(qrCode.qrCodeImage)); // Return the matching QR codes
    } catch (error) {
        console.error("Error fetching QR codes by type:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all scans filtered by QR code and company
export const getScansByQrAndCompany = async (req, res) => {
    try {
        // Extract `qrCodeId` and `company` from path parameters (req.params)
        console.log("getScansByQrAndCompany", req.params);
        const { id, company } = req.params;
        console.log("qrCodeId", id, "company", company);

        if (!id) {
            return res.status(400).json({ error: "QR Code ID is required." });
        }

        const filter = { _id: id }; // Base filter

        // Dynamically add company filter if provided
        if (company) {
            filter.company = company;
        }

        // Fetch QR code data from DB with the applied filter
        const qrCodeData = await qrCodeModel.findOne(filter);

        if (!qrCodeData) {
            return res.status(404).json({ error: "QR Code not found." });
        }

        // Construct and send the response
        res.status(200).json({
            qrCodeId: qrCodeData._id,
            company: qrCodeData.company || "N/A",
            scannedData: qrCodeData.scannedData,
            totalViews: qrCodeData.scannedViews,
        });

    } catch (error) {
        console.error("Error fetching scans by QR code and company:", error);
        res.status(500).json({ error: "Server error." });
    }
};



