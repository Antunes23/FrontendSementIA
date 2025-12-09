// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./page.css";
import PageWrapper from "./PageWrapper"; // IMPORTA o novo wrapper

const inter = Inter({ subsets: ["latin"] });

// Metadata continua aqui (é um Server Component)
export const metadata: Metadata = {
  title: "Sement IA - Dashboard",
  description: "Agricultura inteligente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="pt-BR">
      <div>
        {/* Link do Font Awesome continua aqui */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </div>
      
      <div className={inter.className}>
        {/* CORREÇÃO: 
          A sidebar e o header foram movidos para o PageWrapper.
          O PageWrapper agora envolve os {children}.
        */}
        <PageWrapper>
          {children}
        </PageWrapper>
      </div>
    </div>
  );
}