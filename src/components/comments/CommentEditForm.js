import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "./CommentProvider";

export const CommentEditForm = () => {
	const { comment, setComment, getCommentById, updateComment } =
		useContext(CommentContext);

	const { commentId } = useParams();

	const history = useHistory();

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

	const editCommentButton = (commentObj) => {
		return (
			<button
      className="postSubmitButton"
				id={commentObj.id}
				onClick={(event) => {
					event.preventDefault();
					updateComment(commentObj).then(() => {
						history.goBack([-1]);
					});
				}}
			>
				Edit
			</button>
		);
	};

	return (
		<form className="postFormContainer">
			<div className="postFormBox">
				<fieldset className="postFormSet">
					
					<input
            style={{padding: "8px"}}
						type="content"
						id="content"
						name="content"
						value={comment.content}
						onChange={changeCommentState}
					/>
				</fieldset>
				{editCommentButton(comment)}
			</div>
		</form>
	);
};
