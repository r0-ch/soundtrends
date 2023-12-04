import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { dispatch } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password };

        const response = await fetch(`${process.env.BASE_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();

        if (response.ok) {
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
                    <h1>Se connecter</h1>
                    <div className="form__field">
                        <label htmlFor="login-email">Votre email :</label>
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="login-email"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="login-password">Votre mot de passe :</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="login-password"
                        />
                    </div>
                    <button>Log In</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </main>
    );
}

export default LoginPage;