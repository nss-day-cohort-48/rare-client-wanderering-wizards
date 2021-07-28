import React from "react"
import { Route } from "react-router-dom"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryList } from "./category/CategoryList"
import { CategoryForm } from "./category/CategoryForm"
import { PostProvider } from "./posts/PostProvider"
import { MyPostList } from "./posts/MyPostList"
import { PostList } from "./posts/PostList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <PostProvider>
        <CategoryProvider>
            <Route exact path="/categories">
                <CategoryList />
                <CategoryForm/>
            </Route>
            <Route exact path="/myposts">
                <MyPostList />
            </Route>
            <Route exact path="/posts">
                <PostList />
            </Route>
        </CategoryProvider>
        </PostProvider>
    </>
}
