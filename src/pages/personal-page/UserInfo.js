export default function UserInfo () {
    const userData = JSON.parse(localStorage.getItem("user")) || {}
    return (
        <div>
            <p>Hi, </p>
            <h1>{userData.name}</h1>
        </div>
    )
}