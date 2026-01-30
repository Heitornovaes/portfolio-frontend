/* ======================================================= */
/* === 1. BACKGROUND DO HEADER AO ROLAR === */
/* ======================================================= */
function scrollHeader() {
    const header = document.querySelector('.header');
    
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


/* ======================================================= */
/* === 2. LINK ATIVO NA NAVBAR AO ROLAR (SCROLL SPY) === */
/* ======================================================= */
const sections = document.querySelectorAll('section[id]'); 

function scrollActive() {
    const scrollY = window.pageYOffset; 

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50; 
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (link) { 
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* ======================================================= */
/* === 3. MENU MOBILE (ABRIR E FECHAR) === */
/* ======================================================= */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* MOSTRAR MENU */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* ESCONDER MENU */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* REMOVER MENU AO CLICAR NO LINK */
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/* ======================================================= */
/* === 4. SISTEMA DE PARTÍCULAS E EFEITOS === */
/* ======================================================= */
const particlesContainer = document.getElementById('particles-container');
const particleCount = 120; 

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    resetParticle(particle);
    
    if(particlesContainer) {
        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }
}

function resetParticle(particle) {
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    
    return { x: posX, y: posY };
}

function animateParticle(particle) {
    const pos = resetParticle(particle);
    const duration = Math.random() * 5 + 5; 
    const delay = Math.random() * 5;
    
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.4 + 0.3;
        
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; 
        
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Efeito Mouse Move (Rastro e Paralaxe das Esferas)
document.addEventListener('mousemove', (e) => {
    // 1. Criar rastro de partículas
    if(particlesContainer) {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);
    }
    
    // 2. Mover esferas do fundo (Paralaxe)
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    spheres.forEach(sphere => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});


/* ======================================================= */
/* === 5. ENVIO DO FORMULÁRIO DE CONTATO === */
/* ======================================================= */
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const API_URL = 'https://portfolio-backend-heitor.onrender.com/api/contact';

    const sendEmail = (e) => {
        e.preventDefault();

        contactMessage.textContent = 'Enviando mensagem...';
        contactMessage.classList.remove('color-success', 'color-error');
        contactMessage.classList.add('show-message');
        submitButton.disabled = true;

        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const message = contactForm.querySelector('#message').value;

        const formData = {
            name: name,
            email: email,
            message: message
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                contactMessage.textContent = 'Mensagem enviada com sucesso! Obrigado.';
                contactMessage.classList.add('color-success');
                contactForm.reset(); 
            } else {
                throw new Error('Falha no envio.');
            }
        })
        .catch(error => {
            contactMessage.textContent = 'Ops! Algo deu errado. Tente novamente mais tarde.';
            contactMessage.classList.add('color-error');
        })
        .finally(() => {
            submitButton.disabled = false;
            setTimeout(() => {
                contactMessage.classList.remove('show-message');
            }, 5000);
        });
    };

    contactForm.addEventListener('submit', sendEmail);
}


/* ======================================================= */
/* === 6. NAVEGAÇÃO DAS FILEIRAS (NOVO: SLIDERS HORIZONTAIS) === */
/* ======================================================= */
// Seleciona os botões que ficam ao lado dos títulos (Social Media / Motion)
document.querySelectorAll('.row-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Pega o ID do trilho que esse botão controla (posts-track ou videos-track)
        const trackId = button.getAttribute('data-target');
        const track = document.getElementById(trackId);
        
        if (track) {
            // Define o quanto rolar (350px é aprox. o tamanho de um card + espaço)
            const scrollAmount = 350; 

            if (button.classList.contains('next-row')) {
                // Se for botão direito, rola positivo
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                // Se for botão esquerdo, rola negativo (volta)
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    });
});


/* ======================================================= */
/* === 7. NAVEGAÇÃO INTERNA DOS CARDS (CARROSSEL FOTOS) === */
/* ======================================================= */
// Seleciona todos os wrappers de carrossel dentro dos cards
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.carousel-container');
    const nextBtn = wrapper.querySelector('.next-btn');
    const prevBtn = wrapper.querySelector('.prev-btn');

    // Verifica se os botões existem (alguns cards são imagem única e não têm botões)
    if (nextBtn && prevBtn && container) {
        
        // Botão Próximo (Passar Foto)
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflitos de clique
            const cardWidth = container.clientWidth; // Pega a largura exata
            container.scrollBy({
                left: cardWidth, 
                behavior: 'smooth'
            });
        });

        // Botão Anterior (Voltar Foto)
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cardWidth = container.clientWidth;
            container.scrollBy({
                left: -cardWidth, 
                behavior: 'smooth'
            });
        });
    }
});