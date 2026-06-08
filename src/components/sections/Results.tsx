"use client";

import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 100, suffix: "+", label: "Projetos Realizados" },
  { value: 50, suffix: "+", label: "Clientes Atendidos" },
  { value: 1, suffix: "M+", label: "Visualiza\u00e7\u00f5es" },
  { value: 5, suffix: "+", label: "Anos de Experi\u00eancia" },
];

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(value);

  return (
    <div ref={ref} className="text-center group">
      <div className="relative inline-block">
        <span className="font-heading text-5xl md:text-7xl text-gradient">
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-white/50 text-sm mt-2 tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Results() {
  return (
    <section className="relative section-padding bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Resultados
          </span>
          <h2
            className="font-heading text-4xl md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            N\u00fameros que<br />
            <span className="text-gradient">comprovam</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
