import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { PostsContext } from "../contexts/PostsContext";
import { BASE_URL } from "../utils";

const CommentForm = () => {
    const { user } = useContext(UserContext);
    const postId = useParams().id;
    const [comment, setComment] = useState('');
    const { dispatch } = useContext(PostsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('connectez-vous')
            return
        }

        const response = await fetch(BASE_URL + `/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (response.ok) {
            setComment('');
            dispatch({ type: 'ADD_COMMENT', payload: json[0] })
            console.log(json[0])
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <textarea
                placeholder="Partagez votre réaction !"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button className="send">
                Commenter
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg> */}
            </button>
        </form>
    );
}

export default CommentForm;