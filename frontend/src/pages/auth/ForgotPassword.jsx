import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-blue-600"
        >
          ← Back to Login
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h1 className="text-3xl font-bold text-slate-900">
            Forgot Password
          </h1>

          <p className="mt-2 mb-6 text-slate-500">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit}>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 mb-4"
            />

            {message && (
              <p className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                {message}
              </p>
            )}

            {error && (
              <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;