import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { Link, useHistory } from "react-router-dom";
import "./post.css";

export const MyPostList = (props) => {
  const { posts, getPostsByUserId, deletePost } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPostsByUserId();
  }, []);

  const editPostButton = (post_id) => {
      return (
        <button
          className="post blueText"
          id={`post--${post_id}`}
          onClick={(event) => {
            event.preventDefault();
            handleUpdatePost(post_id);
          }}
        >
          Edit Post
        </button>
      );
    }

  // const renderDeleteButton = () => {
	// 	return (
	// 		<button
	// 			onClick={() => {
	// 				deletePost(postId).then(() => {
	// 					history.push("/myposts");
	// 				});
	// 			}}
	// 		>
	// 			DELETE POST
	// 		</button>
	// 	);
	// };

  const handleUpdatePost = (post_id) => {
    history.push(`/posts/edit/${post_id}`);
  };

  return (
    <>
      <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
      >
        Create Post?
      </button>
      <div>
        <h1>My Posts</h1>
        {posts.map((post) => {
          return (
            <>
              <article className="flex">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <div>{post.category.label}</div>
                <div>
                  {post.user.first_name} {post.user.last_name}
                </div>
                {post.is_post_author?editPostButton(post.id):""}
                <button onClick={() => {
					            deletePost(post.id).then(() => {
						          history.push("/myposts")
                      getPostsByUserId();
					      });}}>DELETE POST</button>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
};
