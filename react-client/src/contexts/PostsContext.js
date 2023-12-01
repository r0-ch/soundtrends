import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'SET_POSTS_BY_NEWEST':
            return {
                posts: state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        case 'SET_POSTS_BY_OLDEST':
            return {
                posts: state.posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            }
        case 'SET_POSTS_BY_MOST_LIKES':
            return {
                posts: state.posts.sort((a, b) => b.likes.length - a.likes.length)
            }
        case 'SET_POSTS_BY_LEAST_LIKES':
            return {
                posts: state.posts.sort((a, b) => a.likes.length - b.likes.length)
            }
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter(comment => comment._id !== action.payload._id)
            }
        case 'ADD_COMMENT':
            return {
                comments: [...state.comments, action.payload]
            }
        default:
            return state
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null,
        comments: null
    })

    return (
        <PostsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}