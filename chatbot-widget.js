(function() {
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'dubai-luxe-ai-widget';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '20px';
    widgetContainer.style.right = '20px';
    widgetContainer.style.zIndex = '1000';
    widgetContainer.style.width = '400px';
    widgetContainer.style.maxHeight = '600px';
    widgetContainer.style.display = 'none';
    widgetContainer.style.background = 'var(--dubai-dark, #1A252F)';
    widgetContainer.style.borderRadius = '20px';
    widgetContainer.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
    widgetContainer.style.overflow = 'hidden';
    document.body.appendChild(widgetContainer);

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '💬';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '1001';
    toggleButton.style.background = 'linear-gradient(45deg, #003087, #D4A017, #F5E6CC)';
    toggleButton.style.color = '#F8F8FF';
    toggleButton.style.width = '60px';
    toggleButton.style.height = '60px';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.border = 'none';
    toggleButton.style.fontSize = '24px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.boxShadow = '0 0 20px rgba(212, 160, 23, 0.7)';
    toggleButton.style.transition = 'all 0.3s ease';
    document.body.appendChild(toggleButton);

    // Toggle widget visibility
    toggleButton.addEventListener('click', () => {
        widgetContainer.style.display = widgetContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --dubai-gold: #D4A017;
            --dubai-blue: #003087;
            --dubai-beige: #F5E6CC;
            --dubai-dark: #1A252F;
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glow-gold: rgba(212, 160, 23, 0.7);
            --glow-blue: rgba(0, 48, 135, 0.7);
            --text-light: #F8F8FF;
            --text-dark: #1A252F;
            --title-gold: #D4A017;
            --luxury-gradient: linear-gradient(45deg, var(--dubai-blue), var(--dubai-gold), var(--dubai-beige));
            --shadow-dark: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        #dubai-luxe-ai-widget.light-mode {
            background: var(--dubai-beige);
            color: var(--text-dark);
        }

        #dubai-luxe-ai-widget.light-mode .glass-bg {
            background: rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        #dubai-luxe-ai-widget.light-mode .chat-bubble.assistant {
            background: rgba(0, 48, 135, 0.15);
        }

        #dubai-luxe-ai-widget.light-mode .chat-bubble.user {
            background: rgba(212, 160, 23, 0.15);
        }

        #dubai-luxe-ai-widget.light-mode .title-text {
            color: var(--text-dark);
            text-shadow: 0 0 15px var(--glow-blue);
        }

        #dubai-luxe-ai-widget .background-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background: url('https://images.unsplash.com/photo-1544552866-fb6b8c10899c?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
            opacity: 0.6;
            animation: luxury-pulse 20s infinite ease-in-out;
        }

        #dubai-luxe-ai-widget.light-mode .background-canvas {
            background: url('https://images.unsplash.com/photo-1519643381402-22cdca2b51c4?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
            opacity: 0.5;
        }

        @keyframes luxury-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        #dubai-luxe-ai-widget .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: radial-gradient(circle, rgba(0, 48, 135, 0.2) 0%, transparent 80%);
            animation: gradient-shift 25s infinite linear;
        }

        @keyframes gradient-shift {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        #dubai-luxe-ai-widget .oracle-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 4px solid transparent;
            background: var(--luxury-gradient);
            padding: 4px;
            object-fit: cover;
            box-shadow: 0 0 20px var(--glow-gold);
            transition: transform 0.6s ease;
            animation: orbit-image 8s ease-in-out infinite;
        }

        #dubai-luxe-ai-widget .oracle-image:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 0 30px var(--glow-blue);
        }

        @keyframes orbit-image {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(-5px, 5px) rotate(5deg); }
        }

        #dubai-luxe-ai-widget .title-text {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: var(--title-gold);
            text-shadow: 0 0 10px var(--glow-gold);
            margin: 1rem 0;
            animation: title-glow 5s infinite alternate;
        }

        @keyframes title-glow {
            0% { text-shadow: 0 0 10px var(--glow-gold); }
            100% { text-shadow: 0 0 15px var(--glow-blue); }
        }

        #dubai-luxe-ai-widget .title-text::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--luxury-gradient);
            animation: line-glow 6s ease-in-out infinite;
        }

        @keyframes line-glow {
            0% { box-shadow: 0 0 5px var(--dubai-gold); }
            50% { box-shadow: 0 0 10px var(--dubai-blue); }
            100% { box-shadow: 0 0 5px var(--dubai-gold); }
        }

        #dubai-luxe-ai-widget .subtitle {
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            opacity: 0;
            animation: type-effect 3s steps(50, end) forwards;
            white-space: nowrap;
            overflow: hidden;
            border-right: 3px solid var(--dubai-blue);
        }

        @keyframes type-effect {
            0% { width: 0; opacity: 1; }
            100% { width: 100%; opacity: 1; border-right: none; }
        }

        #dubai-luxe-ai-widget .chat-container {
            max-height: 300px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--dubai-gold) transparent;
            position: relative;
            perspective: 1000px;
            margin: 10px;
        }

        #dubai-luxe-ai-widget .chat-container::-webkit-scrollbar {
            width: 6px;
        }

        #dubai-luxe-ai-widget .chat-container::-webkit-scrollbar-thumb {
            background: var(--dubai-gold);
            border-radius: 10px;
            box-shadow: 0 0 10px var(--glow-gold);
        }

        #dubai-luxe-ai-widget .chat-bubble {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 10px;
            margin: 10px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: var(--shadow-dark);
            transition: all 0.5s ease;
            animation: fade-in 1s ease-out;
        }

        #dubai-luxe-ai-widget .chat-bubble.assistant {
            margin-right: 10%;
            background: rgba(0, 48, 135, 0.2);
            border-left: 3px solid var(--dubai-blue);
        }

        #dubai-luxe-ai-widget .chat-bubble.user {
            margin-left: 10%;
            background: rgba(212, 160, 23, 0.2);
            border-right: 3px solid var(--dubai-gold);
            text-align: right;
        }

        #dubai-luxe-ai-widget .chat-bubble:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 10px 20px var(--glow-blue);
        }

        #dubai-luxe-ai-widget .chat-bubble button {
            background: var(--luxury-gradient);
            color: var(--text-light);
            border: none;
            padding: 5px 10px;
            border-radius: 15px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            font-size: 0.8rem;
            margin: 3px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        #dubai-luxe-ai-widget .chat-bubble button:hover {
            transform: scale(1.1);
            box-shadow: 0 5px 10px var(--glow-blue);
        }

        @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        #dubai-luxe-ai-widget .input-container {
            display: flex;
            align-items: center;
            gap: 10px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            padding: 10px;
            box-shadow: var(--shadow-dark);
            margin: 10px;
        }

        #dubai-luxe-ai-widget .input-container:hover {
            border-color: var(--dubai-gold);
            box-shadow: 0 0 20px var(--glow-gold);
        }

        #dubai-luxe-ai-widget .input-container input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: var(--text-light);
            font-size: 1rem;
            padding: 5px;
        }

        #dubai-luxe-ai-widget .input-container input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        #dubai-luxe-ai-widget.light-mode .input-container input {
            color: var(--text-dark);
        }

        #dubai-luxe-ai-widget.light-mode .input-container input::placeholder {
            color: rgba(0, 0, 0, 0.7);
        }

        #dubai-luxe-ai-widget .luxe-button {
            background: var(--luxury-gradient);
            color: var(--text-light);
            border: none;
            padding: 8px 15px;
            border-radius: 25px;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 10px var(--glow-gold);
            transition: all 0.5s ease;
        }

        #dubai-luxe-ai-widget .luxe-button:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 20px var(--glow-blue);
            color: var(--dubai-dark);
        }

        #dubai-luxe-ai-widget .theme-toggle {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--luxury-gradient);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px var(--glow-blue);
            cursor: pointer;
            transition: all 0.5s ease;
        }

        #dubai-luxe-ai-widget .theme-toggle:hover {
            transform: rotate(360deg);
            box-shadow: 0 0 15px var(--glow-gold);
        }

        @media (max-width: 480px) {
            #dubai-luxe-ai-widget {
                width: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }
            #dubai-luxe-ai-widget .title-text { font-size: 1.5rem; }
            #dubai-luxe-ai-widget .oracle-image { width: 80px; height: 80px; }
            #dubai-luxe-ai-widget .luxe-button { padding: 6px 10px; font-size: 0.8rem; }
            #dubai-luxe-ai-widget .chat-bubble { margin-left: 5% !important; margin-right: 5% !important; }
            #dubai-luxe-ai-widget .subtitle { font-size: 0.9rem; }
        }
    `;
    document.head.appendChild(style);

    // Load dependencies
    const scripts = [
        'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js',
        'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js',
        'https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.5/babel.min.js',
        'https://cdn.tailwindcss.com',
        'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js'
    ];

    const fonts = document.createElement('link');
    fonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@300;400;600&display=swap';
    fonts.rel = 'stylesheet';
    document.head.appendChild(fonts);

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    });

    // Create root div for React
    const rootDiv = document.createElement('div');
    rootDiv.id = 'dubai-luxe-ai-root';
    widgetContainer.appendChild(rootDiv);

    // Audio elements
    const backgroundMusic = document.createElement('audio');
    backgroundMusic.id = 'background-music';
    backgroundMusic.loop = true;
    backgroundMusic.innerHTML = '<source src="https://cdn.pixabay.com/audio/2023/08/08/audio_9f98c3b3b7.mp3" type="audio/mpeg">';
    widgetContainer.appendChild(backgroundMusic);

    const sendSound = document.createElement('audio');
    sendSound.id = 'send-sound';
    sendSound.innerHTML = '<source src="https://cdn.pixabay.com/audio/2022/05/20/audio_5e1b2c3d4f.mp3" type="audio/mpeg">';
    widgetContainer.appendChild(sendSound);

    // Chatbot React component
    const script = document.createElement('script');
    script.type = 'text/babel';
    script.textContent = `
        const { useState, useEffect, useRef } = React;

        const Chatbot = () => {
            const [messages, setMessages] = useState([
                { role: 'assistant', content: 'Welcome to Dubai Luxe AI, your guide to exquisite hospitality in Dubai. How may I assist you with hotels, dining, or experiences? 🌆' }
            ]);
            const [input, setInput] = useState('');
            const [isLoading, setIsLoading] = useState(false);
            const [isLightMode, setIsLightMode] = useState(true);
            const chatContainerRef = useRef(null);
            const musicRef = useRef(null);
            const sendSoundRef = useRef(null);

            const handleSend = async () => {
                if (!input.trim()) return;
                const userMessage = { role: 'user', content: input };
                setMessages([...messages, userMessage, { role: 'assistant', content: '...' }]);
                setInput('');
                setIsLoading(true);

                try {
                    const response = await fetch('https://your-backend.onrender.com/api/chat', { // Update this URL
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: input, history: messages })
                    });
                    if (!response.ok) throw new Error(\`Backend error: \${response.statusText}\`);
                    const data = await response.json();
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = { role: 'assistant', content: data.response };
                        return newMessages;
                    });
                    sendSoundRef.current.play();
                } catch (error) {
                    console.error('Frontend error:', error.message);
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = { role: 'assistant', content: \`Error: Unable to process your request. Please try again. (\${error.message})\` };
                        return newMessages;
                    });
                } finally {
                    setIsLoading(false);
                }
            };

            const handleClear = () => {
                setMessages([
                    { role: 'assistant', content: 'Welcome to Dubai Luxe AI, your guide to exquisite hospitality in Dubai. How may I assist you with hotels, dining, or experiences? 🌆' }
                ]);
                sendSoundRef.current.play();
            };

            const toggleTheme = () => {
                setIsLightMode(prev => !prev);
                document.getElementById('dubai-luxe-ai-widget').classList.toggle('light-mode');
                sendSoundRef.current.play();
            };

            useEffect(() => {
                document.getElementById('dubai-luxe-ai-widget').classList.add('light-mode');
                const tiltElements = document.querySelectorAll('#dubai-luxe-ai-widget .oracle-image, #dubai-luxe-ai-widget .chat-bubble');
                VanillaTilt.init(tiltElements, {
                    max: 15,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.5,
                });

                musicRef.current = document.getElementById('background-music');
                sendSoundRef.current = document.getElementById('send-sound');
                musicRef.current.play().catch(() => console.log('Background music blocked by browser'));
            }, []);

            useEffect(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }, [messages]);

            return (
                React.createElement('div', null,
                    React.createElement('div', { className: 'theme-toggle', onClick: toggleTheme }, isLightMode ? '🌙' : '☀️'),
                    React.createElement('div', { className: 'background-canvas' }),
                    React.createElement('div', { className: 'background-overlay' }),
                    React.createElement('div', { className: 'text-center', style: { padding: '10px' } },
                        React.createElement('img', {
                            src: 'https://t4.ftcdn.net/jpg/01/80/78/75/240_F_180787547_2tJQRGs7f6QMuTetPwh5SxzafHLcxd8q.jpg',
                            className: 'oracle-image mx-auto',
                            alt: 'Dubai Luxe AI, a luxurious emblem of hospitality'
                        }),
                        React.createElement('div', { className: 'title-text' }, 'Dubai Luxe AI'),
                        React.createElement('div', { className: 'subtitle' }, 'Your Gateway to Dubai\\'s Finest Hospitality')
                    ),
                    React.createElement('div', { className: 'chat-container', ref: chatContainerRef },
                        messages.map((msg, index) =>
                            React.createElement('div', {
                                key: index,
                                className: \`chat-bubble \${msg.role}\`,
                                dangerouslySetInnerHTML: { __html: msg.content === '...' ? '<span className="inline-block w-3 h-3 bg-[var(--dubai-blue)] rounded-full mr-2 animate-pulse"></span><span className="inline-block w-3 h-3 bg-[var(--dubai-blue)] rounded-full mr-2 animate-pulse" style="animation-delay: 0.4s;"></span><span className="inline-block w-3 h-3 bg-[var(--dubai-blue)] rounded-full animate-pulse" style="animation-delay: 0.8s;"></span>' : msg.content }
                            })
                        )
                    ),
                    React.createElement('div', { className: 'input-container' },
                        React.createElement('input', {
                            type: 'text',
                            value: input,
                            onChange: (e) => setInput(e.target.value),
                            onKeyPress: (e) => e.key === 'Enter' && handleSend(),
                            placeholder: 'Ask about hotels, restaurants, or experiences in Dubai...',
                            disabled: isLoading
                        }),
                        React.createElement('button', { onClick: handleSend, className: 'luxe-button', disabled: isLoading }, 'Send'),
                        React.createElement('button', { onClick: handleClear, className: 'luxe-button' }, 'Clear')
                    )
                )
            );
        };

        // Wait for React and ReactDOM to load
        const renderChatbot = () => {
            if (window.React && window.ReactDOM) {
                ReactDOM.render(React.createElement(Chatbot), document.getElementById('dubai-luxe-ai-root'));
            } else {
                setTimeout(renderChatbot, 100);
            }
        };
        renderChatbot();
    `;
    widgetContainer.appendChild(script);
})();
