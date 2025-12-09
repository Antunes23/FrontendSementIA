"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
// Importando o CSS com as novas classes
import "../page.css";

const SUA_API_URL = 'http://localhost:8080/talhao';

export default function NovoTalhao() {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false); 

  const [form, setForm] = useState({
    nomeTalhao: "",      
    cultura: "",
    variedade: "",
    estagioIni: "",      
    dataPlantio: "",     
    dataColheita: "",    
    notasAdicionais: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true); 

    try {
      // 1. RECUPERA O ID DO USUÁRIO DO NAVEGADOR
      const dadosUsuario = localStorage.getItem('usuarioLogado');
      
      if (!dadosUsuario) {
          alert("Erro: Usuário não identificado. Faça login novamente.");
          router.push('/'); // Manda pro login
          return;
      }

      const usuario = JSON.parse(dadosUsuario);

      // 2. MANDA O ID NA URL (AQUI ESTÁ A CORREÇÃO)
      const response = await fetch(`${SUA_API_URL}?idUser=${usuario.idUser}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), 
      });

      if (!response.ok) throw new Error('Falha ao salvar.');

      alert('Talhão salvo com sucesso!');
      router.push('/dashboard/talhao'); 

    } catch (err) {
        console.error(err);
        alert('Erro ao salvar o talhão. Verifique se o Back-end está rodando.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="th_form_center">
      <div className="th_form_box">
        <h2 className="th_form_title">Adicionar Novo Talhão</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="th_label">Nome do talhão</label>
          <input type="text" name="nomeTalhao" className="th_input" onChange={handleChange} required />

          <label className="th_label">Cultura</label>
          <input type="text" name="cultura" className="th_input" onChange={handleChange} required />

          <label className="th_label">Variedade</label>
          <input type="text" name="variedade" className="th_input" onChange={handleChange} required />

          <label className="th_label">Estágio Inicial</label>
          <input type="text" name="estagioIni" className="th_input" onChange={handleChange} required />

          <div className="th_group_double">
            <div className="th_group_item">
              <label className="th_label">Data do Plantio</label>
              <input type="date" name="dataPlantio" className="th_input" onChange={handleChange} required />
            </div>
            <div className="th_group_item">
              <label className="th_label">Data da Colheita</label>
              <input type="date" name="dataColheita" className="th_input" onChange={handleChange} required />
            </div>
          </div>
          
          {/* Adicionei o campo de notas que estava faltando visualmente */}
          <label className="th_label">Notas Adicionais</label>
          <textarea 
            name="notasAdicionais" 
            className="th_input th_input_text" 
            onChange={handleChange} 
            placeholder="Opcional..."
          ></textarea>

          <div className="th_buttons">
            <Link href="/dashboard/talhao" className="th_btn th_btn_cancel">Cancelar</Link>
            <button type="submit" className="th_btn th_btn_save" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}