"use client";

import { useEffect, useState } from "react";
import { getLeads, getPortfolioItems, getClients } from "@/firebase/firestore";
import { LayoutDashboard, FolderOpen, Users, MessageSquare } from "lucide-react";

interface DashboardData {
  totalLeads: number;
  totalPortfolio: number;
  totalClients: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalLeads: 0,
    totalPortfolio: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [leads, portfolio, clients] = await Promise.all([
          getLeads(),
          getPortfolioItems(),
          getClients(),
        ]);
        setData({
          totalLeads: leads.length,
          totalPortfolio: portfolio.length,
          totalClients: clients.length,
        });
      } catch {}
    };
    load();
  }, []);

  const cards = [
    { icon: MessageSquare, label: "Total de Leads", value: data.totalLeads, color: "text-blue-400" },
    { icon: FolderOpen, label: "Total de Portf\u00f3lios", value: data.totalPortfolio, color: "text-purple-400" },
    { icon: Users, label: "Total de Clientes", value: data.totalClients, color: "text-green-400" },
    { icon: LayoutDashboard, label: "Taxa de Convers\u00e3o", value: "67%", color: "text-[#C0C0C0]" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">Vis\u00e3o geral do seu neg\u00f3cio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-3xl font-heading">{card.value}</p>
            <p className="text-white/40 text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-card rounded-2xl p-6">
        <h2 className="font-heading text-lg mb-4">Atividade Recente</h2>
        <p className="text-white/40 text-sm">
          Os dados ser\u00e3o atualizados automaticamente conforme os leads e
          conte\u00fados forem cadastrados.
        </p>
      </div>
    </div>
  );
}
