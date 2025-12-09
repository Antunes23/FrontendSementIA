'use client';

import "./PageWrapper.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DASHBOARD_HOME = "/dashboard/painelControle"; 

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let headerTitle = 'Previsão Climática'; 
  if (pathname === DASHBOARD_HOME) {
    headerTitle = 'Painel de Controle';
  } else if (pathname === '/previsao') {
    headerTitle = 'Previsão Climática';
  } else if (pathname.includes('/talhao')) {
    headerTitle = 'Minhas Plantações';
  } else if (pathname.includes('/tarefas')) {
    headerTitle = 'Tarefas Pendentes';
  }

  const showSearch = pathname !== '/previsao';

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">
          <h2>Sement IA</h2>
          <p>Agricultura inteligente</p>
        </div>
        <nav>
          <Link href={DASHBOARD_HOME} className={`nav-link ${pathname === DASHBOARD_HOME ? 'active' : ''}`}>
            <i className="fas fa-table-cells-large"></i> <span>Painel de Controle</span>
          </Link>
          
          <Link href="/dashboard/talhao" className={`nav-link ${pathname.includes('/talhao') ? 'active' : ''}`}>
            <i className="fas fa-seedling"></i> <span>Minhas Plantações</span>
          </Link>
          
          <Link href="/dashboard/tarefas" className={`nav-link ${pathname.includes('/tarefas') ? 'active' : ''}`}>
            <i className="fas fa-clipboard-list"></i> <span>Tarefas Pendentes</span>
          </Link>

          <Link href="/dashboard/clima/app" className={`nav-link ${pathname === '/previsao' ? 'active' : ''}`}>
            <i className="fas fa-cloud-sun"></i> <span>Previsão Climática</span>
          </Link>


           <Link href="/" className={`nav-link`}>
  <i className="fas fa-right-from-bracket"></i> <span>Sair</span>
</Link>



        </nav>
      </aside>

      <main className="main-content">
        <header className="clean-header">
          <h1 className="page-title">{headerTitle}</h1>
          
          <div className="header-actions">
            
            
            
          </div>
        </header>

        <div className="page-content">
            {children} 
        </div>
      </main>
    </div>
  );
}