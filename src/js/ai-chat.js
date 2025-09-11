// AI Chat Integration
import { gsap } from 'gsap';

class AIChat {
    constructor() {
        try {
            this.chatContainer = document.getElementById('ai-chat');
            this.messagesContainer = document.getElementById('chat-messages');
            this.chatInput = document.getElementById('chat-input');
            this.sendButton = document.getElementById('send-message');
            this.closeButton = document.getElementById('close-chat');
            this.aiChatButton = document.getElementById('ai-chat-btn');
            this.aiBubble = document.getElementById('ai-bubble');
            this.isOpen = false;
            this.conversationHistory = [];
            
            // Verify required elements exist
            if (!this.chatContainer || !this.messagesContainer || !this.chatInput || !this.sendButton) {
                throw new Error('Required AI chat elements not found in DOM');
            }
            
            this.initializeChat();
            this.setupEventListeners();
        } catch (error) {
            console.error('AIChat constructor error:', error);
            throw error;
        }
    }

    initializeChat() {
        // Add initial welcome message
        const welcomeMessage = {
            type: 'ai',
            content: 'Hello! I\'m your AI assistant. I can help you learn more about Ajay Dodiya\'s portfolio, his work experience, education, projects, and skills. How can I assist you today?'
        };
        this.conversationHistory.push(welcomeMessage);
    }

    setupEventListeners() {
        // Open/close chat
        if (this.aiChatButton) {
            this.aiChatButton.addEventListener('click', () => this.toggleChat());
        }

        // AI Bubble click handler
        if (this.aiBubble) {
            this.aiBubble.addEventListener('click', () => this.toggleChat());
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
                !this.aiChatButton?.contains(e.target) &&
                !this.aiBubble?.contains(e.target)) {
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
        
        // Update AI bubble state
        if (this.aiBubble) {
            this.aiBubble.classList.add('chat-active');
        }
        
        // Add opening animation
        gsap.from(this.chatContainer, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.classList.remove('active');
        
        // Update AI bubble state
        if (this.aiBubble) {
            this.aiBubble.classList.remove('chat-active');
        }
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
        gsap.from(messageDiv, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
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
        const msg = message.toLowerCase();

        // Ajay's Profile Data
        const profile = {
            name: 'Ajay Dodiya',
            title: 'Software Developer',
            email: 'ajaysinghdodiya29@gmail.com',
            phone: '+91 8462876073',
            linkedin: 'https://www.linkedin.com/in/ajay-singh-dodiya-68a147231/',
            github: 'https://github.com/Ajaydodiya7773',
            leetcode: 'https://leetcode.com/u/dodiyaajay/',
            resume: 'https://drive.google.com/file/d/163r9NDvU2yhevwHKGmMAj9DdLAThXyHz/view?usp=drive_link',
            experience: [
                {
                    company: 'Freelancer', role: 'Software Developer', duration: 'Add duration',
                    details: 'Custom software projects using MERN and Python. Built AI tools: image generator, chatbot, invoice data extractor.'
                },
                {
                    company: 'Edunet Foundation (with AICTE)', role: 'Virtual Intern', duration: 'Aug 2024 – Dec 2024 (2 months, online)',
                    details: 'Focused on AI & Cloud Computing. Built and deployed chatbots on IBM Cloud. Hands-on with SkillsBuild and cloud deployment.'
                }
            ],
            education: [
                { degree: 'MCA', institute: 'Shri Vaishnav Institute of Management and Science, Indore', year: '2024' },
                { degree: 'BCA', institute: 'Christian Eminent College, Indore', year: 'Add year' }
            ],
            projects: [
                { name: 'AI Image Generator', tech: 'MERN + OpenAI API', link: 'https://devika-ai-image-genby-ajaydodiya.netlify.app/', role: 'Full-stack' },
                { name: 'ChatApp', tech: 'MERN + WebSocket', role: 'Full-stack' },
                { name: 'Live Location Tracker', tech: 'Node.js + Socket.io', role: 'Backend' },
                { name: 'Musify Music Player', tech: 'Python Django', role: 'Developer' },
                { name: 'AI Chatbot with Sentiment Analysis', tech: 'Python, TensorFlow/Keras, Flask/Django, NLP', role: 'In progress' },
                { name: 'Invoice Data Extractor Tool', tech: 'Python, OpenCV, OCR (Tesseract), Pandas, OpenPyXL', role: 'Planned' }
            ],
            skills: {
                languages: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
                frameworks: ['ReactJS', 'Django', 'Flask', 'Tailwind CSS', 'TensorFlow/Keras'],
                databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL'],
                tools: ['Git', 'GitHub', 'Docker', 'AWS', 'Postman'],
                other: ['AI/ML basics', 'NLP', 'Cloud Computing', 'DevOps practices']
            }
        };
        // Personal Info
        if (msg.includes('who') || msg.includes('ajay') || msg.includes('about') || msg.includes('name')) {
            return [
                `I'm ${profile.name}, a passionate Software Developer from Indore, Madhya Pradesh, India. I have an MCA degree (2024) from Shri Vaishnav Institute with 7.4 CGPA. I specialize in full-stack development with MERN stack, Python, and AI integration.`,
                `${profile.name} is a dedicated Full Stack Web Developer with expertise in MERN stack, Django, and Python. He's passionate about creating AI-powered tools and solving complex problems through innovative solutions.`,
                `Ajay Dodiya is from Indore, India. He completed his Master's in Computer Applications (MCA) in 2024 and has been working as a freelance software developer, building custom applications and AI-powered tools.`
            ];
        }

        // Contact Information
        if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach') || msg.includes('hire')) {
            return [
                `You can contact Ajay at ${profile.email} or call him at ${profile.phone}. Connect on LinkedIn: ${profile.linkedin}, GitHub: ${profile.github}, or LeetCode: ${profile.leetcode}. Resume: ${profile.resume}`,
                `For collaboration opportunities, reach out via email: ${profile.email}, LinkedIn: ${profile.linkedin}, GitHub: ${profile.github}, or check his coding practice on LeetCode: ${profile.leetcode}`,
                `Ajay is available for freelance projects and full-time opportunities. Contact: ${profile.email} | Phone: ${profile.phone} | GitHub: Ajaydodiya7773 | LeetCode: dodiyaajay`
            ];
        }

        // Work Experience
        if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('career')) {
            return [
                `Ajay has worked as a Freelance Software Developer, creating custom MERN stack and Python applications, including AI-powered tools like image generators and chatbots. He also completed a Virtual Internship with Edunet Foundation (AICTE) focusing on AI & Cloud Computing.`,
                `His professional experience includes freelance development work with MERN stack, Django, Flask, and AI APIs like OpenAI and Hugging Face. Recently completed an AI & Cloud Computing internship with IBM Cloud Platform deployment experience.`,
                `Currently working as a freelancer, Ajay has built various projects including AI image generators, real-time chat applications, and location tracking systems. He also gained cloud computing experience through AICTE's virtual internship program.`
            ];
        }

        // Education
        if (msg.includes('education') || msg.includes('degree') || msg.includes('study') || msg.includes('college') || msg.includes('university')) {
            return [
                `Ajay holds an MCA (Master of Computer Applications) from Shri Vaishnav Institute of Management and Science, Indore (2024) with 7.4 CGPA, and a BCA from Christian Eminent College, Indore.`,
                `He completed his Master's degree (MCA) in 2024 from RGPV University through Shri Vaishnav Institute, Indore, achieving 7.4 CGPA. His Bachelor's (BCA) was from DAVV University through Christian Eminent College.`,
                `Educational background: MCA (2024) from Shri Vaishnav Institute, Indore with 7.4 CGPA, and BCA from Christian Eminent College, Indore. Both degrees focused on computer applications and software development.`
            ];
        }

        // Projects
        if (msg.includes('project') || msg.includes('built') || msg.includes('created') || msg.includes('portfolio')) {
            return [
                `Ajay has built several impressive projects: AI Image Generator using MERN + OpenAI API (live at devika-ai-image-genby-ajaydodiya.netlify.app), a real-time ChatApp with WebSocket, Live Location Tracker using Node.js + Socket.io, and Musify Music Player with Django.`,
                `His key projects include an AI-powered image generator, WhatsApp clone with real-time messaging, location tracking application, music player web app, and he's currently working on an AI chatbot with sentiment analysis.`,
                `Notable projects: 1) AI Image Generator (MERN + OpenAI), 2) Real-time Chat Application, 3) Live Location Tracker, 4) Music Player (Django), 5) AI Chatbot with Sentiment Analysis (in progress), 6) Invoice Data Extractor (planned).`
            ];
        }
        
        // Skills and Technologies
        if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech') || msg.includes('stack') || msg.includes('language') || msg.includes('dsa') || msg.includes('algorithm')) {
            return [
                `Ajay's technical skills include: Languages - ${profile.skills.languages.join(', ')}; Frameworks - ${profile.skills.frameworks.join(', ')}; Databases - ${profile.skills.databases.join(', ')}; Tools - ${profile.skills.tools.join(', ')}. He practices DSA on LeetCode: ${profile.leetcode}`,
                `His expertise spans full-stack development with MERN stack (MongoDB, Express, React, Node.js), Python frameworks like Django and Flask, cloud platforms including AWS and IBM Cloud, AI/ML technologies, and strong DSA skills (check his LeetCode profile).`,
                `Technical proficiencies: Frontend (JavaScript, React, Tailwind CSS), Backend (Node.js, Python, Django), Databases (MongoDB, MySQL, PostgreSQL), Cloud (AWS, IBM Cloud), AI/ML (TensorFlow, OpenAI API, NLP), DSA problem-solving, and DevOps practices.`
            ];
        }

        // Certifications
        if (msg.includes('certification') || msg.includes('certificate') || msg.includes('course')) {
            return [
                'Ajay has completed several certifications: IBM SkillsBuild + AICTE Cloud & AI Virtual Internship (Aug–Dec 2024), MERN Stack certification from Crush IT Techno, Web Development from Infosys Springboard, and Python with AI from Infosys Springboard.',
                'His certifications include Edunet Foundation Virtual Internship in AI & Cloud Computing, IBM Cloud Developer Certification, AICTE Certified Internship Program, and multiple courses from Infosys Springboard.',
                'Recent certifications: AI & Cloud Computing (Edunet + AICTE), IBM Cloud Platform, MERN Stack Development, Web Development, and Python with AI - all focused on modern software development and emerging technologies.'
            ];
        }
        
        // Location and Background
        if (msg.includes('location') || msg.includes('where') || msg.includes('from') || msg.includes('live') || msg.includes('indore')) {
            return [
                'Ajay is from Indore, Madhya Pradesh, India. It\'s a beautiful city known for its educational institutions and growing tech industry.',
                'He lives in Indore, MP, India - a city famous for IIT Indore and IIM Indore. It\'s becoming a hub for software development and technology.',
                'Based in Indore, Madhya Pradesh - the commercial capital of MP and home to prestigious institutions like IIT and IIM.'
            ];
        }

        // 3D and WebGL
        if (msg.includes('3d') || msg.includes('three') || msg.includes('webgl') || msg.includes('graphics')) {
            return [
                'This portfolio showcases 3D graphics using Three.js and WebGL. Ajay has experience with 3D web development, including particle systems, geometric shapes, and interactive elements.',
                'The 3D effects you see demonstrate modern web capabilities. Ajay works with Three.js for creating immersive web experiences with real-time rendering and animations.',
                'Three.js and WebGL expertise allows creation of stunning 3D web applications. This portfolio itself is an example of combining 3D graphics with traditional web development.'
            ];
        }
        
        // AI and Machine Learning
        if (msg.includes('ai') || msg.includes('artificial') || msg.includes('machine learning') || msg.includes('ml') || msg.includes('openai')) {
            return [
                'Ajay specializes in AI integration, having built an AI Image Generator using OpenAI API, and currently working on an AI Chatbot with Sentiment Analysis using TensorFlow/Keras and NLP techniques.',
                'His AI experience includes working with OpenAI API, Hugging Face API, TensorFlow, and NLP libraries like VADER and TextBlob for sentiment analysis and natural language processing.',
                'AI projects include image generation (OpenAI), chatbot development, sentiment analysis, and he\'s planning an Invoice Data Extractor using OCR and machine learning techniques.'
            ];
        }
        
        // Resume and Career
        if (msg.includes('resume') || msg.includes('cv') || msg.includes('hire') || msg.includes('job') || msg.includes('opportunity')) {
            return [
                `You can view Ajay's resume here: ${profile.resume}. He's available for freelance projects and full-time opportunities in software development, especially MERN stack and AI integration roles.`,
                `His resume is available on Google Drive: ${profile.resume}. Ajay is actively seeking opportunities in full-stack development, AI/ML projects, and innovative web applications.`,
                `Check out his detailed resume: ${profile.resume}. He's open to collaboration on exciting projects involving modern web technologies and AI integration.`
            ];
        }
        
        // Social Media and Links
        if (msg.includes('linkedin') || msg.includes('github') || msg.includes('social') || msg.includes('portfolio') || msg.includes('leetcode') || msg.includes('coding')) {
            return [
                `Connect with Ajay: LinkedIn: ${profile.linkedin}, GitHub: ${profile.github}, LeetCode: ${profile.leetcode}. His portfolio and AI Image Generator showcase his latest work.`,
                `Professional profiles: LinkedIn (ajay-singh-dodiya-68a147231), GitHub (Ajaydodiya7773), LeetCode (dodiyaajay). Check his coding practice and project repositories!`,
                `Social links: LinkedIn: ${profile.linkedin}, GitHub: ${profile.github}, LeetCode: ${profile.leetcode}. Follow his coding journey and connect for opportunities.`
            ];
        }
        
        // Default responses
        return [
            `I'm Ajay's AI assistant! I can tell you about his work experience, education (MCA 2024), projects like AI Image Generator, technical skills (MERN, Python, AI), or help you get in touch. What would you like to know?`,
            `Hi! I can share information about Ajay Dodiya - his software development experience, MERN stack projects, AI integrations, education from Indore, or contact details. What interests you most?`,
            `Welcome! I'm here to help you learn about Ajay's portfolio. Ask me about his projects (AI tools, chat apps, location tracker), technical skills, work experience, or how to contact him.`,
            `Hello! I can provide details about Ajay's background - freelance software development, MCA degree, AI/ML projects, certifications, or his contact information. What would you like to explore?`
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
    try {
        // Initialize AI Chat
        const aiChatInstance = new AIChat();
        
        // Make it globally available for debugging
        window.aiChat = aiChatInstance;
        
        console.log('AI Chat initialized successfully');
    } catch (error) {
        console.error('AI Chat initialization failed:', error);
        
        // Fallback initialization
        setTimeout(() => {
            try {
                const fallbackAIChat = new AIChat();
                window.aiChat = fallbackAIChat;
                console.log('AI Chat fallback initialization successful');
            } catch (fallbackError) {
                console.error('AI Chat fallback also failed:', fallbackError);
            }
        }, 1000);
    }
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
export { AIChat };
