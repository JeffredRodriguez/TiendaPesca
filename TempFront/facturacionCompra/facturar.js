document.addEventListener('DOMContentLoaded', function () {
    const enviarFormularioBtn = document.getElementById('enviarFormulario');

    enviarFormularioBtn.addEventListener('click', function () {
        const formData = {
            tipoIdentificacion: 1, // Valor fijo según tu requerimiento
            identificacion: document.getElementById('inputEmail4').value,
            nombre: document.getElementById('inputPrimerNombre').value,
            apellido1: document.getElementById('inputPrimerApellido').value,
            // Agregar el resto de los campos del formulario aquí
            provincia: document.getElementById('inputProvincia').value,
            canton: document.getElementById('inputAddress').value,
            distrito: document.getElementById('inputAddress2').value,
            direccionDetalle: document.getElementById('inputCity').value,
            telefono: document.getElementById('inputZip').value,
        };

        // Enviar la solicitud POST a la API
        fetch('http://localhost:8082/api-proyecto/clientes/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de la API según sea necesario
            console.log('Respuesta de la API:', data);
            // Aquí puedes realizar acciones adicionales después de enviar los datos, si es necesario
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error al enviar la solicitud:', error);
        });
    });
});

