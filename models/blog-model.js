const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publish_year:{
        type:Number,
        required:false
    }
    },
    { timestamps:true }
)

const Blogs = mongoose.model('Blogs', blogSchema)

module.exports = { Blogs }