import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CadastroAeronave from './CadastroAeronave';
import ListaAeronaves from './ListaAeronaves';
import { Aeronave, TipoAeronave } from '../../types';
import styles from './Aeronaves.module.css';

const Aeronaves: React.FC = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: 'EMB-001',
      modelo: 'E190-E2',
      tipo: TipoAeronave.COMERCIAL,
      capacidade: 114,
      alcance: 5300
    },
    {
      codigo: 'EMB-002',
      modelo: 'Super Tucano A-29',
      tipo: TipoAeronave.MILITAR,
      capacidade: 2,
      alcance: 1330
    }
  ]);

  const handleCadastrar = (novaAeronave: Aeronave) => {
    setAeronaves([...aeronaves, novaAeronave]);
    setView('list');
  };

  const handleRemover = (codigo: string) => {
    setAeronaves(aeronaves.filter(a => a.codigo !== codigo));
  };

  return (
    <div className={styles.aeronaves}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Gerenciamento de Aeronaves</h2>
            <div className={styles.actions}>
              {view === 'list' && (
                <button 
                  className={styles.createButton}
                  onClick={() => setView('create')}
                >
                  + Nova Aeronave
                </button>
              )}
              {view === 'create' && (
                <button 
                  className={styles.backButton}
                  onClick={() => setView('list')}
                >
                  ← Voltar
                </button>
              )}
            </div>
          </div>
          
          {view === 'list' && (
            <ListaAeronaves aeronaves={aeronaves} onRemover={handleRemover} />
          )}
          
          {view === 'create' && (
            <CadastroAeronave onSalvar={handleCadastrar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Aeronaves;