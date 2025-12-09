"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import "./page.css"; 

const API_URL = 'http://localhost:8080/pendentes';

export default function NovaTarefa() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    nome: "", 
    talhaoAssociado: "",
    prazo: "",
    descricao: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. RECUPERA O USUÁRIO DO NAVEGADOR
      const dadosUsuario = localStorage.getItem('usuarioLogado');
      
      if (!dadosUsuario) {
          alert("Erro: Usuário não identificado. Faça login novamente.");
          router.push('/'); 
          return;
      }

      const usuario = JSON.parse(dadosUsuario);

      // 2. MANDA O ID NA URL (AQUI ESTÁ A CORREÇÃO)
      const response = await fetch(`${API_URL}?idUser=${usuario.idUser}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) throw new Error('Erro ao salvar');
      
      alert('Tarefa salva com sucesso!');
      router.push('/dashboard/tarefas'); 

    } catch (err) {
      console.error(err);
      alert('Erro ao salvar tarefa. Verifique o backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tarefa-form-container">
      <div className="tarefa-form-box">
        <h2 className="tarefa-titulo">Nova Tarefa</h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Nome da Tarefa */}
          <div className="campo-grupo">
            <label>Nome da Tarefa</label>
            <input type="text" name="nome" className="tarefa-input" onChange={handleChange} required placeholder="Ex: Aplicação de Fungicida" />
          </div>

          {/* Talhão Associado (Adicionei este campo que faltava) */}
          <div className="campo-grupo">
            <label>Talhão Associado</label>
            <input type="text" name="talhaoAssociado" className="tarefa-input" onChange={handleChange} required placeholder="Ex: Talhão 01 - Soja" />
          </div>

          {/* Prazo */}
          <div className="campo-grupo">
            <label>Prazo</label>
            <input type="date" name="prazo" className="tarefa-input" onChange={handleChange} required />
          </div>

          {/* Descrição */}
          <div className="campo-grupo">
            <label>Descrição</label>
            <textarea name="descricao" className="tarefa-input tarefa-textarea" rows={4} onChange={handleChange} placeholder="Detalhes da atividade..."></textarea>
          </div>

          <div className="tarefa-botoes">
            <Link href="/dashboard/tarefas" className="btn-cancelar">Cancelar</Link>
            <button type="submit" className="btn-salvar" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}