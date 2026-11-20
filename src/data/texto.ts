// Destaca os trechos "[PREENCHER: ...]" e "[FOTO REAL: ...]" para ficarem fáceis de achar no site.
// Use com set:html: <p set:html={marcar(texto)} />
export function marcar(texto: string) {
  const seguro = texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return seguro.replace(/\[(PREENCHER|FOTO REAL):[^\]]*\]/g, (m) => `<mark class="preencher">${m}</mark>`);
}

export const temPlaceholder = (texto: string) => /\[(PREENCHER|FOTO REAL):/.test(texto);
