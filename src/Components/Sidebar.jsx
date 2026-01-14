import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sideBarDiv">
      <img src="/vite.svg" onClick={() => navigate("/dashboard")} />
      <ul>
        <li>
          <Link to="/restaurant" className="d-flex align-items-center gap-1">
            <i className="bi bi-shop"></i>
            <span>Restaurant</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
