import mongoose from "mongoose";



const qrCodeSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "location"]},  
  name: { type: String, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: String, required: true },
  public_id: { type: String },
  company: { type: String },
  text: { type: String }, // Only for text-based QR codes

  pickupDetails: { // Only for location-based QR codes
    address: String,
    lat: Number,
    lng: Number,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  qrCodeImage: { type: String }, // Local path or S3 URL in future
  scannedViews: { type: Number, default: 0 },
}, { timestamps: true , unique: true });

const schemaQrCode = mongoose.model("QRCode", qrCodeSchema);
export default schemaQrCode;
