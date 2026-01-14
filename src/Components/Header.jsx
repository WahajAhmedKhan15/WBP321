import { useAuth } from "../Contexts/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  
  return (
    <div className="headerDiv">
      <span>Welcome, {userDetail?.userName}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
