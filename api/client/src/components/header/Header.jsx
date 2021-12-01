import "./header.css";
import back from "../../assets/images/dark-back.jpg";
import { BsChevronDoubleDown } from "react-icons/bs";

import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="header">
            <div className="titles">
                <h2 className="title-sm">Public</h2>
                <h1 className="title-lg">Blog</h1>
            </div>

            <img src={back} alt="header-img" className="header-img" />
            <div className="scroll">
                <a href="#posts">
                    <BsChevronDoubleDown className="scroll-icon" />
                </a>
            </div>
            <Link to="/write">
                <div className="add-blog">
                    <BsPencilSquare className="write-post" />
                </div>
            </Link>
        </div>
    );
};
