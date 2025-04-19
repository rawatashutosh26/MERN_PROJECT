import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Validate Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
	console.error("Missing Cloudinary configuration. Please check your .env file");
	process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
});

// Test the configuration
const testCloudinaryConnection = async () => {
	try {
		const result = await cloudinary.api.ping();
		console.log("Cloudinary connection successful");
		return true;
	} catch (error) {
		console.error("Cloudinary connection failed:", error);
		return false;
	}
};

// Test connection on startup
testCloudinaryConnection();

export default cloudinary;
