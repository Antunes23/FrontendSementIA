"use client";

import Link from "next/link";
import { useLogin } from "./hooks/useLogin";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google"; // 1. IMPORTAR AQUI

// 2. CONFIGURAR A FONTE
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { form, handleChange, handleLogin } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sucesso = await handleLogin();
    if (sucesso) {
      router.push("/dashboard/painelControle");
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    // 3. APLICAR A FONTE AQUI NO MAIN
    <main className={`page-login ${inter.className}`}>
      <div className="login-container">
        <h1>ENTRAR</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Usuário"
              value={form.name}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            ACESSAR SISTEMA
          </button>
        </form>

        <div className="register-link">
          <Link href="/registro" className="link">
            Não tem uma conta? <strong>Cadastre-se</strong>
          </Link>
        </div>
      </div>
    </main>
  );
}