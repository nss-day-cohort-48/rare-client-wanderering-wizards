import React, { useContext, useEffect} from "react"
import { TagContext } from "./TagProvider"

export const TagList = () => {
    const {tags, getTags} = useContext(TagContext)

    useEffect(() => {
        getTags()
    }, [])

    return (
        <div>
            <h1>tags</h1>
            {
                tags.map(tag => {
                    return (
                        <div>{tag.label}</div>
                    )
                })
            }
        </div>
    )
}