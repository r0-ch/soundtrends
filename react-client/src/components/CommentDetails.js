import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { PostsContext } from "../contexts/PostsContext";
import { format } from "date-fns";
import { BASE_URL } from "../utils";

const CommentDetails = ({ comment }) => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { dispatch } = useContext(PostsContext);

    const date = comment.createdAt ? format(new Date(comment.createdAt), 'd/MM/yy') : 'N/A';

    const handleClick = async () => {
        const response = await fetch(BASE_URL + `/posts/${id}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_COMMENT', payload: json[0] })
            console.log(json[0])
        }
    }

    return (
        <div className="comment">
            {/* {comment && (
                <div> */}
            <div className="comment__info">
                {comment.author && (
                    <p>par <span className="info-weight">{comment.author.fullName}</span></p>
                )}
                <span className="date">le <span className="info-weight">{date}</span></span>
            </div>

            <div className="comment__content">
                <p className="body">{comment.comment}</p>
                {user && comment.author && user.user._id === comment.author._id && (
                    <button className="delete" onClick={handleClick} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            {/* </div>
            )} */}
        </div>
    );
}

export default CommentDetails;