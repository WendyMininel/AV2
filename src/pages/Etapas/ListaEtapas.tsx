import React, { useState } from 'react';
import { Etapa, StatusEtapa, Funcionario, Aeronave } from '../../types';
import styles from './ListaEtapas.module.css';

interface ListaEtapasProps {
  etapas: Etapa[];
  onIniciar: (index: number) => void;
  onFinalizar: (index: number) => void;
  onAssociarFuncionario: (etapaId: string, funcionario: Funcionario) => void;
  funcionarios: Funcionario[];
  aeronaves: Aeronave[];
}

const ListaEtapas: React.FC<ListaEtapasProps> = ({ 
  etapas, 
  onIniciar, 
  onFinalizar, 
  onAssociarFuncionario,
  funcionarios,
  aeronaves
}) => {
  const [etapaSelecionada, setEtapaSelecionada] = useState<string | null>(null);
  const [filtroAeronave, setFiltroAeronave] = useState<string>('');

  const getStatusLabel = (status: StatusEtapa) => {
    const labels = {
      [StatusEtapa.PENDENTE]: 'Pendente',
      [StatusEtapa.ANDAMENTO]: 'Em Andamento',
      [StatusEtapa.CONCLUIDA]: 'Concluída'
    };
    return labels[status];
  };

  const getStatusClass = (status: StatusEtapa) => {
    const classes = {
      [StatusEtapa.PENDENTE]: styles.pendente,
      [StatusEtapa.ANDAMENTO]: styles.andamento,
      [StatusEtapa.CONCLUIDA]: styles.concluida
    };
    return classes[status];
  };

  const getNomeAeronave = (codigo: string) => {
    const aeronave = aeronaves.find(a => a.codigo === codigo);
    return aeronave ? `${aeronave.modelo} (${codigo})` : codigo;
  };

  const etapasFiltradas = filtroAeronave 
    ? etapas.filter(e => e.aeronaveCodigo === filtroAeronave)
    : etapas;

  if (etapas.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Nenhuma etapa cadastrada.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Filtro por aeronave */}
      <div className={styles.filterContainer}>
        <label>Filtrar por aeronave:</label>
        <select
          value={filtroAeronave}
          onChange={(e) => setFiltroAeronave(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todas as aeronaves</option>
          {aeronaves.map(aeronave => (
            <option key={aeronave.codigo} value={aeronave.codigo}>
              {aeronave.modelo} ({aeronave.codigo})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.timeline}>
        {etapasFiltradas.map((etapa, index) => {
          const originalIndex = etapas.findIndex(e => e.id === etapa.id);
          return (
            <div key={etapa.id} className={styles.timelineItem}>
              <div className={`${styles.timelineMarker} ${getStatusClass(etapa.status)}`}>
                {index + 1}
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.etapaHeader}>
                  <h3>{etapa.nome}</h3>
                  <span className={`${styles.statusBadge} ${getStatusClass(etapa.status)}`}>
                    {getStatusLabel(etapa.status)}
                  </span>
                </div>
                
                <p className={styles.etapaAeronave}>
                  Aeronave: {getNomeAeronave(etapa.aeronaveCodigo)}
                </p>
                
                <p className={styles.etapaPrazo}>
                  Prazo: {new Date(etapa.prazo).toLocaleDateString('pt-BR')}
                </p>
                
                {etapa.funcionarios && etapa.funcionarios.length > 0 && (
                  <div className={styles.funcionariosList}>
                    <strong>👥 Funcionários Responsáveis:</strong>
                    <ul>
                      {etapa.funcionarios.map(f => (
                        <li key={f.id}>{f.nome} - {f.nivelPermissao}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.etapaActions}>
                  {etapa.status === StatusEtapa.PENDENTE && (
                    <button
                      onClick={() => onIniciar(originalIndex)}
                      className={styles.startButton}
                    >
                      Iniciar Etapa
                    </button>
                  )}
                  
                  {etapa.status === StatusEtapa.ANDAMENTO && (
                    <button
                      onClick={() => onFinalizar(originalIndex)}
                      className={styles.finishButton}
                    >
                      Finalizar Etapa
                    </button>
                  )}

                  {etapa.status !== StatusEtapa.CONCLUIDA && (
                    <div className={styles.associarSection}>
                      <button
                        onClick={() => setEtapaSelecionada(etapaSelecionada === etapa.id ? null : etapa.id)}
                        className={styles.associarButton}
                      >
                        {etapaSelecionada === etapa.id ? 'Cancelar' : '+ Associar Funcionário'}
                      </button>
                      
                      {etapaSelecionada === etapa.id && (
                        <select
                          onChange={(e) => {
                            const func = funcionarios.find(f => f.id === e.target.value);
                            if (func) {
                              onAssociarFuncionario(etapa.id, func);
                              setEtapaSelecionada(null);
                            }
                          }}
                          className={styles.funcionarioSelect}
                          defaultValue=""
                        >
                          <option value="" disabled>Selecione um funcionário</option>
                          {funcionarios.map(f => (
                            <option key={f.id} value={f.id}>{f.nome} - {f.nivelPermissao}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaEtapas;