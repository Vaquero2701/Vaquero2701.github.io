// Variable global para el control del formulario actual
let modoActual = 'registro';

// Función para la conmutación de pantallas (SPA)
function mostrarVista(idVista) {
    const pantallas = document.querySelectorAll('.pantalla-modulo');
    pantallas.forEach(p => p.classList.add('vista-oculta'));
    pantallas.forEach(p => p.classList.remove('vista-ativa'));

    const seleccionada = document.getElementById(idVista);
    if (seleccionada) {
        seleccionada.classList.remove('vista-oculta');
        seleccionada.classList.add('vista-ativa');
    }
}

function abrirFormulario(tipo) {
    modoActual = tipo;
    const modal = document.getElementById('modal-formulario');
    const titulo = document.getElementById('titulo-formulario');
    
    const g1 = document.getElementById('grupo-campo1');
    const g2 = document.getElementById('grupo-campo2');
    const gCorreo = document.getElementById('grupo-correo');
    const gPass = document.getElementById('grupo-password');
    const gArchivo = document.getElementById('grupo-archivo');

    const lbl1 = document.getElementById('lbl-campo1');
    const lbl2 = document.getElementById('lbl-campo2');
    const inp1 = document.getElementById('input-campo1');
    const inp2 = document.getElementById('input-campo2');

    modal.style.display = 'block';

    // Reset por defecto
    g1.style.display = 'flex';
    g2.style.display = 'flex';
    gCorreo.style.display = 'none';
    gPass.style.display = 'none';
    gArchivo.style.display = 'none';

    if (tipo === 'registro') {
        titulo.innerText = "Registro de Nuevo Vecino";
        lbl1.innerText = "Nombre completo:";
        inp1.placeholder = "Ej. Juan Pérez";
        lbl2.innerText = "Dirección / Calle:";
        inp2.placeholder = "Ej. Av. Granjas #123";
        gCorreo.style.display = 'flex';
        gPass.style.display = 'flex';

    } else if (tipo === 'login') {
        titulo.innerText = "Iniciar Sesión";
        g1.style.display = 'none';
        g2.style.display = 'none';
        gCorreo.style.display = 'flex';
        gPass.style.display = 'flex';

    } else if (tipo === 'crear_reporte') {
        titulo.innerText = "Crear Reporte Comunitario";
        lbl1.innerText = "Tipo de Falla / Asunto:";
        inp1.placeholder = "Ej. Fuga de agua, Bache, Luminaria fundida";
        lbl2.innerText = "Descripción del problema:";
        inp2.placeholder = "Detalla lo sucedido...";

    } else if (tipo === 'foto') {
        titulo.innerText = "Adjuntar Fotografía de Evidencia";
        lbl1.innerText = "Folio del Reporte:";
        inp1.placeholder = "Ej. REP-2026-001";
        g2.style.display = 'none';
        gArchivo.style.display = 'flex';

    } else if (tipo === 'ubicacion') {
        titulo.innerText = "Agregar Ubicación del Reporte";
        lbl1.innerText = "Folio o ID del Reporte:";
        inp1.placeholder = "Ej. REP-2026-001";
        lbl2.innerText = "Referencias de Ubicación:";
        inp2.placeholder = "Ej. Entre calle Manzanares y Perales";

    } else if (tipo === 'estado_reporte') {
        titulo.innerText = "Consultar Estado del Reporte";
        lbl1.innerText = "Número de Folio:";
        inp1.placeholder = "Ej. REP-12345";
        g2.style.display = 'none';

    } else if (tipo === 'cita') {
        titulo.innerText = "Agendar Cita en COPACI";
        lbl1.innerText = "Nombre del Solicitante:";
        inp1.placeholder = "Tu nombre completo";
        lbl2.innerText = "Fecha y Hora deseada:";
        inp2.placeholder = "Ej. 15 de Noviembre a las 10:00 AM";

    } else if (tipo === 'tramite') {
        titulo.innerText = "Solicitar Trámite Ciudadano";
        lbl1.innerText = "Nombre del Trámite:";
        inp1.placeholder = "Ej. Constancia de Residencia";
        lbl2.innerText = "Motivo de la Solicitud:";
        inp2.placeholder = "Explica para qué requieres el trámite";

    } else if (tipo === 'consultar_solicitudes') {
        titulo.innerText = "Consultar Solicitudes";
        lbl1.innerText = "Número de Identificación o Folio:";
        inp1.placeholder = "Ingresa tu folio de trámite";
        g2.style.display = 'none';
    }
}

function cerrarFormulario() {
    document.getElementById('modal-formulario').style.display = 'none';
}

function procesarFormulario() {
    const contenedorInfo = document.getElementById('info-guardada');
    const val1 = document.getElementById('input-campo1').value;
    const val2 = document.getElementById('input-campo2').value;
    const correo = document.getElementById('input-correo').value;
    const pass = document.getElementById('input-password').value;

    if (modoActual === 'registro') {
        if (val1 === "" || val2 === "" || correo === "" || pass === "") {
            alert("Error: Por favor completa todos los campos del registro.");
            return;
        } else if (!correo.includes("@")) {
            alert("Error: El correo debe incluir '@'.");
            return;
        } else if (pass.length < 6) {
            alert("Error: La contraseña debe tener al menos 6 caracteres.");
            return;
        }
    } else if (modoActual === 'login') {
        if (correo === "" || pass === "") {
            alert("Error: Ingrese correo y contraseña.");
            return;
        }
    } else {
        if (val1 === "") {
            alert("Error: Complete la información requerida.");
            return;
        }
    }

    cerrarFormulario();
    
    contenedorInfo.innerHTML = `
        <strong>Módulo:</strong> ${modoActual.toUpperCase()}<br>
        <strong>Detalle:</strong> ${val1 || correo}<br>
        <strong>Estado:</strong> Solicitud registrada con éxito en el sistema.
    `;
    
    document.getElementById('modal-exito').style.display = 'block';
    
    // Limpiar campos
    document.getElementById('input-campo1').value = "";
    document.getElementById('input-campo2').value = "";
    document.getElementById('input-correo').value = "";
    document.getElementById('input-password').value = "";
}

function cerrarModalExito() {
    document.getElementById('modal-exito').style.display = 'none';
}