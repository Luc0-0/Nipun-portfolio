import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser, timestamp }) => {
    return (
        <motion.div
            className={`chat-message ${isUser ? 'user-message' : 'ai-message'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="message-content">
                {isUser ? (
                    <p>{message}</p>
                ) : (
                    <ReactMarkdown>{message}</ReactMarkdown>
                )}
            </div>
            {timestamp && (
                <div className="message-timestamp">
                    {new Date(timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            )}
        </motion.div>
    );
};

export default ChatMessage;
