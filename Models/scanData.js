import mongoose from 'mongoose';

const scannedDataSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userId', required: true },
    userId: { type: String, required: true },
    browser: { type: String },
    browserVersion: { type: String },
    os: { type: String },
    ipAddress: { type: String },
    city: { type: String, default: "Unknown" },
    state: { type: String, default: "Unknown" },
    country: { type: String, default: "Unknown" },
    qrCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
    timestamp: { type: String, unique: true }, //  hex string timestamp
  }, { timestamps: true });

const data = mongoose.model("scannedDataSchema", scannedDataSchema);
export default data;