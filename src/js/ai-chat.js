// AI Chat Integration
class AIChat {
    constructor() {
        this.chatContainer = document.getElementById('ai-chat');
        this.messagesContainer = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-message');
        this.closeButton = document.getElementById('close-chat');
        this.aiChatButton = document.getElementById('ai-chat-btn');
        this.isOpen = false;
        this.conversationHistory = [];
        
        this.initializeChat();
        this.setupEventListeners();
    }

    initializeChat() {
        // Add initial welcome message
        const welcomeMessage = {
            type: 'ai',
            content: 'Hello! I\'m your AI assistant. I can help you learn more about this portfolio, the technologies used, or answer any questions about the projects showcased here. How can I assist you today?'
        };
        this.conversationHistory.push(welcomeMessage);
    }

    setupEventListeners() {
        // Open/close chat
        if (this.aiChatButton) {
            this.aiChatButton.addEventListener('click', () => this.toggleChat());
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeChat());
        }

        // Send message
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }

        // Send message on Enter key
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.chatContainer.contains(e.target) && 
                !this.aiChatButton.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatContainer.classList.add('active');
        this.chatInput.focus();
        
        // Add opening animation
        if (typeof gsap !== 'undefined') {
            gsap.from(this.chatContainer, {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.classList.remove('active');
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to UI
        this.addMessageToUI('user', message);
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'user',
            content: message
        });

        // Clear input
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add AI response to UI
            this.addMessageToUI('ai', response);
            
            // Add to conversation history
            this.conversationHistory.push({
                type: 'ai',
                content: response
            });
            
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.removeTypingIndicator();
            this.addMessageToUI('ai', 'Sorry, I\'m having trouble connecting right now. Please try again later.');
        }
    }

    addMessageToUI(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(type === 'user' ? 'user-message' : 'ai-message');
        
        const messageContent = document.createElement('p');
        messageContent.textContent = content;
        messageDiv.appendChild(messageContent);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add entrance animation
        if (typeof gsap !== 'undefined') {
            gsap.from(messageDiv, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('ai-message', 'typing-indicator');
        typingDiv.innerHTML = '<p>AI is typing<span class="dots">...</span></p>';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        
        // Animate dots
        this.animateTypingDots();
    }

    removeTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    animateTypingDots() {
        const dots = document.querySelector('.typing-indicator .dots');
        if (dots) {
            let dotCount = 0;
            const interval = setInterval(() => {
                dots.textContent = '.'.repeat((dotCount % 3) + 1);
                dotCount++;
                
                // Stop if typing indicator is removed
                if (!document.querySelector('.typing-indicator')) {
                    clearInterval(interval);
                }
            }, 500);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async getAIResponse(userMessage) {
        // This is a mock AI response system
        // In a real implementation, you would call an actual AI API like OpenAI, Anthropic, etc.
        
        const responses = this.generateContextualResponse(userMessage.toLowerCase());
        
        // Simulate API delay
        await this.delay(1000 + Math.random() * 2000);
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    generateContextualResponse(message) {
        // Portfolio-related responses
        if (message.includes('project') || message.includes('work')) {
            return [
                'I showcase three main types of projects: Interactive 3D experiences using Three.js and WebGL, AI-powered analytics dashboards with machine learning insights, and Virtual Reality platforms using WebXR. Each project demonstrates different aspects of modern web development and emerging technologies.',
                'The projects featured here represent a blend of creativity and technical expertise. From immersive 3D web applications to AI-driven solutions, each one pushes the boundaries of what\'s possible in web development.',
                'You\'ll find projects spanning 3D graphics, artificial intelligence, and virtual reality. These showcase proficiency in cutting-edge technologies like Three.js, TensorFlow, WebXR, and various modern frameworks.'
            ];
        }
        
        // Skills-related responses
        if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
            return [
                'The technical skills showcased include frontend development with JavaScript/TypeScript and React/Next.js, 3D graphics with Three.js/WebGL, and AI/ML with Python, TensorFlow, and Natural Language Processing. There\'s also expertise in modern web technologies and frameworks.',
                'I specialize in modern web development technologies including advanced JavaScript/TypeScript, React ecosystem, Three.js for 3D graphics, and Python for AI/ML applications. The focus is on creating immersive and intelligent web experiences.',
                'The skill set covers both traditional web development and emerging technologies. From responsive design and modern JavaScript to 3D graphics programming and machine learning integration.'
            ];
        }
        
        // 3D-related responses
        if (message.includes('3d') || message.includes('three') || message.includes('webgl')) {
            return [
                'The 3D effects you see are created using Three.js, a powerful JavaScript library for 3D graphics in the browser. This includes particle systems, geometric shapes, dynamic lighting, and interactive elements that respond to mouse movement.',
                'Three.js enables the creation of stunning 3D experiences directly in the browser. The background features floating geometric shapes, particle systems with custom shaders, and real-time lighting effects.',
                'The 3D environment uses WebGL through Three.js to render complex scenes with particles, geometric shapes, and dynamic lighting. Everything is optimized for smooth performance across different devices.'
            ];
        }
        
        // AI-related responses
        if (message.includes('ai') || message.includes('artificial') || message.includes('machine learning') || message.includes('ml')) {
            return [
                'AI integration includes machine learning-powered analytics, natural language processing for this chat system, and intelligent data visualization. The goal is to create smarter, more adaptive web applications.',
                'Artificial Intelligence is integrated through various means: smart chatbots like myself, predictive analytics in dashboard applications, and machine learning models for data insights and user experience optimization.',
                'The AI components demonstrate practical applications of machine learning in web development, from this conversational interface to intelligent data processing and predictive modeling.'
            ];
        }
        
        // Contact-related responses
        if (message.includes('contact') || message.includes('hire') || message.includes('work') || message.includes('collaborate')) {
            return [
                'I\'d love to discuss potential collaboration! You can reach out through the contact form on this website, or connect via the provided email and phone number. I\'m always interested in innovative projects that push technological boundaries.',
                'For project inquiries or collaboration opportunities, please use the contact section below. I\'m passionate about creating cutting-edge digital experiences and would enjoy discussing how we can work together.',
                'Feel free to get in touch through the contact form! Whether you\'re looking for 3D web experiences, AI integration, or innovative web solutions, I\'m excited to explore new possibilities.'
            ];
        }
        
        // About-related responses
        if (message.includes('about') || message.includes('who') || message.includes('experience')) {
            return [
                'I\'m a passionate web developer specializing in immersive 3D experiences and AI integration. With expertise in modern frameworks and emerging technologies, I focus on creating innovative digital solutions that push the boundaries of web development.',
                'As a developer focused on cutting-edge technology, I bring together traditional web development skills with emerging fields like 3D graphics, virtual reality, and artificial intelligence to create unique digital experiences.',
                'My journey involves constantly exploring new technologies and finding creative ways to implement them in web applications. The combination of 3D graphics, AI, and modern web development creates endless possibilities for innovation.'
            ];
        }
        
        // Default responses
        return [
            'That\'s an interesting question! This portfolio showcases the intersection of web development, 3D graphics, and artificial intelligence. Is there a specific aspect you\'d like to know more about?',
            'I\'d be happy to help you explore this portfolio further. You can ask me about the projects, technologies used, or any specific features that caught your attention.',
            'This AI-powered 3D portfolio demonstrates modern web development techniques. Feel free to ask about the 3D effects, AI integration, or any of the featured projects!',
            'Great question! This portfolio combines Three.js for 3D graphics, modern web technologies, and AI integration. What would you like to learn more about?'
        ];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Method to integrate with real AI APIs (example structure)
    async callRealAIAPI(message) {
        // Example structure for calling real AI APIs
        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory,
                    context: 'portfolio-website'
                })
            });
            
            const data = await response.json();
            return data.response;
            
        } catch (error) {
            console.error('AI API Error:', error);
            throw error;
        }
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        this.messagesContainer.innerHTML = '';
        this.initializeChat();
        this.addMessageToUI('ai', this.conversationHistory[0].content);
    }

    // Export conversation
    exportConversation() {
        const conversation = this.conversationHistory.map(msg => 
            `${msg.type.toUpperCase()}: ${msg.content}`
        ).join('\n\n');
        
        const blob = new Blob([conversation], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-chat-conversation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize AI Chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});

// Add some CSS for typing indicator animation
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        animation: pulse 1.5s ease-in-out infinite alternate;
    }
    
    @keyframes pulse {
        0% { opacity: 0.6; }
        100% { opacity: 1; }
    }
    
    .typing-indicator .dots {
        font-weight: bold;
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIChat;
}
