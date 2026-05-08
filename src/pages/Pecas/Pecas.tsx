import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { Peca, StatusPeca, TipoPeca } from '../../types';
import styles from './Pecas.module.css';

const Pecas: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([
    {
      id: '1',
      nome: 'Motor Turbofan',
      tipo: TipoPeca.IMPORTADA,
      fornecedor: 'Pratt & Whitney',
      status: StatusPeca.PRONTA
    },
    {
      id: '2',
      nome: 'Asa Principal',
      tipo: TipoPeca.NACIONAL,
      fornecedor: 'AeroEstruturas',
      status: StatusPeca.EM_PRODUCAO
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: TipoPeca.NACIONAL,
    fornecedor: '',
    status: StatusPeca.EM_PRODUCAO
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaPeca: Peca = {
      id: Date.now().toString(),
      ...formData
    };
    setPecas([...pecas, novaPeca]);
    setShowForm(false);
    setFormData({
      nome: '',
      tipo: TipoPeca.NACIONAL,
      fornecedor: '',
      status: StatusPeca.EM_PRODUCAO
    });
  };

  const handleUpdateStatus = (id: string, newStatus: StatusPeca) => {
    setPecas(pecas.map(peca =>
      peca.id === id ? { ...peca, status: newStatus } : peca
    ));
  };

  const getStatusLabel = (status: StatusPeca) => {
    const labels = {
      [StatusPeca.EM_PRODUCAO]: 'Em Produção',
      [StatusPeca.EM_TRANSPORTE]: 'Em Transporte',
      [StatusPeca.PRONTA]: 'Pronta'
    };
    return labels[status];
  };

  const getTipoLabel = (tipo: TipoPeca) => {
    return tipo === TipoPeca.NACIONAL ? 'Nacional' : 'Importada';
  };

  return (
    <div className={styles.pecas}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Gerenciamento de Peças</h2>
            <button
              className={styles.createButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Nova Peça'}
            </button>
          </div>

          {showForm && (
            <div className={styles.formContainer}>
              <h3>Cadastrar Nova Peça</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Nome *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Tipo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoPeca })}
                  >
                    <option value={TipoPeca.NACIONAL}>Nacional</option>
                    <option value={TipoPeca.IMPORTADA}>Importada</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Fornecedor *</label>
                  <input
                    type="text"
                    value={formData.fornecedor}
                    onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>Cadastrar</button>
              </form>
            </div>
          )}

          <div className={styles.listContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Fornecedor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pecas.map((peca) => (
                  <tr key={peca.id}>
                    <td>{peca.nome}</td>
                    <td>{getTipoLabel(peca.tipo)}</td>
                    <td>{peca.fornecedor}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[peca.status.toLowerCase()]}`}>
                        {getStatusLabel(peca.status)}
                      </span>
                    </td>
                    <td>
                      <select
                        value={peca.status}
                        onChange={(e) => handleUpdateStatus(peca.id, e.target.value as StatusPeca)}
                        className={styles.statusSelect}
                      >
                        <option value={StatusPeca.EM_PRODUCAO}>Em Produção</option>
                        <option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</option>
                        <option value={StatusPeca.PRONTA}>Pronta</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pecas;