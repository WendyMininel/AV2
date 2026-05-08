import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { Aeronave, Peca, Etapa, Teste, TipoAeronave, StatusEtapa, ResultadoTeste, TipoPeca, StatusPeca, TipoTeste } from '../../types';
import styles from './Relatorio.module.css';

const Relatorio: React.FC = () => {
  const [selectedAeronave, setSelectedAeronave] = useState<string>('');
  const [cliente, setCliente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [relatorioGerado, setRelatorioGerado] = useState<string | null>(null);

  const aeronaves: Aeronave[] = [
    { codigo: 'EMB-001', modelo: 'E190-E2', tipo: TipoAeronave.COMERCIAL, capacidade: 114, alcance: 5300 },
    { codigo: 'EMB-002', modelo: 'Super Tucano A-29', tipo: TipoAeronave.MILITAR, capacidade: 2, alcance: 1330 }
  ];

  const pecas: Peca[] = [
    { id: '1', nome: 'Motor Turbofan', tipo: TipoPeca.IMPORTADA, fornecedor: 'Pratt & Whitney', status: StatusPeca.PRONTA },
    { id: '2', nome: 'Asa Principal', tipo: TipoPeca.NACIONAL, fornecedor: 'AeroEstruturas', status: StatusPeca.PRONTA },
    { id: '3', nome: 'Trem de Pouso', tipo: TipoPeca.IMPORTADA, fornecedor: 'Safran', status: StatusPeca.PRONTA }
  ];

  const etapas: Etapa[] = [
    { id: '1', nome: 'Planejamento', prazo: '2024-03-15', status: StatusEtapa.CONCLUIDA, aeronaveCodigo: 'EMB-001', funcionarios: [] },
    { id: '2', nome: 'Montagem da Estrutura', prazo: '2024-04-20', status: StatusEtapa.CONCLUIDA, aeronaveCodigo: 'EMB-001', funcionarios: [] },
    { id: '3', nome: 'Instalação Elétrica', prazo: '2024-05-10', status: StatusEtapa.CONCLUIDA, aeronaveCodigo: 'EMB-001', funcionarios: [] },
    { id: '4', nome: 'Planejamento Militar', prazo: '2024-03-20', status: StatusEtapa.CONCLUIDA, aeronaveCodigo: 'EMB-002', funcionarios: [] },
    { id: '5', nome: 'Montagem da Estrutura Reforçada', prazo: '2024-04-25', status: StatusEtapa.CONCLUIDA, aeronaveCodigo: 'EMB-002', funcionarios: [] }
  ];

  const testes: Teste[] = [
    { id: '1', tipo: TipoTeste.ELETRICO, resultado: ResultadoTeste.APROVADO, aeronaveCodigo: 'EMB-001' },
    { id: '2', tipo: TipoTeste.HIDRAULICO, resultado: ResultadoTeste.APROVADO, aeronaveCodigo: 'EMB-001' },
    { id: '3', tipo: TipoTeste.AERODINAMICO, resultado: ResultadoTeste.APROVADO, aeronaveCodigo: 'EMB-001' },
    { id: '4', tipo: TipoTeste.ELETRICO, resultado: ResultadoTeste.APROVADO, aeronaveCodigo: 'EMB-002' },
    { id: '5', tipo: TipoTeste.AERODINAMICO, resultado: ResultadoTeste.APROVADO, aeronaveCodigo: 'EMB-002' }
  ];

  const getEtapasDaAeronave = () => {
    if (!selectedAeronave) return [];
    return etapas.filter(e => e.aeronaveCodigo === selectedAeronave && e.status === StatusEtapa.CONCLUIDA);
  };

  const getTestesDaAeronave = () => {
    if (!selectedAeronave) return [];
    return testes.filter(t => t.aeronaveCodigo === selectedAeronave);
  };

  const getTipoTesteLabel = (tipo: TipoTeste) => {
    const labels = {
      [TipoTeste.ELETRICO]: 'Elétrico',
      [TipoTeste.HIDRAULICO]: 'Hidráulico',
      [TipoTeste.AERODINAMICO]: 'Aerodinâmico'
    };
    return labels[tipo];
  };

  const handleGerarRelatorio = () => {
    if (!selectedAeronave || !cliente || !dataEntrega) {
      alert('Preencha todos os campos para gerar o relatório');
      return;
    }

    const aeronave = aeronaves.find(a => a.codigo === selectedAeronave);
    const etapasDaAeronave = getEtapasDaAeronave();
    const testesDaAeronave = getTestesDaAeronave();
    
    const todasEtapasConcluidas = etapasDaAeronave.length > 0;
    
    const todosTestesAprovados = testesDaAeronave.every(t => t.resultado === ResultadoTeste.APROVADO);
    const statusAprovacao = todasEtapasConcluidas && todosTestesAprovados ? 'APROVADA' : 'PENDENTE DE VERIFICAÇÃO';

    const relatorio = `
     AEROCODE - RELATÓRIO FINAL

     Data de emissão: ${new Date().toLocaleDateString('pt-BR')}
     Horário: ${new Date().toLocaleTimeString('pt-BR')}

DADOS DO CLIENTE
Cliente: ${cliente}
Data de Entrega: ${new Date(dataEntrega).toLocaleDateString('pt-BR')}

DADOS DA AERONAVE
Código: ${aeronave?.codigo}
Modelo: ${aeronave?.modelo}
Tipo: ${aeronave?.tipo === TipoAeronave.COMERCIAL ? 'Comercial' : 'Militar'}
Capacidade: ${aeronave?.capacidade || 'N/A'} ${aeronave?.tipo === TipoAeronave.COMERCIAL ? 'passageiros' : 'pessoas'}
Alcance: ${aeronave?.alcance || 'N/A'} km


ETAPAS REALIZADAS (${etapasDaAeronave.length})
${etapasDaAeronave.length > 0 
  ? etapasDaAeronave.map((e, i) => `${i + 1}. ${e.nome} - Concluída em ${new Date(e.prazo).toLocaleDateString('pt-BR')}`).join('\n')
  : 'Nenhuma etapa concluída para esta aeronave'}

PEÇAS UTILIZADAS
${pecas.map(p => `• ${p.nome}
  - Tipo: ${p.tipo === TipoPeca.NACIONAL ? 'Nacional' : 'Importada'}
  - Fornecedor: ${p.fornecedor}
  - Status: ${p.status === StatusPeca.PRONTA ? 'Pronta para uso' : 'Em processamento'}`).join('\n\n')}

RESULTADOS DOS TESTES (${testesDaAeronave.length})
${testesDaAeronave.length > 0
  ? testesDaAeronave.map(t => `• Teste ${getTipoTesteLabel(t.tipo)}: ${t.resultado === ResultadoTeste.APROVADO ? 'APROVADO' : 'REPROVADO'}`).join('\n')
  : 'Nenhum teste registrado para esta aeronave'}

STATUS FINAL
Status: ${statusAprovacao} 
${todasEtapasConcluidas ? 'Todas as etapas foram concluídas' : 'Existem etapas pendentes'}
${todosTestesAprovados ? 'Todos os testes foram aprovados' : 'Existem testes reprovados ou pendentes'}

AERONAVE ${statusAprovacao}

Observações:
- Este relatório é gerado automaticamente pelo sistema Aerocode.
- Para qualquer dúvida, entre em contato com o suporte técnico.
- Assinatura digital: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}
    `;

    setRelatorioGerado(relatorio);
  };

  const handleSalvarArquivo = () => {
    if (!relatorioGerado) return;
    
    const blob = new Blob([relatorioGerado], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${selectedAeronave}_${cliente.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.relatorio}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Relatório Final de Entrega</h2>
          </div>

          <div className={styles.formSection}>
            <h3>Informações para o Relatório</h3>
            <div className={styles.formGroup}>
              <label>Aeronave *</label>
              <select
                value={selectedAeronave}
                onChange={(e) => setSelectedAeronave(e.target.value)}
              >
                <option value="">Selecione uma aeronave</option>
                {aeronaves.map(a => (
                  <option key={a.codigo} value={a.codigo}>{a.modelo} ({a.codigo})</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Nome do Cliente *</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Digite o nome do cliente"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data de Entrega *</label>
              <input
                type="date"
                value={dataEntrega}
                onChange={(e) => setDataEntrega(e.target.value)}
              />
            </div>

            <button onClick={handleGerarRelatorio} className={styles.generateButton}>
              Gerar Relatório
            </button>
          </div>

          {relatorioGerado && (
            <div className={styles.relatorioSection}>
              <div className={styles.relatorioHeader}>
                <h3>Pré-visualização do Relatório</h3>
                <button onClick={handleSalvarArquivo} className={styles.saveButton}>
                  Salvar em Arquivo
                </button>
              </div>
              <pre className={styles.relatorioContent}>{relatorioGerado}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Relatorio;