"use client";

import { createClient } from "@/utils/supabase/client";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});
const supabase = createClient();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState("");
  const [role, setRole] = useState({});

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        sessionStorage.setItem(
          "role",
          JSON.stringify(session.user.app_metadata.claims_admin)
        );
        sessionStorage.setItem("session", "true");
      }
      setRole(sessionStorage.getItem("role"));
      setSession(sessionStorage.getItem("session"));
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    setSession,
    role,
    signOut: () => {
      sessionStorage.removeItem("session");
      sessionStorage.removeItem("role");
      supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
