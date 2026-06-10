/* Lightweight cursor glow effect — replaces the 632-line WebGL fluid simulation.
   Uses a single CSS-animated radial gradient that follows the mouse.
   Zero GPU shaders, zero canvas, zero WebGL. */
(function initCursorGlow() {
    // Skip on touch devices — no mouse cursor to track
    if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    Object.assign(glow.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,175,214,0.2) 0%, rgba(255,175,214,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
        opacity: '0',
        willChange: 'transform'
    });
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let visible = false;
    let rafId = null;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function update() {
        glowX = lerp(glowX, mouseX, 0.15);
        glowY = lerp(glowY, mouseY, 0.15);
        glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
        rafId = requestAnimationFrame(update);
    }

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!visible) {
            visible = true;
            glow.style.opacity = '1';
            rafId = requestAnimationFrame(update);
        }
    }, { passive: true });

    document.addEventListener('mouseleave', function() {
        visible = false;
        glow.style.opacity = '0';
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    });
})();
