// Normas, NRs e regularização do drone da XPRO (usados na etapa "Campo", no card do drone e no bloco
// "Conformidade e segurança" da home). Só entra no site o que estiver preenchido aqui:
// campo com valor null = [PREENCHER] e NÃO aparece no site (renderização condicional).

export const autoridade = {
  /** norma técnica dos levantamentos */
  norma: { codigo: 'ABNT NBR 13133:2021', descricao: 'Procedimento de levantamento topográfico' },

  /** NRs em que a equipe é treinada / documentação de segurança em dia */
  nrs: [
    { codigo: 'NR-1', detalhe: 'Ordem de serviço e PGR' },
    { codigo: 'NR-6', detalhe: null },
    { codigo: 'NR-7', detalhe: 'ASO e PCMSO' },
    { codigo: 'NR-18', detalhe: null },
    { codigo: 'NR-35', detalhe: null },
  ],

  drone: {
    /** cadastro da aeronave na ANAC (SISANT) */
    cadastroAnac: true,
    /** número do cadastro no SISANT — [PREENCHER] */
    numeroSisant: null as string | null,
    /** homologação do equipamento na ANATEL */
    homologacaoAnatel: true,
    /** voos autorizados pelo DECEA (SARPAS) */
    voosDecea: true,
    /** piloto com certificação — [PREENCHER] (não informado) */
    pilotoCertificado: null as boolean | null,
  },

  /** equipamentos com calibração em dia */
  equipamentosCalibrados: true,
};

/** "NR-1, NR-6, NR-7, NR-18 e NR-35" */
export const listaNrs = (() => {
  const c = autoridade.nrs.map((n) => n.codigo);
  return c.length > 1 ? `${c.slice(0, -1).join(', ')} e ${c[c.length - 1]}` : c.join('');
})();

/** Itens de regularização do drone que têm dado (os sem dado ficam de fora) */
export const registrosDrone = (() => {
  const d = autoridade.drone;
  const itens: string[] = [];
  if (d.cadastroAnac) itens.push(d.numeroSisant ? `Aeronave cadastrada na ANAC (SISANT nº ${d.numeroSisant})` : 'Aeronave cadastrada na ANAC (SISANT)');
  if (d.homologacaoAnatel) itens.push('Equipamento homologado pela ANATEL');
  if (d.pilotoCertificado) itens.push('Piloto certificado');
  if (d.voosDecea) itens.push('Voos autorizados pelo DECEA (SARPAS)');
  return itens;
})();
