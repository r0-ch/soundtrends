import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
// import Logout from "./Logout";
// import '../styles/Navbar.css'

const Navbar = () => {
    const { user, dispatch } = useContext(UserContext);


    const handleClick = () => {
        localStorage.removeItem('user');

        dispatch({ type: 'LOGOUT' });
    }


    return (
        <header className="header">
            <nav className="nav">
                <Link className="nav__brand" to="/">
                    <h1 className="logo">SoundTrends</h1>
                </Link>
                {user ? (
                    <div className="nav__options">
                        <Link className="nav__options__create nav__options__option" to="/create">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>
                        <Link className="nav__options__profile nav__options__option" to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </Link>
                        <button className="nav__options__logout nav__options__option" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                            </svg>
                        </button>
                        {/* <Logout /> */}
                    </div>
                ) : (
                    <div className="nav__options nav__logs">
                        <Link to="/login">Se connecter</Link>
                        <Link to="/signup">S'inscrire</Link>
                    </div>
                )
                }
            </nav >
        </header>
    );
}

export default Navbar;