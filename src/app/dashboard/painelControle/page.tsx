'use client';
import "./page.css";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
// 1. IMPORTANDO O FIREBASE DE VOLTA
import { db } from '../../lib/firebaseConfig'; 
import { ref, onValue } from "firebase/database";

const API_URL = 'http://localhost:8080/talhao';

interface Talhao {
  idTalhao: number;
  nomeTalhao: string;
  cultura: string;
  variedade: string;
  estagioIni: string;
  dataPlantio: string;
  dataColheita: string;
  notasAdicionais?: string;
}

export default function DashboardPage() {
  // --- ESTADOS DOS TALHÕES (MySQL) ---
  const [talhoesList, setTalhoesList] = useState<Talhao[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DOS SENSORES (Firebase Realtime) ---
  // Removi o "gerarSensoresSimulados" e voltei com os estados reais
  const [dadosNPK, setDadosNPK] = useState<any>(null);      // dados (NPK)
  const [dadosTemp, setDadosTemp] = useState<any>(null);    // dados2 (Temperatura)
  const [dadosPH, setDadosPH] = useState<any>(null);        // dados3 (PH)
  const [dadosUmid, setDadosUmid] = useState<any>(null);    // dados4 (Umidade)
  
  const [loadingFirebase, setLoadingFirebase] = useState(true);

  // 1. BUSCA TALHÕES DO USUÁRIO (Back-end Java)
  const fetchTalhoes = useCallback(async () => {
    try {
      setLoading(true);
      const dadosUsuario = localStorage.getItem('usuarioLogado');
      
      if (!dadosUsuario) {
        setLoading(false);
        return;
      }

      const usuario = JSON.parse(dadosUsuario);
      const response = await fetch(`${API_URL}?idUser=${usuario.idUser}`);

      if (response.ok) {
        const data: Talhao[] = await response.json();
        setTalhoesList(data);
      } else {
        setTalhoesList([]);
      }
    } catch (error) {
      console.error("Erro API:", error);
      setTalhoesList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTalhoes();
  }, [fetchTalhoes]);

  // 2. CONECTA COM O FIREBASE (Sensores Reais)
  useEffect(() => {
    setLoadingFirebase(true);

    // Referências do seu banco de dados
    const npkRef = ref(db, 'dados');
    const tempRef = ref(db, 'dados2');
    const phRef = ref(db, 'dados3');
    const umidRef = ref(db, 'dados4');

    // "Escuta" as mudanças em tempo real
    const unsubNPK = onValue(npkRef, (snapshot) => setDadosNPK(snapshot.val()));
    const unsubTemp = onValue(tempRef, (snapshot) => setDadosTemp(snapshot.val()));
    const unsubPH = onValue(phRef, (snapshot) => setDadosPH(snapshot.val()));
    const unsubUmid = onValue(umidRef, (snapshot) => {
        setDadosUmid(snapshot.val());
        setLoadingFirebase(false); 
    });

    // Limpa a conexão ao sair da tela
    return () => {
        unsubNPK(); unsubTemp(); unsubPH(); unsubUmid();
    };
  }, []);

  // Helper para mostrar "..." enquanto carrega ou "-" se estiver vazio
  const showVal = (val: any) => loadingFirebase ? '...' : (val ?? '-');

  // LOADING DA PÁGINA
  if (loading) {
    return (
      <div className="fallback-container">
        <div className="fallback-card">
          <h1 className="fallback-title">Carregando sua fazenda...</h1>
        </div>
      </div>
    );
  }

  // SEM TALHÕES
  if (talhoesList.length === 0) {
    return (
      <div className="fallback-container">
        <div className="fallback-card">
          <h1 className="fallback-title">Comece cadastrando uma plantação</h1>
          <p className="fallback-text">
            Você ainda não possui nenhum talhão cadastrado.
          </p>
          <Link href="/dashboard/talhao/novo-talhao" className="fallback-button">
            Criar Minha Primeira Plantação
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="th_layout_padding" style={{ padding: '20px' }}>
         {/* BOTÃO NOVO TALHÃO */}
         <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Link href="/dashboard/talhao/novo-talhao" className="fallback-button" style={{ textDecoration: 'none', fontSize: '14px' }}>
               + Novo Talhão
            </Link>
         </div>

         {/* LISTA DE TALHÕES */}
         {talhoesList.map((talhao) => (
            <div key={talhao.idTalhao} className="talhao-section">

               {/* CABEÇALHO */}
               <h2 className="talhao-header">
               {talhao.nomeTalhao} — <span style={{fontWeight: 'normal', fontSize: '0.8em'}}>{talhao.cultura}</span>
               </h2>

               {/* GRID DE SENSORES (AGORA COM DADOS REAIS DO FIREBASE) */}
               <div className="data-cards-grid">

               {/* NPK */}
               <div className="card">
                  <p className="card-title">Nutrientes (NPK)</p>
                  <p className="card-npk-values">
                     N: <span style={{color: '#10B981'}}>{showVal(dadosNPK?.N)}</span> | 
                     P: <span style={{color: '#3B82F6'}}>{showVal(dadosNPK?.P)}</span> | 
                     K: <span style={{color: '#F59E0B'}}>{showVal(dadosNPK?.K)}</span>
                  </p>
               </div>

               {/* Temperatura */}
               <div className="card">
                  <p className="card-title">Temperatura</p>
                  <div className="card-main">
                     <span className="card-main-value">
                     {showVal(dadosTemp?.temperatura)}° C
                     </span>
                  </div>
               </div>

               {/* Umidade */}
               <div className="card">
                  <p className="card-title">Umidade do Solo</p>
                  <div className="card-main">
                     <span className="card-main-value">
                     {showVal(dadosUmid?.umidade)} %
                     </span>
                  </div>
               </div>

               {/* PH */}
               <div className="card">
                  <p className="card-title">pH do Solo</p>
                  <div className="card-main">
                     <span className="card-main-value">
                     {showVal(dadosPH?.ph)}
                     </span>
                  </div>
               </div>

               </div>
            </div>
         ))}
      </div>
    </>
  );
}