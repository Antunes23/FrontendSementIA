'use client';

// Importe o CSS (ajuste o caminho se necessário)
import './page.css'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function TermosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'termos' | 'privacidade'>('termos');

  const handleBack = () => {
    router.back(); 
  };

  // Conteúdo formatado com parágrafos para melhor leitura
  const termosContent = (
    <>
      <p><strong>1. Termos</strong></p>
      <p>Ao acessar ao site Semenata, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
      
      <p><strong>2. Uso de Licença</strong></p>
      <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Semenata, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
      <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
        <li>Modificar ou copiar os materiais;</li>
        <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
        <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Semenata;</li>
        <li>Remover quaisquer direitos autorais ou outras notas de propriedade dos materiais; ou</li>
        <li>Transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
      </ul>
      <p>Esta licença será automaticamente rescindida se você violar alguma destas restrições e poderá ser rescindida por Semenata a qualquer momento. Ao encerrar a visualização destes materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.</p>
    </>
  );

  const privacidadeContent = (
    <>
      <p><strong>Política de Privacidade</strong></p>
      <p>A sua privacidade é importante para nós. É política do Semenata respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Semenata, e outros sites que possuirmos e operamos.</p>
      
      <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
      
      <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
      
      <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
      
      <p><strong>Compromisso do Usuário</strong></p>
      <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Semenata oferece no site e com caráter enunciativo, mas não limitativo.</p>
    </>
  );

  return (
    <main className={`page-termos ${inter.className}`}>
      
      <div className="terms-card">
        
        {/* CABEÇALHO */}
        <div className="terms-header">
          <button onClick={handleBack} className="btn-back">
            <span>←</span> Voltar
          </button>

          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('termos')}
              className={`tab-btn ${activeTab === 'termos' ? 'active' : ''}`}
            >
              Termos de Uso
            </button>
            <button
              onClick={() => setActiveTab('privacidade')}
              className={`tab-btn ${activeTab === 'privacidade' ? 'active' : ''}`}
            >
              Privacidade
            </button>
          </div>
          
          {/* Div vazia para equilibrar o layout flex (opcional) */}
          <div style={{ width: '60px' }}></div>
        </div>

        {/* CORPO DO TEXTO (COM SCROLL) */}
        <div className="terms-body">
          {activeTab === 'termos' ? termosContent : privacidadeContent}
        </div>

      </div>
    </main>
  );
}