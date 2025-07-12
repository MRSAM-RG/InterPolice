import { getCiudadanos, createCiudadano, deleteCiudadano } from '../api/ciudadanoApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  await cargarCiudadanos();

  document.getElementById('ciudadanoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ciudadano = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      apodo: document.getElementById('apodo').value,
      fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
      planeta_origen: document.getElementById('planeta_origen').value,
      planeta_residencia: document.getElementById('planeta_residencia').value,
      foto: document.getElementById('foto').value,
      codigo_qr: document.getElementById('codigo_qr').value,
      estado_id_estado: document.getElementById('estado_id_estado').value
    };
    await createCiudadano(ciudadano);
    e.target.reset();
    await cargarCiudadanos();
    mostrarAlerta('Ciudadano agregado exitosamente', 'success');
  });
});

async function cargarCiudadanos() {
  try {
    const ciudadanos = await getCiudadanos();
    const tbody = document.getElementById('ciudadanosTable');
    tbody.innerHTML = '';
    
    if (ciudadanos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4">
            <div class="empty-state">
              <i class="bi bi-person-badge"></i>
              <p class="mt-2">No hay ciudadanos registrados</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }
    
    ciudadanos.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="badge bg-secondary">${c.codigo}</span></td>
        <td><strong>${c.nombre}</strong></td>
        <td><strong>${c.apellido}</strong></td>
        <td>${c.apodo ? `<span class="badge bg-info">${c.apodo}</span>` : '<span class="text-muted">Sin apodo</span>'}</td>
        <td><i class="bi bi-globe me-1"></i>${c.planeta_origen}</td>
        <td><i class="bi bi-house me-1"></i>${c.planeta_residencia}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-outline-primary btn-sm" onclick="editarCiudadano(${c.codigo})" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-info btn-sm" onclick="verDetallesCiudadano(${c.codigo})" title="Ver detalles">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="confirmarEliminarCiudadano(${c.codigo}, '${c.nombre} ${c.apellido}')" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar ciudadanos:', error);
    mostrarAlerta('Error al cargar ciudadanos', 'danger');
  }
}

function mostrarAlerta(mensaje, tipo) {
  const alertContainer = document.createElement('div');
  alertContainer.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
  alertContainer.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
  alertContainer.innerHTML = `
    <i class="bi bi-${tipo === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertContainer);
  
  setTimeout(() => {
    if (alertContainer.parentNode) {
      alertContainer.remove();
    }
  }, 5000);
}

window.confirmarEliminarCiudadano = async (id, nombre) => {
  if (confirm(`¿Estás seguro de que quieres eliminar al ciudadano "${nombre}"?`)) {
    try {
      await deleteCiudadano(id);
      await cargarCiudadanos();
      mostrarAlerta('Ciudadano eliminado exitosamente', 'success');
    } catch (error) {
      console.error('Error al eliminar ciudadano:', error);
      mostrarAlerta('Error al eliminar ciudadano', 'danger');
    }
  }
};

window.editarCiudadano = (id) => {
  // Función para editar ciudadano (puede implementarse más adelante)
  alert(`Función de edición para ciudadano ID: ${id} - En desarrollo`);
};

window.verDetallesCiudadano = (id) => {
  // Función para ver detalles del ciudadano (puede implementarse más adelante)
  alert(`Función de detalles para ciudadano ID: ${id} - En desarrollo`);
}; 