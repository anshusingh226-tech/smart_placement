import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ role }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setAllowed(false);
          return;
        }

        const savedRole = localStorage.getItem("userRole");

        if (savedRole === role) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (error) {
        console.error("Route guard error:", error);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;