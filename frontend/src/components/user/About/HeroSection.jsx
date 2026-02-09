

import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-90" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Content */}
            <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                    🚀 Learn • Practice • Master
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    About <span className="text-yellow-300">StackSteps</span>
                </h1>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
                    We're on a mission to make learning web development accessible, engaging, and
                    effective for everyone. Master the MERN stack one step at a time.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;