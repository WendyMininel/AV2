import React, { useState } from 'react';
import { Aeronave, TipoAeronave } from '../../types';
import styles from './CadastroAeronave.module.css';

interface CadastroAeronaveProps {
  onSalvar: (aeronave: Aeronave) => void;
}

const CadastroAeronave: React.FC<CadastroAeronaveProps> = ({ onSalvar }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    modelo: '',
    tipo: TipoAeronave.COMERCIAL,
    capacidade: 0,
    alcance: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codigo || !formData.modelo) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    onSalvar(formData as Aeronave);
    setFormData({
      codigo: '',
      modelo: '',
      tipo: TipoAeronave.COMERCIAL,
      capacidade: 0,
      alcance: 0
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Cadastrar Nova Aeronave</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="codigo">Código *</label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            placeholder="Ex: EMB-001"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="modelo">Modelo *</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Ex: E190-E2"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value={TipoAeronave.COMERCIAL}>Comercial</option>
            <option value={TipoAeronave.MILITAR}>Militar</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="capacidade">Capacidade (passageiros)</label>
          <input
            type="number"
            id="capacidade"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="alcance">Alcance (km)</label>
          <input
            type="number"
            id="alcance"
            name="alcance"
            value={formData.alcance}
            onChange={handleChange}
            min="0"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Cadastrar Aeronave
        </button>
      </form>
    </div>
  );
};

export default CadastroAeronave;