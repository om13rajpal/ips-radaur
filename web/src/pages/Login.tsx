import { LoginForm } from "@/components/Form";
import { Toaster } from "@/components/ui/sonner"

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg border-1 border-zinc-700 p-20 rounded-3xl">
        <LoginForm />
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
