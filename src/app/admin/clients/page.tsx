"use client";

import { useEffect, useState } from "react";
import { getClients, deleteClient } from "@/firebase/firestore";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types";
import { Plus, Trash2 } from "lucide-react";

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);

  const load = async () => {
    const data = await getClients();
    setClients(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Excluir este cliente?")) {
      await deleteClient(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl">Clientes</h1>
          <p className="text-white/50 text-sm mt-1">Gerencie as marcas atendidas</p>
        </div>
        <Button className="bg-[#C0C0C0] hover:bg-white text-[#0A0A0A] rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {clients.length === 0 && (
          <div className="col-span-full text-center py-12 text-white/30">
            Nenhum cliente cadastrado.
          </div>
        )}
        {clients.map((client) => (
          <div key={client.id} className="glass-card rounded-2xl p-6 text-center group">
            <div className="w-20 h-20 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center">
              <span className="font-heading text-xl text-white/30">
                {client.name.charAt(0)}
              </span>
            </div>
            <p className="text-sm font-heading">{client.name}</p>
            <button
              onClick={() => client.id && handleDelete(client.id)}
              className="mt-3 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 mx-auto" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
