 
import React, { useEffect } from 'react';
import useProfileStore from '../../store/client/profileStore';
import { Link } from 'react-router-dom';
import Feedback from './Feedback';
import OurProjects from './OurProjects';
import Features from './Features';
 
// Progress Bar Colors 

const PROGRESS_COLORS = {
    javascript: 'bg-green-500',
    react: 'bg-pink-500',
    nodejs: 'bg-yellow-500',
    mongodb: 'bg-purple-500',
    gitgithub: 'bg-cyan-500',
};
 
// LeftColumn Component 
const LeftColumn = () => {
    const { fetchStats, stats } = useProfileStore();
 
    // Data Fetching 
    useEffect(() => {
        fetchStats();
    }, []);
  
    const totalQuizzes =
        (stats?.javascript?.attempted || 0) +
        (stats?.react?.attempted || 0) +
        (stats?.nodejs?.attempted || 0) +
        (stats?.mongodb?.attempted || 0) +
        (stats?.gitgithub?.attempted || 0);

    const totalCorrect =
        (stats?.javascript?.correct || 0) +
        (stats?.react?.correct || 0) +
        (stats?.nodejs?.correct || 0) +
        (stats?.mongodb?.correct || 0) +
        (stats?.gitgithub?.correct || 0);

    const accuracy = totalQuizzes > 0 ? ((totalCorrect / totalQuizzes) * 100).toFixed(1) : 0;

    const courseProgress = {
        javascript: stats?.javascript?.correct || 0,
        react: stats?.react?.correct || 0,
        nodejs: stats?.nodejs?.correct || 0,
        mongodb: stats?.mongodb?.correct || 0,
        gitgithub: stats?.gitgithub?.correct || 0,
    };

  return (
    <div className="lg:col-span-2 space-y-6">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Quizzes Taken */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {totalQuizzes}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Quizzes Taken
          </div>
        </div>

        {/* Accuracy */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {accuracy}%
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Accuracy
          </div>
        </div>
 
        {/* Correct Answers (Overall) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            {totalCorrect}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Correct Answers
          </div>
        </div>

      </div>

      {/* Course Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📈</span> Course Progress
        </h3>

        <div className="space-y-4">
          {Object.keys(courseProgress).map((tech) => (
            <div key={tech}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  {tech}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {courseProgress[tech]}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    tech === 'javascript'  ? 'bg-green-500' : 
                    tech === 'react' ? 'bg-pink-500': 
                    tech === 'nodejs' ? 'bg-yellow-500' :
                    tech === 'mongodb' ? 'bg-purple-500' :
                    tech === 'gitgithub' ? 'bg-cyan-500' : 'bg-cyan-500'
                  } rounded-full`}
                  style={{ width: `${courseProgress[tech]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

       
       {/* Quote */}
      <div className="h-80 w-full bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md flex flex-col justify-center items-center text-center space-y-4">
         <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">🌟 Believe in Yourself!  </h1>
           <p className="text-lg text-gray-700 dark:text-gray-300">
                   Every great achievement starts with a small step.  
                    Don't be afraid to take risks, make mistakes, and learn along the way.
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 italic">
             “Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill
            </p>
             <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm">
             Keep Going
        </button>
      </div>


      <div className="grid grid-cols-2 gap-4">
          
        {/* Left Card: About Developer */}
         <div className="h-64 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      About the Developer
    </h1>
    <p className="text-gray-700 dark:text-gray-300 mb-4">
      Hi! I'm Mohammad Tousif Sunkat, a passionate MERN stack developer.  
      I love building interactive web apps and learning new technologies.
    </p>
    <Link
      to="/aboutus"
      className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
    >
      Learn More
    </Link>
         </div>

       {/* Right Card: Navigate / Feedback */} 
    <div className="h-64 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
         Navigate
       </h1>


      <div className="flex flex-col space-y-3">
      {/* Feedback modal button */}
       <Feedback /> 
       <OurProjects />
       <Features />
      </div>
</div>

      </div>



    </div>
  );
};

export default LeftColumn;
