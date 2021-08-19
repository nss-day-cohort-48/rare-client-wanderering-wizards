import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "./CommentProvider";
import { PostContext } from "../posts/PostProvider";

export const CommentForm = () => {
	const { post, getPostsDetails } = useContext(PostContext);
	const { createComment, deleteComment, updateComment } =
		useContext(CommentContext);

	const [comments, setComments] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const { postId } = useParams();
	const history = useHistory();

	const handleControlledInputChange = (event) => {
		const newComment = { ...comments };
		newComment[event.target.name] = event.target.value;
		setComments(newComment);
	};

	useEffect(() => {
		getPostsDetails(postId);
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			return;
		} else {
			handleSaveComments();
		}
	}, [isLoading]);

	const checkForm = () => {
		if (comments.content === undefined) {
			return false;
		} else {
			return true;
		}
	};

	const handleSaveComments = () => {
		const userId = localStorage.getItem("rare_user_id");
		if (checkForm() === true) {
			createComment({
				post_id: parseInt(postId),
				author_id: parseInt(userId),
				content: comments.content,
				created_on: new Date().toISOString().slice(0, 10),
			}).then(() => history.push(`/posts/${postId}`));
		} else {
			window.alert(
				"Please fill in all form fields before submitting your comment."
			);
			setIsLoading(false);
		}
	};

	const renderDeleteCommentButton = (id) => {
		return (
			<button
				onClick={() => {
					deleteComment(id).then(() => {
						getPostsDetails(postId);
					});
				}}
			>
				Delete
			</button>
		);
	};

	const renderEditCommentButton = (id) => {
		// console.log(id);
		return (
			<button
				id={id}
				onClick={() => {
					history.push(`/comments/edit/${id}`);
				}}
			>
				Edit
			</button>
		);
	};

	return (
		<>
			<button
				onClick={(event) => {
					history.goBack([-1]);
					event.preventDefault();
				}}
			>
				Back to post
			</button>
			<h1>New Comment</h1>

			<form className="flex comments">
				<fieldset>
					<div>
						<label htmlFor="comment">Comment:</label>
						<input
							type="content"
							id="content"
							name="content"
							onChange={handleControlledInputChange}
						/>
					</div>
				</fieldset>

				<button
					style={{ marginBottom: "1rem", marginTop: "1rem" }}
					disabled={isLoading}
					onClick={(event) => {
						setIsLoading(true);
						event.preventDefault();
					}}
				>
					Send
				</button>
			</form>

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
							{comment.isAuthor ? renderEditCommentButton(comment.id) : ""}
							{comment.isAuthor ? renderDeleteCommentButton(comment.id) : ""}
						</div>
					</>
				);
			})}
		</>
	);
};
