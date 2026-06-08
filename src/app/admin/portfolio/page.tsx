"use client";

import { useEffect, useState } from "react";
import { getPortfolioItems, deletePortfolioItem } from "@/firebase/firestore";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/types";
import { Plus, Trash2, ExternalLink } from "lucide-react";

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  const load = async () => {
    const data = await getPortfolioItems();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      await deletePortfolioItem(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl">Portf\u00f3lio</h1>
          <p className="text-white/50 text-sm mt-1">Gerencie seus projetos</p>
        </div>
        <Button className="bg-[#C0C0C0] hover:bg-white text-[#0A0A0A] rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Novo Projeto
        </Button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-sm text-white/40 font-normal">T\u00edtulo</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Categoria</th>
                <th className="text-left p-4 text-sm text-white/40 font-normal">Descri\u00e7\u00e3o</th>
                <th className="text-right p-4 text-sm text-white/40 font-normal">A\u00e7\u00f5es</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-white/30">
                    Nenhum item no portf\u00f3lio ainda.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 text-sm">{item.title}</td>
                  <td className="p-4 text-sm text-white/50">{item.category}</td>
                  <td className="p-4 text-sm text-white/50 max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => item.id && handleDelete(item.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
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
