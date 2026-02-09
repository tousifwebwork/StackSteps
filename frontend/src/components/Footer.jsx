
import React from 'react';

const FOOTER_SECTIONS = [
    {
        title: 'Services',
        links: ['Branding', 'Design', 'Marketing', 'Advertisement'],
    },
    {
        title: 'Company',
        links: ['About us', 'Contact', 'Jobs', 'Press kit'],
    },
    {
        title: 'Legal',
        links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
    },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-black text-white p-8 md:p-10 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
                {/* Render each footer section */}
                {FOOTER_SECTIONS.map((section) => (
                    <nav key={section.title}>
                        <h6 className="footer-title mb-4 text-center text-gray-100">
                            {section.title}
                        </h6>
                        <ul className="flex flex-col gap-2 items-center">
                            {section.links.map((link) => (
                                <li key={link}>
                                    <a className="link link-hover text-gray-300 hover:text-white">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
        </footer>
    );
};

export default Footer;