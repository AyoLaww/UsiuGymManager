import { FC } from "react";
import { Card } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

const Header: FC<{ userName: string }> = ({ userName }) => (
  <header className="w-full bg-blue-500 flex items-center justify-between px-8 py-4">
    <div className="flex items-center gap-2">
      <Image src="/logo1.png" alt="USIU Logo" width={40} height={40} />
      <span className="text-white text-xl font-bold">USIU Gym Manager</span>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <CircleUserRound size={32} color="#ffffff" />
        <span className="text-white font-semibold text-lg">{userName}</span>
      </div>
      <LogoutButton />
    </div>
  </header>
);

export default Header; 