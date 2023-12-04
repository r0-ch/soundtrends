// import SignupForm from "../components/SignupForm";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const SignupPage = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const { dispatch } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password, fullName };

        const response = await fetch('https://soundtrends-backend.vercel.app/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            }
        })
        const json = await response.json();

        if (response.ok) {
            setFullName('');
            setEmail('');
            setPassword('');

            dispatch({ type: 'LOGIN', payload: json });
            localStorage.setItem('user', JSON.stringify(json))
        }
        if (!response.ok) {
            setError(json.error)
        }

    }

    return (
        <main>
            <div className="auth">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>S'inscrire</h1>
                    <div className="form__field">
                        <label htmlFor="signup-name">Votre pseudo :</label>
                        <input
                            type="text"
                            placeholder="fullname"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            id="signup-name"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="signup-email">Votre email :</label>
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="signup-email"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="signup-password">Votre mot de passe :</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="signup-password"
                        />
                    </div>
                    <button>Sign Up</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </main>
    );
}

export default SignupPage;