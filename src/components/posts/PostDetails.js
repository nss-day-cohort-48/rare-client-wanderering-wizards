import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { CommentForm } from "../comments/CommentForm";

import commentBubble from "../../images/chat.png"

export const PostDetails = () => {
	const { post, getPostsDetails } = useContext(PostContext);
	const [menuActive, setMenuActive] = useState(false);

	const userId = parseInt(localStorage.getItem("rare_user_id"));
	// console.log(userId)

	const { postId } = useParams();
	const history = useHistory();

	useEffect(() => {
		getPostsDetails(postId);
	}, []);

	const showComments = () => {
		return <CommentForm />;
	};

	return (
		<>
			<div className="postDetailContainer">
				<h1 className="postDetailTitle">{post.title}</h1>
				<div style={{ marginBottom: "2rem" }}>
					<div className="postDetailTitle"> {post.category?.label}</div>

					{post.tags?.map((tag) => {
						return (
							<>
								<div className="postDetailTitle">{tag.label}</div>
							</>
						);
					})}
					<div className="postDetailTitle">{post.publication_date}</div>
				</div>
				<div style={{ textAlign: "center" }}>
					<img
						style={{ maxHeight: "24.6rem", marginBottom: "2rem" }}
						src={post.image_url}
					></img>
				</div>
				<div className="postDetailTitle" style={{ marginBottom: "2rem" }}>
					{post.content}
				</div>
				
        <div className="showCommentsButton">
				<img src={commentBubble}
					className="commentBubbleStyle"
					onClick={() => {
						if (menuActive) {
							setMenuActive(false);
						} else {
							setMenuActive(true);
						}
					}}
				/>
        <div style={{marginLeft: "1rem"}}>
				{post.comments?.length}
        </div></div>
			</div>
      <div className="postDetailLine"></div>
			{menuActive ? showComments() : ""}
		</>
	);
};
