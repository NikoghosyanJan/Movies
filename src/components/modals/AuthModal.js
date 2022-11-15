import { useState } from "react"
import LoginForm from "../forms/LoginForm"
import RegisterForm from "../forms/RegisterForm";
import "./style.scss"

export default function AuthModal({ setModal }) {
    const [authType, setAuthType] = useState("login")

    return (
        <div
            onClick={e => {
                if (e.target === e.currentTarget) {
                    e.preventDefault()
                    setModal(false)
                }
            }}
            className="modal-bg">
            <div className="modal">
                <div className="tabs">
                    <div
                        className={`tab ${authType === "login" ? "active" : ""}`}
                        onClick={() => setAuthType("login")}
                    >Login</div>
                    <div
                        className={`tab ${authType !== "login" ? "active" : ""}`}
                        onClick={() => setAuthType("register")}

                    >Register</div>
                </div>
                {authType === "login" ? <LoginForm setModal={setModal} /> : <RegisterForm setAuthType={setAuthType} />}
            </div>
        </div>
    )
}