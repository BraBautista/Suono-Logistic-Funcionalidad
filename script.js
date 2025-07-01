document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      const sectionId = link.dataset.section;
      sections.forEach(s => {
        s.style.display = s.id === sectionId ? "flex" : "none";
      });
    });
  });

  // ---------- FUNCIONES COMUNES PARA CRUD ----------
  function initForm(id, storageKey, fields) {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const item = {};
      let valid = true;
      fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input || !input.value.trim()) valid = false;
        item[field] = input.value.trim();
      });
      if (valid) {
        data.push(item);
        localStorage.setItem(storageKey, JSON.stringify(data));
        form.reset();
        renderTable(storageKey, fields);
      }
    });

    renderTable(storageKey, fields);
  }

  function renderTable(storageKey, fields) {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const table = document.querySelector(`#tabla-${storageKey} tbody`);
    if (!table) return;
    table.innerHTML = "";
    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = fields.map(f => `<td>${item[f]}</td>`).join("") +
        `<td>
          <button class="button mini" onclick="editarItem('${storageKey}', ${index}, ${JSON.stringify(fields)})">✏️</button>
          <button class="button mini danger" onclick="eliminarItem('${storageKey}', ${index}, ${JSON.stringify(fields)})">🗑️</button>
        </td>`;
      table.appendChild(tr);
    });
  }

  window.editarItem = (key, index, fields) => {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    const item = data[index];
    fields.forEach(f => {
      const nuevo = prompt(`Editar ${f}`, item[f]);
      if (nuevo) item[f] = nuevo;
    });
    data[index] = item;
    localStorage.setItem(key, JSON.stringify(data));
    renderTable(key, fields);
  };

  window.eliminarItem = (key, index, fields) => {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
    renderTable(key, fields);
  };

  // ---------- INICIALIZAR MÓDULOS ----------
  initForm("form-clientes", "clientes", ["nombreCliente", "correoCliente"]);
  initForm("form-inventario", "inventario", ["equipoNombre", "equipoEstado"]);
  initForm("form-reservas", "reservas", ["clienteReserva", "fechaReserva", "servicioReserva"]);
  initForm("form-colaborador", "colaboradores", ["nombreColaborador", "rolColaborador", "correoColaborador"]);
  initForm("form-proveedor", "proveedores", ["nombreProveedor", "productoProveedor", "contactoProveedor"]);
  initForm("form-pqr", "pqr", ["nombrePQR", "tipoPQR", "mensajePQR"]);

  // Configuración básica
  const configForm = document.getElementById("form-config");
  if (configForm) {
    configForm.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("empresaNombre").value;
      const color = document.getElementById("colorPanel").value;
      localStorage.setItem("config", JSON.stringify({ nombre, color }));
      document.getElementById("resultado-config").textContent = `Configuración guardada: ${nombre}`;
    });
  }

  // ---------- ALERTAS CLÁSICAS PARA BOTONES ----------
  const botones = document.querySelectorAll(".button");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const texto = boton.textContent.trim();
      if (texto === "Nuevo Evento") {
        alert("Funcionalidad de 'Nuevo Evento' pendiente de implementar.");
      }
      if (texto === "Nueva Cotización") {
        alert("Funcionalidad de 'Nueva Cotización' pendiente de implementar.");
      }
    });
  });
});
