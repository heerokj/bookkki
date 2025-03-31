"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const session = useSession();
  const userName = session.data?.user?.name;

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userName);

        if (error) console.error(error.message);
        if (data) {
          const logInUser = data[0];
          setUserData(logInUser);
        }
      }
    };
    if (session) {
      getUser();
    }
  }, [session]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
