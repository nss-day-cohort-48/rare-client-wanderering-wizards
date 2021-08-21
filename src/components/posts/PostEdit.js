import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../category/CategoryProvider";
import { TagContext } from "../tags/TagProvider";
import "../posts/post.css";
export const PostEdit = () => {
	const { updatePost, getPost } = useContext(PostContext);
	const { categories, getCategories } = useContext(CategoryContext);
	const { tags, getTags } = useContext(TagContext);

	const [post, setPost] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	const [postTags, setPostTags] = useState([]);

	const history = useHistory();
	const { postId } = useParams();

	const handleControlledInputChange = (event) => {
		const editPost = { ...post };
		editPost[event.target.name] = event.target.value;
		setPost(editPost);
	};

	useEffect(() => {
		getCategories().then(getTags);
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			return;
		} else {
			handleSavePost();
		}
	}, [isLoading]);

	// state is undefined
	useEffect(() => {
		getPost(postId).then((post) => {
			// console.log(post)
			setPost({
				id: postId,
				category_id: parseInt(post.category.id),
				title: post.title,
				image_url: post.image_url,
				content: post.content,
			});
			setPostTags(post.tags);
		});
	}, [postId]);

	const checkForm = () => {
		if (
			post.category_id === undefined ||
			post.title === undefined ||
			post.image_url === undefined ||
			post.content === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

	const handleSavePost = () => {
		// const userId = localStorage.getItem("rare_user_id")
		if (checkForm() === true) {
			updatePost({
				id: postId,
				category_id: parseInt(post.category_id),
				title: post.title,
				image_url: post.image_url,
				content: post.content,
				tags: postTags,
			}).then(() => history.push("/myposts"));
		} else {
			window.alert("Please fill in all form fields before submitting post.");
			setIsLoading(false);
		}
	};

	return (
		<>
			<form className="postFormContainer">
				<div className="postFormBox">
					<fieldset className="postFormSet">
						<input
							value={post.title}
							type="title"
							id="title"
							name="title"
							className="postFormField"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="postFormSet">
						<input
							value={post.image_url}
							type="image_url"
							id="image_url"
							name="image_url"
							className="postFormField"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="postFormSet">
						<textarea
							value={post.content}
							type="content"
							id="content"
							name="content"
							className="postFormField"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="postFormSet">
						<select
							className="postSelectBox"
							value={post.category_id}
							name="category_id"
							id="category_id"
							className="postSelectBox"
							onChange={handleControlledInputChange}
						>
							<option value="0">Select Category </option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.label}
								</option>
							))}
						</select>
					</fieldset>
					<fieldset className="postTags postFormSet">
						{tags.map((tag) => (
							<>
								<div className="tagDiv">
									<input
										type="checkbox"
										key={tag.id}
										value={tag.id}
										onClick={(event) => {
											const copyPostTags = [...postTags];
											const idPosition = copyPostTags.findIndex(
												(postTag) => postTag.id === tag.id
											);
											if (idPosition >= 0) {
												copyPostTags.splice(idPosition, 1);
											} else {
												copyPostTags.push(tag);
											}
											setPostTags(copyPostTags);
										}}
										checked={postTags.some((postTag) => {
											return postTag.id === tag.id;
										})}
									/>
									<div>{tag.label}</div>
								</div>
							</>
						))}
					</fieldset>

					<button
						className="postSubmitButton"
						disabled={isLoading}
						onClick={(event) => {
							setIsLoading(true);
							event.preventDefault();
						}}
					>
						Edit Post
					</button>
				</div>
			</form>
		</>
	);
};
