import { getUsuarios, createUsuario, deleteUsuario } from '../api/usuarioApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  await cargarUsuarios();

  document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = {
      nombre_usuario: document.getElementById('nombre_usuario').value,
      correo_usuario: document.getElementById('correo_usuario').value,
      password_usuario: document.getElementById('password_usuario').value,
      rol_usuario: document.getElementById('rol_usuario').value,
      fecha_usuario: document.getElementById('fecha_usuario').value
    };
    await createUsuario(usuario);
    e.target.reset();
    await cargarUsuarios();
    mostrarAlerta('Usuario agregado exitosamente', 'success');
  });
});

async function cargarUsuarios() {
  try {
    const usuarios = await getUsuarios();
    const tbody = document.getElementById('usuariosTable');
    tbody.innerHTML = '';
    
    if (usuarios.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4">
            <div class="empty-state">
              <i class="bi bi-people"></i>
              <p class="mt-2">No hay usuarios registrados</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }
    
    usuarios.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="badge bg-secondary">${u.idUsuario}</span></td>
        <td><strong>${u.nombre_usuario}</strong></td>
        <td><i class="bi bi-envelope me-1"></i>${u.correo_usuario}</td>
        <td><span class="badge bg-primary">${u.rol_usuario}</span></td>
        <td><i class="bi bi-calendar me-1"></i>${formatearFecha(u.fecha_usuario)}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-outline-primary btn-sm" onclick="editarUsuario(${u.idUsuario})" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="confirmarEliminarUsuario(${u.idUsuario}, '${u.nombre_usuario}')" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    mostrarAlerta('Error al cargar usuarios', 'danger');
  }
}

function formatearFecha(fecha) {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleDateString('es-ES');
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

window.confirmarEliminarUsuario = async (id, nombre) => {
  if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${nombre}"?`)) {
    try {
      await deleteUsuario(id);
      await cargarUsuarios();
      mostrarAlerta('Usuario eliminado exitosamente', 'success');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      mostrarAlerta('Error al eliminar usuario', 'danger');
    }
  }
};

window.editarUsuario = (id) => {
  // Función para editar usuario (puede implementarse más adelante)
  alert(`Función de edición para usuario ID: ${id} - En desarrollo`);
}; 