import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-auth");
    return () => {
      document.body.classList.remove("bg-auth");
    };
  });
  return (
    <div>
      <Suspense fallback={<Outlet />}></Suspense>
    </div>
  );
};

export default AuthLayout;
