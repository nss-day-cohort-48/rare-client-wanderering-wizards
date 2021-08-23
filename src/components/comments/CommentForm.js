import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "./CommentProvider";
import { PostContext } from "../posts/PostProvider";
import "../comments/CommentStyle.css";
export const CommentForm = () => {
	const { post, getPostsDetails } = useContext(PostContext);
	const { createComment, deleteComment, updateComment } =
		useContext(CommentContext);

	const [comments, setComments] = useState({content: ""});
	const [isLoading, setIsLoading] = useState(false);

	const [moreComments, setMoreComments] = useState(0);
	const [nextComments, setNextComments] = useState(5);

	const handleClickMoreComments = () => {
		const moreCommentsCopy = moreComments;
		const nextCommentsCopy = nextComments;

		let commentNext = moreCommentsCopy + 5;
		let moreCommentsNext = nextCommentsCopy + 5;

		setMoreComments(commentNext);
		setNextComments(moreCommentsNext);
	};

	const handleClickMoreCommentsReset = () => {

		let moreComments = 0;
		let nextComments = 5;

		setMoreComments(moreComments);
		setNextComments(nextComments);
	};

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
			}).then(() => {
        getPostsDetails(postId)
        setComments({content: ""})
      });
		} else {
			window.alert(
				"Please fill in the comment form!"
			);
			setIsLoading(false);
		}
	};

	const renderDeleteCommentButton = (id) => {
		return (
			<button
				className="myCommentEditButton"
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
				className="myCommentEditButton"
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
			<form className="postFormContainer">
				<div className="commentFormBox">
					<fieldset className="commentFormSet">
						<textarea
              required
							style={{ padding: "8px", resize: "vertical" }}
							placeholder="Write Comment Here"
							cols="73"
              rows="5"
							type="content"
              value={comments.content}
							id="content"
							name="content"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<button
						className="myCommentEditButton"
						disabled={isLoading}
						onClick={(event) => {
							setIsLoading(true);
							event.preventDefault()
              ;
						}}
					>
						Send
					</button>
				</div>
			</form>

			{post.comments?.slice(moreComments, nextComments).map((comment) => {
				return (
					<>
						<div className="comment-page-comment commentBox">
							<div className="commentPIDiv">
								<img
									className="commentPI"
									src={comment.user.author.profile_image_url}
								/>
								{comment.user.first_name}
							</div>
							<div style={{ marginBottom: "1rem" }}>{comment.content}</div>
							<div>
								{comment.isAuthor ? renderEditCommentButton(comment.id) : ""}
								{comment.isAuthor ? renderDeleteCommentButton(comment.id) : ""}
							</div>
						</div>
					</>
				);
			})}
      {post.comments.length <= 5 ? "" : 
			<div style={{textAlign: "center", marginBottom: "2rem"}}>
				<div
					className="myCommentEditButton"
					onClick={() => {
						handleClickMoreComments();
					}}
				>
					Show More Comments
				</div>
				<div
					className="myCommentEditButton"
					onClick={() => {
						handleClickMoreCommentsReset();
					}}
				>
					Go back
				</div>
			</div>}
		</>
	);
};
