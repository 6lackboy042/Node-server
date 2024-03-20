const { model, Schema } = require('mongoose')

const roomTypeSchema = new Schema({
    name: String
})

const roomSchema = new Schema({
    name: String,
    roomType: {
        ref: "Room Type",
        type: Schema.Types.ObjectId
    },
    price: Number,
})

const Room = model('Room', roomSchema)
const RoomType = model('Room Type', roomTypeSchema)

module.exports = {
    Room,
    RoomType
}