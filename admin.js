document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".sidebar li");
  const title = document.querySelector(".header h1");
  const content = document.querySelector(".content");

  const originalTitle = title.textContent;
  const originalContent = content.innerHTML;

  const dynamicSection = document.getElementById("dynamicSection");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      const section = item.textContent.trim();

      if (section === "Panel") {
        title.textContent = originalTitle;
        content.innerHTML = originalContent;
        renderQuotes();
        dynamicSection.innerHTML = "";
      } else {
        loadSection(section);
      }
    });
  });

  // Alertas funcionalidad pendiente
  document.querySelectorAll(".actions button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent.includes("Nuevo Evento")) {
        alert("Funcionalidad de 'Nuevo Evento' pendiente de implementar.");
      }
      if (btn.textContent.includes("Nueva Cotización")) {
        alert("Funcionalidad de 'Nueva Cotización' pendiente de implementar.");
      }
    });
  });

  const quotes = [
    { cliente: "Cliente A", id: "#00842", estado: "Aceptada" },
    { cliente: "Cliente B", id: "#00841", estado: "Pendiente" },
    { cliente: "Cliente C", id: "#00840", estado: "Aceptada" },
    { cliente: "Cliente D", id: "#00839", estado: "Rechazada" }
  ];

  function renderQuotes(filter = "Todas") {
    const card = document.querySelectorAll(".card")[3];
    if (!card) return;

    card.innerHTML = `<h3>Cotizaciones Recientes</h3>`;
    const filtered = filter === "Todas" ? quotes : quotes.filter(q => q.estado === filter);

    filtered.forEach(q => {
      const p = document.createElement("p");
      p.textContent = `${q.cliente} - ${q.id} - ${q.estado}`;
      card.appendChild(p);
    });

    if (!card.querySelector(".filter-buttons")) {
      const filters = ["Todas", "Aceptada", "Pendiente", "Rechazada"];
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("filter-buttons");

      filters.forEach(status => {
        const btn = document.createElement("button");
        btn.textContent = status;
        btn.style.margin = "5px";
        btn.style.padding = "5px 10px";
        btn.style.cursor = "pointer";
        btn.style.border = "none";
        btn.style.borderRadius = "6px";
        btn.style.background = "#3842b5";
        btn.style.color = "#fff";
        btn.addEventListener("click", () => renderQuotes(status));
        btn.addEventListener("mouseover", () => btn.style.background = "#594fbb");
        btn.addEventListener("mouseout", () => btn.style.background = "#3842b5");
        buttonGroup.appendChild(btn);
      });

      card.appendChild(buttonGroup);
    }
  }

  renderQuotes();

  document.querySelector(".search-box input").addEventListener("input", () => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll("table tr").forEach((row, index) => {
      if (index === 0) return;
      const cells = row.querySelectorAll("td");
      const match = Array.from(cells).some(cell =>
        cell.textContent.toLowerCase().includes(query)
      );
      row.style.display = match ? "" : "none";
    });
  });

  // Secciones CRUD
  function loadSection(sectionName) {
    title.textContent = sectionName;
    dynamicSection.innerHTML = "";

    const templates = {
      clientes: { id: "form-clientes", fields: ["nombreCliente", "correoCliente"], html: `
        <div class="card wide">
          <h3>Clientes</h3>
          <form id="form-clientes">
            <input type="text" id="nombreCliente" placeholder="Nombre" required />
            <input type="email" id="correoCliente" placeholder="Correo" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-clientes">
            <thead><tr><th>Nombre</th><th>Correo</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      inventario: { id: "form-inventario", fields: ["equipoNombre", "equipoEstado"], html: `
        <div class="card wide">
          <h3>Inventario</h3>
          <form id="form-inventario">
            <input type="text" id="equipoNombre" placeholder="Nombre del equipo" required />
            <input type="text" id="equipoEstado" placeholder="Estado" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-inventario">
            <thead><tr><th>Equipo</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      reservas: { id: "form-reservas", fields: ["clienteReserva", "fechaReserva", "servicioReserva"], html: `
        <div class="card wide">
          <h3>Reservas</h3>
          <form id="form-reservas">
            <input type="text" id="clienteReserva" placeholder="Cliente" required />
            <input type="date" id="fechaReserva" required />
            <input type="text" id="servicioReserva" placeholder="Servicio" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-reservas">
            <thead><tr><th>Cliente</th><th>Fecha</th><th>Servicio</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      colaboradores: { id: "form-colaborador", fields: ["nombreColaborador", "rolColaborador", "correoColaborador"], html: `
        <div class="card wide">
          <h3>Colaboradores</h3>
          <form id="form-colaborador">
            <input type="text" id="nombreColaborador" placeholder="Nombre completo" required />
            <input type="text" id="rolColaborador" placeholder="Rol" required />
            <input type="email" id="correoColaborador" placeholder="Correo" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-colaboradores">
            <thead><tr><th>Nombre</th><th>Rol</th><th>Correo</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      proveedores: { id: "form-proveedor", fields: ["nombreProveedor", "productoProveedor", "contactoProveedor"], html: `
        <div class="card wide">
          <h3>Proveedores</h3>
          <form id="form-proveedor">
            <input type="text" id="nombreProveedor" placeholder="Empresa / Nombre" required />
            <input type="text" id="productoProveedor" placeholder="Producto o Servicio" required />
            <input type="tel" id="contactoProveedor" placeholder="Contacto" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-proveedores">
            <thead><tr><th>Nombre</th><th>Producto</th><th>Contacto</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      pqr: { id: "form-pqr", fields: ["nombrePQR", "tipoPQR", "mensajePQR"], html: `
        <div class="card wide">
          <h3>PQR</h3>
          <form id="form-pqr">
            <input type="text" id="nombrePQR" placeholder="Nombre del solicitante" required />
            <input type="text" id="tipoPQR" placeholder="Tipo (Petición, Queja, Reclamo)" required />
            <input type="text" id="mensajePQR" placeholder="Mensaje" required />
            <button type="submit" class="button">Agregar</button>
          </form>
          <table class="table" id="tabla-pqr">
            <thead><tr><th>Nombre</th><th>Tipo</th><th>Mensaje</th><th>Acciones</th></tr></thead>
            <tbody></tbody>
          </table>
        </div>` },
      configuración: { id: "form-config", fields: [], html: `
        <div class="card wide">
          <h3>Configuración</h3>
          <form id="form-config">
            <input type="text" id="empresaNombre" placeholder="Nombre de la empresa" required />
            <input type="color" id="colorPanel" />
            <button type="submit" class="button">Guardar</button>
          </form>
          <div id="resultado-config"></div>
        </div>` }
    };

    const config = templates[sectionName.toLowerCase()];
    if (config) {
      dynamicSection.innerHTML = config.html;
      initForm(config.id, sectionName.toLowerCase(), config.fields);
    }
  }

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
});
