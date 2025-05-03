const addstatemodel = require('../Model/AddStateModel')
const addhotelmodel = require('../Model/AddHotelModel')
const addroommodel = require('../Model/AddRoomModel')

const RoomModel = require('../Model/AddRoomModel');


exports.addRoom = async (req, res) => {
    const { name, type, price, image, hotel } = req.body;

    try {
        const newRoom = new RoomModel({
            name,
            type,
            price,
            image,
            hotel,
            isActive: true,
            isDeleted: false
        });

        await newRoom.save();

        res.status(200).json({ message: "Room successfully added", data: newRoom });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ message: "Failed to add room" });
    }
};


exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await RoomModel.find()
            .populate({
                path: "AddHotel",
                populate: {
                    path: "AddCity",
                    populate: {
                        path: "AddState"
                    }
                }
            });

        res.status(200).json({ message: "All rooms fetched", data: allRooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await RoomModel.findById(id)
            .populate({
                path: "hotel",
                populate: {
                    path: "city",
                    populate: {
                        path: "state"
                    }
                }
            });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room found", data: room });
    } catch (error) {
        console.error("Error getting room:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, image } = req.body;

    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(
            id,
            { name, type, price, image },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room updated", data: updatedRoom });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Update failed" });
    }
};


exports.softDeleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await RoomModel.findByIdAndUpdate(
            id,
            { isDeleted: true, isActive: false },
            { new: true }
        );

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room soft deleted", data: room });
    } catch (error) {
        console.error("Error soft deleting room:", error);
        res.status(500).json({ message: "Delete failed" });
    }
};


exports.activateRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await RoomModel.findByIdAndUpdate(
            id,
            { isDeleted: false, isActive: true },
            { new: true }
        );

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room activated", data: room });
    } catch (error) {
        console.error("Error activating room:", error);
        res.status(500).json({ message: "Activation failed" });
    }
};


exports.hardDeleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoom = await RoomModel.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room permanently deleted" });
    } catch (error) {
        console.error("Error hard deleting room:", error);
        res.status(500).json({ message: "Deletion failed" });
    }
};
