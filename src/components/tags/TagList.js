import React, { useContext, useEffect} from "react"
import { TagContext } from "./TagProvider"

export const TagList = () => {
    const {tags, getTags} = useContext(TagContext)

    const alphabeticalTags = tags.sort((tag1, tag2) => tag1.label.localeCompare(tag2.label))

    useEffect(() => {
        getTags()
    }, [])

    return (
        <div>
            <h1>tags</h1>
            {
                alphabeticalTags.map(tag => {
                    return (
                        <div>{tag.label}</div>
                    )
                })
            }
        </div>
    )
}