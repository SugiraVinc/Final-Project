'use client'
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useCreateTestMutation } from '@/app/slices/userSlices/userApiSlice';
import Spinner from '@/app/components/Spinner';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';

const Page = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [createTest, {isLoading}] = useCreateTestMutation()

    const questions = [
        {
            id: 1,
            options: [
                { id: 0, text: "I do not feel numbness or tingling" },
                { id: 1, text: "I mildly feel numbness or tingling but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel numbness or tingling and it wasn’t pleasant" },
                { id: 3, text: "I severely feel numbness or tingling and it bothered me a lot" }
            ]
        },
        {
            id: 2,
            options: [
                { id: 0, text: "I do not experience feeling hot" },
                { id: 1, text: "I mildly experience feeling hot but it doesn’t bother me much" },
                { id: 2, text: "I moderately experience feeling hot and it wasn’t pleasant" },
                { id: 3, text: "I severely experience feeling hot and it bothered me a lot" }
            ]
        },
        {
            id: 3,
            options: [
                { id: 0, text: "I do not feel wobbliness in legs" },
                { id: 1, text: "I mildly experience wobbliness in legs but it doesn’t bother me much" },
                { id: 2, text: "I moderately experience wobbliness in legs and it wasn’t pleasant at times" },
                { id: 3, text: "I severely experience wobbliness in legs and it bothered me a lot" }
            ]
        },
        {
            id: 4,
            options: [
                { id: 0, text: "I am able to relax" },
                { id: 1, text: "I am mildly unable to relax but it doesn’t bother me much" },
                { id: 2, text: "I am moderately unable to relax and it wasn’t pleasant at times" },
                { id: 3, text: "I am severely unable to relax and it bothered me a lot" }
            ]
        },
        {
            id: 5,
            options: [
                { id: 0, text: "I do not have a fear of the worst happening" },
                { id: 1, text: "I mildly have a fear of the worst happening but it doesn’t bother me much" },
                { id: 2, text: "I moderately have a fear of the worst and it is not pleasant at times" },
                { id: 3, text: "I severely have a fear of the worst and it bothers me a lot" }
            ]
        },
        {
            id: 6,
            options: [
                { id: 0, text: "I do not feel dizziness or lightheadedness" },
                { id: 1, text: "I mildly feel dizziness or lightheadedness but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel dizziness or lightheadedness and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel dizziness or lightheadedness and it bothers me a lot" }
            ]
        },
        {
            id: 7,
            options: [
                { id: 0, text: "I do not feel my heart pounding/racing" },
                { id: 1, text: "I mildly feel my heart pounding/racing but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel my heart pounding/racing and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel my heart pounding/racing and it bothers me a lot" }
            ]
        },
        {
            id: 8,
            options: [
                { id: 0, text: "I do not feel unsteady" },
                { id: 1, text: "I mildly feel unsteady but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel unsteady and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel unsteady and it bothers me a lot" }
            ]
        },
        {
            id: 9,
            options: [
                { id: 0, text: "I do not feel terrified or afraid" },
                { id: 1, text: "I mildly feel terrified or afraid but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel terrified or afraid and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel terrified or afraid and it bothers me a lot" }
            ]
        },
        {
            id: 10,
            options: [
                { id: 0, text: "I do not feel nervous" },
                { id: 1, text: "I mildly feel nervous but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel nervous and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel nervous and it bothers me a lot" }
            ]
        },
        {
            id: 11,
            options: [
                { id: 0, text: "I do not have a feeling of choking" },
                { id: 1, text: "I mildly have a feeling of choking but it doesn’t bother me much" },
                { id: 2, text: "I moderately have a feeling of choking and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have a feeling of choking and it bothers me a lot" }
            ]
        },
        {
            id: 12,
            options: [
                { id: 0, text: "I do not experience hands trembling" },
                { id: 1, text: "I mildly experience hands trembling but it doesn’t bother me much" },
                { id: 2, text: "I moderately experience hands trembling and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely experience hands trembling and it bothers me a lot" }
            ]
        },
        {
            id: 13,
            options: [
                { id: 0, text: "I do not feel shaky/unsteady" },
                { id: 1, text: "I mildly feel shaky/unsteady but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel shaky/unsteady and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel shaky/unsteady and it bothers me a lot" }
            ]
        },
        {
            id: 14,
            options: [
                { id: 0, text: "I do not have a fear of losing control" },
                { id: 1, text: "I mildly have a fear of losing control but it doesn’t bother me much" },
                { id: 2, text: "I moderately have a fear of losing control and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have a fear of losing control and it bothers me a lot" }
            ]
        },
        {
            id: 15,
            options: [
                { id: 0, text: "I do not have difficulty in breathing" },
                { id: 1, text: "I mildly have difficulty in breathing but it doesn’t bother me much" },
                { id: 2, text: "I moderately have difficulty in breathing and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have difficulty in breathing and it bothers me a lot" }
            ]
        },
        {
            id: 16,
            options: [
                { id: 0, text: "I do not have a fear of dying" },
                { id: 1, text: "I mildly have a fear of dying but it doesn’t bother me much" },
                { id: 2, text: "I moderately have a fear of dying and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have a fear of dying and it bothers me a lot" }
            ]
        },
        {
            id: 17,
            options: [
                { id: 0, text: "I do not feel scared" },
                { id: 1, text: "I mildly feel scared but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel scared and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel scared and it bothers me a lot" }
            ]
        },
        {
            id: 18,
            options: [
                { id: 0, text: "I do not experience indigestion" },
                { id: 1, text: "I mildly experience indigestion but it doesn’t bother me much" },
                { id: 2, text: "I moderately experience indigestion and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely experience indigestion and it bothers me a lot" }
            ]
        },
        {
            id: 19,
            options: [
                { id: 0, text: "I do not feel faint/lightheaded" },
                { id: 1, text: "I mildly feel faint/lightheaded but it doesn’t bother me much" },
                { id: 2, text: "I moderately feel faint/lightheaded and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely feel faint/lightheaded and it bothers me a lot" }
            ]
        },
        {
            id: 20,
            options: [
                { id: 0, text: "I do not have face flushed" },
                { id: 1, text: "I mildly have face flushed but it doesn’t bother me much" },
                { id: 2, text: "I moderately have face flushed and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have face flushed and it bothers me a lot" }
            ]
        },
        {
            id: 21,
            options: [
                { id: 0, text: "I do not have hot/cold sweats" },
                { id: 1, text: "I mildly have hot/cold sweats but it doesn’t bother me much" },
                { id: 2, text: "I moderately have hot/cold sweats and it doesn’t feel pleasant at times" },
                { id: 3, text: "I severely have hot/cold sweats and it bothers me a lot" }
            ]
        }
    ];
    

    const handleAnswerSelect = (optionId) => {
        setAnswers({
            ...answers,
            [currentQuestion]: optionId
        });
    };

    const calculateScore = async() => {
        try {
            const score = Object.values(answers).reduce((sum, value) => sum + value, 0);
            setTotalScore(score);
            setShowResults(true);
            const result = getResultContent(score)
            const res = await createTest({type: 'Anxiety self check', score, result: result.level}).unwrap()
            console.log(res)

        } catch (error) {
             console.log(error)
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const getResultContent = (score) => {
        if (score <= 21) return {
            level: "low anxiety",
            message: "You have low anxiety",
            color: "bg-blue-50 border-blue-200 text-blue-800",
            showResources: false
        };
        if ( score >= 22 && score <= 35) return {
            level: "moderate anxiety",
            message: "you have moderate anxiety",
            color: "bg-blue-50 border-blue-200 text-blue-800",
            showResources: false
        };
       
        if ( score > 35) return {
            level: "potentially concerning levels of anxiety",
            message: "you have anxiety",
            color: "bg-red-50 border-red-200 text-red-800",
            showResources: false
        };
       
    };

    const ResultsModal = () => {
        const result = getResultContent(totalScore);
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Assessment Results</h2>
                    
                    <div className={`${result.color} border rounded-lg p-4 mb-6`}>
                        <h3 className="font-semibold text-lg mb-2">{result.level}</h3>
                        <p className="mb-2">Total Score: {totalScore}</p>
                        <p>{result.message}</p>
                    </div>

                    <button 
                        onClick={() => setShowResults(false)}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" 
             style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
                <Header/>
                <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl min-h-screen relative rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src="/BC.jpg" 
                        alt="Waterfall background" 
                        className="w-full h-full object-cover absolute inset-0 mt-20 h-[700px] rounded-lg md:mt-0 md:h-full md:rounded-none" 
                    />
                    <div className="relative flex items-center justify-center py-20">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 md:p-16 rounded-lg mx-auto min-h-[700px] flex flex-col justify-center">
                            <div className="bg-white p-6 mb-6 rounded-lg">
                                <h2 className="text-black text-xl font-semibold mb-4">
                                    Question {currentQuestion + 1} of {questions.length}
                                </h2>
                                
                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((option) => (
                                        <label 
                                            key={option.id} 
                                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                                        >
                                            <div className="relative w-6 h-6 mr-3 flex-shrink-0">
                                                <input 
                                                    type="radio" 
                                                    name={`question${currentQuestion}`}
                                                    value={option.id}
                                                    checked={answers[currentQuestion] === option.id}
                                                    onChange={() => handleAnswerSelect(option.id)}
                                                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-full 
                                                             checked:border-blue-600 checked:border-[6px] transition-all
                                                             focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                />
                                            </div>
                                            <span className="text-gray-800 text-lg">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button 
                                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 
                                          ${answers[currentQuestion] !== undefined 
                                            ? 'bg-white text-black hover:bg-gray-200' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                onClick={currentQuestion === questions.length - 1 ? calculateScore : handleNextQuestion}
                                disabled={answers[currentQuestion] === undefined}
                            >
                                {currentQuestion === questions.length - 1 ? (isLoading ? <Spinner/> : 'Submit') : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showResults && <ResultsModal />}
            <footer>
                <div className="w-full">
                    <MusicFooter/>
                    <ImageFotter/>                    
                </div>
                <RealFooter/>               
            </footer>
        </div>
    );
};

export default Page;