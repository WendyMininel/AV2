import React, { useState } from 'react';
import { Funcionario, NivelPermissao } from '../../types';
import styles from './CadastroFuncionario.module.css';

interface CadastroFuncionarioProps {
  onSalvar: (funcionario: Funcionario) => void;
  onCancelar: () => void;
}

const CadastroFuncionario: React.FC<CadastroFuncionarioProps> = ({ onSalvar, onCancelar }) => {
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
    if (!formData.nome || !formData.telefone || !formData.endereco || !formData.usuario || !formData.senha) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const novoFuncionario: Funcionario = {
      id: Date.now().toString(),
      ...formData
    };
    onSalvar(novoFuncionario);
    setFormData({
      nome: '',
      telefone: '',
      endereco: '',
      usuario: '',
      senha: '',
      nivelPermissao: NivelPermissao.OPERADOR
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Cadastrar Novo Funcionário</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome Completo *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone *</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            placeholder="(11) 99999-9999"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endereco">Endereço *</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
            placeholder="Rua, número, bairro, cidade"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="usuario">Usuário *</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              placeholder="Nome de usuário"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha *</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              placeholder="********"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nivelPermissao">Nível de Permissão *</label>
          <select
            id="nivelPermissao"
            name="nivelPermissao"
            value={formData.nivelPermissao}
            onChange={(e) => setFormData({ ...formData, nivelPermissao: e.target.value as NivelPermissao })}
            required
          >
            <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
          </select>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Cadastrar Funcionário
          </button>
          <button type="button" onClick={onCancelar} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroFuncionario;