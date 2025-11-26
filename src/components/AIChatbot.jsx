import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatCircleDots, X, PaperPlaneTilt, Sparkle } from '@phosphor-icons/react';
import ChatMessage from './chat/ChatMessage';
import geminiService from '../services/geminiService';
import './AIChatbot.css';

const SUGGESTED_PROMPTS = [
    "What are Nipun's skills?",
    "Tell me about his projects",
    "What technologies does he use?",
    "How can I contact him?",
];

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Send initial greeting when chat opens for the first time
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = {
                text: "👋 Hi! I'm Nipun's AI assistant. I can tell you about his skills, projects, and experience. What would you like to know?",
                isUser: false,
                timestamp: Date.now(),
            };
            setMessages([greeting]);
        }
    }, [isOpen]);

    const handleSendMessage = async (text = inputValue) => {
        if (!text.trim()) return;

        const userMessage = {
            text: text.trim(),
            isUser: true,
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Get chat history for context (excluding the current message)
            const chatHistory = messages.map(msg => ({
                text: msg.text,
                isUser: msg.isUser,
            }));

            const response = await geminiService.sendMessage(text.trim(), chatHistory);

            const aiMessage = {
                text: response,
                isUser: false,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            const errorMessage = {
                text: "Sorry, I encountered an error. Please try again.",
                isUser: false,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestedPrompt = (prompt) => {
        handleSendMessage(prompt);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                className="chat-trigger-button"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    rotate: isOpen ? 90 : 0,
                }}
            >
                {isOpen ? <X size={28} weight="bold" /> : <ChatCircleDots size={28} weight="fill" />}
                {!isOpen && (
                    <motion.span
                        className="chat-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Sparkle size={12} weight="fill" />
                    </motion.span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-container"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-header-content">
                                <Sparkle size={24} weight="fill" className="chat-icon" />
                                <div>
                                    <h3>AI Assistant</h3>
                                    <p>Powered by Google Gemini</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <ChatMessage
                                    key={index}
                                    message={msg.text}
                                    isUser={msg.isUser}
                                    timestamp={msg.timestamp}
                                />
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    className="typing-indicator"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Prompts (show when no messages yet) */}
                        {messages.length <= 1 && !isTyping && (
                            <div className="suggested-prompts">
                                {SUGGESTED_PROMPTS.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        className="suggested-prompt"
                                        onClick={() => handleSuggestedPrompt(prompt)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="chat-input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chat-input"
                                placeholder="Ask me anything..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isTyping}
                            />
                            <motion.button
                                className="send-button"
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <PaperPlaneTilt size={20} weight="fill" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
