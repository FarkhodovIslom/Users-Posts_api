const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/posts.json");
const data = fs.readFileSync(filePath, "utf8");
let posts = JSON.parse(data); 

const pageController = {

    index: (req, res) => {
        res.render('index');
    },

    getPosts: (req, res) => {
        res.render('posts', {posts});  
    }, 

    getPostById: (req, res) => {
        const postId = parseInt(req.params.id);

        const post = posts.find(post => post.id === postId);

        if (!post) {
            return res.status(404).send("Id topilmadi");
        }

        res.render("carDetails", {posts});
    },

    newPost: (req, res) => {
        try {
            const newPost = {

                id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
                username: req.body.username,
                email: req.body.email, 

                post_title: req.body.post_title,
                post_content: req.body.post_content,
                posted_at: new Date().toISOString(),

            }
            posts.push(newPost);
            fs.writeFileSync(filePath, JSON.stringify(posts));
            res.redirect('/posts');
        } catch (error) {
            console.error("Xatolik manashuyerda ->", error);
            res.status(500).send("Error error!");
        }
    },

    deletePost: (req, res) => {
        console.log("Received request to delete post with ID:", req.params.id);
        try { 
            const postId = parseInt(req.params.id);

            const postIndex = posts.findIndex(post => post.id === postId);

            if (postIndex === -1) {
                console.log("Post not found for ID:", postId);
                return res.status(404).send("Bu ID dagi post topilmadi");
            }

            posts.splice(postIndex, 1);

            posts = posts.map((post, index) => ({
                ...post,
                id: index + 1
            })); 

            fs.writeFileSync(filePath, JSON.stringify(posts)); 
            console.log("Post deleted successfully:", postId);
            res.status(200).send("Post o'chirildi succesfully"); 
        } catch (err) {
            console.error("Xatolik manashuyerda ->", err);
            res.status(500).send("Error error!");  
        }
    }
}

module.exports = pageController;
