import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../custom/useFetch";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Tom");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const { data: blogs } = useFetch("http://localhost:8000/blogs/");
  // using lodash `uniqBy` to filter unique authors
  // reference: https://masteringjs.io/tutorials/lodash/filter-duplicates
  const uniqueAuthors = _.uniqBy(blogs, (obj) => obj.author);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, body, author };
    setIsLoading(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    }).then(() => {
      setIsLoading(false);
      history("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Blog Author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {uniqueAuthors.map((blog) => (
            <option key={blog.id} value={blog.author}>
              {blog.author}
            </option>
          ))}
        </select>
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
