import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import Cookie from "js-cookie";
import "./style.scss"

const Wishlist = lazy(() => import("./Wishlist"))
const UserInfo = lazy(() => import("./UserInfo"))


export default function PersonalRoutes() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!Cookie.get("auth")){
            navigate("/")
        }
    }, [])

    return (
        <div className="personal-page">
            <nav className="personal-nav">
                <ul>
                    <li className={params["*"] === "" ? "active" : ""}>
                        <Link to="/personal-page">User Details</Link>
                    </li>
                    <li className={params["*"] === "wish-list" ? "active" : ""}>
                        <Link to="/personal-page/wish-list">Wishlist</Link>
                    </li>
                    <li
                        onClick={()=> {
                            navigate("/")
                                Cookie.remove("auth");
                                localStorage.removeItem("user");
                                localStorage.removeItem("wishList");
                                window.location.reload();
                        }}
                    >
                        <Link to="/">Log out</Link>
                    </li>
                </ul>
            </nav>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<UserInfo />} />
                    <Route path="/wish-list" element={<Wishlist />} />

                </Routes>
            </Suspense>
        </div>
    )
}