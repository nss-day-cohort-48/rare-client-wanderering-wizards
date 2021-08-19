import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";

export const PostList = (props) => {
  const { posts, getPosts, managePostApproval } = useContext(PostContext);
  const isAdmin = JSON.parse(localStorage.getItem("rare_admin"));

  const approvedPosts = posts.filter((post) => post.approved > 0);
  const sortedPosts = approvedPosts.sort(
    (post1, post2) =>
      Date.parse(post2.publication_date) - Date.parse(post1.publication_date)
  );
  const now = new Date();
  // const filteredPostsByDate = sortedPosts.filter(
  //   (post) => Date.parse(post.publication_date) <= now
  // );
  const history = useHistory();
	
  useEffect(() => {
    getPosts();
  }, []);

	const manageApproval = (post) => {
		if (post.approved) {
			const updatedPost = {
				id: post.id,
				approved: 0
			}
			managePostApproval(updatedPost)
		} else {
			const updatedPost = {
				id: post.id,
				approved: 1
			}
			managePostApproval(updatedPost)
		}
	}

  // useEffect(()=>{
  // 	setAuthor(authors.find(author=>author.user.username === ))
  // },[authors])

  // const editPostButton = (user_id, post_id) => {
  // 	if (user_id == localStorage.getItem("rare_user_id")) {
  // 		return (
  // 			<button
  // 				className="post blueText"
  // 				id={`post--${post_id}`}
  // 				onClick={(event) => {
  // 					event.preventDefault();
  // 					handleUpdatePost(post_id);
  // 				}}
  // 			>
  // 				Edit Post
  // 			</button>
  // 		);
  // 	} else {
  // 		return;
  // 	}
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
        <h1>Posts</h1>
        {posts.map((post) => {
          return (		
            <>
              {isAdmin ? (
                <article className="flex">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  <div>
                    Author: {post.user.first_name} {post.user.last_name}
                  </div>
                  <div>Category: {post.category.label}</div>
                  <div>
                    <label for="approval">Approved </label>
                    <input
                      type="checkbox"
                      id={`approval-${post.id}`}
                      name="approval"
                      defaultChecked={post.approved ? "true" : ""}
											onChange={()=>{manageApproval(post)}}
                    />
                  </div>
                </article>
              ) 
							: 
							post.approved ?
							<article className="flex">
							<Link to={`/posts/${post.id}`}>{post.title}</Link>
							<div>
								Author: {post.user.first_name} {post.user.last_name}
							</div>
							<div>Category: {post.category.label}</div>
							<div></div>
						</article>
						: ""
							}
            </>
          );
        })}
      </div>
    </>
  );
};
