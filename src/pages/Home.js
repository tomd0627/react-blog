import useFetch from "../custom/useFetch";
import BlogList from "../blog/BlogList";

const Home = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
