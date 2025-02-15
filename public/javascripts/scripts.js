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
            console.log('Respuesta del servidor:', data.message);
            alert('Formulario enviado correctamente.');
            window.location.href = '/thanks'; // Redirigir a la página de agradecimiento
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('Hubo un error al enviar el formulario: ' + error.message);
        });
    }

    function initMap() {
        const location = { lat: 10.1869, lng: -67.4526 };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
});
