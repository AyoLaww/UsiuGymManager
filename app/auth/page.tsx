import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col gap-10 flex-1 items-center justify-center">
          <div className="flex flex-col gap-2 items-center">
            <Image src="/logo1.png" alt="USIU Logo" width={30} height={30} />
            <p className="text-2xl font-bold text-blue-500">USIU GYM MANAGER</p>
          </div>
        
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/gym.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}