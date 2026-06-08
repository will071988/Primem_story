"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Star,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/firebase/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FolderOpen, label: "Portf\u00f3lio", href: "/admin/portfolio" },
  { icon: Users, label: "Clientes", href: "/admin/clients" },
  { icon: Star, label: "Depoimentos", href: "/admin/testimonials" },
  { icon: MessageSquare, label: "Leads", href: "/admin/leads" },
  { icon: Settings, label: "Configura\u00e7\u00f5es", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1C1C1C] border-r border-white/5 flex flex-col h-screen">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C0C0C0]" />
          <span className="font-heading text-lg tracking-wider">PRIME STORY</span>
        </Link>
        <p className="text-white/30 text-xs mt-1">Painel Administrativo</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-[#C0C0C0] text-[#0A0A0A]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
