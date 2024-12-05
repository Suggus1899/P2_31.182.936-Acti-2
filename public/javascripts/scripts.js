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
        }

        if (message.value.trim() === '') {
            alert('Por favor, ingresa tu mensaje.');
            event.preventDefault();
        }

        handleSubmit(event);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function handleSubmit(event) {
        event.preventDefault(); // Evita el envío real del formulario
        document.getElementById('confirmationMessage').style.display = 'block'; // Muestra el mensaje de confirmación
        document.getElementById('contactForm').reset(); // Limpia el formulario
    }
});
