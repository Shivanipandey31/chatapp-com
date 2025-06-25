import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		console.log("🔍 MONGO_DB_URI =", process.env.MONGO_DB_URI); 

		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("✅ Connected to MongoDB");
	} catch (error) {
		console.log("❌ Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
