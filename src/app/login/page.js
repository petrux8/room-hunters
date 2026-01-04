"use client";

import { mapFirebaseError } from "@/utils/firebaseErrors";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AuthInput from "@/components/AuthForm/AuthInput";
import AuthButton from "@/components/AuthForm/AuthButton";
import AuthToggleLink from "@/components/AuthForm/AuthToggleLink";
import GoogleButton from "@/components/AuthForm/GoogleButton";

export default function AuthForm() {
  const { currentUser, loading, login, signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [type, setType] = useState("login");
  const isLogin = type === "login";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState(null);
  const [firstUserCheck, setFirstUserCheck] = useState(true);

  useEffect(() => {
    if (!loading && currentUser && firstUserCheck) {
      router.replace("/");
    }
    if (!loading) {
      setFirstUserCheck(false);
    }
  }, [loading, currentUser, router, firstUserCheck]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!isLogin && form.password !== form.confirmPassword) {
      setFeedback({ type: "error", message: "Le password non corrispondono." });
      return;
    }

    try {
      if (isLogin) {
        await login(form.email, form.password);
        setFeedback({ type: "success", message: "Login riuscito!" });
      } else {
        await signup(form.email, form.password, form.firstName, form.lastName);
        setFeedback({ type: "success", message: "Registrazione riuscita!" });
      }
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setFeedback({ type: "error", message: mapFirebaseError(error) });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setFeedback({ type: "success", message: "Login con Google riuscito!" });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setFeedback({ type: "error", message: mapFirebaseError(error) });
    }
  };

  if (loading) {
    return <>Loading...</>; //TODO: Replace with spinner
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      {feedback && (
        <div
          className={`p-2 mb-4 rounded ${
            feedback.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {feedback.message}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Bentornato!" : "Benvenuto!"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <AuthInput
              name="firstName"
              placeholder="Nome"
              value={form.firstName}
              onChange={handleChange}
            />
            <AuthInput
              name="lastName"
              placeholder="Cognome"
              value={form.lastName}
              onChange={handleChange}
            />
          </>
        )}
        <AuthInput
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {!isLogin && (
          <AuthInput
            name="confirmPassword"
            type="password"
            placeholder="Conferma Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}
        <AuthButton>{isLogin ? "Accedi" : "Registrati"}</AuthButton>
      </form>

      <div className="mt-4 flex flex-col gap-2">
        <GoogleButton isLogin={isLogin} onClick={handleGoogleLogin} />
        {isLogin && (
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Password dimenticata?
          </a>
        )}
        <AuthToggleLink isLogin={isLogin} setType={setType} />
      </div>
    </div>
  );
}
