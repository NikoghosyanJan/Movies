import { Link } from "react-router-dom";
import "./style.scss";
import Cookie from "js-cookie"
import LoginSvgIcon from "../resourses/icons/LoginSvgIcon";
import UserSvgIcon from "../resourses/icons/UserSvgIcon";
import HeartSvgIcon from "../resourses/icons/HeartSvgIcon";
import { useState } from "react";
import AuthModal from "./modals/AuthModal";

export default function Header() {
    const [modal, setModal] = useState(false);

    return (
        <header>
            <Link to="/" >Home</Link>
            <nav className="navigation">
                <Link className="header-action" to="/personal-page">
                    {Cookie.get("auth") ? <div> <UserSvgIcon /> </div> :
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                setModal(true);
                            }}
                        > <LoginSvgIcon /></div>}
                </Link>
                <Link className="header-action" to="/personal-page/wish-list">
                    <div className="to-wish-list" onClick={(e) => {
                        if(!Cookie.get("auth") ){
                            e.preventDefault();
                            setModal(true);
                        }
        
                    }}><HeartSvgIcon />
                    </div>
                </Link>
            </nav>
            {modal && <AuthModal setModal={setModal}/>}
        </header>
    )
}