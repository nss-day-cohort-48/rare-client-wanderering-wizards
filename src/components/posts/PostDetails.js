import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../comments/CommentProvider";

export const PostDetails = () => {
	const { post, getPostsDetails } = useContext(PostContext);

	const userId = parseInt(localStorage.getItem("rare_user_id"));
	// console.log(userId)

	const { postId } = useParams();
	const history = useHistory();

	useEffect(() => {
		getPostsDetails(postId);
	}, []);

	return (
		<>
        <div style={{textAlign: "center", marginBottom: "3rem"}}>
				<button 
					onClick={() => {
						history.goBack([-1]);
					}}
				>
					Back to All Posts
				</button></div>
			<div className="postDetailContainer">
				<h1 className="postDetailTitle">{post.title}</h1>
				<div className="postDetailTitle">{post.publication_date}</div>
				<div style={{textAlign: "center"}}>
					<img style={{maxHeight: "24.6rem"}}src={post.image_url}></img>
				</div>
				<div className="postDetailTitle">{post.content}</div>
				<div className="postDetailBody">
					{/* <img src={post.user.author?.profile_image_url} />{" "}
											{post.user.first_name} {post.user.last_name} */}
				</div>

				<div>Category: {post.category?.label}</div>
				{post.tags?.map((tag) => {
					return (
						<>
							<div>Tag: {tag.label}</div>
						</>
					);
				})}

				<button
					onClick={() => {
						history.push(`/posts/comments/${postId}`);
					}}
				>
					View Comments
				</button>
			</div>
		</>
	);
};
