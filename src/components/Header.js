"use client";

import Link from "next/link";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { rooms } from "@/data/rooms";
import { useAuth } from "@/contexts/AuthContext";

export default function Header({ minimal = false }) {
  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Room",
      href: "/rooms",
      submenu: rooms.map((room) => ({
        label: room.name,
        href: `/rooms/${room.slug}`,
      })),
    },
    {
      label: "Mie Prenotazioni",
      href: "/prenotazioni",
      requiresAuth: true, // <-- solo per utenti loggati
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const { currentUser, loading, logout } = useAuth();

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="bg-bgHeader text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        {/* <Link href="/">
          <img src="/logo.jpg" alt="Escape Room Logo" className="h-10 w-auto" />
        </Link> */}
        <Link href="/" className="font-bold text-lg">
          ROOM HUNTERS
        </Link>

        {/* Menu principale */}
        {!minimal && (
          <nav className="flex items-center gap-6 text-sm relative">
            {menuItems
              .filter((item) => !item.requiresAuth || currentUser) // filtra se serve autenticazione
              .map((item, idx) => (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded transition-colors ${
                      isActive(item.href)
                        ? "text-secondary font-semibold"
                        : "hover:text-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {item.submenu && openDropdown === idx && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                      {item.submenu.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.href}
                          className={`block px-4 py-2 hover:bg-gray-200 ${
                            isActive(subItem.href)
                              ? "font-semibold bg-gray-100"
                              : ""
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {/* Login */}
            {!loading &&
              (currentUser ? (
                <button
                  onClick={logout}
                  className="ml-4 rounded border border-white px-3 py-1 transition hover:bg-white hover:text-bgHeader"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`ml-4 rounded border border-white px-3 py-1 transition ${
                    isActive("/login")
                      ? "bg-white text-bgHeader font-semibold"
                      : "hover:bg-white hover:text-bgHeader"
                  }`}
                >
                  Accedi
                </Link>
              ))}
          </nav>
        )}
      </div>
    </header>
  );
}
