document.addEventListener('DOMContentLoaded', () => {
    function toggleMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('show');
    }

    function openModal() {
        const modal = document.getElementById('contactModal');
        modal.classList.remove('modal-hide');
        modal.classList.add('modal-show');
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('contactModal');
        modal.classList.remove('modal-show');
        modal.classList.add('modal-hide');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    document.querySelectorAll('#contactButton').forEach(button => {
        button.addEventListener('click', openModal);
    });

    document.querySelector('.close-button').addEventListener('click', closeModal);

    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeModal();
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.getElementById('toggleButton').addEventListener('click', function() {
        const extraItems = document.querySelectorAll('.extra');
        extraItems.forEach(item => {
            item.style.display = item.style.display === 'none' ? 'block' : 'none';
        });

        this.textContent = this.textContent === 'Mostrar más' ? 'Mostrar menos' : 'Mostrar más';
    });

    document.querySelector('form').addEventListener('submit', function(event) {
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!validateEmail(email.value)) {
            alert('Por favor, ingresa una dirección de correo electrónico válida.');
            event.preventDefault();
            return;
        }

        if (message.value.trim() === '') {
            alert('Por favor, ingresa tu mensaje.');
            event.preventDefault();
            return;
        }

        handleSubmit(event);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function handleSubmit(event) {
        event.preventDefault(); // Evita el envío real del formulario

        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parsear la respuesta JSON
            } else {
                return response.json().then(error => {
                    throw new Error(error.message); // Lanzar error con el mensaje de respuesta
                });
            }
        })
        .then(data => {
            document.getElementById('confirmationMessage').style.display = 'block'; // Muestra el mensaje de confirmación
            form.reset(); // Limpia el formulario
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el formulario: ' + error.message);
        });
    }
});
