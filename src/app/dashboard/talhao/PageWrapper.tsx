'use client';

import "./page.css"; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BASE_URL = "/dashboard/talhao";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let headerTitle = 'Minhas Plantações';
  if (pathname.includes('/novo-talhao')) {
    headerTitle = 'Adicionar Novo Talhão';
  } else if (pathname === '/previsao') {
    headerTitle = 'Previsão Climática';
  }

  const showSearch = !pathname.includes('/novo-talhao') && pathname !== '/previsao';

  return (
    /* Aqui aplicamos a cor de fundo APENAS neste container, não no body inteiro */
    <div className="th_layout_container">
      
      {/* Sidebar Exclusiva (th_sidebar) */}
      <aside className="th_sidebar">
        <div className="th_logo">
          <h2>Sement IA</h2>
          <p>Agricultura inteligente</p>
        </div>
        <nav>
          <Link href="/dashboard/painelControle" className="th_nav_link">
            <i className="fas fa-table-cells-large"></i>
            <span>Painel de Controle</span>
          </Link>

          <Link
            href={BASE_URL}
            className={`th_nav_link ${
              pathname === BASE_URL || pathname.includes('/novo-talhao') ? 'active' : ''
            }`}
          >
            <i className="fas fa-seedling"></i>
            <span>Minhas Plantações</span>
          </Link>

          <Link href="#" className="th_nav_link">
            <i className="fas fa-clipboard-list"></i>
            <span>Tarefas Pendentes</span>
          </Link>
          <Link href="#" className="th_nav_link">
            <i className="fas fa-history"></i>
            <span>Atividades Recentes</span>
          </Link>
          <Link href="#" className="th_nav_link">
            <i className="fas fa-box"></i>
            <span>Materiais</span>
          </Link>

          <Link href="/previsao" className="th_nav_link">
            <i className="fas fa-cloud-sun"></i>
            <span>Previsão Climática</span>
          </Link>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="th_main_content">
        <header className="th_header">
          <h1>{headerTitle}</h1>

          <div className="th_header_right">
            {showSearch && (
              <div className="th_search_box">
                <i className="fas fa-search th_search_icon"></i>
                <input type="text" placeholder="Buscar..." />
              </div>
            )}
            <div className="th_profile_icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </header>

        {/* Área do Conteúdo (Lista ou Form) */}
        <div className="th_content_area">
            {children}
        </div>
      </main>
    </div>
  );
}