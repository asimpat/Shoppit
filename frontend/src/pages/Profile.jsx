import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  if (!user) {
    navigate("/login");
    return null;
  }
  return <div>Welcome, {user}!</div>;
}
