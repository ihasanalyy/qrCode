import mongoose from "mongoose";



const qrCodeSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "location"]},  
  name: { type: String, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: String, required: true },
  public_id: { type: String },
  company: { type: String },
  text: { type: String }, // Only for text-based QR codes
  scannedData: [
    {
      browser: { type: String }, // Browser name (e.g., "Chrome", "Firefox")
      browserVersion: { type: String }, // Browser version (e.g., "113.0")
      os: { type: String }, // OS name (e.g., "iOS", "Android", "Windows")
      ipAddress: { type: String }, // User's IP address
      city: { type: String, default: "Unknown" }, // User's city
      state: { type: String, default: "Unknown" }, // User's state/region
      country: { type: String, default: "Unknown" }, // User's country
      timestamp: { type: Date, default: Date.now }, // Scan timestamp
    },
  ],// save the browser from which the QR code was scanned
  pickupDetails: { // Only for location-based QR codes
    address: String,
    lat: Number,
    lng: Number,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  qrCodeImage: { type: String }, // Local path or S3 URL in future
  scannedViews: { type: Number, default: 0 },
}, { timestamps: true });

const schemaQrCode = mongoose.model("QRCode", qrCodeSchema);
export default schemaQrCode;
