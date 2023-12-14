import mongoose from 'mongoose'
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    timeinterval: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo