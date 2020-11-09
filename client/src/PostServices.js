import axios from "axios";

const url = "http://localhost:3000/post";

class PostService {
  // Get Post
  // static mean we run from here inside itself
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          console.log("getpost invoked");
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }))
          );
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  // Create Post
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
