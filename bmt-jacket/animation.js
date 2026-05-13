fetch('asset/badminton-jacket-final.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('jacket-container');
    container.innerHTML = svgText;

    const svg = container.querySelector('svg');

    const layers = Array.from(svg.querySelectorAll(':scope > g[id]'));
    const texts = Array.from(svg.querySelectorAll('text'));
    const paths = Array.from(svg.querySelectorAll('path'));

    const halftones = Array.from(svg.querySelectorAll('*')).filter(el =>
      el.getAttribute('inkscape:label') === 'halftone'
    );

    const normalLayers = layers.filter(layer => !halftones.includes(layer));

    gsap.set(svg, { opacity: 0, scale: 0.98 });

    gsap.set(normalLayers, { opacity: 0 });
    gsap.set(paths, { transformOrigin: '50% 50%', opacity: 0 });
    gsap.set(texts, { opacity: 0, y: 8, x: 0 });

    gsap.set(halftones, {
      transformOrigin: '50% 50%',
      scale: 0,
      opacity: 0
    });

    const tl = gsap.timeline();

    tl.to(svg, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out'
    });

    if (normalLayers.length) {
      tl.to(normalLayers, {
        opacity: 1,
        duration: 0.6,
        stagger: 0.25,
        ease: 'power2.out'
      }, '-=0.6');
    }

    if (halftones.length) {
      tl.to(halftones, {
        scale: 0.25,
        opacity: 1,
        duration: 2,
        ease: 'sine.inOut'
      });
    }

    if (paths.length) {
      tl.to(paths, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.8');
    }

    if (texts.length) { 
        gsap.set(texts, { 
            opacity: 0, 
            filter: 'blur(10px)', 
            y: 4, 
            x: -20, 
            letterSpacing: '12px' 
        }); 
        tl.to(texts, { 
            opacity: 1, 
            filter: 'blur(0px)', 
            y: 0, 
            x: 0, 
            duration: 1.6, 
            ease: 'power3.out',
            letterSpacing: '0px', 
        }, '-=1'); 
    }

    tl.to(svg, {
      y: -6,
      duration: 4,
      ease: 'sine.in',
      yoyo: true,
      repeat: 5
    }, '>-0.3');
  })
  .catch(err => console.error('SVG load error:', err));