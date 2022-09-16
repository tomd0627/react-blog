import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      {blogs.length > 0 && (
        <div>
          <h2>{title}</h2>
          {blogs.map((blog) => (
            <div className="blog-preview" key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <h2>{blog.title}</h2>
                <p>Written by: {blog.author}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      {blogs.length <= 0 && (
        <div>
          <h2>No blogs to display</h2>
        </div>
      )}
    </div>
  );
};

export default BlogList;
