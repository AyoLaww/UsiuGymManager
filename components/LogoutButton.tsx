"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const { signOut } = useAuth();
    const router = useRouter();
  
    const handleLogout = async () => {
      const success = await signOut();
      if (success) {
        router.push("/auth"); 
    };
    }

    return (
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      );
}
