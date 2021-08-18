import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../comments/CommentProvider";

export const PostDetails = () => {
	const { post, getPostsDetails, deletePost } = useContext(PostContext);
	const { deleteComment } = useContext(CommentContext);
  const { postId } = useParams();
	const history = useHistory();

	const userId = parseInt(localStorage.getItem("rare_user_id"));

	useEffect(() => {
		getPostsDetails(postId);
	}, []);

	const renderDeleteButton = () => {
		return (
			<button
				onClick={() => {
					deletePost(postId).then(() => {
						history.push("/myposts");
					});
				}}
			>
				DELETE POST
			</button>
		);
	};

	const renderDeleteCommentButton = (id) => {
		return (
			<button
				onClick={() => {
					deleteComment(id).then(() => {
            getPostsDetails(postId)
					});
				}}
			>
				DELETE
			</button>
		);
	};

  return (
          <>
          <div>
              <h1>{post.title}</h1>     
                  <div>{post.publication_date}</div>
                  <img src={post.image_url}></img>
                  <div>{post.content}</div>
                  <div>Category: {post.category?.label}</div>
                  <div>Author: {post.user?.first_name} {post.user?.last_name}</div>
                  {post.is_post_author?renderDeleteButton():""}

				{post.comments?.map((comment) => {
					return (
						<>
							<div
								style={{
									marginTop: "3rem",
									marginBottom: "3rem",
								}}
							>
								{comment.user.first_name}
								<br />
								{comment.content}
								{comment.isAuthor ? renderDeleteCommentButton(comment.id) : ""}
							</div>
						</>
					);
				})}
				<button
					onClick={() => {
						history.push(`/posts/comments/${postId}`);
					}}
				>
					Comment
				</button>
			</div>
		</>
	);
};
