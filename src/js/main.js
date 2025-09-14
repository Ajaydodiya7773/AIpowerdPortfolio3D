import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Portfolio3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometricShapes = [];
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.isLoading = true;
        this.isMobile = this.detectMobile();
        
        this.init();
        this.setupEventListeners();
        this.setupMobileNavigation();
        this.setupRotatingText();
        this.animate();
    }

    init() {
        // Show content immediately for faster perceived loading
        this.hideLoadingScreen();
        
        // Then initialize 3D elements asynchronously
        requestAnimationFrame(() => {
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLights();
            this.createParticleSystem();
            this.createGeometricShapes();
            this.setupPostProcessing();
        });
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    setupRenderer() {
        const canvas = document.getElementById('bg-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: !this.isMobile, // Disable antialiasing on mobile for better performance
            alpha: true,
            powerPreference: this.isMobile ? 'low-power' : 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // Limit pixel ratio on mobile devices
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
        // Disable shadows on mobile for better performance
        this.renderer.shadowMap.enabled = !this.isMobile;
        if (!this.isMobile) {
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights for color effects
        const pointLight1 = new THREE.PointLight(0x00ff88, 1, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x0088ff, 1, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xff0088, 1, 100);
        pointLight3.position.set(0, 5, -5);
        this.scene.add(pointLight3);
    }

    detectMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }
    
    createParticleSystem() {
        // Heavily optimize particle count for ultra-fast loading
        const particleCount = this.isMobile ? 400 : 1200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            // Colors
            const hue = Math.random() * 360;
            color.setHSL(hue / 360, 0.7, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float strength = 0.04 / distanceToCenter - 0.08;
                    gl_FragColor = vec4(vColor, strength);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });

        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        // Create floating geometric shapes
        const shapes = [
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.DodecahedronGeometry(1, 0)
        ];

        const materials = [
            new THREE.MeshPhysicalMaterial({ 
                color: 0x00ff88, 
                metalness: 0.8, 
                roughness: 0.2, 
                transparent: true, 
                opacity: 0.8 
            }),
            new THREE.MeshPhysicalMaterial({ 
                color: 0x0088ff, 
                metalness: 0.8, 
                roughness: 0.2, 
                transparent: true, 
                opacity: 0.8 
            }),
            new THREE.MeshPhysicalMaterial({ 
                color: 0xff0088, 
                metalness: 0.8, 
                roughness: 0.2, 
                transparent: true, 
                opacity: 0.8 
            }),
            new THREE.MeshPhysicalMaterial({ 
                color: 0xffaa00, 
                metalness: 0.8, 
                roughness: 0.2, 
                transparent: true, 
                opacity: 0.8 
            })
        ];

        // Heavily optimize shape count for ultra-fast loading
        const shapeCount = this.isMobile ? 2 : 4;
        
        for (let i = 0; i < shapeCount; i++) {
            const geometry = shapes[i % shapes.length];
            const material = materials[i % materials.length];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            mesh.scale.setScalar(0.5 + Math.random() * 0.5);
            // Only enable shadows on desktop
            mesh.castShadow = !this.isMobile;
            mesh.receiveShadow = !this.isMobile;
            
            this.geometricShapes.push(mesh);
            this.scene.add(mesh);
        }
    }

    setupPostProcessing() {
        // This would typically include post-processing effects
        // For now, we'll keep it simple and add it later
        console.log('Post-processing setup placeholder');
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
        window.addEventListener('click', (event) => this.onClick(event));
        
        // Add touch events for mobile
        window.addEventListener('touchmove', (event) => this.onTouchMove(event), { passive: true });
        window.addEventListener('touchstart', (event) => this.onTouchStart(event), { passive: true });
        window.addEventListener('touchend', (event) => this.onTouchEnd(event), { passive: true });
        
        // Mobile navigation toggle
        this.setupMobileNavigation();
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close mobile menu after clicking a link
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Skills animation trigger
        this.setupSkillsAnimation();
        
        // Contact form handling
        this.setupContactForm();
        
        // Hire me button effects
        this.setupHireMeButton();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    onTouchMove(event) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    }
    
    onTouchStart(event) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    }
    
    onTouchEnd(event) {
        // Handle touch end if needed
        this.onClick(event);
    }

    onClick(event) {
        this.onMouseClick(event);
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.geometricShapes);
        
        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            gsap.to(intersected.rotation, {
                duration: 1,
                x: intersected.rotation.x + Math.PI,
                y: intersected.rotation.y + Math.PI,
                ease: "power2.inOut"
            });
        }
    }

    hideLoadingScreen() {
        // Much faster loading - show content as soon as possible
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                gsap.to(loadingScreen, {
                    duration: 0.5,
                    opacity: 0,
                    scale: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        this.isLoading = false;
                        // Trigger hero animations
                        this.triggerHeroAnimations();
                    }
                });
            } else {
                this.isLoading = false;
            }
        }, 300); // Reduced from 800ms to 300ms for much faster loading
    }
    
    triggerHeroAnimations() {
        // Animate hero elements after loading
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            gsap.fromTo(heroContent.children, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
        
        if (heroImage) {
            gsap.fromTo(heroImage, {
                opacity: 0,
                scale: 0.8
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Update particle system
        if (this.particles) {
            this.particles.material.uniforms.time.value = time;
            this.particles.rotation.y = time * 0.05;
        }

        // Animate geometric shapes
        this.geometricShapes.forEach((shape, index) => {
            shape.rotation.x += 0.005 * (index + 1);
            shape.rotation.y += 0.003 * (index + 1);
            shape.position.y += Math.sin(time + index) * 0.002;
        });

        // Camera movement based on mouse
        if (!this.isLoading) {
            this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.02;
            this.camera.position.y += (-this.mouse.y * 0.5 - this.camera.position.y) * 0.02;
            this.camera.lookAt(this.scene.position);
        }

        this.renderer.render(this.scene, this.camera);
    }
    
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Enhanced hamburger functionality
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeNavMenu(hamburger, navMenu);
                }
            });
            
            // Close menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeNavMenu(hamburger, navMenu);
                });
            });
        }
        
        // Navbar scroll effects
        this.setupNavbarScrollEffects(navbar);
        
        // Active link highlighting
        this.setupActiveLinks(navLinks);
        
        // Logo click functionality
        this.setupLogoClick();
    }
    
    closeNavMenu(hamburger, navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    setupNavbarScrollEffects(navbar) {
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateNavbar = () => {
            const scrollY = window.scrollY;
            
            // Add scrolled class for style changes
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll);
    }
    
    setupActiveLinks(navLinks) {
        if (!navLinks.length) return;
        
        const sections = document.querySelectorAll('section[id]');
        
        const highlightActiveLink = () => {
            const scrollY = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', highlightActiveLink);
        highlightActiveLink(); // Initial call
    }
    
    setupLogoClick() {
        const logoContainer = document.querySelector('.logo-container');
        
        if (logoContainer) {
            logoContainer.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Add click animation
                const logoCircle = logoContainer.querySelector('.logo-circle');
                if (logoCircle) {
                    logoCircle.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        logoCircle.style.transform = '';
                    }, 150);
                }
            });
        }
    }
    
    setupRotatingText() {
        const roles = document.querySelectorAll('.role');
        let currentRoleIndex = 0;
        
        if (roles.length === 0) return;
        
        const rotateRoles = () => {
            // Remove active class from current role
            roles[currentRoleIndex].classList.remove('active');
            
            // Move to next role
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            
            // Add active class to new role
            roles[currentRoleIndex].classList.add('active');
        };
        
        // Start the rotation after initial load
        setTimeout(() => {
            setInterval(rotateRoles, 3000); // Change role every 3 seconds
        }, 3000); // Wait 3 seconds before starting rotation
    }
}

// Initialize the 3D portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio3D();
});

export default Portfolio3D;
