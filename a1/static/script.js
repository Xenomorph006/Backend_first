// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Skill items animation on scroll
const skillItems = document.querySelectorAll('.skill-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize skill items with hidden state
skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        observer.observe(card);
    }, index * 100);
});

// Form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Interactive skill icons
const skillIcons = document.querySelectorAll('.skill-item i');

skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        // Add a subtle animation on hover
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Typewriter Effect
function initDynamicTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    
    // Store the original HTML structure
    const originalHTML = heroTitle.innerHTML;
    
    // Parse the HTML to extract text parts
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Extract text before highlight
    let beforeHighlight = '';
    let highlightText = '';
    let afterHighlight = '';
    
    // Process child nodes to separate regular text and highlighted span
    const childNodes = tempDiv.childNodes;
    
    childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            beforeHighlight += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('highlight')) {
            highlightText = node.textContent;
        }
    });
    
    // Clear the title for typing effect
    heroTitle.innerHTML = '';
    
    let currentIndex = 0;
    let currentSection = 'before';
    
    function typeNextCharacter() {
        if (currentSection === 'before' && currentIndex < beforeHighlight.length) {
            // Type regular text before highlight
            heroTitle.innerHTML += beforeHighlight.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeNextCharacter, 100);
        } else if (currentSection === 'before' && currentIndex >= beforeHighlight.length) {
            // Switch to highlight section
            heroTitle.innerHTML += '<span class="highlight">';
            currentSection = 'highlight';
            currentIndex = 0;
            setTimeout(typeNextCharacter, 150);
        } else if (currentSection === 'highlight' && currentIndex < highlightText.length) {
            // Type highlighted text
            heroTitle.innerHTML = beforeHighlight + '<span class="highlight">' + highlightText.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeNextCharacter, 100);
        } else if (currentSection === 'highlight' && currentIndex >= highlightText.length) {
            // Close highlight span and move to after section if exists
            heroTitle.innerHTML += '</span>';
            currentSection = 'after';
            currentIndex = 0;
            
            // If there's text after the highlight, type it
            if (afterHighlight) {
                setTimeout(typeNextCharacter, 150);
            }
        } else if (currentSection === 'after' && currentIndex < afterHighlight.length) {
            // Type text after highlight
            heroTitle.innerHTML += afterHighlight.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeNextCharacter, 100);
        }
        // Animation complete
    }
    
    // Start the typewriter effect
    setTimeout(typeNextCharacter, 500);
}

// Enhanced Dynamic Typewriter that handles any HTML structure
function initSmartTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    const originalHTML = heroTitle.innerHTML;
    
    // Create a temporary element to parse the HTML structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Extract all text nodes and elements while preserving structure
    const elements = [];
    
    function extractElements(node, parentIsHighlight = false) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            elements.push({
                type: 'text',
                content: node.textContent,
                isHighlighted: parentIsHighlight
            });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const isHighlight = node.classList.contains('highlight');
            elements.push({
                type: 'element_start',
                tag: node.tagName.toLowerCase(),
                classes: node.className,
                isHighlight: isHighlight
            });
            
            // Process child nodes
            node.childNodes.forEach(child => extractElements(child, isHighlight || parentIsHighlight));
            
            elements.push({
                type: 'element_end',
                tag: node.tagName.toLowerCase()
            });
        }
    }
    
    // Extract all elements from the original HTML
    tempDiv.childNodes.forEach(node => extractElements(node));
    
    // Clear the title
    heroTitle.innerHTML = '';
    
    let currentIndex = 0;
    let currentHTML = '';
    
    function buildNextCharacter() {
        if (currentIndex < elements.length) {
            const element = elements[currentIndex];
            
            if (element.type === 'text') {
                // Type text character by character
                let charIndex = 0;
                
                function typeTextChar() {
                    if (charIndex < element.content.length) {
                        currentHTML += element.content.charAt(charIndex);
                        heroTitle.innerHTML = currentHTML;
                        charIndex++;
                        setTimeout(typeTextChar, 100);
                    } else {
                        currentIndex++;
                        setTimeout(buildNextCharacter, 50);
                    }
                }
                
                typeTextChar();
            } else if (element.type === 'element_start') {
                // Add opening tag immediately
                const classAttr = element.classes ? ` class="${element.classes}"` : '';
                currentHTML += `<${element.tag}${classAttr}>`;
                heroTitle.innerHTML = currentHTML;
                currentIndex++;
                setTimeout(buildNextCharacter, 50);
            } else if (element.type === 'element_end') {
                // Add closing tag immediately
                currentHTML += `</${element.tag}>`;
                heroTitle.innerHTML = currentHTML;
                currentIndex++;
                setTimeout(buildNextCharacter, 50);
            }
        }
        // Animation complete
    }
    
    // Start the smart typewriter
    setTimeout(buildNextCharacter, 500);
}

// Universal Typewriter that works with any HTML content
function initUniversalTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    const originalHTML = heroTitle.innerHTML;
    
    // Store the original content and clear the element
    const fullText = heroTitle.textContent;
    heroTitle.innerHTML = '';
    heroTitle.style.minHeight = 'calc(1.2em * 3)'; // Prevent layout shift
    
    let currentPosition = 0;
    const speed = 100; // typing speed in ms
    
    function typeNextChar() {
        if (currentPosition < fullText.length) {
            // Get the next character to type
            const nextChar = fullText.charAt(currentPosition);
            
            // Reconstruct the HTML up to current position
            let reconstructedHTML = '';
            let tempPosition = 0;
            let inHighlight = false;
            
            // Parse through original HTML to reconstruct structure
            for (let i = 0; i < originalHTML.length; i++) {
                const char = originalHTML[i];
                
                if (char === '<') {
                    // Handle HTML tags
                    const tagEnd = originalHTML.indexOf('>', i);
                    const tag = originalHTML.substring(i, tagEnd + 1);
                    
                    if (tag.includes('</')) {
                        // Closing tag
                        reconstructedHTML += tag;
                        if (tag === '</span>') inHighlight = false;
                        i = tagEnd;
                    } else if (tag.includes('<span')) {
                        // Opening span tag
                        reconstructedHTML += tag;
                        if (tag.includes('highlight')) inHighlight = true;
                        i = tagEnd;
                    } else {
                        // Other tags (ignore for text reconstruction)
                        reconstructedHTML += tag;
                        i = tagEnd;
                    }
                } else {
                    // Handle text content
                    if (tempPosition <= currentPosition) {
                        reconstructedHTML += char;
                    }
                    tempPosition++;
                }
            }
            
            // Update the title with reconstructed HTML
            heroTitle.innerHTML = reconstructedHTML;
            currentPosition++;
            setTimeout(typeNextChar, speed);
        }
    }
    
    // Start typing
    setTimeout(typeNextChar, 500);
}

// Simple and effective typewriter that preserves HTML structure
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    const originalHTML = heroTitle.innerHTML;
    
    // Extract all text content (without HTML tags)
    const textContent = heroTitle.textContent || heroTitle.innerText;
    
    // Clear the title
    heroTitle.innerHTML = '';
    
    let currentChar = 0;
    
    function typeCharacter() {
        if (currentChar < textContent.length) {
            // Reconstruct the HTML up to the current character
            let reconstructedHTML = '';
            let charCount = 0;
            let inTag = false;
            let currentTag = '';
            
            for (let i = 0; i < originalHTML.length; i++) {
                const char = originalHTML[i];
                
                if (char === '<') {
                    // Start of tag
                    inTag = true;
                    currentTag = char;
                } else if (char === '>') {
                    // End of tag
                    inTag = false;
                    currentTag += char;
                    reconstructedHTML += currentTag;
                    currentTag = '';
                } else if (inTag) {
                    // Inside tag
                    currentTag += char;
                } else {
                    // Text content
                    if (charCount <= currentChar) {
                        reconstructedHTML += char;
                    }
                    charCount++;
                }
            }
            
            // Update the title
            heroTitle.innerHTML = reconstructedHTML;
            currentChar++;
            setTimeout(typeCharacter, 100);
        }
    }
    
    setTimeout(typeCharacter, 500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use the universal typewriter - it will work with any HTML structure
    initTypewriter();
    
    // Add loading animation
    document.body.classList.add('loaded');
});