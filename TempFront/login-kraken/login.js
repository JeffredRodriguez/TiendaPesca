const validarFormulario = () => {
    const usuario = document.getElementById("input_usuario").value;
    const contrasena = document.getElementById("input_contrasena").value;

    // Validaciones
    if (!usuario.trim()) {
        alert("Por favor, ingrese un correo electrónico");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(usuario)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    if (contrasena.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    // Si todas las validaciones son exitosas, puedes enviar los datos al backend
    enviarDatosAlBackend(usuario, contrasena);
};

const enviarDatosAlBackend = (usuario, contrasena) => {
    // Aquí debes realizar una solicitud HTTP POST al backend
    // Puedes utilizar la API Fetch o alguna otra biblioteca para hacer la solicitud

    // Ejemplo con Fetch
    fetch('url_del_backend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena }),
    })
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta del backend aquí
        console.log(data);
    })
    .catch(error => {
        console.error('Error al enviar datos al backend:', error);
    });
};

// Cambié el tipo de botón a "submit" para que envíe el formulario
document.getElementById("boton_registro").addEventListener("click", validarFormulario);