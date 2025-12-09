// registro/page.tsx
'use client';

import './page.css'; 
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegistro } from '@/app/hooks/useRegistro'; // Verifique se o caminho está certo
import { Inter } from "next/font/google";

// IMPORTANDO O MODAL DA PASTA CERTA
import TermosModal from './modal/TermosModal'; 

const inter = Inter({ subsets: ["latin"] });

export default function Registro() {
  const { form, handleChange, handleRegister } = useRegistro();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estado para abrir/fechar modal
  const [showModal, setShowModal] = useState(false); 

  const isFormValid =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    form.password === confirmPassword &&
    acceptedTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    handleRegister(e);
  };

  return (
    <main className={`page-cad ${inter.className}`}>
      
      {/* SE O ESTADO FOR TRUE, CHAMA O MODAL DA PASTA MODAL */}
      {showModal && <TermosModal onClose={() => setShowModal(false)} />}

      <div className="register-card">
        <h1>CRIE SUA CONTA</h1>

        <form onSubmit={handleSubmit} className="register-form">
            {/* ... Seus inputs de nome, email e senha continuam iguais ... */}
            
             {/* Vou resumir os inputs aqui para caber na resposta, 
                 mas mantenha os que você já tem no seu código! */}
             
             <div>
                <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange} className="register-input" required />
             </div>
             <div>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="register-input" required />
             </div>
             <div>
                <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} className="register-input" required />
             </div>
             <div>
                <input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-input" required />
             </div>


          {/* Checkbox e Link que ABRE O MODAL */}
          <div className="terms-container">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="custom-checkbox"
              required
            />
            <label htmlFor="acceptTerms" className="terms-label">
              Li e aceito os{' '}
              <button
                type="button"
                onClick={() => setShowModal(true)} // AQUI ABRE O MODAL
                className="terms-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
              >
                Termos de Uso
              </button>{' '}
              e Política de Privacidade
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`register-button ${isFormValid ? 'active' : 'disabled'}`}
          >
            CADASTRAR
          </button>
        </form>

        <div className="login-redirect">
          <Link href="/">
            Já tem uma conta? <strong>Faça o login</strong>
          </Link>
        </div>
      </div>
    </main>
  );
}