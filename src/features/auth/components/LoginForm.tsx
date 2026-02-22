import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../../../components/common/Input";
import { Button } from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });

      switch (user.role) {
        case "SYSTEM_ADMIN":
          navigate("/admin/overview");
          break;
        case "DISPATCHER":
          navigate("/fleet-management");
          break;
        case "DRIVER":
          navigate("/my-routes");
          break;
        case "SELLER":
          navigate("/inventory/shipments");
          break;
        case "CLIENT":
          navigate("/track-my-package");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      // Error is already handled by the hook's 'error' state
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-6 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Login to Delivery</h2>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@company.com"
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  );
};
