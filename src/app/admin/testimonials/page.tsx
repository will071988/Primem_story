"use client";

import { useEffect, useState } from "react";
import { getTestimonials, deleteTestimonial } from "@/firebase/firestore";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/types";
import { Plus, Trash2, Star } from "lucide-react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const load = async () => {
    const data = await getTestimonials();
    setTestimonials(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Excluir este depoimento?")) {
      await deleteTestimonial(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl">Depoimentos</h1>
          <p className="text-white/50 text-sm mt-1">Gerencie os depoimentos dos clientes</p>
        </div>
        <Button className="bg-[#C0C0C0] hover:bg-white text-[#0A0A0A] rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Novo Depoimento
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.length === 0 && (
          <div className="text-center py-12 text-white/30 glass-card rounded-2xl">
            Nenhum depoimento cadastrado.
          </div>
        )}
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="font-heading">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading">{testimonial.name}</p>
                  <p className="text-white/40 text-sm">{testimonial.company}</p>
                </div>
              </div>
              <button
                onClick={() => testimonial.id && handleDelete(testimonial.id)}
                className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
            <p className="text-white/50 text-sm mt-4">&ldquo;{testimonial.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
