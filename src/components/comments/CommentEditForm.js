import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "./CommentProvider";

export const CommentEditForm = () => {
	const { comment, setComment, getCommentById, updateComment } = useContext(CommentContext);

	const { commentId } = useParams();

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (commentId) {
			getCommentById(commentId);
		}
	}, [commentId]);

	const changeCommentState = (event) => {
		const newCommentState = { ...comment };
		newCommentState[event.target.name] = event.target.value;
		setComment(newCommentState);
	};

	return (
		<form className="flex comments">
			<fieldset>
				<div>
					<label htmlFor="comment">Comment:</label>
					<input
						type="content"
						id="content"
						name="content"
						value={comment.content}
						onChange={changeCommentState}
					/>
				</div>
			</fieldset>

			<button
				style={{ marginBottom: "1rem", marginTop: "1rem" }}
				disabled={isLoading}
				onClick={(event) => {
					setIsLoading(true);
					event.preventDefault();
          updateComment(comment.id)
				}}
			>
				Send
			</button>
		</form>
	);
};
