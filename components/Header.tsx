import { FC } from "react";
import { Card } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

const Header: FC<{ userName: string }> = ({ userName }) => (
  <header className="w-full bg-blue-500 flex items-center justify-between px-8 py-4">
    <span className="text-white text-2xl font-bold">USIU GYM MANAGER</span>
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