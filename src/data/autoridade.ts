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

/** Linha do card do drone: "Regularizado na ANAC, ANATEL e DECEA." (só os órgãos com dado) */
export const droneRegularizado = (() => {
  const d = autoridade.drone;
  const orgaos = [d.cadastroAnac && 'ANAC', d.homologacaoAnatel && 'ANATEL', d.voosDecea && 'DECEA'].filter(Boolean) as string[];
  if (orgaos.length === 0) return null;
  const lista = orgaos.length > 1 ? `${orgaos.slice(0, -1).join(', ')} e ${orgaos[orgaos.length - 1]}` : orgaos[0];
  return `Regularizado na ${lista}.`;
})();

/** Linha do card ANAC: "Aeronave SISANT nº ... · Piloto certificado" (partes sem dado ficam de fora) */
export const linhaAnac = (() => {
  const d = autoridade.drone;
  const partes = [d.numeroSisant && `Aeronave SISANT nº ${d.numeroSisant}`, d.pilotoCertificado && 'Piloto certificado'].filter(Boolean);
  // sem número nem piloto informados: só o que é certo (cadastro no SISANT)
  return partes.length > 0 ? partes.join(' · ') : 'Aeronave cadastrada no SISANT';
})();
