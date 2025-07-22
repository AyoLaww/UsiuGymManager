"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const result = await signIn(email, password);
    if (!result) {
      setError("Login failed. Check your credentials.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", result.id)
      .single();

    if (error || !data) {
      console.error("Error fetching user role:", error?.message);
      setError("Failed to fetch user role.");
      setLoading(false);
      return;
    }

    switch (data.role) {
      case "admin":
        router.push("/admin");
        break;
      default:
        router.push("/user");
    }

    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const result = await signUp(email, password);
    if (result) {
      await supabase.from("users").insert({
        id: result.id,
        role: "user",
      });

      router.push(`/success?email=${encodeURIComponent(email)}`);
    } else {
      setError("Signup failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader className="flex flex-col gap-2 items-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="py-6"
              />
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="pr-10 py-6"
                />
                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <p className="text-xs">hide</p> : <p className="text-xs">show</p>}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleLogin}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Login
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mt-2"
              onClick={handleSignup}
              disabled={loading}
            >
                Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
