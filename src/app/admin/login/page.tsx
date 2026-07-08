import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  // Already logged in? Skip straight to the dashboard.
  if (await getCurrentUser()) redirect("/admin");

  return (
    <div className="admin-auth">
      <div className="admin-card">
        <h1 className="admin-title">Đăng nhập quản trị</h1>
        <p className="admin-sub">Khu vực dành cho quản trị viên ASyncs.</p>
        <LoginForm />
      </div>
    </div>
  );
}
