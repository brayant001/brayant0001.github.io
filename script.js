document.addEventListener('DOMContentLoaded', () => {
  const targets = {
    downloadCvBtn: 'https://drive.google.com/file/d/1bYADs6s2ZN88R5zHn1Awn70xY0LCgnlX/view?usp=sharing',
    downloadartBtn: 'https://drive.google.com/file/d/12flPZh-0wRGFLCqNi4QDK7eZlcF_Vy_H/view?usp=sharing',
    downloadart2Btn: 'https://cienciayreflexion.org/index.php/Revista/article/view/977',
    downloadart3Btn: 'https://doi.org/10.52501/cc.422',
    downloadCGDABtn: 'https://drive.google.com/file/d/1jE_dRaHqYMw575IVxFHFnR2EmDQMdIBs/view?usp=sharing',
    downloadCPBIBtn: 'https://drive.google.com/file/d/1U6zE20K8iSk3NlZD66C2MvVSKObVQWu8/view?usp=sharing',
    downloadCMEXCELBtn: 'https://drive.google.com/file/d/1vJpbIIpxnbbBYf04jf6_S6-mVfzd4LLz/view?usp=sharing',
    scheduleBtn: 'https://calendar.app.google/uxBoB9qceFgagE6s7'
  };
  const openBlank = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  for (const [id, url] of Object.entries(targets)) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBlank(url);
    });
  }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  const revealElements = document.querySelectorAll('.reveal');
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const textToType = typingText.innerText;
    typingText.innerText = '';
    let i = 0;
    setTimeout(() => {
      const typeWriter = setInterval(() => {
        if (i < textToType.length) {
          typingText.innerHTML += textToType.charAt(i);
          i++;
        } else {
          clearInterval(typeWriter);
        }
      }, 70);
    }, 500);
  }
  const cards = document.querySelectorAll('.case-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar ul li a');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    if (scrollY < 100) current = 'inicio';
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  const setupAccordion = (headerId, contentId) => {
    const header = document.getElementById(headerId);
    const content = document.getElementById(contentId);
    if (header && content) {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        content.classList.toggle('active');
      });
    }
  };

  setupAccordion('autocom-header', 'autocom-content');
  setupAccordion('cactiuz-header', 'cactiuz-content');
  setupAccordion('articulo1-header', 'articulo1-content');
  setupAccordion('articulo2-header', 'articulo2-content');
  setupAccordion('articulo3-header', 'articulo3-content');

  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const particleCount = Math.floor((width * height) / 15000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1
        });
      }
    };
    const animateCanvas = () => {
      requestAnimationFrame(animateCanvas);
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        if (mouse.x != null && mouse.y != null) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${1 - distMouse / mouse.radius})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            const force = (mouse.radius - distMouse) / mouse.radius;
            const forceDirectionX = dxMouse / distMouse;
            const forceDirectionY = dyMouse / distMouse;
            p.x += forceDirectionX * force * 2;
            p.y += forceDirectionY * force * 2;
          }
        }
      });
    };
    initCanvas();
    animateCanvas();
    window.addEventListener('resize', initCanvas);
  }
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
