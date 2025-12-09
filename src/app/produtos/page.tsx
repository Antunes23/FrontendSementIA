'use client';

import NavBar from '../components/navbar';
import { withAuth } from '../components/withAuth';
// 1. Importa o hook que acabamos de criar
import { useProdutos } from '../hooks/useProdutos';

function PaginaProdutos() {
  // 2. Chama o hook para obter toda a lógica pronta
  const { produtos, handleDelete, handleAdd, handleEdit } = useProdutos();

  // 3. O restante do arquivo é apenas o componente visual
  return (
    <section>
      <NavBar texto={"Produtos"} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <button
            onClick={handleAdd} // Usa a função do hook
            className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl"
          >
            +
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Preço Custo</th>
                <th className="py-3 px-4 text-left">Preço Vendas</th>
                <th className="py-3 px-4 text-left">estoque Mínimo</th>
                <th className="py-3 px-4 text-left">marca</th>
                <th className="py-3 px-4 text-left">modelo</th>
                <th className="py-3 px-4 text-left">ano</th>
                <th className="py-3 px-4 text-left">compatibilidade</th>
                <th className="py-3 px-4 text-right">Ação</th>


              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{produto.nome}</td>
                  <td className="py-3 px-4">R$ {produto.precoCusto}</td>
                  <td className="py-3 px-4">R$ {produto.precoVenda}</td>
                  <td className="py-3 px-4">{produto.estoqueMinimo}</td>
                  <td className="py-3 px-4">{produto.marca}</td>
                  <td className="py-3 px-4">{produto.modelo}</td>
                  <td className="py-3 px-4">{produto.anoFabricacao}</td>
                  <td className="py-3 px-4">{produto.compatibilidade}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(produto.id)} // Usa a função do hook
                      className="text-blue-500 font-semibold mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)} // Usa a função do hook
                      className="text-red-500 font-semibold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default withAuth(PaginaProdutos);