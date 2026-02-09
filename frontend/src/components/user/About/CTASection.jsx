
import React from 'react';

const CTASection = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-24">
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
                    Join thousands of learners who are already mastering the MERN stack with
                    StackSteps.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg">
                        Get Started Free
                    </button>
                    <button className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/50 hover:bg-white/10 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;