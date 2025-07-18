let dados = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('spiritual_names.json')
    .then(response => response.json())
    .then(data => {
      dados = data;
      exibirResultados(dados);
    });

  const input = document.getElementById('search');
  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase();
    const filtrados = dados.filter(item =>
      Object.values(item).some(valor =>
        valor.toLowerCase().includes(termo)
      )
    );
    exibirResultados(filtrados);
  });
});

function exibirResultados(lista) {
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
      <td>${item.notes || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}
