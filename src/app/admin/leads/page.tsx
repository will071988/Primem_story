"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/firebase/firestore";
import type { Lead } from "@/types";
import { MessageSquare } from "lucide-react";

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getLeads();
      setLeads(data);
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl">Leads</h1>
        <p className="text-white/50 text-sm mt-1">Todos os leads captados pelo ChatFlow</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-sm text-white/40 font-normal">Nome</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Empresa</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Segmento</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Servi\u00e7o</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Objetivo</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Or\u00e7amento</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Prazo</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-white/30">
                    Nenhum lead captado ainda.
                  </td>
                </tr>
              )}
              {leads.map((lead, i) => (
                <tr key={lead.id || i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 text-sm">{lead.name}</td>
                  <td className="p-4 text-sm text-white/50">{lead.company}</td>
                  <td className="p-4 text-sm text-white/50">{lead.segment}</td>
                  <td className="p-4 text-sm text-white/50">{lead.service}</td>
                  <td className="p-4 text-sm text-white/50">{lead.objective}</td>
                  <td className="p-4 text-sm text-white/50">{lead.budget}</td>
                  <td className="p-4 text-sm text-white/50">{lead.deadline}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                        `Ol\u00e1! Sou ${lead.name} da ${lead.company}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 inline-flex"
                    >
                      <MessageSquare className="w-4 h-4 text-green-400" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
