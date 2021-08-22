import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../category/CategoryProvider";
import { TagContext } from "../tags/TagProvider";

export const PostForm = () => {
	const { createPost } = useContext(PostContext);
	const { categories, getCategories } = useContext(CategoryContext);
	const { tags, getTags } = useContext(TagContext);
	const [currentPicture, setCurrentPicture] = useState({});

	const [post, setPosts] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [postTags, setPostTags] = useState([]);

	const history = useHistory();

	const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(file);
	};

	const createPostImageString = (event) => {
		getBase64(event.target.files[0], (base64ImageString) => {
			// console.log("Base64 of file is", base64ImageString);

			// Update a component state variable to the value of base64ImageString
			setCurrentPicture(base64ImageString);
		});
	};

	const handleControlledInputChange = (event) => {
		const newPost = { ...post };
		newPost[event.target.name] = event.target.value;
		setPosts(newPost);
	};

	useEffect(() => {
		getCategories();
		getTags();
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			return;
		} else {
			handleSavePost();
		}
	}, [isLoading]);

	const checkForm = () => {
		if (
			post.category_id === undefined ||
			post.title === undefined ||
			post.content === undefined
		) {
			return false;
		} else {
			return true;
		}
	};

	const handleSavePost = () => {
		// const userId = localStorage.getItem("rare_user_id");
		if (checkForm() === true) {
			createPost({
				category_id: parseInt(post.category_id),
				title: post.title,
				publication_date: new Date().toISOString().slice(0, 10),
				image_url: currentPicture,
				content: post.content,
				approved: 0,
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
							placeholder="Post Title"
							type="title"
							id="title"
							name="title"
							className="postFormField"
							onChange={handleControlledInputChange}
						/>
					</fieldset>

					<fieldset className="postFormSet">
						<textarea
							style={{ resize: "vertical" }}
							value={post.content}
							placeholder="Content"
							type="content"
							rows="8"
							id="content"
							name="content"
							className="postFormField"
							onChange={handleControlledInputChange}
						/>
					</fieldset>
					<fieldset className="postFormSet">
						<select
							value={post.category_id}
							name="category_id"
							id="category_id"
							className="postSelectBox"
							onChange={handleControlledInputChange}
						>
							<option
								style={{ fontStyle: "italic", fontWeight: "600" }}
								value="0"
							>
								Select Category{" "}
							</option>
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
										className=""
										key={tag.id}
										value={tag.id}
										onClick={(event) => {
											const copyPostTags = [...postTags];
											const idPosition = copyPostTags.indexOf(tag);
											if (idPosition >= 0) {
												copyPostTags.splice(idPosition, 1);
											} else {
												copyPostTags.push(tag.id);
											}
											setPostTags(copyPostTags);
										}}
									/>
									<div>{tag.label}</div>
								</div>
							</>
						))}
					</fieldset>
					<fieldset className="postUpload postFormSet ">
						<input
							type="file"
							id="image_url"
							className="postFormField"
							onChange={createPostImageString}
						/>
					</fieldset>
					<button
						className="postSubmitButton"
						disabled={isLoading}
						onClick={(event) => {
							setIsLoading(true);
							event.preventDefault();
						}}
					>
						Save Post
					</button>
				</div>
			</form>
		</>
	);
};
