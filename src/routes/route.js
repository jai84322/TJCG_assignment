const  express = require("express");
const router = express.Router();
const {createUser, loginUser} = require("../controllers/userController");
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const { createComment, getComments, getSpecificComment, updateComment, deleteComment } = require("../controllers/commentController");
const { authentication } = require("../middlewares/auth");

// user api's
router.post("/users", createUser);
router.post("/login", loginUser);

// blogapi's

router.post("/blogs", authentication, createBlog );
router.get("/blogs", authentication, getBlogs);
router.get("/blogs/:id", authentication, getBlog );
router.put("/blogs/:id", authentication, updateBlog);
router.delete("/blogs/:id", authentication, deleteBlog);

// comment api's

router.post("/comments", authentication, createComment );
router.get("/getcomments/:blogId", authentication, getComments);
router.get("/comments/:id", authentication, getSpecificComment );
router.put("/comments/:id", authentication, updateComment);
router.delete("/comments/:id", authentication, deleteComment);



module.exports = router;