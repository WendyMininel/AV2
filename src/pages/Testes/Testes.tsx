import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { Teste, TipoTeste, ResultadoTeste, Aeronave } from '../../types';
import styles from './Testes.module.css';

const Testes: React.FC = () => {
  const [testes, setTestes] = useState<Teste[]>([
    {
      id: '1',
      tipo: TipoTeste.ELETRICO,
      resultado: ResultadoTeste.APROVADO,
      aeronaveCodigo: 'EMB-001'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: TipoTeste.ELETRICO,
    resultado: ResultadoTeste.APROVADO,
    aeronaveCodigo: ''
  });

  const aeronavesDisponiveis: Aeronave[] = [
    { codigo: 'EMB-001', modelo: 'E190-E2', tipo: 0 as any, capacidade: 114, alcance: 5300 },
    { codigo: 'EMB-002', modelo: 'Super Tucano A-29', tipo: 0 as any, capacidade: 2, alcance: 1330 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoTeste: Teste = {
      id: Date.now().toString(),
      ...formData
    };
    setTestes([...testes, novoTeste]);
    setShowForm(false);
    setFormData({
      tipo: TipoTeste.ELETRICO,
      resultado: ResultadoTeste.APROVADO,
      aeronaveCodigo: ''
    });
  };

  const getTipoLabel = (tipo: TipoTeste) => {
    const labels = {
      [TipoTeste.ELETRICO]: 'Elétrico',
      [TipoTeste.HIDRAULICO]: 'Hidráulico',
      [TipoTeste.AERODINAMICO]: 'Aerodinâmico'
    };
    return labels[tipo];
  };

  const getResultadoLabel = (resultado: ResultadoTeste) => {
    return resultado === ResultadoTeste.APROVADO ? 'Aprovado' : 'Reprovado';
  };

  return (
    <div className={styles.testes}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Testes de Qualidade</h2>
            <button
              className={styles.createButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Novo Teste'}
            </button>
          </div>

          {showForm && (
            <div className={styles.formContainer}>
              <h3>Registrar Novo Teste</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Aeronave *</label>
                  <select
                    value={formData.aeronaveCodigo}
                    onChange={(e) => setFormData({ ...formData, aeronaveCodigo: e.target.value })}
                    required
                  >
                    <option value="">Selecione uma aeronave</option>
                    {aeronavesDisponiveis.map(a => (
                      <option key={a.codigo} value={a.codigo}>{a.modelo} ({a.codigo})</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Tipo de Teste *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoTeste })}
                  >
                    <option value={TipoTeste.ELETRICO}>Elétrico</option>
                    <option value={TipoTeste.HIDRAULICO}>Hidráulico</option>
                    <option value={TipoTeste.AERODINAMICO}>Aerodinâmico</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Resultado *</label>
                  <select
                    value={formData.resultado}
                    onChange={(e) => setFormData({ ...formData, resultado: e.target.value as ResultadoTeste })}
                  >
                    <option value={ResultadoTeste.APROVADO}>Aprovado</option>
                    <option value={ResultadoTeste.REPROVADO}>Reprovado</option>
                  </select>
                </div>
                <button type="submit" className={styles.submitButton}>Registrar Teste</button>
              </form>
            </div>
          )}

          <div className={styles.listContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Aeronave</th>
                  <th>Tipo de Teste</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {testes.map((teste) => (
                  <tr key={teste.id}>
                    <td>{teste.aeronaveCodigo}</td>
                     <td>{getTipoLabel(teste.tipo)}</td>
                     <td>
                       <span className={`${styles.resultBadge} ${styles[teste.resultado.toLowerCase()]}`}>
                         {getResultadoLabel(teste.resultado)}
                       </span>
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

export default Testes;