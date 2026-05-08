import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CadastroEtapa from './CadastroEtapa';
import ListaEtapas from './ListaEtapas';
import { Etapa, StatusEtapa, Funcionario, Aeronave, TipoAeronave } from '../../types';
import styles from './Etapas.module.css';

const Etapas: React.FC = () => {
  const [aeronaves] = useState<Aeronave[]>([
    { codigo: 'EMB-001', modelo: 'E190-E2', tipo: TipoAeronave.COMERCIAL, capacidade: 114, alcance: 5300 },
    { codigo: 'EMB-002', modelo: 'Super Tucano A-29', tipo: TipoAeronave.MILITAR, capacidade: 2, alcance: 1330 },
    { codigo: 'EMB-003', modelo: 'Phenom 300', tipo: TipoAeronave.COMERCIAL, capacidade: 10, alcance: 3650 }
  ]);

  const [funcionarios] = useState<Funcionario[]>([
    { id: '1', nome: 'João Silva', telefone: '(11) 99999-9999', endereco: 'Rua A', usuario: 'joao', senha: '123', nivelPermissao: 0 as any },
    { id: '2', nome: 'Maria Santos', telefone: '(11) 88888-8888', endereco: 'Rua B', usuario: 'maria', senha: '123', nivelPermissao: 0 as any }
  ]);

  const [etapas, setEtapas] = useState<Etapa[]>([
    {
      id: '1',
      nome: 'Planejamento',
      prazo: '2024-03-15',
      status: StatusEtapa.CONCLUIDA,
      aeronaveCodigo: 'EMB-001',
      funcionarios: []
    },
    {
      id: '2',
      nome: 'Montagem da Estrutura',
      prazo: '2024-04-20',
      status: StatusEtapa.ANDAMENTO,
      aeronaveCodigo: 'EMB-001',
      funcionarios: []
    },
    {
      id: '3',
      nome: 'Instalação dos Sistemas',
      prazo: '2024-05-30',
      status: StatusEtapa.PENDENTE,
      aeronaveCodigo: 'EMB-002',
      funcionarios: []
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleSalvarEtapa = (novaEtapa: Etapa) => {
    setEtapas([...etapas, novaEtapa]);
    setShowForm(false);
  };

  const handleIniciar = (index: number) => {
    const newEtapas = [...etapas];
    if (newEtapas[index].status === StatusEtapa.PENDENTE) {
      newEtapas[index].status = StatusEtapa.ANDAMENTO;
      setEtapas(newEtapas);
    }
  };

  const handleFinalizar = (index: number) => {
    const newEtapas = [...etapas];
    if (newEtapas[index].status === StatusEtapa.ANDAMENTO) {
      newEtapas[index].status = StatusEtapa.CONCLUIDA;
      setEtapas(newEtapas);
    } else {
      alert('A etapa precisa estar em andamento para ser concluída.');
    }
  };

  const handleAssociarFuncionario = (etapaId: string, funcionario: Funcionario) => {
    setEtapas(etapas.map(etapa => {
      if (etapa.id === etapaId) {
        const funcionariosExistentes = etapa.funcionarios || [];
        if (!funcionariosExistentes.some(f => f.id === funcionario.id)) {
          return { ...etapa, funcionarios: [...funcionariosExistentes, funcionario] };
        }
        alert('Funcionário já associado a esta etapa!');
      }
      return etapa;
    }));
  };

  return (
    <div className={styles.etapas}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Gerenciamento de Etapas</h2>
            <button
              className={styles.createButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Nova Etapa'}
            </button>
          </div>

          {showForm && (
            <CadastroEtapa 
              onSalvar={handleSalvarEtapa}
              onCancelar={() => setShowForm(false)}
              aeronaves={aeronaves}
            />
          )}

          <ListaEtapas 
            etapas={etapas}
            onIniciar={handleIniciar}
            onFinalizar={handleFinalizar}
            onAssociarFuncionario={handleAssociarFuncionario}
            funcionarios={funcionarios}
            aeronaves={aeronaves}
          />
        </div>
      </div>
    </div>
  );
};

export default Etapas;