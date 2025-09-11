let dados = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('spiritual_names.json')
    .then(r => r.json())
    .then(json => {
      // Aceita array direto ou objeto com .names
      dados = Array.isArray(json) ? json : (Array.isArray(json.names) ? json.names : []);
      exibirResultados(dados);
      console.log('Registros carregados:', dados.length);
    })
    .catch(err => {
      console.error('Erro ao carregar JSON:', err);
      exibirResultados([]); // evita quebrar a página
    });

  const input = document.getElementById('search');
  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase().trim();

    const filtrados = dados.filter(item =>
      Object.values(item).some(valor =>
        String(valor ?? '').toLowerCase().includes(termo)
      )
    );

    exibirResultados(filtrados);
  });
});

function exibirResultados(lista = []) {
  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = '';

  lista.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.malename || ''}</td>
      <td>${item.script || ''}</td>
      <td>${item.femalename || ''}</td>
      <td>${item.scripttwo || ''}</td>
      <td>${item.meaning || ''}</td>
      <td>${item.firstorsecond || ''}</td>
      <td>${item.language || ''}</td>
      <td>${item.source || ''}</td>
      <td>${item.confirm || ''}</td>
      <td>${item.pop || ''}</td>
      <td>${item.notes || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}
