"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { currentUser } = useAuth();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  // 👉 HEADER SEMPLIFICATO (login)
  if (isLoginPage) {
    return (
      <header className="border-bottom py-3">
        <div className="container text-center">
          <Link href="/" className="navbar-brand fw-bold">
            EscapeRooms
          </Link>
        </div>
      </header>
    );
  }

  // 👉 HEADER NORMALE
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          EscapeRooms
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link href="/escape-rooms" className="nav-link">
                Escape Rooms
              </Link>
            </li>

            {!currentUser && (
              <li className="nav-item">
                <Link href="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link href="/profile" className="nav-link">
                  👤
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
