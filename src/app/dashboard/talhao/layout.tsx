import type { Metadata } from "next";
import "./page.css"; 

export const metadata: Metadata = {
  title: "Sement IA - Gestão de Talhões",
};

export default function TalhaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}