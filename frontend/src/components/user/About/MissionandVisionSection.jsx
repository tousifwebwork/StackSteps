
import React from 'react';

const MissionandVisionSection = () => {
    return (
        <section className="bg-linear-to-r from-indigo-600 to-purple-600 py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            To democratize web development education by providing an engaging,
                            interactive, and accessible learning platform that helps aspiring
                            developers build real-world skills through practice and continuous
                            feedback.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <div className="text-4xl mb-4">🔭</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            To become the world's leading platform for MERN stack education,
                            empowering millions of developers to build innovative solutions and shape
                            the future of the web, one step at a time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionandVisionSection;