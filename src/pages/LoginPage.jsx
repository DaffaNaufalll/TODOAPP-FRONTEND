import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginWithEmail, loginWithGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password cannot blank!");
      return;
    }

    try {
      await loginWithEmail(email, password);
      toast.success("Login success!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid authentication!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Login via google successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Google login error");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl text-green-800 font-bold mb-6 text-center">
          Please login!
        </h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-success w-full"
          >
            Login
          </button>
        </form>

        <div className="divider my-6">--- Or ---</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-primary w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;