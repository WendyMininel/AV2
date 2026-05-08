import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { usuario } = useAuth();

  const stats = [
    { label: 'Aeronaves em produção', value: '8', icon: '✈︎', color: '#5e9cde' },     
    { label: 'Peças em estoque', value: '156', icon: '⚙', color: '#3d7abe' },        
    { label: 'Etapas concluídas', value: '42', icon: '✔', color: '#2c5a8c' },        
    { label: 'Funcionários ativos', value: '24', icon: '🗣', color: '#1a3a5c' },   
  ];

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>
              Bem-vindo, {usuario?.funcionario.nome}!
            </h2>
            <p className={styles.welcomeText}>
              Este é o sistema de gestão da produção de aeronaves da Aerocode.
            </p>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.recentActivity}>
            <h3 className={styles.sectionTitle}>Atividades Recentes</h3>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <span className={styles.activityIcon}>✈︎</span>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>Aeronave EMB-314 Super Tucano cadastrada</p>
                  <span className={styles.activityTime}>Há 2 horas</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityIcon}>⚙</span>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>Lote de peças importadas recebido</p>
                  <span className={styles.activityTime}>Há 5 horas</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityIcon}>✔</span>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>Etapa de montagem final concluída</p>
                  <span className={styles.activityTime}>Há 1 dia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;