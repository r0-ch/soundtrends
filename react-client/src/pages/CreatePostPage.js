import { useContext, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const filename = files[0] ? files[0].name : "Votre magnifique illustration !";
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('summary', summary);
        formData.set('content', content);
        formData.set('cover', files[0]);

        const response = await fetch(`${process.env.BASE_URL}/posts/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            setTitle('');
            setSummary('');
            setContent('');
            document.querySelector('input[type=file]').value = '';

            navigate(`/post/${json._id}`)
        }

        if (!response.ok) {
            setError(json.error)
        }
    }

    return (
        <main>
            <div className="post-form">
                <h2>Votre nouveau post</h2>
                <form className="form" onSubmit={handleSubmit} encType="multipart/form-data" >
                    <div className="form__fields">
                        <input
                            className="form__field"
                            type="text"
                            placeholder="Un titre original !"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            className="form__field form__field--area"
                            placeholder="Un résumé qui accroche !"
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                        />
                        <ReactQuill
                            className="form__field form__field--quill"
                            theme="snow"
                            placeholder="Votre contenu"
                            value={content}
                            onChange={setContent}
                        />
                        <input
                            // className="form__buttons__button"
                            type="file"
                            id="file"
                            onChange={e => setFiles(e.target.files)} />
                        <label className="form__button file" htmlFor="file">{filename ? filename : "Votre magnifique illustration !"}</label>
                    </div>

                    <div className="form__footer">
                        <button className="form__button submit">
                            Publier
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg> */}
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </main>
    )
}

export default CreatePostPage;