import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "location"], required: true },  
  name: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String }, // Only for text-based QR codes
  scannedData: [
    {
      source: { type: String },       // Kis source se scan hua (e.g., "QR code", "Web link")
      views: { type: Number, default: 0 } // Kitne views hain iss source ke liye
    }
  ], // save the browser from which the QR code was scanned
  pickupDetails: { // Only for location-based QR codes
    address: String,
    lat: Number,
    lng: Number,
  },
  qrCodeImage: { type: String }, // Local path or S3 URL in future
  scannedViews: { type: Number, default: 0 },
}, { timestamps: true });

const schemaQrCode = mongoose.model("QRCode", qrCodeSchema);
export default schemaQrCode;
