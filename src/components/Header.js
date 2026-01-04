"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRooms } from "@/contexts/RoomsContext"; // ✅ nuovo

export default function Header({ minimal = false }) {
  const { rooms, loading: roomsLoading } = useRooms(); // ottieni stanze
  const { currentUser, loading: authLoading, logout } = useAuth();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Menu principale
  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Room",
      href: "/rooms",
      submenu: rooms
        .filter((room) => room.active) // <-- solo stanze attive
        .map((room) => ({
          label: room.title,
          href: `/rooms/${room.slug}`,
        })),
    },
    {
      label: "Mie Prenotazioni",
      href: "/prenotazioni",
      requiresAuth: true,
    },
  ];

  return (
    <header className="bg-bgHeader text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          ROOM HUNTERS
        </Link>

        {/* Menu principale */}
        {!minimal && (
          <nav className="flex items-center gap-6 text-sm relative">
            {menuItems
              .filter((item) => !item.requiresAuth || currentUser)
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

                  {/* Sottomenu stanze */}
                  {item.submenu && openDropdown === idx && !roomsLoading && (
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

            {/* Login / Logout */}
            {!authLoading &&
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
