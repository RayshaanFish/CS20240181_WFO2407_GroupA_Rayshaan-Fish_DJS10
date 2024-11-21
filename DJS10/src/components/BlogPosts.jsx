import React, { useState, useEffect } from "react";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="blog-posts">
      {posts.map((post, index) => (
        <div key={post.id} className="post">
          <h2>
            {index + 1}. {post.title}
          </h2>{" "}
          {/* Numbered title */}
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
