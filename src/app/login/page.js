"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

import { signIn, signUp } from "@/services/auth";
import { db } from "@/lib/firebase";

import Alert from "@/components/ui/Alert";
import OfflineModal from "@/components/login/OfflineModal";

export default function LoginPage() {
  const router = useRouter();

  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPswHidden, setPswHidden] = useState(true);

  const [error, setError] = useState("");
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const timerRef = useRef(null);

  /* -------------------------------- utilities -------------------------------- */

  const isOnline = () => navigator.onLine;

  const startCountdown = () => {
    clearInterval(timerRef.current);
    setCountdown(10);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  /* -------------------------------- handlers -------------------------------- */

  const handleAuthSwitch = () => {
    setError("");
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!isOnline()) {
      setShowOfflineModal(true);
      startCountdown();
      return;
    }

    try {
      await signIn(email, password);
      router.replace("/profile");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isOnline()) {
      setShowOfflineModal(true);
      startCountdown();
      return;
    }

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username,
        createdAt: new Date(),
      });

      router.replace("/profile");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err) => {
    if (err instanceof FirebaseError) {
      setError(err.message);
    } else {
      setError("Unexpected error occurred");
    }
  };

  const handleRetryClick = () => {
    if (isOnline()) {
      clearInterval(timerRef.current);
      setShowOfflineModal(false);
    }
  };

  /* -------------------------------- render -------------------------------- */

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="row w-100 mx-0 rounded-5 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        {/* Logo */}
        <div className="col-md-6 p-5 d-flex justify-content-center align-items-center bg-light">
          <img
            src="/logo.png"
            alt="logo"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column align-items-center">
          <h2>{authType === "login" ? "Hello, Again" : "Welcome"}</h2>
          <p className="text-muted">
            {authType === "login"
              ? "We are happy to have you back."
              : "Create your account to get started."}
          </p>

          <Alert message={error} type="error" onClose={() => setError("")} />

          <form
            onSubmit={authType === "login" ? handleLogin : handleRegister}
            className="w-100"
          >
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {authType === "register" && (
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={isPswHidden ? "password" : "text"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPswHidden((p) => !p)}
                >
                  {isPswHidden ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              {authType === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-3">
            {authType === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button className="btn btn-link p-0" onClick={handleAuthSwitch}>
              {authType === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      <OfflineModal
        show={showOfflineModal}
        countdown={countdown}
        handleRetryClick={handleRetryClick}
      />
    </div>
  );
}
