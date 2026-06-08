import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Lead, PortfolioItem, Client, Testimonial, Settings } from "@/types";

const collections = {
  leads: "leads",
  portfolio: "portfolio",
  clients: "clientes",
  testimonials: "depoimentos",
  settings: "configuracoes",
};

export const addLead = async (lead: Omit<Lead, "id" | "createdAt">) => {
  return addDoc(collection(db, collections.leads), {
    ...lead,
    createdAt: Timestamp.now(),
  });
};

export const getLeads = async () => {
  const q = query(collection(db, collections.leads), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead));
};

export const addPortfolioItem = async (item: Omit<PortfolioItem, "id" | "createdAt">) => {
  return addDoc(collection(db, collections.portfolio), {
    ...item,
    createdAt: Timestamp.now(),
  });
};

export const getPortfolioItems = async () => {
  const q = query(collection(db, collections.portfolio), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PortfolioItem));
};

export const updatePortfolioItem = async (id: string, data: Partial<PortfolioItem>) => {
  return updateDoc(doc(db, collections.portfolio, id), data);
};

export const deletePortfolioItem = async (id: string) => {
  return deleteDoc(doc(db, collections.portfolio, id));
};

export const addClient = async (client: Omit<Client, "id" | "createdAt">) => {
  return addDoc(collection(db, collections.clients), {
    ...client,
    createdAt: Timestamp.now(),
  });
};

export const getClients = async () => {
  const snapshot = await getDocs(collection(db, collections.clients));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Client));
};

export const deleteClient = async (id: string) => {
  return deleteDoc(doc(db, collections.clients, id));
};

export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "createdAt">) => {
  return addDoc(collection(db, collections.testimonials), {
    ...testimonial,
    createdAt: Timestamp.now(),
  });
};

export const getTestimonials = async () => {
  const q = query(collection(db, collections.testimonials), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial));
};

export const deleteTestimonial = async (id: string) => {
  return deleteDoc(doc(db, collections.testimonials, id));
};
