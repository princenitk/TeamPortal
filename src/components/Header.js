import react from "react";
import {Link} from 'react-router-dom';
import '../styles/Header.css';


const Header = () =>{
    return (
        <header className="header">

            <div className="logo">
                <h1>Team Portal</h1>
            </div>

            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/employees">Employee List</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;
