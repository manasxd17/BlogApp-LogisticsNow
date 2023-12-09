const { userCheckMiddleware } = require('../middlewares/api-auth')

const router = require('express').Router()

module.exports = () => {
    // BELOW ROUTE SUPPORTS PAGINATION AND SEARCH QUERYING
    router.post('/all', userCheckMiddleware(), require('../controllers/blog-controller').fetchBlogs())
    router.get('/blog_info', userCheckMiddleware(), require('../controllers/blog-controller').fetchParticularBlog())
    router.post('/create_blog', userCheckMiddleware(), require('../controllers/blog-controller').createBlog())
    router.delete('/delete_blog', userCheckMiddleware(), require('../controllers/blog-controller').deleteBlog())
    return router
}