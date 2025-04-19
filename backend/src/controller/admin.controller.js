import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file, resourceType = "auto") => {
	try {
		if (!file || !file.tempFilePath) {
			throw new Error("Invalid file object");
		}

		// Validate file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			throw new Error("File size exceeds 10MB limit");
		}

		const uploadOptions = {
			resource_type: resourceType,
			folder: process.env.CLOUDINARY_FOLDER,
			timeout: 60000,
			chunk_size: 6000000 // 6MB chunks
		};

		// Add upload preset only if it exists
		if (process.env.CLOUDINARY_UPLOAD_PRESET) {
			uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
		}

		const result = await cloudinary.uploader.upload(file.tempFilePath, uploadOptions);

		if (!result || !result.secure_url) {
			throw new Error("Upload failed - no secure URL returned");
		}

		return result.secure_url;
	} catch (error) {
		console.error("Error in uploadToCloudinary:", error);
		throw new Error(`Error uploading to cloudinary: ${error.message}`);
	}
};

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload both audio and image files" });
		}

		const { title, artist, albumId, duration } = req.body;
		
		if (!title || !artist || !duration) {
			return res.status(400).json({ message: "Missing required fields: title, artist, and duration are required" });
		}

		// Validate duration format (should be in seconds)
		const durationInSeconds = parseInt(duration);
		if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
			return res.status(400).json({ message: "Invalid duration format. Please provide duration in seconds." });
		}

		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		// Validate file types
		if (!audioFile.mimetype.startsWith('audio/')) {
			return res.status(400).json({ message: "Invalid audio file type. Please upload an audio file." });
		}
		if (!imageFile.mimetype.startsWith('image/')) {
			return res.status(400).json({ message: "Invalid image file type. Please upload an image file." });
		}

		// Upload files to Cloudinary
		let audioUrl, imageUrl;
		try {
			[audioUrl, imageUrl] = await Promise.all([
				uploadToCloudinary(audioFile, "auto"),
				uploadToCloudinary(imageFile, "image")
			]);
		} catch (error) {
			console.error("Error uploading files:", error);
			return res.status(500).json({ message: "Error uploading files to cloud storage" });
		}

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration: durationInSeconds,
			albumId: albumId || null,
		});

		await song.save();

		// if song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}

		res.status(201).json(song);
	} catch (error) {
		console.error("Error in createSong:", error);
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};
