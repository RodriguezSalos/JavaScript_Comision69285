document.addEventListener('DOMContentLoaded', () => {
  const btnChiste = document.getElementById('btnChiste');
  const pChiste = document.getElementById('chisteDia');

  if (btnChiste && pChiste) {
    btnChiste.addEventListener('click', async () => {
      try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        const joke = `${data.setup} — ${data.punchline}`;
        pChiste.textContent = "😜"+ joke + "🤡";

        // Agrega clases de animación
        pChiste.classList.remove('animate__fadeInUp'); // Reinicia animación
        void pChiste.offsetWidth; // Forzar reflow
        pChiste.classList.add('animate__animated', 'animate__fadeInUp');
      } catch (error) {
        pChiste.textContent = "No se pudo cargar el chiste. Intenta más tarde.";
        console.error("Error al consultar el chiste:", error);
      }
    });
  }
});
