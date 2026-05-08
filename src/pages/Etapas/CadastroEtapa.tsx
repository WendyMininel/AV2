import React, { useState } from 'react';
import { Etapa, StatusEtapa, Aeronave } from '../../types';
import styles from './CadastroEtapa.module.css';

interface CadastroEtapaProps {
  onSalvar: (etapa: Etapa) => void;
  onCancelar: () => void;
  aeronaves: Aeronave[];  
}

const CadastroEtapa: React.FC<CadastroEtapaProps> = ({ onSalvar, onCancelar, aeronaves }) => {
  const [formData, setFormData] = useState({
    nome: '',
    prazo: '',
    aeronaveCodigo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.prazo || !formData.aeronaveCodigo) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const novaEtapa: Etapa = {
      id: Date.now().toString(),
      nome: formData.nome,
      prazo: formData.prazo,
      status: StatusEtapa.PENDENTE,
      aeronaveCodigo: formData.aeronaveCodigo,
      funcionarios: []
    };
    onSalvar(novaEtapa);
    setFormData({ nome: '', prazo: '', aeronaveCodigo: '' });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Cadastrar Nova Etapa</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="aeronave">Aeronave *</label>
          <select
            id="aeronave"
            name="aeronave"
            value={formData.aeronaveCodigo}
            onChange={(e) => setFormData({ ...formData, aeronaveCodigo: e.target.value })}
            required
          >
            <option value="">Selecione uma aeronave</option>
            {aeronaves.map((aeronave) => (
              <option key={aeronave.codigo} value={aeronave.codigo}>
                {aeronave.modelo} ({aeronave.codigo})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome da Etapa *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Montagem da Asa"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prazo">Prazo de Conclusão *</label>
          <input
            type="date"
            id="prazo"
            name="prazo"
            value={formData.prazo}
            onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
            required
          />
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Cadastrar Etapa
          </button>
          <button type="button" onClick={onCancelar} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroEtapa;