 
import React from 'react';
 

const CAREER_ROLES = [
    {
        title: 'Frontend Developer',
        description: 'Build beautiful, responsive user interfaces using React, HTML, CSS, and modern UI frameworks.',
        image: 'https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop',
    },
    {
        title: 'Backend Developer',
        description: 'Design secure APIs and server-side logic using Node.js, Express, and database technologies.',
        image: 'https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop',
    },
    {
        title: 'Full Stack Developer',
        description: 'Work across frontend and backend to build complete MERN stack applications end-to-end.',
        image: 'https://images.unsplash.com/photo-1736220690062-79e12ca75262?q=80&w=800&h=400&auto=format&fit=crop',
    },
]; 

const FONT_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    * {
        font-family: 'Poppins', sans-serif;
    }
`;
 
const Carrier = () => {
    return (
        <>
            <style>{FONT_STYLES}</style>

            <div className="py-16 px-6 bg-white dark:bg-gray-800">
                {/* Header */}
                <h1 className="text-3xl font-semibold text-center mx-auto text-gray-800 dark:text-white">
                    Career Opportunities for MERN Stack Developers
                </h1>
                <p className="text-sm text-slate-500 dark:text-gray-400 text-center mt-2 max-w-lg mx-auto">
                    Explore exciting roles and growth paths in MERN Stack development —
                    build real-world applications, sharpen your skills, and advance your tech career.
                </p>

                {/* Career Cards */}
                <div className="flex items-center gap-6 h-100 w-full max-w-5xl mt-10 mx-auto">
                    {CAREER_ROLES.map((role) => (
                        <div
                            key={role.title}
                            className="relative group grow transition-all w-56 h-100 duration-500 hover:w-full"
                        >
                            <img
                                className="h-full w-full object-cover object-center"
                                src={role.image}
                                alt={role.title}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <h1 className="text-3xl">{role.title}</h1>
                                <p className="text-sm">{role.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Carrier;