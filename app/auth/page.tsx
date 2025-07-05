import LoginForm from "@/components/LoginForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-2xl font-semibold text-center text-primary mb-8">USIU Gym Manager</h1>
      <LoginForm />
    </div>
  );
}