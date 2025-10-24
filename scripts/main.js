/*  BACKGROUND DO HEADER */
function scrollHeader() {
    const header = document.querySelector('.header');
    
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);


/* SCROLL SECTIONS ACTIVE LINK  */


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

/* MENU SHOW (Mobile) */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* === MOSTRAR MENU === */

if (navToggle) {
    navToggle.addEventListener('click', () => {
        
        navMenu.classList.add('show-menu');
    });
}

/* === ESCONDER MENU === */

if (navClose) {
    navClose.addEventListener('click', () => {
        
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVER MENU AO CLICAR NO LINK ==================== */

const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
  
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));




/* ========= EFEITO DE PARTÍCULAS (MODIFICADO) ========= */


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
    
    // Initial position
    resetParticle(particle);
    
    particlesContainer.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    
    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);
    
    // Random animation properties
    
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


document.addEventListener('mousemove', (e) => {
   
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
    
    
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    spheres.forEach(sphere => {
        const currentTransform = getComputedStyle(sphere).transform;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

/* ==================== ENVIO DO FORMULÁRIO DE CONTATO ==================== */

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const submitButton = contactForm.querySelector('button[type="submit"]');


const API_URL = 'http://localhost:8080/api/contact';

const sendEmail = (e) => {
    
    e.preventDefault();

    // 2. Mostra "Enviando..." e desativa o botão
    contactMessage.textContent = 'Enviando mensagem...';
    contactMessage.classList.remove('color-success', 'color-error');
    contactMessage.classList.add('show-message');
    submitButton.disabled = true;

    // 3. Pega os valores dos campos
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;

    // 4. Cria o objeto JSON (deve ser igual ao seu 'ContactRequest' no Java)
    const formData = {
        name: name,
        email: email,
        message: message
    };

    // 5. Envia os dados para a API
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // 6a. Sucesso
            contactMessage.textContent = 'Mensagem enviada com sucesso! Obrigado.';
            contactMessage.classList.add('color-success');
            contactForm.reset(); // Limpa o formulário
        } else {
            // 6b. Erro (ex: API caiu)
            throw new Error('Falha no envio.');
        }
    })
    .catch(error => {
        // 6c. Erro (ex: rede)
        contactMessage.textContent = 'Ops! Algo deu errado. Tente novamente mais tarde.';
        contactMessage.classList.add('color-error');
    })
    .finally(() => {
        // 7. Reativa o botão
        submitButton.disabled = false;

        // Esconde a mensagem depois de 5 segundos
        setTimeout(() => {
            contactMessage.classList.remove('show-message');
        }, 5000);
    });
};

// 8. "Escuta" o evento de submit do formulário
contactForm.addEventListener('submit', sendEmail);