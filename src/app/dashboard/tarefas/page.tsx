'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "./page.css"; 

const API_URL = 'http://localhost:8080/pendentes'; // Ajustei para o endpoint de tarefas

interface Tarefa {
  id: number;
  nome: string; 
  talhaoAssociado: string;
  prazo: string;
  descricao: string;
}

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  // --- BUSCA TAREFAS FILTRADAS PELO USUÁRIO ---
  useEffect(() => {
    // 1. Recupera o usuário salvo
    const dadosUsuario = localStorage.getItem('usuarioLogado');

    if (dadosUsuario) {
        const usuario = JSON.parse(dadosUsuario);

        // 2. Manda o ID na URL para o Back-end
        fetch(`${API_URL}?idUser=${usuario.idUser}`)
          .then(res => {
              if(!res.ok) throw new Error("Erro na API");
              return res.json();
          })
          .then(data => setTarefas(data))
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
    } else {
        // Se não tiver usuário, para o loading
        setLoading(false);
    }
  }, []);

  const handleDelete = async (id: number) => {
    if(confirm("Concluir esta tarefa?")) {
        try {
            // Deletar continua igual (pelo ID da tarefa)
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setTarefas(tarefas.filter(t => t.id !== id));
        } catch (error) { 
            alert("Erro ao deletar"); 
        }
    }
  }

  const formatarData = (dataISO: string) => {
    if(!dataISO) return "";
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) return <div className="tarefas_container"><p className="tarefas_loading">Carregando...</p></div>;

  return (
    <div className="tarefas_container">
      
      {tarefas.length === 0 ? (
        
        /* === MODO VAZIO: PRANCHETA === */
        <div className="tarefas_empty_card">
          <div className="tarefas_icon_wrapper">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h2 className="tarefas_title">Nenhuma tarefa pendente</h2>
          <p className="tarefas_description">
            Sua lista de tarefas está vazia. Adicione atividades para organizar o manejo dos talhões.
          </p>
          <Link href="/dashboard/tarefas/nova-tarefa" className="tarefas_btn_add">
            <i className="fas fa-plus-circle"></i>
            <span>Adicionar Primeira Tarefa</span>
          </Link>
        </div>

      ) : (

        /* === MODO CHEIO: LISTA VERDE === */
        <div className="tarefas_content_wrapper">
            <div className="tarefas_header_actions">
                 <Link href="/dashboard/tarefas/nova-tarefa" className="tarefas_btn_add">
                    <i className="fas fa-plus"></i> Nova Tarefa
                 </Link>
            </div>

            <div className="caixa-lista-verde">
                {tarefas.map((t) => (
                  <div key={t.id} className="item-tarefa">
                    <input 
                        type="checkbox" 
                        className="caixa-selecao" 
                        onChange={() => handleDelete(t.id)}
                    />
                    <div className="texto-tarefa">
                      <p className="titulo-tarefa">{t.nome}</p>
                      <p className="detalhe-tarefa">
                        {t.talhaoAssociado} • Prazo: {formatarData(t.prazo)}
                      </p>
                      {t.descricao && <p style={{fontSize:'0.9rem', color:'#555', marginTop:'5px'}}>{t.descricao}</p>}
                    </div>
                  </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}