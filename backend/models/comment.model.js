import mongoose from "mongoose";

const commentSlice = new mongoose.Schema(
    {
        content:{
            type: String,
            require: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        },
         userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
         likes: {
            type: Array,
            default:[]
        },
         numberOfLikes: {
            type: Number,
            default:0
        }
    },
    {timestamps:true}
)
const Comment = mongoose.model("Comment", commentSlice)
export default Comment;