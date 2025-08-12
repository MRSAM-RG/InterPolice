import { getCiudadanos, createCiudadano, deleteCiudadano, getCiudadano, updateCiudadano } from '../api/ciudadanoApi.js';

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
    const id = document.getElementById('ciudadano_id').value;
    if (id) {
      await updateCiudadano(id, ciudadano);
    } else {
      await createCiudadano(ciudadano);
    }
    limpiarFormulario();
    await cargarCiudadanos();
  });

  // Agregar botón para cancelar edición
  const cancelarBtn = document.createElement('button');
  cancelarBtn.type = 'button';
  cancelarBtn.className = 'btn btn-secondary btn-lg ms-2';
  cancelarBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i>Cancelar';
  cancelarBtn.onclick = limpiarFormulario;
  document.getElementById('submitBtnCiudadano').parentNode.appendChild(cancelarBtn);
});

function limpiarFormulario() {
  document.getElementById('ciudadanoForm').reset();
  document.getElementById('ciudadano_id').value = '';
  document.getElementById('submitBtnCiudadano').textContent = 'Agregar Ciudadano';
}

async function cargarCiudadanos() {
  try {
    const respuesta = await getCiudadanos();
    console.log('Respuesta completa de getCiudadanos:', respuesta);
    
    // Manejar la estructura de respuesta del backend
    const lista = respuesta.data || respuesta;
    const ciudadanos = Array.isArray(lista) ? lista : [];
    
    console.log('Lista de ciudadanos procesada:', ciudadanos);
    
    const tbody = document.getElementById('ciudadanosTable');
    tbody.innerHTML = '';
    
    ciudadanos.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.codigo || ''}</td>
        <td>${c.nombre || ''}</td>
        <td>${c.apellido || ''}</td>
        <td>${c.apodo || ''}</td>
        <td>${c.planeta_origen || ''}</td>
        <td>${c.planeta_residencia || ''}</td>
        <td>
          <button onclick="editarCiudadano(${c.codigo})">Editar</button>
          <button onclick="eliminarCiudadano(${c.codigo})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar ciudadanos:', error);
  }
}

window.eliminarCiudadano = async (id) => {
  try {
    await deleteCiudadano(id);
    await cargarCiudadanos();
  } catch (error) {
    console.error('Error al eliminar ciudadano:', error);
    alert('Error al eliminar ciudadano');
  }
};

window.editarCiudadano = async (id) => {
  try {
    const respuesta = await getCiudadano(id);
    console.log('Respuesta completa de getCiudadano:', respuesta);
    
    if (!respuesta) {
      alert('Ciudadano no encontrado');
      return;
    }
    
    // Manejar la estructura de respuesta del backend
    const ciudadano = respuesta.data || respuesta;
    console.log('Datos del ciudadano:', ciudadano);
    
    if (!ciudadano) {
      alert('Ciudadano no encontrado');
      return;
    }
    
    // Asignar valores a los campos del formulario
    document.getElementById('ciudadano_id').value = ciudadano.codigo || '';
    document.getElementById('nombre').value = ciudadano.nombre || '';
    document.getElementById('apellido').value = ciudadano.apellido || '';
    document.getElementById('apodo').value = ciudadano.apodo || '';
    
    // Manejar la fecha correctamente
    if (ciudadano.fecha_nacimiento) {
      try {
        const fecha = new Date(ciudadano.fecha_nacimiento);
        if (!isNaN(fecha.getTime())) {
          const fechaFormateada = fecha.toISOString().split('T')[0];
          document.getElementById('fecha_nacimiento').value = fechaFormateada;
        } else {
          console.warn('Fecha inválida:', ciudadano.fecha_nacimiento);
          document.getElementById('fecha_nacimiento').value = '';
        }
      } catch (error) {
        console.error('Error al procesar fecha:', error);
        document.getElementById('fecha_nacimiento').value = '';
      }
    } else {
      document.getElementById('fecha_nacimiento').value = '';
    }
    
    document.getElementById('planeta_origen').value = ciudadano.planeta_origen || '';
    document.getElementById('planeta_residencia').value = ciudadano.planeta_residencia || '';
    document.getElementById('foto').value = ciudadano.foto || '';
    document.getElementById('codigo_qr').value = ciudadano.codigo_qr || '';
    document.getElementById('estado_id_estado').value = ciudadano.estado_id_estado || '';
    
    document.getElementById('submitBtnCiudadano').textContent = 'Actualizar Ciudadano';
  } catch (error) {
    console.error('Error al editar ciudadano:', error);
    alert('Error al cargar los datos del ciudadano');
  }
};

// Función de prueba para verificar la conexión
window.probarConexionCiudadanos = async () => {
  try {
    console.log('Probando conexión con el backend (ciudadanos)...');
    const respuesta = await getCiudadanos();
    console.log('Respuesta de prueba:', respuesta);
    alert('Conexión exitosa con el backend');
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('Error de conexión con el backend');
  }
};

// Función de prueba para obtener un ciudadano específico
window.probarGetCiudadano = async (id) => {
  try {
    console.log('Probando obtener ciudadano con ID:', id);
    const respuesta = await getCiudadano(id);
    console.log('Respuesta de getCiudadano:', respuesta);
    alert('Ciudadano obtenido correctamente');
  } catch (error) {
    console.error('Error al obtener ciudadano:', error);
    alert('Error al obtener ciudadano');
  }
}; 