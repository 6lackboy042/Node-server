const mongoose = require ("mongoose")
const Room = model('Room', roomSchema)
const RoomType = model('Room Type', roomTypeSchema)

module.exports = {
    Room,
    RoomType
}