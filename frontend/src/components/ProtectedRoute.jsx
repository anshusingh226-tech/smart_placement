import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if a Supabase session exists
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setLoading(false);
          return;
        }

        setUser(session.user);

        // Get role from profiles table
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Profile error:", error);
          setLoading(false);
          return;
        }

        setRole(profile.role);
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // While checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User is logged in but doesn't have a role
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Account setup error
          </h1>

          <p className="mt-2 text-slate-500">
            Your profile or role could not be found.
          </p>
        </div>
      </div>
    );
  }

  // User has the wrong role for this route
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    if (role === "student") {
      return <Navigate to="/student" replace />;
    }

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "placement-officer") {
      return (
        <Navigate
          to="/placement-officer"
          replace
        />
      );
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;