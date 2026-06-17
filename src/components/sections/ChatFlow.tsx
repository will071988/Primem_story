"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addLead } from "@/firebase/firestore";

interface Message {
  type: "bot" | "user";
  text: string;
}

interface Question {
  id: string;
  question: string;
  field: keyof LeadState;
  placeholder?: string;
  options?: string[];
  isTextarea?: boolean;
}

interface LeadState {
  name: string;
  company: string;
  segment: string;
  service: string;
  objective: string;
  budget: string;
  deadline: string;
}

const questions: Question[] = [
  { id: "1", question: "Qual seu nome?", field: "name", placeholder: "Digite seu nome" },
  { id: "2", question: "Nome da empresa?", field: "company", placeholder: "Digite o nome da empresa" },
  {
    id: "3", question: "Qual o segmento da sua empresa?", field: "segment",
    options: ["Empresa", "Loja", "Restaurante", "Cl\u00ednica"],
  },
  {
    id: "4", question: "Qual servi\u00e7o deseja?", field: "service",
    options: ["Institucional", "Comercial", "Reels", "Evento"],
  },
  {
    id: "5", question: "Qual o principal objetivo?", field: "objective",
    options: ["Vender mais", "Autoridade", "Captar clientes"],
  },
  { id: "6", question: "Qual o or\u00e7amento previsto?", field: "budget", placeholder: "Ex: R$ 5.000 - R$ 10.000" },
  { id: "7", question: "Qual o prazo desejado?", field: "deadline", placeholder: "Ex: 30 dias" },
];

const initialMessages: Message[] = [
  {
    type: "bot",
    text: "Ol\u00e1! Sou assistente da Prime Story. Vou te ajudar a solicitar um or\u00e7amento personalizado. Vamos come\u00e7ar?",
  },
];

export default function ChatFlow() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentStep, setCurrentStep] = useState(0);
  const [leadData, setLeadData] = useState<LeadState>({
    name: "", company: "", segment: "", service: "", objective: "", budget: "", deadline: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentQuestion = questions[currentStep];
  const showOptions = Boolean(currentQuestion?.options) && !finished;

  const resetConversation = () => {
    setMessages(initialMessages);
    setCurrentStep(0);
    setInputValue("");
    setFinished(false);
    setSaving(false);
    setLeadData({ name: "", company: "", segment: "", service: "", objective: "", budget: "", deadline: "" });
  };

  const handleOpen = () => {
    resetConversation();
    setOpen(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  const handleNext = (value: string) => {
    if (!value.trim()) return;

    addUserMessage(value);

    const q = questions[currentStep];
    setLeadData((prev) => ({ ...prev, [q.field]: value }));

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        const nextQ = questions[currentStep + 1];
        setCurrentStep((prev) => prev + 1);
        addBotMessage(nextQ.question);
      }, 600);
    } else {
      setFinished(true);
      handleFinish({ ...leadData, [q.field]: value });
    }
    setInputValue("");
  };

  const handleFinish = async (data: LeadState) => {
    setSaving(true);
    try {
      await addLead(data);
      const whatsappMsg = `Ol\u00e1! Sou ${data.name} da ${data.company}. Segmento: ${data.segment}. Servi\u00e7o: ${data.service}. Objetivo: ${data.objective}. Or\u00e7amento: ${data.budget}. Prazo: ${data.deadline}.`;
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMsg)}`;

      addBotMessage("Perfeito! Seu or\u00e7amento foi registrado com sucesso.");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Clique no bot\u00e3o abaixo para falar agora com um especialista.`,
          },
        ]);
        setSaving(false);
        setLeadData((prev) => ({ ...prev, whatsappUrl }));
      }, 1000);
    } catch {
      addBotMessage("Desculpe, ocorreu um erro. Tente novamente.");
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext(inputValue);
    }
  };

  const getWhatsappUrl = () => {
    const msg = `Ol\u00e1! Sou ${leadData.name} da ${leadData.company}. Segmento: ${leadData.segment}. Servi\u00e7o: ${leadData.service}. Objetivo: ${leadData.objective}. Or\u00e7amento: ${leadData.budget}. Prazo: ${leadData.deadline}.`;
    return `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#C0C0C0] text-[#0A0A0A] flex items-center justify-center shadow-2xl hover:bg-white transition-colors group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0A0A0A] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1C1C1C]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C0C0C0] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#0A0A0A]" />
                </div>
                <div>
                  <p className="font-heading text-sm">Prime Story</p>
                  <p className="text-white/40 text-xs">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.type === "user"
                        ? "bg-[#C0C0C0] text-[#0A0A0A]"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.type === "bot" && (
                        <Bot className="w-4 h-4 mt-0.5 shrink-0 text-[#C0C0C0]" />
                      )}
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.type === "user" && (
                        <User className="w-4 h-4 mt-0.5 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {showOptions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentQuestion?.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleNext(opt)}
                      className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:bg-[#C0C0C0] hover:text-[#0A0A0A] hover:border-[#C0C0C0] transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {finished && !saving && (
                <div className="mt-4">
                  <a
                    href={getWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full">
                      Conversar com Especialista
                    </Button>
                  </a>
                  <p className="text-white/30 text-xs text-center mt-2">
                    Seu lead foi salvo automaticamente
                  </p>
                </div>
              )}

              {saving && (
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-[#C0C0C0] border-t-transparent animate-spin" />
                  Salvando...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!finished && !showOptions && currentStep < questions.length && (
              <div className="p-4 border-t border-white/10">
                {currentQuestion?.isTextarea ? (
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQuestion?.placeholder}
                    className="bg-white/5 border-white/10 text-white resize-none"
                    rows={2}
                  />
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={currentQuestion?.placeholder || "Digite sua resposta..."}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <button
                      onClick={() => handleNext(inputValue)}
                      className="w-10 h-10 rounded-full bg-[#C0C0C0] flex items-center justify-center hover:bg-white transition-colors shrink-0"
                    >
                      <Send className="w-4 h-4 text-[#0A0A0A]" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
