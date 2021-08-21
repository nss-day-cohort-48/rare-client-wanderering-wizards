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
        className="btn btn-1 btn-sep icon-send"
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
      <div>
        <div>
        {posts.map((post) => {
          return (
            <>
              <article className="flexMyPosts">
										<div className="postLeft">
											<div className="postAuthorDiv">
												<img
													className="postPI"
													src={post.user.author?.profile_image_url}
												/>
												<strong>
													{post.user.first_name} {post.user.last_name}
												</strong>
												<p style={{ margin: "0 3px 0 3px" }}>in</p>
												<strong>{post.category.label}</strong>
											</div>
											<strong>
												<Link className="postTitle" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
											</strong>
											<div>{post.content.slice(0, 50).trim()}...</div>
											<div className="postDateTag">
												<div className="postPubDate">
													{post.publication_date}
												</div>
												<span style={{ paddingRight: "8px" }}>•</span>
												{post.tags?.slice(0, 2).map((tag) => {
													return (
														<>
															<div className="postTag">{tag.label}</div>
														</>
													);
												})}
											</div>
										</div>
										<div className="postRight">
											<img className="postImage" src={post.image_url} />
										</div>
									</article>
                  <div className="myPostsButtons">
                  {editPostButton()}
                  <button className="btn btn-1 btn-sep icon-send"
				onClick={() => {
					deletePost(post.id).then(() => {
						history.push("/myposts");
					});
				}}
			>
				DELETE POST
			</button>
                  
                  </div>
                  
            </>
          );
        })}

        </div>
      </div>
    </>
  );
};
