"use client";

import { Camera, Video, Globe, Link2, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C0C0C0]" />
              <span className="font-heading text-xl tracking-wider">
                PRIME STORY
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de
              experi\u00eancias audiovisuais que geram conex\u00e3o, autoridade e
              resultados.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0C0C0] hover:text-[#0A0A0A] transition-all"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0C0C0] hover:text-[#0A0A0A] transition-all"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0C0C0] hover:text-[#0A0A0A] transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C0C0C0] hover:text-[#0A0A0A] transition-all"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm mb-4 tracking-wider uppercase">
              Servi\u00e7os
            </h3>
            <ul className="space-y-3">
              {[
                "V\u00eddeos Institucionais",
                "Produ\u00e7\u00e3o Comercial",
                "Conte\u00fado Redes Sociais",
                "Reels Profissionais",
                "Cobertura de Eventos",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm mb-4 tracking-wider uppercase">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-[#C0C0C0]" />
                contato@primestory.com.br
              </li>
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-[#C0C0C0] mt-0.5" />
                S\u00e3o Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Prime Story. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">
              Pol\u00edtica de Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
