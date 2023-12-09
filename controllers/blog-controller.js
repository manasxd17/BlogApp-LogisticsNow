const { ObjectId } = require("mongodb");
const { Blogs } = require("../models/blog-model")
const searchAbleFields = ['title', 'author', 'genre']

// RETURNS ALL THE BOOKS AS PER THE PASSED PARAMETERS LIKE SORT, PAGINATION, SEARCH TERM
const fetchBlogs = () => {
    return async(req, res, next) => {
        try{
            let builderObj = {};
            let searchObj = {};
            if(req.body.sort){
                let order = req.body.order ? req.body.order : 1
                builderObj['sort'] = {[req.body.sort]:order}
            }
            if(req.body.searchTerm && req.body.searchTerm.length >=3 ){
                searchObj["$or"] = searchAbleFields.map((e) => {
                    return {[e] : {$regex: req.body.searchTerm, $options : "i"}}
                })
            }
            let skip = req.query.from ? req.query.from : 0
            let size = req.query.size ? req.query.size : 10
            builderObj['skip'] = skip
            builderObj['limit'] = size
            console.log(JSON.stringify(searchObj))
            const resp = await Blogs.find(searchObj, {__v:0}, builderObj)
            res.status(200).json({success:true, data:resp})
        }
        catch(error){
            res.status(500).json({success:false, message:error.message})
        }
    }
}

// FETCH ALL INFO ABOUT A PARTICULAR BOOK
const fetchParticularBlog = () => {
    return async(req, res, next) => {
        try{
            if(req.query.blogId){
                const resp = await Blogs.findOne({_id : req.query.blogId}, {__v:0})
                if(!resp){
                    res.status(404).json({success:false, message:"No Blog Found"})
                }
                else{
                    res.status(200).json({success:true, message:"Blog Found", data:resp})
                }
            }
            else{
                throw new Error("Insufficient data")
            }
        }
        catch(error){
            res.status(500).json({success:false, message:error.message})
        }
    }
}


const createBlog = () => {
    return async(req, res, next) => {
        try{
            if(Object.keys(req.body).length > 1){
                let blogData = {
                    title : req.body.title,
                    description : req.body.description,
                    genre : req.body.genre,
                    author : req.userId,
                    publish_year : Date.now()
                }
                await Blogs.create(blogData)
                res.status(200).json({"success" : true, "message" : "New Blog created"})
            }
            else{
                res.status(400).json({"success" : false, "message" : "Insufficient Data"})
            }
        }
        catch(error){
            res.status(500).json({success:false, message:error.message})
        }
    }
}

const deleteBlog = () => {
    return async(req, res, next) => {
        try{
            if(req.query.blogId){
                const resp = await Blogs.findOne({_id : req.query.blogId})
                if(resp['author'] != req.userId){
                    res.status(403).json({success:false, message:"Forbidden"})
                }
                else{
                    await Blogs.deleteOne({"_id" : ObjectId(req.query.blogId)})
                    res.status(200).json({success:true, message:"Blog Deleted", data:resp})
                }
            }
            else{
                throw new Error("Insufficient data")
            }
        }
        catch(error){
            res.status(500).json({success:false, message:error.message})
        }
    }
}

module.exports = { fetchBlogs, fetchParticularBlog, createBlog, deleteBlog }