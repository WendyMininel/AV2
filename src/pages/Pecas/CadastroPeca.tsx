import React, { useState } from 'react';
import { Peca, TipoPeca, StatusPeca } from '../../types';
import styles from './CadastroPeca.module.css';

interface CadastroPecaProps {
  onSalvar: (peca: Peca) => void;
  onCancelar: () => void;
}

const CadastroPeca: React.FC<CadastroPecaProps> = ({ onSalvar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: TipoPeca.NACIONAL,
    fornecedor: '',
    status: StatusPeca.EM_PRODUCAO
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.fornecedor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const novaPeca: Peca = {
      id: Date.now().toString(),
      ...formData
    };
    onSalvar(novaPeca);
    setFormData({
      nome: '',
      tipo: TipoPeca.NACIONAL,
      fornecedor: '',
      status: StatusPeca.EM_PRODUCAO
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Cadastrar Nova Peça</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome da Peça *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Motor Turbofan"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoPeca })}
            required
          >
            <option value={TipoPeca.NACIONAL}>Nacional</option>
            <option value={TipoPeca.IMPORTADA}>Importada</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fornecedor">Fornecedor *</label>
          <input
            type="text"
            id="fornecedor"
            name="fornecedor"
            value={formData.fornecedor}
            onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
            placeholder="Ex: Pratt & Whitney"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status Inicial *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusPeca })}
            required
          >
            <option value={StatusPeca.EM_PRODUCAO}>Em Produção</option>
            <option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</option>
            <option value={StatusPeca.PRONTA}>Pronta</option>
          </select>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Cadastrar Peça
          </button>
          <button type="button" onClick={onCancelar} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroPeca;