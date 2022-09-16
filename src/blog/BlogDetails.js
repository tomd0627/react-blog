import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../custom/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useNavigate();

  const {
    data: blog,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history("/");
    });
  };

  return (
    <div className="blog-details">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <section>{blog.body}</section>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
