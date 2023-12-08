import "./register.css"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });



  const { loading, error, dispatch } = useContext(AuthContext);
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/auth/register", userData);
        dispatch({ type: "REGISTRATION_SUCCESS", payload: res.data });
        navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTRATION_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <div className="rContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="rInput"
            autoComplete="username"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="rInput"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
            className="rInput"
            
          />
          <button type="submit" disabled={loading} className="rButton">Register</button>
          {error && <span>{error.message}</span>}
        </div>
      </form>
    </div>
  );
};

export default Register;

