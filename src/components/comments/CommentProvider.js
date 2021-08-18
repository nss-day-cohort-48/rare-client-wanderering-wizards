import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const CommentContext = createContext();

export const CommentProvider = (props) => {
	const [comments, setComments] = useState([]);

	const getComments = () => {
		return fetch(`http://localhost:8000/comments`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
			.then((response) => response.json())
			.then(setComments);
	};

	const createComment = (commentObject) => {
		return fetch("http://localhost:8000/comments", {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(commentObject),
		});
	};

  const getCommentsByPostId = (postId) => {
		return fetch(`http://localhost:8000/posts/comments/${postId}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
			.then((response) => response.json())
			.then(setComments);
  }

	const deleteComment = (commentId) => {
		return fetch(`http://localhost:8000/comments/${commentId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
	}
  
	return (
		<CommentContext.Provider
			value={{
				comments,
				getComments,
				createComment,
        deleteComment,
        getCommentsByPostId
			}}
		>
			{props.children}
		</CommentContext.Provider>
	);
};
