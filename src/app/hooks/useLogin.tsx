'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../lib/api';

export function useLogin() {
  const [form, setForm] = useState({ name: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async (): Promise<boolean> => {
    const { name, password } = form;

    try {
      // O Back-end retorna o usuário completo: { idUser: 1, name: "...", email: "..." }
      const response = await api.post('/users/auth', { name, password });
      
      // 1. Marca que está logado
      localStorage.setItem('logged', 'true');
      
      // 2. SALVA O USUÁRIO INTEIRO (COM O ID)
      // Transformamos o objeto em string para salvar no LocalStorage
      localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
      
      return true; // ✅ login bem-sucedido
    } catch (error) {
      console.error(error); // Bom para debug
      Swal.fire('Erro', 'Usuário ou senha incorretos!', 'error');
      return false; // ❌ erro no login
    }
  };

  return { form, handleChange, handleLogin };
}