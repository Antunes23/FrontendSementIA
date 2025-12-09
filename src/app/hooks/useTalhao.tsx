'use client';
import { useEffect, useState } from "react";
import { Talhao } from "@/app/types/talhoes";

export function useTalhoes() {
  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTalhoes = async () => {
    try {
      const res = await fetch("http://localhost:8080/talhoes");
      const data = await res.json();
      setTalhoes(data);
    } catch (error) {
      console.error("Erro ao buscar talhões:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTalhao = async (novoTalhao: Talhao) => {
    try {
      const res = await fetch("http://localhost:8080/talhoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoTalhao),
      });
      if (!res.ok) throw new Error("Erro ao adicionar talhão");

      const talhaoSalvo = await res.json();
      setTalhoes((prev) => [...prev, talhaoSalvo]); // adiciona sem recarregar
    } catch (error) {
      console.error("Erro ao salvar talhão:", error);
    }
  };

  useEffect(() => {
    fetchTalhoes();
  }, []);

  return { talhoes, loading, addTalhao };
}
