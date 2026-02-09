 
import React from 'react';
import SubCard from './SubCard';
import { DiJavascript } from 'react-icons/di';
import { FaGithub, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import useQuestionStore from '../../store/client/questionStore';
import useProfileStore from '../../store/client/profileStore';

 // SubjectCards Component 

const SubjectCards = () => {
    const { getTotalQuestions } = useQuestionStore();
    const { stats } = useProfileStore();

     // Subject Configuration 
    const subjects = [
        {
            name: 'JavaScript',
            key: 'javascript',
            icon: <DiJavascript />,
            solved: stats?.javascript?.solved?.length || 0,
            total: getTotalQuestions('javascript'),
        },
        {
            name: 'React',
            key: 'react',
            icon: <FaReact />,
            solved: stats?.react?.solved?.length || 0,
            total: getTotalQuestions('react'),
        },
        {
            name: 'NodeJS',
            key: 'nodejs',
            icon: <FaNodeJs />,
            solved: stats?.nodejs?.solved?.length || 0,
            total: getTotalQuestions('nodejs'),
        },
        {
            name: 'MongoDB',
            key: 'mongodb',
            icon: <SiMongodb />,
            solved: stats?.mongodb?.solved?.length || 0,
            total: getTotalQuestions('mongodb'),
        },
        {
            name: 'Git',
            key: 'gitgithub',
            icon: <FaGithub />,
            solved: stats?.gitgithub?.solved?.length || 0,
            total: getTotalQuestions('gitgithub'),
        },
    ];

    // Render 
    return (
        <div className="lg:col-span-3 mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {subjects.map((subject) => (
                    <SubCard
                        key={subject.key}
                        Subject={subject.name}
                        Solved={subject.solved}
                        Remaining={subject.total - subject.solved}
                        icon={subject.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default SubjectCards;