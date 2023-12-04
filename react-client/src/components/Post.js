import 'dotenv/config'
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parser from 'html-react-parser';
import DeletePost from "./DeletePost";
import { UserContext } from "../contexts/UserContext";
import { PostsContext } from "../contexts/PostsContext";
import { format } from "date-fns";

const Post = () => {

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user ? user.user._id : null;
    const { dispatch } = useContext(PostsContext);

    const [post, setPost] = useState('');
    const [author, setAuthor] = useState('');
    const [likes, setLikes] = useState('');
    const date = post.createdAt ? format(new Date(post.createdAt), 'd MMM yy') : 'N/A';


    const likePost = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.BASE_URL}/posts/${id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            setLikes(json)

        }
    }


    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${process.env.BASE_URL}/posts/${id}`);
            const json = await response.json();

            if (response.ok) {
                setPost(json);
                setAuthor(json.author);
                setLikes(json.likes);

            }
        }

        fetchPost()
    }, [id, dispatch])




    return (
        <div>
            <div className="post">
                {user && (
                    <div className="post__options">
                        {userId === author._id && (
                            <Link to={`/edit/${id}`} className="option edit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </Link>
                        )}

                        <button className="option like" onClick={likePost}
                            style={likes.includes(userId) ? { background: "rgba(255, 0, 0, 0.45)" } : { background: "inherit" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                        <Link className="option share" to={"#"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>
                        </Link>

                        {userId === author._id && (
                            <DeletePost post={post} />
                        )}

                    </div>
                )}
                <img className="post__cover" src={post.coverPath} alt="" />
                <div className="content">
                    <div className="content__info">
                        <time>le <span className="info">{date}</span></time>
                        <span>par <span className="info">{author.fullName}</span></span>
                        <span><span className="info">{likes.length}</span> like(s)</span>
                    </div>
                    <h3 className="content__title">{post.title}</h3>
                    <div className="content__body">{parser(`${post.content}`)}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;