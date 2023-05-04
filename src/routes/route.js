const  express = require("express");
const router = express.Router();
const {createUser, loginUser} = require("../controllers/userController");
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const { createComment, getComments, getSpecificComment, updateComment, deleteComment } = require("../controllers/commentController");
const { authentication } = require("../middlewares/auth");

// user api's
router.post("/createUser", createUser);
router.post("/login", loginUser);

// blogapi's

router.post("/createBlog", authentication, createBlog );
router.get("/getBlogs", authentication, getBlogs);
router.get("/getBlog/:id", authentication, getBlog );
router.put("/updateBlog/:id", authentication, updateBlog);
router.delete("/deleteBlog/:id", authentication, deleteBlog);

// comment api's

router.post("/createComment", authentication, createComment );
router.get("/getcomments/:blogId", authentication, getComments);
router.get("/getcomment/:commentId", authentication, getSpecificComment );
router.put("/updateComment/:commentId", authentication, updateComment);
router.delete("/deleteComment/:commentId", authentication, deleteComment);



module.exports = router;