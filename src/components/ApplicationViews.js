import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./category/CategoryProvider";
import { CategoryList } from "./category/CategoryList";
import { CategoryForm } from "./category/CategoryForm";
import { PostProvider } from "./posts/PostProvider";
import { MyPostList } from "./posts/MyPostList";
import { PostDetails } from "./posts/PostDetails";
import { PostList } from "./posts/PostList";
import { PostForm } from "./posts/PostForm";
import { TagProvider } from "./tags/TagProvider";
import { TagList } from "./tags/TagList";
import { TagForm } from "./tags/TagForm";
import { PostEdit } from "./posts/PostEdit";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>
      <PostProvider>
        <CategoryProvider>
          <TagProvider>
            <Route exact path="/categories">
              <CategoryList />
              <CategoryForm />
            </Route>
            <Route exact path="/myposts">
              <MyPostList />
            </Route>
            <Route exact path="/posts/create">
              <PostForm />
            </Route>
            <Route exact path="/posts/:postId(\d+)">
              <PostDetails />
            </Route>
            <Route exact path="/posts">
              <PostList />
            </Route>
            <Route exact path="/posts/edit/:postId(\d+)">
              <PostEdit />
            </Route>
            <Route exact path="/tags">
              <TagList />
              <TagForm />
            </Route>
          </TagProvider>
        </CategoryProvider>
      </PostProvider>
    </>
  );
};
