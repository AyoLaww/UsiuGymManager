import { useState } from "react";
import { supabase } from "./supabaseClient";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    //signup function
    const signUp = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        
        //Register user
        const { data, error } = await supabase.auth.signUp({ email, password });

        if(error || !data.user){
            setLoading(false);
            setError(error?.message || "Signup failed");
            return null;
        }

        const userId = data.user.id;

        //insert user into `users` table
        const { error: insertError } = await supabase.from("users").insert({
            id: userId,
            role: "user",
        });

        setLoading(false);

        if(insertError){
            setError(insertError.message);
            return null;
        }

        return data.user;
    };


    //Login function
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        setLoading(false);

        if(error){
            setError(error.message);
            return null;
        }

        return data.user;
    };

    //Logout function
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
      
        if (error) {
          setError(error.message);
          return false;
        }
      
        return true;
      };
      

    return {
        loading,
        error, 
        signIn,
        signUp,
        signOut,
    }
};

