// HeroSpotlight.jsx
// Premium stage spotlight effect for hero portrait
// Pure CSS radial gradient with subtle Framer Motion animation

import { motion } from 'framer-motion';

export default function HeroSpotlight() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                scale: [1, 1.03, 1],
                x: [0, 3, 0],
                y: [0, -2, 0]
            }}
            transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
                x: { duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
            }}
            className="absolute inset-0 pointer-events-none -z-10 opacity-90 md:opacity-100"
            style={{
                background: 'radial-gradient(circle at 20% 15%, rgba(212, 168, 83, 0.65) 0%, rgba(212, 168, 83, 0.35) 25%, rgba(212, 168, 83, 0.15) 40%, transparent 60%)',
                mixBlendMode: 'screen'
            }}
        />
    );
}
