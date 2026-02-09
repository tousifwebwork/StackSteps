 
import React from 'react';

 // Company Data 

const MARQUEE_ROW_ONE = [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', name: 'Amazon', handle: 'Uses MERN stack for internal dashboards', date: 'Since 2018' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', name: 'Facebook', handle: 'Uses MERN stack for developer tools', date: 'Since 2017' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', name: 'Netflix', handle: 'MERN used in content management tools', date: 'Since 2019' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg', name: 'Twitter', handle: 'MERN for analytics & dashboards', date: 'Since 2016' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg', name: 'Spotify', handle: 'Internal management apps in MERN', date: 'Since 2020' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', name: 'PayPal', handle: 'Payment dashboards built on MERN', date: 'Since 2018' },
];

const MARQUEE_ROW_TWO = [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png', name: 'Uber', handle: 'MERN stack in dashboard & analytics', date: 'Since 2018' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', name: 'Slack', handle: 'Uses MERN for internal tools', date: 'Since 2019' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg', name: 'Instagram', handle: 'MERN for content management tools', date: 'Since 2020' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', name: 'LinkedIn', handle: 'Dashboard & reporting apps using MERN', date: 'Since 2017' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', name: 'Shopify', handle: 'MERN stack for admin dashboards', date: 'Since 2019' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', name: 'Stripe', handle: 'Payment & reporting tools in MERN', date: 'Since 2020' },
];
 
// CSS Animation Styles 

const MARQUEE_STYLES = `
    @keyframes marqueeScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .marquee-inner {
        display: flex;
        animation: marqueeScroll 10s linear infinite;
    }
    .marquee-reverse {
        animation-direction: reverse;
    }
`;
 
// CompanyCard Sub-component 
const CompanyCard = ({ company }) => (
    <div className="flex flex-col p-6">
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white dark:bg-gray-800">
            {/* Company Header */}
            <div className="flex gap-2 items-center">
                <div className="w-11 h-11 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                    <img
                        className="max-w-full max-h-full object-contain"
                        src={company.image}
                        alt={company.name}
                    />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-gray-800 dark:text-white">{company.name}</p>
                    <span className="text-xs text-slate-500 dark:text-gray-400">{company.handle}</span>
                </div>
            </div>
            {/* Usage Date */}
            <p className="text-xs py-2 text-gray-600 dark:text-gray-400">
                Using MERN stack since {company.date}
            </p>
        </div>
    </div>
);

// ============================================
// Testimonial Component
// ============================================

const Testimonial = () => {
    return (
        <>
            <style>{MARQUEE_STYLES}</style>

            <div className="lg:col-span-3 mt-6 h-100">
                {/* Marquee Row 1 - Forward */}
                <div className="relative w-full overflow-hidden max-w-6xl mx-auto my-8">
                    <div className="marquee-inner">
                        {/* Duplicate for infinite scroll effect */}
                        {[...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE].map((company, idx) => (
                            <CompanyCard key={idx} company={company} />
                        ))}
                    </div>
                </div>

                {/* Marquee Row 2 - Reverse */}
                <div className="relative w-full overflow-hidden max-w-6xl mx-auto my-8">
                    <div className="marquee-inner marquee-reverse">
                        {/* Duplicate for infinite scroll effect */}
                        {[...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO].map((company, idx) => (
                            <CompanyCard key={idx} company={company} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;
