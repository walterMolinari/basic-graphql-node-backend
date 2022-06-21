import mongoose from 'mongoose'


const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})
noteSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Nota = mongoose.model('note',noteSchema)

export default Nota