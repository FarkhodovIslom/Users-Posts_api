const fs = require("fs");
const path = require("path");
const pageController = require("./controller");

const filePath = path.join(__dirname, "../data/posts.json");
let posts = JSON.parse(fs.readFileSync(filePath, "utf8"));

describe("deletePost function", () => {
    beforeEach(() => {
        // Reset posts before each test
        posts = [
            { id: 1, username: "user1", post_title: "Post 1", post_content: "Content 1" },
            { id: 2, username: "user2", post_title: "Post 2", post_content: "Content 2" }
        ];
        fs.writeFileSync(filePath, JSON.stringify(posts));
    });

    test("should delete an existing post", () => {
        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        pageController.deletePost(req, res);

        const updatedPosts = JSON.parse(fs.readFileSync(filePath, "utf8"));
        expect(updatedPosts).toHaveLength(1);
        expect(updatedPosts[0].id).toBe(1); // Check re-indexing
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Post o'chirildi succesfully");
    });

    test("should return 404 for a non-existing post", () => {
        const req = { params: { id: 3 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        pageController.deletePost(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Bu ID dagi post topilmadi");
    });
});
