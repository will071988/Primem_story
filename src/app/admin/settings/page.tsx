"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl">Configura\u00e7\u00f5es</h1>
        <p className="text-white/50 text-sm mt-1">Gerencie as informa\u00e7\u00f5es da sua empresa</p>
      </div>

      <div className="glass-card rounded-2xl p-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="text-sm text-white/60 mb-2 block">WhatsApp</label>
            <Input
              placeholder="+55 (11) 99999-9999"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Instagram</label>
            <Input
              placeholder="@primestory"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Facebook</label>
            <Input
              placeholder="facebook.com/primestory"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">YouTube</label>
            <Input
              placeholder="youtube.com/@primestory"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">LinkedIn</label>
            <Input
              placeholder="linkedin.com/company/primestory"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">E-mails (separados por v\u00edrgula)</label>
            <Input
              placeholder="contato@primestory.com.br"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <Button className="bg-[#C0C0C0] hover:bg-white text-[#0A0A0A] rounded-xl">
            <Save className="w-4 h-4 mr-2" /> Salvar Configura\u00e7\u00f5es
          </Button>
        </div>
      </div>
    </div>
  );
}
