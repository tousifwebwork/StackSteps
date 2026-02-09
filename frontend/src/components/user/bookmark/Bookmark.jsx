

import React, { useEffect } from 'react';
import Nav from '../../Nav';
import Footer from '../../Footer';
import LeftCol from './LeftCol';
import RightCol from './RightCol';
import useBookmarkStore from '../../store/client/bookmarkStore';


const Bookmark = () => {
    const { fetchBookmarks } = useBookmarkStore();

    // Data Fetching
    useEffect(() => {
        fetchBookmarks();
    }, []);
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-black dark:text-gray-100">
            <Nav />

            {/* Main Content */}
            <div className="flex flex-row max-w-6xl mx-auto px-4 py-8">
                <LeftCol />
                <RightCol />
            </div>

            <Footer />
        </div>
    );
};

export default Bookmark;