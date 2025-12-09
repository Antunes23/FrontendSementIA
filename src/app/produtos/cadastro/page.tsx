'use client'
import FormularioProduto from "@/app/components/FormularioProduto";
import NavBar from "@/app/components/navbar";
import { withAuth } from "@/app/components/withAuth";

function PaginaCadastro() {
  return (
    <section>
      <NavBar texto="Cadastro de Produto" />
      <FormularioProduto />
    </section>
  );
}

export default withAuth(PaginaCadastro);