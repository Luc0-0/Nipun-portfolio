import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navigation from "../components/premium/Navigation";
import Footer from "../components/premium/Footer";
import projectsData from "../data/projects.json";

function RepoCard({ project }) {
    return (
        <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 group hover:border-[var(--color-accent)]/30 transition-all block h-full flex flex-col"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-heading-md text-heading text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors break-words">
                    {project.name}
                </h4>
                <svg
                    className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex-grow line-clamp-3">
                {project.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 4).map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]"
                    >
                        {tag}
                    </span>
                ))}
                {project.stars > 0 && (
                    <span className="px-2 py-1 text-xs text-yellow-500 bg-yellow-500/10 rounded border border-yellow-500/20 flex items-center gap-1">
                        ⭐ {project.stars}
                    </span>
                )}
            </div>
        </motion.a>
    );
}

export default function OpenSourcePage() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // Filter projects by category
    const libraries = projectsData.filter(p => p.category === 'libraries');
    // Strict filter for Learning Materials as requested
    const learning = projectsData.filter(p => p.id === 'learning-nlp-from-scratch');

    return (
        <>
            <Navigation />
            <main className="relative z-10 pt-20">
                <section ref={sectionRef} className="py-32 relative">
                    <div className="section-container">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16"
                        >
                            <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
                                CONTRIBUTIONS
                            </span>
                            <h1 className="text-display-xl text-display text-[var(--color-text-primary)] mb-6">
                                Open Source & Libraries
                            </h1>
                            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl">
                                A collection of open-source libraries, utilities, and educational resources
                                I've built and contribute to.
                            </p>
                        </motion.div>

                        {/* Libraries Section */}
                        {libraries.length > 0 && (
                            <div className="mb-20">
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-heading-lg text-heading text-[var(--color-text-primary)]">
                                        Libraries & Tools
                                    </h2>
                                    <div className="h-px bg-[var(--color-border)] flex-grow" />
                                    <span className="text-sm font-mono text-[var(--color-text-muted)]">
                                        {libraries.length} Items
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {libraries.map((project) => (
                                        <RepoCard key={project.id} project={project} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Learning Section */}
                        {learning.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-heading-lg text-heading text-[var(--color-text-primary)]">
                                        Learning Materials
                                    </h2>
                                    <div className="h-px bg-[var(--color-border)] flex-grow" />
                                    <span className="text-sm font-mono text-[var(--color-text-muted)]">
                                        {learning.length} Items
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {learning.map((project) => (
                                        <RepoCard key={project.id} project={project} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
