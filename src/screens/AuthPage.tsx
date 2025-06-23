/* eslint-disable @typescript-eslint/no-explicit-any */
import { BorderBeam } from "@/components/magicui/border-beam";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

// Firebase Google provider instance
const provider = new GoogleAuthProvider();

/**
 * AuthPage - Handles user authentication via Email/Password or Google OAuth.
 */
export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles form submission for login or auto signup if user is not registered.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      console.error(err.code);
      if (err.code === "auth/invalid-credential") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/");
        } catch (signupError: any) {
          setError(signupError.message || "Signup failed.");
        }
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is invalid.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles login using Google OAuth via Firebase
   */
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-dark-primary)] px-4">
      <div className="w-full max-w-lg bg-[var(--bg-dark-secondary)] rounded-xl shadow-lg p-8 space-y-6 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-[var(--green-primary)]">
          Log in to your account
        </h2>

        {/* Error Display */}
        {error && (
          <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(val) => setEmail(val)}
            placeholder="Enter your Email Address"
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(val) => setPassword(val)}
            placeholder="Enter your Password"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-[var(--bg-dark-primary)] border border-[var(--border-green)] text-white py-2 rounded-md hover:bg-black transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="text-white bg-[var(--bg-dark-secondary)] px-2">
              or
            </span>
          </div>
        </div>

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-white text-white py-2 rounded-md flex items-center justify-center gap-2 transition"
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-[var(--border-green)] to-transparent"
        />
      </div>
    </div>
  );
};

/**
 * InputField - Reusable controlled input field
 */
type InputFieldProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-[var(--green-secondary)]"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 text-white w-full border-[0.5px] border-[var(--border-green)] placeholder:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--green-secondary)]"
      required
    />
  </div>
);
