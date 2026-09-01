import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("landing");
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (loginError) {
        throw loginError;
      }

      if (role === "student") {
        localStorage.setItem("userRole", "student");
        navigate("/student");
      } else {
        setError(`${role} portal is not available yet.`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === "landing") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Smart Placement
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
          Student-Admin Portal
        </h1>

        <p className="max-w-xl text-slate-500 mb-8">
          Connect students with opportunities. Powered by AI-driven
          matching and assessment.
        </p>

        <button
          onClick={() => setStep("role")}
          className="rounded-xl bg-blue-600 text-white font-semibold px-8 py-3 shadow-sm hover:bg-blue-700 transition mb-16"
        >
          Login / Sign Up
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 text-left shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              🎯
            </div>

            <p className="font-semibold text-slate-900 mb-1">
              Smart Matching
            </p>

            <p className="text-sm text-slate-500">
              AI-powered job matching based on your skills and goals
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 text-left shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
              💼
            </div>

            <p className="font-semibold text-slate-900 mb-1">
              Opportunities
            </p>

            <p className="text-sm text-slate-500">
              Access curated job opportunities from top companies
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 text-left shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              🤖
            </div>

            <p className="font-semibold text-slate-900 mb-1">
              Questions
            </p>

            <p className="text-sm text-slate-500">
              Curated questions to prepare for interviews
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "role") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">

          <button
            onClick={() => setStep("landing")}
            className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Who's signing in? 👋
          </h1>

          <p className="mt-2 mb-8 text-slate-500">
            Choose your role to continue
          </p>

          <div className="space-y-3">

            <button
              onClick={() => {
                setRole("student");
                setStep("form");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">
                🎓 Student
              </p>

              <p className="text-sm text-slate-500">
                Access opportunities and applications
              </p>
            </button>

            <button
              onClick={() => {
                setRole("recruiter");
                setStep("form");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">
                💼 Recruiter
              </p>

              <p className="text-sm text-slate-500">
                Post opportunities and review candidates
              </p>
            </button>

            <button
              onClick={() => {
                setRole("admin");
                setStep("form");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">
                🛠️ Admin
              </p>

              <p className="text-sm text-slate-500">
                Manage users, skills, companies, and reports
              </p>
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <button
            onClick={() => setStep("role")}
            className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>

          <p className="mb-2 text-sm font-medium text-blue-600 capitalize">
            {role} Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;