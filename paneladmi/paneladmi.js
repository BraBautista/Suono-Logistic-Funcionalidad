async function cargarClientes() {
  try {
    const res = await fetch('/api/clientes');
    const clientes = await res.json();
    const tbody = document.getElementById('clientes-body');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    alert('❌ Error al cargar clientes');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const clientesMenu = document.getElementById('clientes-menu');
  const seccionClientes = document.getElementById('seccion-clientes');
  const content = document.querySelector('.content').children;

  clientesMenu.addEventListener('click', () => {
    // Oculta todas las tarjetas del panel inicial
    for (let el of content) {
      el.style.display = 'none';
    }
    // Muestra la sección de clientes
    seccionClientes.style.display = 'block';
    // Carga los datos de clientes dinámicamente
    cargarClientes();
  });

  const form = document.getElementById('form-cliente');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nombre || !email) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      });

      if (res.ok) {
        form.reset();
        alert('✅ Cliente registrado exitosamente');
        cargarClientes(); // Vuelve a cargar la lista con el nuevo cliente
      } else {
        const data = await res.json();
        alert('❌ Error: ' + (data.error || 'No se pudo registrar el cliente'));
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error al registrar cliente');
    }
  });
});
