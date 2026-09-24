import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function SignupPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          data: {
            role: role,
          },
        });

      if (signupError) {
        throw signupError;
      }

      if (!data.user) {
        throw new Error("Account could not be created.");
      }

      setMessage(
        "Account created successfully! Please check your email to confirm your account."
      );

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ROLE SELECTION
  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">

          <button
            onClick={() => navigate("/")}
            className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>

          <p className="mb-2 text-sm font-medium text-blue-600">
            Smart Placement
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Create an account 👋
          </h1>

          <p className="mt-2 mb-8 text-slate-500">
            Choose your role to continue
          </p>

          <div className="space-y-3">

            {/* STUDENT */}
            <button
              onClick={() => {
                setError("");
                setRole("student");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">
                🎓 Student
              </p>

              <p className="text-sm text-slate-500">
                Create an account to access opportunities and applications
              </p>
            </button>

            {/* PLACEMENT OFFICER */}
            <button
              onClick={() => {
                setError("");
                setRole("placement-officer");
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-slate-900">
                💼 Placement Officer
              </p>

              <p className="text-sm text-slate-500">
                Manage companies, jobs, and student applications
              </p>
            </button>

            {/* ADMIN */}
            <button
              onClick={() => {
                setError("");
                setRole("admin");
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

          <p className="mt-8 text-sm text-slate-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign in
            </button>
          </p>

        </div>
      </div>
    );
  }

  // SIGNUP FORM
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <button
            onClick={() => {
              setError("");
              setMessage("");
              setRole(null);
            }}
            className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>

          <p className="mb-2 text-sm font-medium text-blue-600">
            {role === "placement-officer"
              ? "Placement Officer"
              : role}{" "}
            Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Create your account
          </h1>

          <p className="mt-2 text-slate-500">
            Sign up to get started
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                minLength={6}
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

            {/* CONFIRM PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />

            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {message && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}

          <button
            onClick={() => navigate("/")}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Sign In
          </button>

        </p>

      </div>

    </div>
  );
}

export default SignupPage;