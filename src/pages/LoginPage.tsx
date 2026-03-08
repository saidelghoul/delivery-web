import { LoginForm } from "../features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50">
      {/* Left Side: Branding/Visual (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12 text-white">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-bold">Delivery Management System</h1>
          <p className="text-blue-100 text-lg">
            Real-time tracking, fleet management, and seamless logistics for
            sellers and drivers.
          </p>
          {/* You can add a delivery SVG or illustration here from assets */}
          <div className="pt-8 opacity-20">
            <img
              src="/assets/delivery-truck.svg"
              alt="Logistics"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Right Side: The Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px]">
          {/* Header for mobile view */}
          <div className="md:hidden mb-8 text-center">
            <h2 className="text-3xl font-bold text-blue-600">DELIVERY-APP</h2>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact your Dispatcher
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
