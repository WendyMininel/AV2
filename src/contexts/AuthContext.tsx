import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Funcionario, NivelPermissao, UsuarioAutenticado } from '../types';

interface AuthContextData {
  usuario: UsuarioAutenticado | null;
  login: (usuario: string, senha: string) => boolean;
  logout: () => void;
  hasPermission: (niveisPermitidos: NivelPermissao[]) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const funcionariosMock: Funcionario[] = [
  {
    id: '1',
    nome: 'Gerson',
    telefone: '(12) 98283-9273',
    endereco: 'Fatec, 123',
    usuario: 'adm',
    senha: 'adm001',
    nivelPermissao: NivelPermissao.ADMINISTRADOR
  },
  {
    id: '2',
    nome: 'Wendy',
    telefone: '(12) 99752-6999',
    endereco: 'Caçapava-SP, 456',
    usuario: 'eng',
    senha: 'eng001',
    nivelPermissao: NivelPermissao.ENGENHEIRO
  },
  {
    id: '3',
    nome: 'Ana',
    telefone: '(12) 99666-4755',
    endereco: 'Caçapava-SP, 789',
    usuario: 'op',
    senha: 'op001',
    nivelPermissao: NivelPermissao.OPERADOR
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(() => {
    const saved = localStorage.getItem('@Aerocode:usuario');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  });

  const login = (usuario: string, senha: string): boolean => {
    const funcionario = funcionariosMock.find(
      f => f.usuario === usuario && f.senha === senha
    );

    if (funcionario) {
      const usuarioAutenticado: UsuarioAutenticado = {
        funcionario,
        token: 'mock-token-' + Date.now()
      };
      setUsuario(usuarioAutenticado);
      localStorage.setItem('@Aerocode:usuario', JSON.stringify(usuarioAutenticado));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('@Aerocode:usuario');
  };

  const hasPermission = (niveisPermitidos: NivelPermissao[]): boolean => {
    if (!usuario) return false;
    return niveisPermitidos.includes(usuario.funcionario.nivelPermissao);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);