import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const DeletePost = ({ post }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = () => {
        document.querySelector('dialog').showModal()
    }

    const handleCancel = () => {
        document.querySelector('dialog').close()
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:4000/api/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (response.ok) {
            navigate('/')
        }
    }


    return (
        <div>
            <button onClick={handleClick} className="option delete">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <dialog className="dialog">
                <form>
                    <button onClick={handleDelete}>supprimer</button>
                    <button onClick={handleCancel}>annuler</button>
                </form>
            </dialog>
        </div>
    );
}

export default DeletePost;