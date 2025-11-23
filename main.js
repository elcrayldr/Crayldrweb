// Año dinámico en el footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Animación suave de aparición al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Efecto "cámara" tipo tráiler GTA VI (parallax)
const heroSection = document.querySelector(".hero");

if (heroSection) {
  const updateTilt = (xPercent, yPercent) => {
    const maxTilt = 6; // grados máximos de giro
    const tiltX = (0.5 - yPercent) * maxTilt; // arriba/abajo
    const tiltY = (xPercent - 0.5) * maxTilt; // izquierda/derecha
    heroSection.style.setProperty("--tiltX", tiltX.toFixed(2) + "deg");
    heroSection.style.setProperty("--tiltY", tiltY.toFixed(2) + "deg");
  };

  // Ratón (ordenador)
  window.addEventListener("mousemove", (e) => {
    const xPercent = e.clientX / window.innerWidth;
    const yPercent = e.clientY / window.innerHeight;
    updateTilt(xPercent, yPercent);
  });

  // Movimiento suave en móvil según scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight || 800;
    const yPercent = Math.min(scrollY / maxScroll, 1);
    updateTilt(0.5, yPercent * 0.6);
  });
}

// Lógica del formulario: abrir email con los datos ya escritos
const form = document.getElementById("reserva-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = data.get("nombre") || "";
    const whatsapp = data.get("whatsapp") || "";
    const email = data.get("email") || "";
    const tipo = data.get("tipo") || "";
    const fecha = data.get("fecha") || "";
    const mensaje = data.get("mensaje") || "";

    // ✅ Tu correo real:
    const destino = "lazetaestudios@gmail.com";

    const subject = `Nueva solicitud de sesión - ${nombre}`;
    const body = `
Nombre: ${nombre}
WhatsApp: ${whatsapp}
Email: ${email}
Tipo de sesión: ${tipo}
Día orientativo: ${fecha}

Detalles:
${mensaje}
    `.trim();

    const mailtoLink =
      "mailto:" +
      encodeURIComponent(destino) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoLink;
  });
}
