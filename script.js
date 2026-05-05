document.addEventListener('DOMContentLoaded', function() {
    
    /* Carousel */
    const track = document.getElementById('dishesTrack');
    const dotsContainer = document.getElementById('carouselDots');
    let currentIndex = 0;
    let autoPlay;
    
    if (track) {
        const cards = track.querySelectorAll('.dish-card');
        const totalSlides = cards.length;
        
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex >= totalSlides) currentIndex = 0;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            updateCarousel();
            resetAutoPlay();
        }
        
        window.moveCarousel = (direction) => {
            goToSlide(currentIndex + direction);
        };
        
        function resetAutoPlay() {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);
        }
        
        // Start autoplay
        resetAutoPlay();
    }
    
    /* Scroll Reveal Animation */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    /* Smooth Scroll for Navigation */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* Check for reduced motion preference */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.animate-fade-in, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
    }
});