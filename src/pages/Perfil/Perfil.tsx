import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';
import { NivelPermissao } from '../../types';
import styles from './Perfil.module.css';

const Perfil: React.FC = () => {
  const { usuario, logout } = useAuth();
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario?.funcionario.nome || '',
    telefone: usuario?.funcionario.telefone || '',
    endereco: usuario?.funcionario.endereco || '',
    usuario: usuario?.funcionario.usuario || '',
    senha: '',
    confirmarSenha: ''
  });
  const [mensagem, setMensagem] = useState('');

  const getPermissaoLabel = (nivel: NivelPermissao) => {
    const labels = {
      [NivelPermissao.ADMINISTRADOR]: 'Administrador',
      [NivelPermissao.ENGENHEIRO]: 'Engenheiro',
      [NivelPermissao.OPERADOR]: 'Operador'
    };
    return labels[nivel];
  };

  const handleSalvar = () => {
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      setMensagem('As senhas não coincidem!');
      return;
    }

    // Atualizar dados no localStorage
    const usuarioAtualizado = {
      ...usuario!,
      funcionario: {
        ...usuario!.funcionario,
        nome: formData.nome,
        telefone: formData.telefone,
        endereco: formData.endereco,
        usuario: formData.usuario,
        senha: formData.senha || usuario!.funcionario.senha
      }
    };
    
    localStorage.setItem('@Aerocode:usuario', JSON.stringify(usuarioAtualizado));
    setMensagem('Perfil atualizado com sucesso!');
    setEditando(false);
    
    setTimeout(() => setMensagem(''), 3000);
  };

  if (!usuario) return null;

  return (
    <div className={styles.perfil}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Meu Perfil</h2>
            {!editando && (
              <button 
                className={styles.editButton}
                onClick={() => setEditando(true)}
              >
                Editar Perfil
              </button>
            )}
          </div>

          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {usuario.funcionario.nome.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <h3>{usuario.funcionario.nome}</h3>
                <span className={`${styles.permissionBadge} ${styles[usuario.funcionario.nivelPermissao.toLowerCase()]}`}>
                  {getPermissaoLabel(usuario.funcionario.nivelPermissao)}
                </span>
              </div>
            </div>

            {mensagem && (
              <div className={styles.successMessage}>{mensagem}</div>
            )}

            {editando ? (
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Endereço</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Usuário</label>
                  <input
                    type="text"
                    value={formData.usuario}
                    onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Nova Senha</label>
                    <input
                      type="password"
                      placeholder="Deixe em branco para manter a atual"
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Confirmar Nova Senha</label>
                    <input
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={formData.confirmarSenha}
                      onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button type="button" onClick={handleSalvar} className={styles.saveButton}>
                    Salvar Alterações
                  </button>
                  <button type="button" onClick={() => setEditando(false)} className={styles.cancelButton}>
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.infoSection}>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <label>Nome</label>
                    <p>{usuario.funcionario.nome}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Telefone</label>
                    <p>{usuario.funcionario.telefone}</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <label>Endereço</label>
                    <p>{usuario.funcionario.endereco}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Usuário</label>
                    <p>{usuario.funcionario.usuario}</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <label>Nível de Permissão</label>
                    <p>{getPermissaoLabel(usuario.funcionario.nivelPermissao)}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>ID do Funcionário</label>
                    <p>{usuario.funcionario.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;