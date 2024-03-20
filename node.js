const express = require("express");
const { Room, RoomType } = require("./collection");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.post("/api/v1/rooms-types", async (req, res) => {
  try {
    const { name } = req.body;
    const roomType = await RoomType.create({ name });
    return res.status(201).json({ roomType });
  } catch (error) {
    console.error("Error storing room type:", error);
    return res.status(500).json({ error: "Unable to store room type" });
  }
});

app.get("/api/v1/rooms-types", async (req, res) => {
  try {
    const roomTypes = await RoomType.find({});
    return res.status(200).json({ roomTypes });
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Unable to fetch room types" });
  }
});

app.post("/api/v1/rooms", async (req, res) => {
  try {
    const { name, roomType, price } = req.body;
    const room = await Room.create({ name, roomType, price });
    return res.status(201).json({ room });
  } catch (error) {
    console.error("Error storing room:", error);
    return res.status(500).json({ error: "Unable to store room" });
  }
});

app.get("/api/v1/rooms", async (req, res) => {
  try {
    const { search, roomType, minPrice, maxPrice } = req.query;
    const filter = {};
    if (search) filter.name = new RegExp(search, "i");
    if (roomType) filter.roomType = ObjectId(roomType);
    if (minPrice && maxPrice)
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    else if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
    else if (minPrice) filter.price = { $gte: parseInt(minPrice) };

    const rooms = await Room.find(filter);
    return res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Unable to fetch rooms" });
  }
});

app.patch("/api/v1/rooms/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, roomType, price } = req.body;
    const room = await roomsCollection.updateOne(
      { _id: ObjectId(roomId) },
      { $set: { name, roomType: ObjectId(roomType), price } }
    );
    return res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    console.error("Error editing room:", error);
    return res.status(500).json({ error: "Unable to edit room" });
  }
});

app.delete("/api/v1/rooms/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const deletedRoom = await roomsCollection.deleteOne({
      _id: ObjectId(roomId),
    });
    return res
      .status(200)
      .json({ message: "Room deleted successfully", deletedRoom });
  } catch (error) {
    console.error("Error deleting room:", error);
    return res.status(500).json({ error: "Unable to delete room" });
  }
});

app.get("/api/v1/rooms/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await roomsCollection.findOne({ _id: ObjectId(roomId) });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return res.status(500).json({ error: "Unable to fetch room" });
  }
});

async function startServer() {
  const uri =
    "mongodb+srv://collinsaninze:G2aRragWUxse8F7M@cluster0.0zldxy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose.connect(uri) 
}

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  startServer()
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((error) => {
    console.log("error connected to database:", error);
  });;
});