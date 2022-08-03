import { useState } from "react";

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    handleNewBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div className="blogFormDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input
            value={title}
            id="title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </p>
        <p>
          author:
          <input
            value={author}
            id="author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </p>
        <p>
          url:
          <input
            value={url}
            id="url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </p>
        <button id="createBlog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
