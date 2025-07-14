"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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
        <Button className="bg-none text-blue-500 hover:bg-blue-500 hover:text-white" variant="outline" onClick={handleLogout}>
          <LogOut />
        </Button>
      );
}
