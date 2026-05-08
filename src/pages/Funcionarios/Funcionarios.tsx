import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { Funcionario, NivelPermissao } from '../../types';
import styles from './Funcionarios.module.css';

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    {
      id: '1',
      nome: 'Claudio',
      telefone: '(11) 99999-9999',
      endereco: 'Rua A, 123',
      usuario: 'admin',
      senha: 'admin123',
      nivelPermissao: NivelPermissao.ADMINISTRADOR
    },
    {
      id: '2',
      nome: 'Jean',
      telefone: '(11) 88888-8888',
      endereco: 'Rua B, 456',
      usuario: 'engenheiro',
      senha: 'eng123',
      nivelPermissao: NivelPermissao.ENGENHEIRO
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    usuario: '',
    senha: '',
    nivelPermissao: NivelPermissao.OPERADOR
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoFuncionario: Funcionario = {
      id: Date.now().toString(),
      ...formData
    };
    setFuncionarios([...funcionarios, novoFuncionario]);
    setShowForm(false);
    setFormData({
      nome: '',
      telefone: '',
      endereco: '',
      usuario: '',
      senha: '',
      nivelPermissao: NivelPermissao.OPERADOR
    });
  };

  const handleRemover = (id: string) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const getPermissaoLabel = (nivel: NivelPermissao) => {
    const labels = {
      [NivelPermissao.ADMINISTRADOR]: 'Administrador',
      [NivelPermissao.ENGENHEIRO]: 'Engenheiro',
      [NivelPermissao.OPERADOR]: 'Operador'
    };
    return labels[nivel];
  };

  return (
    <div className={styles.funcionarios}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Gerenciamento de Funcionários</h2>
            <button
              className={styles.createButton}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Novo Funcionário'}
            </button>
          </div>

          {showForm && (
            <div className={styles.formContainer}>
              <h3>Cadastrar Novo Funcionário</h3>
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
                  <label>Telefone *</label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Endereço *</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Usuário *</label>
                  <input
                    type="text"
                    value={formData.usuario}
                    onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Senha *</label>
                  <input
                    type="password"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nível de Permissão *</label>
                  <select
                    value={formData.nivelPermissao}
                    onChange={(e) => setFormData({ ...formData, nivelPermissao: e.target.value as NivelPermissao })}
                  >
                    <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
                    <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
                    <option value={NivelPermissao.OPERADOR}>Operador</option>
                  </select>
                </div>
                <button type="submit" className={styles.submitButton}>Cadastrar Funcionário</button>
              </form>
            </div>
          )}

          <div className={styles.listContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th>Usuário</th>
                  <th>Permissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.telefone}</td>
                    <td>{funcionario.endereco}</td>
                    <td>{funcionario.usuario}</td>
                    <td>
                      <span className={`${styles.permissionBadge} ${styles[funcionario.nivelPermissao.toLowerCase()]}`}>
                        {getPermissaoLabel(funcionario.nivelPermissao)}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemover(funcionario.id)}
                        className={styles.deleteButton}
                      >
                        Remover
                      </button>
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

export default Funcionarios;