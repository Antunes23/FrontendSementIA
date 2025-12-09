'use client';
import "./page.css";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  // --- ESTADOS ---
  const [talhoesList, setTalhoesList] = useState<Talhao[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTalhao, setSelectedTalhao] = useState<Talhao | null>(null);

  // --- SENSORES FIREBASE ---
  const [dadosNPK, setDadosNPK] = useState<any>(null);
  const [dadosTemp, setDadosTemp] = useState<any>(null);
  const [dadosPH, setDadosPH] = useState<any>(null);
  const [dadosUmid, setDadosUmid] = useState<any>(null);
  const [loadingFirebase, setLoadingFirebase] = useState(true);

  // 1. BUSCAR TALHÕES
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

  // 2. CONEXÃO FIREBASE
  useEffect(() => {
    const npkRef = ref(db, 'dados');
    const tempRef = ref(db, 'dados2');
    const phRef = ref(db, 'dados3');
    const umidRef = ref(db, 'dados4');

    setLoadingFirebase(true);

    const unsubNPK = onValue(npkRef, (snapshot) => setDadosNPK(snapshot.val()));
    const unsubTemp = onValue(tempRef, (snapshot) => setDadosTemp(snapshot.val()));
    const unsubPH = onValue(phRef, (snapshot) => setDadosPH(snapshot.val()));
    const unsubUmid = onValue(umidRef, (snapshot) => {
        setDadosUmid(snapshot.val());
        setLoadingFirebase(false); 
    });

    return () => {
        unsubNPK(); unsubTemp(); unsubPH(); unsubUmid();
    };
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    if (!window.confirm("Deseja realmente excluir este talhão?")) return;
    
    try {
       await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
       fetchTalhoes();
    } catch (error) {
       alert("Erro ao deletar");
    }
  }

  const showVal = (val: any) => loadingFirebase ? '...' : (val ?? '-');

  if (loading) return <div className="fallback-container"><h1 className="fallback-title">Carregando...</h1></div>;

  if (talhoesList.length === 0) return (
    <div className="fallback-container">
      <div className="fallback-card">
        <h1 className="fallback-title">Sem plantações cadastradas</h1>
        <Link href="/dashboard/talhao/novo-talhao" className="fallback-button">Criar Nova</Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="th_layout_padding" style={{ padding: '20px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{color: '#064e3b'}}></h2>
            <Link href="/dashboard/talhao/novo-talhao" className="fallback-button" style={{ textDecoration: 'none', fontSize: '14px' }}>
               + Novo Talhão
            </Link>
         </div>

         <div className="th_grid">
            {talhoesList.map((talhao) => (
                <div 
                    key={talhao.idTalhao} 
                    className="th_card" 
                    onClick={() => setSelectedTalhao(talhao)} 
                    style={{ cursor: 'pointer' }}
                >
                    <button className="th_delete_btn" onClick={(e) => handleDelete(e, talhao.idTalhao)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    
                    <div className="th_card_header">
                        <span className="th_card_title">{talhao.nomeTalhao}</span>
                        <span className="th_card_status">Ativo</span>
                    </div>
                    
                    <div>
                        <p><strong>Cultura:</strong> {talhao.cultura}</p>
                        <p><strong>Variedade:</strong> {talhao.variedade}</p>
                    </div>

                    {/* --- AQUI ESTÁ A CORREÇÃO: MOSTRANDO TODOS OS 4 SENSORES NO CARD --- */}
                    <div className="mini-sensor-grid" style={{
                        marginTop: '15px', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap', 
                        gap: '8px'
                    }}>
                         <div className="mini-sensor" style={{fontSize: '0.75rem', padding: '4px 8px'}}>
                            🌡️ {showVal(dadosTemp?.temperatura)}°C
                         </div>
                         <div className="mini-sensor" style={{fontSize: '0.75rem', padding: '4px 8px'}}>
                            💧 {showVal(dadosUmid?.umidade)}%
                         </div>
                         <div className="mini-sensor" style={{fontSize: '0.75rem', padding: '4px 8px'}}>
                            🧪 pH {showVal(dadosPH?.ph)}
                         </div>
                         <div className="mini-sensor" style={{
                            fontSize: '0.75rem', 
                            padding: '4px 8px',
                            borderColor: '#F59E0B', 
                            color: '#D97706', 
                            backgroundColor: '#FFFBEB'
                         }}>
                            🌱 {showVal(dadosNPK?.N)}-{showVal(dadosNPK?.P)}-{showVal(dadosNPK?.K)}
                         </div>
                    </div>

                    <div className="th_card_dates">
                        <span>Plantio: {String(talhao.dataPlantio).split('T')[0]}</span>
                        <span>Colheita: {String(talhao.dataColheita).split('T')[0]}</span>
                    </div>
                </div>
            ))}
             <Link href="/dashboard/talhao/novo-talhao" className="th_add_card_small">
                <i className="fas fa-plus"></i>
                <span>Novo Talhão</span>
            </Link>
         </div>
      </div>

      {/* --- MODAL DE DETALHES --- */}
      {selectedTalhao && (
        <div className="modal-overlay" onClick={() => setSelectedTalhao(null)}>
            <div className="modal-content-details" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header">
                    <h2>{selectedTalhao.nomeTalhao}</h2>
                    <button onClick={() => setSelectedTalhao(null)} className="close-btn">×</button>
                </div>

                <div className="modal-body-scroll">
                    <div className="detail-row">
                        <div className="detail-item">
                            <label>Cultura</label>
                            <p>{selectedTalhao.cultura}</p>
                        </div>
                        <div className="detail-item">
                            <label>Variedade</label>
                            <p>{selectedTalhao.variedade}</p>
                        </div>
                        <div className="detail-item">
                            <label>Estágio Atual</label>
                            <p>{selectedTalhao.estagioIni}</p>
                        </div>
                    </div>

                    <div className="detail-row">
                         <div className="detail-item">
                            <label>Data Plantio</label>
                            <p>{String(selectedTalhao.dataPlantio).split('T')[0]}</p>
                        </div>
                        <div className="detail-item">
                            <label>Previsão Colheita</label>
                            <p>{String(selectedTalhao.dataColheita).split('T')[0]}</p>
                        </div>
                    </div>

                    <div className="detail-full-width">
                        <label>📝 Notas e Observações</label>
                        <div className="notes-box">
                            {selectedTalhao.notasAdicionais 
                                ? selectedTalhao.notasAdicionais 
                                : <span style={{color: '#999', fontStyle: 'italic'}}>Nenhuma nota registrada.</span>
                            }
                        </div>
                    </div>

                    <div className="detail-full-width" style={{marginTop: '20px'}}>
                        <label>📡 Monitoramento Real-Time (Firebase)</label>
                        <div className="mini-sensor-grid">
                            
                            <div className="mini-sensor" style={{ borderColor: '#F59E0B', color: '#D97706', backgroundColor: '#FFFBEB' }}>
                                🌱 NPK: {showVal(dadosNPK?.N)} - {showVal(dadosNPK?.P)} - {showVal(dadosNPK?.K)}
                            </div>
                            
                            <div className="mini-sensor">
                                🌡️ {showVal(dadosTemp?.temperatura)}°C
                            </div>

                            <div className="mini-sensor">
                                💧 {showVal(dadosUmid?.umidade)}% Umid.
                            </div>

                            <div className="mini-sensor">
                                🧪 pH {showVal(dadosPH?.ph)}
                            </div>
                        </div>
                        <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#888', textAlign: 'right'}}>
                           Status: {loadingFirebase ? 'Sincronizando...' : '🟢 Conectado ao Dispositivo'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
}