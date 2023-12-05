import { useContext, useEffect } from "react";
import CommentDetails from "./CommentDetails";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { PostsContext } from "../contexts/PostsContext";
import { BASE_URL } from "../utils";

const Comments = () => {
    const { id } = useParams();
    const { comments, dispatch } = useContext(PostsContext);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(BASE_URL + `/posts/${id}/comments`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_COMMENTS', payload: json })
            }
        }

        fetchComments();
    }, [id, dispatch])


    return (
        <div className="comment-section">
            <h3>Commentaires</h3>
            <div className="comments" style={comments ? { border: 'inherit' } : { border: 'none' }}>
                {comments && comments.map(comment => (
                    <CommentDetails key={comment._id} comment={comment} />
                ))}
            </div>
            <CommentForm />
        </div>
    );
}

export default Comments;