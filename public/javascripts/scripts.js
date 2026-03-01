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

    window.onclick = function (event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeModal();
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- STATS COUNTER ANIMATION ---
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps

                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + "+"; // Add + sign
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.section-padding, .section-dark, .carta, .pricing-card, .value-card, .team-member, .gallery-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay for grid items
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Scale on hover
        document.querySelectorAll('a, button, .carta, .pricing-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    document.querySelector('form').addEventListener('submit', function (event) {
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


    // --- CHATBOT LOGIC ---
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotHeader = document.querySelector('.chatbot-header');
    const chatInput = document.getElementById('chatInput');
    const chatbotBody = document.getElementById('chatbotBody');
    const chatSendBtn = document.querySelector('.chatbot-input button');

    if (chatbotWidget) {
        // Toggle Open/Close
        chatbotHeader.addEventListener('click', () => {
            chatbotWidget.classList.toggle('active');
            const toggleBtn = chatbotWidget.querySelector('.chatbot-toggle');
            toggleBtn.textContent = chatbotWidget.classList.contains('active') ? '-' : '+';
        });

        // Send Message Function
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === '') return;

            // User Message
            appendMessage(text, 'user');
            chatInput.value = '';

            // Bot Response (Simple Keyword Matching)
            setTimeout(() => {
                let response = "Lo siento, no entendí eso. ¿Puedes ser más específico?";
                const lowerText = text.toLowerCase();

                if (lowerText.includes('hola') || lowerText.includes('buenos')) {
                    response = "¡Hola! ¿Cómo puedo ayudarte con tu vehículo hoy?";
                } else if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('cuanto')) {
                    response = "Para precios exactos, te recomiendo usar nuestro <a href='/quote' style='color:var(--color-accent)'>Cotizador en Línea</a>.";
                } else if (lowerText.includes('cita') || lowerText.includes('turno') || lowerText.includes('agendar')) {
                    response = "¡Claro! Puedes agendar tu cita <a href='/appointment' style='color:var(--color-accent)'>aquí mismo</a>.";
                } else if (lowerText.includes('ubicacion') || lowerText.includes('donde') || lowerText.includes('direccion')) {
                    response = "Estamos ubicados en Cagua, Estado Aragua. Cerca de Repuestos Guerrero.";
                } else if (lowerText.includes('horario')) {
                    response = "Trabajamos de Lunes a Viernes de 8:00 AM a 5:00 PM.";
                }

                appendMessage(response, 'bot');
            }, 1000); // Fake delay
        }

        chatSendBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function appendMessage(text, sender) {
            const div = document.createElement('div');
            div.className = `chat-message ${sender}`;
            div.innerHTML = text; // Allow HTML for links
            chatbotBody.appendChild(div);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }
    }

}); // End of DOMContentLoaded
