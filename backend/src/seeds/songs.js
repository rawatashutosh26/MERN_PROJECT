import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		imageUrl: "https://picsum.photos/400/400?random=1",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		duration: 46, // 0:46
	},
	{
		title: "Midnight Drive",
		artist: "The Wanderers",
		imageUrl: "https://picsum.photos/400/400?random=2",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
		duration: 41, // 0:41
	},
	{
		title: "Lost in Tokyo",
		artist: "Electric Dreams",
		imageUrl: "https://picsum.photos/400/400?random=3",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Summer Daze",
		artist: "Coastal Kids",
		imageUrl: "https://picsum.photos/400/400?random=4",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Neon Lights",
		artist: "Night Runners",
		imageUrl: "https://picsum.photos/400/400?random=5",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Mountain High",
		artist: "The Wild Ones",
		imageUrl: "https://picsum.photos/400/400?random=6",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
		duration: 40, // 0:40
	},
	{
		title: "City Rain",
		artist: "Urban Echo",
		imageUrl: "https://picsum.photos/400/400?random=7",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Desert Wind",
		artist: "Sahara Sons",
		imageUrl: "https://picsum.photos/400/400?random=8",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Ocean Waves",
		artist: "Coastal Drift",
		imageUrl: "https://picsum.photos/400/400?random=9",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Starlight",
		artist: "Luna Bay",
		imageUrl: "https://picsum.photos/400/400?random=10",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
		duration: 30, // 0:30
	},
	{
		title: "Winter Dreams",
		artist: "Arctic Pulse",
		imageUrl: "https://picsum.photos/400/400?random=11",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
		duration: 29, // 0:29
	},
	{
		title: "Purple Sunset",
		artist: "Dream Valley",
		imageUrl: "https://picsum.photos/400/400?random=12",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
		duration: 17, // 0:17
	},
	{
		title: "Neon Dreams",
		artist: "Cyber Pulse",
		imageUrl: "https://picsum.photos/400/400?random=13",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Moonlight Dance",
		artist: "Silver Shadows",
		imageUrl: "https://picsum.photos/400/400?random=14",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
		duration: 27, // 0:27
	},
	{
		title: "Urban Jungle",
		artist: "City Lights",
		imageUrl: "https://picsum.photos/400/400?random=15",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Crystal Rain",
		artist: "Echo Valley",
		imageUrl: "https://picsum.photos/400/400?random=16",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Neon Tokyo",
		artist: "Future Pulse",
		imageUrl: "https://picsum.photos/400/400?random=17",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Midnight Blues",
		artist: "Jazz Cats",
		imageUrl: "https://picsum.photos/400/400?random=18",
		audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
		duration: 29, // 0:29
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();
