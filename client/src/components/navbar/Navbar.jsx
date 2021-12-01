import "./navbar.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <div className="left">
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i>
                        <AiFillFacebook size="20px" className="socials" />
                    </i>
                </a>
                <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i>
                        <AiFillTwitterSquare size="20px" className="socials" />
                    </i>
                </a>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i>
                        <AiFillInstagram size="20px" className="socials" />
                    </i>
                </a>
            </div>
            <div className="center">
                <ul className="nav-list">
                    <li className="list-item">
                        <Link to="/" className="item-link">
                            HOME
                        </Link>
                    </li>
                    <li className="list-item">
                        <Link to="/about" className="item-link">
                            ABOUT
                        </Link>
                    </li>

                    <li className="list-item write-item">
                        <Link to="/write" className="item-link">
                            WRITE
                        </Link>
                    </li>
                    {/* 
                    <li className="list-item">ABOUT</li>
                    <li className="list-item">CONTACT</li>
                    <li className="list-item">WRITE</li>
                    <li className="list-item">LOGOUT</li> */}
                </ul>
            </div>
            <div className="right">
                {/* <img
                    src="https://picsum.photos/200"
                    alt="profile-img"
                    className="profile-img"
                /> */}
                <Link to="/search">
                    <i>
                        <AiOutlineSearch className="search" />
                    </i>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
