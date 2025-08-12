import { getUsuarios, createUsuario, deleteUsuario, getUsuario, updateUsuario } from '../api/usuarioApi.js';

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
    const id = document.getElementById('usuario_id').value;
    if (id) {
      await updateUsuario(id, usuario);
    } else {
      await createUsuario(usuario);
    }
    limpiarFormulario();
    await cargarUsuarios();
  });

  // Agregar botón para cancelar edición
  const cancelarBtn = document.createElement('button');
  cancelarBtn.type = 'button';
  cancelarBtn.className = 'btn btn-secondary btn-lg ms-2';
  cancelarBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i>Cancelar';
  cancelarBtn.onclick = limpiarFormulario;
  document.getElementById('submitBtn').parentNode.appendChild(cancelarBtn);
});

function limpiarFormulario() {
  document.getElementById('usuarioForm').reset();
  document.getElementById('usuario_id').value = '';
  document.getElementById('submitBtn').textContent = 'Agregar Usuario';
}

async function cargarUsuarios() {
  try {
    const respuesta = await getUsuarios();
    console.log('Respuesta completa de getUsuarios:', respuesta);
    
    // Manejar la estructura de respuesta del backend
    const lista = respuesta.data || respuesta;
    const usuarios = Array.isArray(lista) ? lista : [];
    
    console.log('Lista de usuarios procesada:', usuarios);
    
    const tbody = document.getElementById('usuariosTable');
    tbody.innerHTML = '';
    
    usuarios.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.idUsuario || ''}</td>
        <td>${u.nombre_usuario || ''}</td>
        <td>${u.correo_usuario || ''}</td>
        <td>${u.rol_usuario || ''}</td>
        <td>${u.fecha_usuario ? new Date(u.fecha_usuario).toLocaleDateString() : ''}</td>
        <td>
          <button onclick="editarUsuario(${u.idUsuario})">Editar</button>
          <button onclick="eliminarUsuario(${u.idUsuario})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

window.eliminarUsuario = async (id) => {
  await deleteUsuario(id);
  await cargarUsuarios();
};

window.editarUsuario = async (id) => {
  try {
    const respuesta = await getUsuario(id);
    console.log('Respuesta completa de getUsuario:', respuesta);
    
    if (!respuesta) {
      alert('Usuario no encontrado');
      return;
    }
    
    // Manejar la estructura de respuesta del backend
    const usuario = respuesta.data || respuesta;
    console.log('Datos del usuario:', usuario);
    
    if (!usuario) {
      alert('Usuario no encontrado');
      return;
    }
    
    // Asignar valores a los campos del formulario
    document.getElementById('usuario_id').value = usuario.idUsuario || '';
    document.getElementById('nombre_usuario').value = usuario.nombre_usuario || '';
    document.getElementById('correo_usuario').value = usuario.correo_usuario || '';
    document.getElementById('password_usuario').value = usuario.password_usuario || '';
    document.getElementById('rol_usuario').value = usuario.rol_usuario || '';
    
    // Manejar la fecha correctamente
    if (usuario.fecha_usuario) {
      try {
        const fecha = new Date(usuario.fecha_usuario);
        if (!isNaN(fecha.getTime())) {
          const fechaFormateada = fecha.toISOString().split('T')[0];
          document.getElementById('fecha_usuario').value = fechaFormateada;
        } else {
          console.warn('Fecha inválida:', usuario.fecha_usuario);
          document.getElementById('fecha_usuario').value = '';
        }
      } catch (error) {
        console.error('Error al procesar fecha:', error);
        document.getElementById('fecha_usuario').value = '';
      }
    } else {
      document.getElementById('fecha_usuario').value = '';
    }
    
    document.getElementById('submitBtn').textContent = 'Actualizar Usuario';
  } catch (error) {
    console.error('Error al editar usuario:', error);
    alert('Error al cargar los datos del usuario');
  }
}; 

// Función de prueba para verificar la conexión
window.probarConexion = async () => {
  try {
    console.log('Probando conexión con el backend...');
    const respuesta = await getUsuarios();
    console.log('Respuesta de prueba:', respuesta);
    alert('Conexión exitosa con el backend');
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('Error de conexión con el backend');
  }
};

// Función de prueba para obtener un usuario específico
window.probarGetUsuario = async (id) => {
  try {
    console.log('Probando obtener usuario con ID:', id);
    const respuesta = await getUsuario(id);
    console.log('Respuesta de getUsuario:', respuesta);
    alert('Usuario obtenido correctamente');
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    alert('Error al obtener usuario');
  }
}; 