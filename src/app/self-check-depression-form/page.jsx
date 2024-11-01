'use client'
import React, { useState } from 'react';
import Header from '../components/Header'
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useCreateTestMutation } from '../slices/userSlices/userApiSlice';
import Spinner from '../components/Spinner';

const Page = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [createTest, {isLoading}] = useCreateTestMutation()

    const questions = [
        {
            id: 0,
            options: [
                { id: 0, text: "I do not feel sad" },
                { id: 1, text: "I feel sad" },
                { id: 2, text: "I am sad all the time and I can't snap out of it" },
                { id: 3, text: "I am so sad and unhappy that I can't stand it" }
            ]
        },
        {
            id: 1,
            options: [
                { id: 0, text: "I am not particularly discouraged about the future" },
                { id: 1, text: "I feel discouraged about the future" },
                { id: 2, text: "I feel I have nothing to look forward to" },
                { id: 3, text: "I feel the future is hopeless and that things cannot be done" }
            ]
        },
        {
            id: 2,
            options: [
                { id: 0, text: "I do not feel like a failure" },
                { id: 1, text: "I feel I have failed more than the average person" },
                { id: 2, text: "As I look back on my life, all I can see is a lot of failures" },
                { id: 3, text: "I feel I am a complete failure as a person" }
            ]
        },
        {
            id: 3,
            options: [
                { id: 0, text: "I get as much satisfaction out of things as I used to" },
                { id: 1, text: "I don’t enjoy things the way I used to" },
                { id: 2, text: "I don't get real satisfaction out of anything anymore" },
                { id: 3, text: "I am dissatisfied or bored with everything" }
            ]
        },
        {
            id: 4,
            options: [
                { id: 0, text: "I don’t feel particularly guilty" },
                { id: 1, text: "I feel guilty a good part of the time" },
                { id: 2, text: "I feel quite guilty most of the time" },
                { id: 3, text: "I feel guilty all of the time" }
            ]
        },
        {
            id: 5,
            options: [
                { id: 0, text: "I don’t feel I am being punished" },
                { id: 1, text: "I feel I may be punished" },
                { id: 2, text: "I expect to be punished" },
                { id: 3, text: "I feel I am being punished" }
            ]
        },
        {
            id: 6,
            options: [
                { id: 0, text: "I don’t feel disappointed in myself" },
                { id: 1, text: "I am disappointed in myself" },
                { id: 2, text: "I am disgusted with myself" },
                { id: 3, text: "I hate myself" }
            ]
        },
        {
            id: 7,
            options: [
                { id: 0, text: "I don’t feel I am any worse than anybody else" },
                { id: 1, text: "I am critical of myself for my weakness or mistakes" },
                { id: 2, text: "I blame myself all the time for my faults" },
                { id: 3, text: "I blame myself for everything bad that happens" }
            ]
        },
        {
            id: 8,
            options: [
                { id: 0, text: "I don’t have any thoughts of killing myself" },
                { id: 1, text: "I have thoughts of killing myself, but I would not carry them out" },
                { id: 2, text: "I would like to kill myself" },
                { id: 3, text: "I would kill myself if I had the chance" }
            ]
        },
        {
            id: 9,
            options: [
                { id: 0, text: "I don’t cry any more than usual" },
                { id: 1, text: "I cry more now than I used to" },
                { id: 2, text: "I cry all the time now" },
                { id: 3, text: "I used to be able to cry, but now I can’t cry even though I want to" }
            ]
        },
        {
            id: 10,
            options: [
                { id: 0, text: "I am no more irritated by things than I ever was" },
                { id: 1, text: "I am slightly more irritated now than usual" },
                { id: 2, text: "I am quite annoyed or irritated a good deal of the time" },
                { id: 3, text: "I feel irritated all the time" }
            ]
        },
        {
            id: 11,
            options: [
                { id: 0, text: "I have not lost interest in other people" },
                { id: 1, text: "I am less interested in other people than I used to be" },
                { id: 2, text: "I have lost most of my interest in other people" },
                { id: 3, text: "I have lost all of my interest in other people" }
            ]
        },
        {
            id: 12,
            options: [
                { id: 0, text: "I make decisions about as well as I ever could" },
                { id: 1, text: "I put off making decisions more than I used to" },
                { id: 2, text: "I have greater difficulty in making decisions than I used to" },
                { id: 3, text: "I can't make decisions at all anymore" }
            ]
        },
        {
            id: 13,
            options: [
                { id: 0, text: "I don’t feel that I look any worse than I used to" },
                { id: 1, text: "I am worried that I am looking old or unattractive" },
                { id: 2, text: "I feel there are permanent changes in my appearance that make me look unattractive" },
                { id: 3, text: "I believe that I look ugly" }
            ]
        },
        {
            id: 14,
            options: [
                { id: 0, text: "I can work about as well as before" },
                { id: 1, text: "It takes an extra effort to get started at doing something" },
                { id: 2, text: "I have to push myself very hard to do anything" },
                { id: 3, text: "I can't do any work at all" }
            ]
        },
        {
            id: 15,
            options: [
                { id: 0, text: "I can sleep as well as usual" },
                { id: 1, text: "I don’t sleep as well as I used to" },
                { id: 2, text: "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep" },
                { id: 3, text: "I wake up several hours earlier than I used to and cannot get back to sleep" }
            ]
        },
        {
            id: 16,
            options: [
                { id: 0, text: "I don't get more tired than usual" },
                { id: 1, text: "I get tired more easily than I used to" },
                { id: 2, text: "I get tired from doing almost anything" },
                { id: 3, text: "I am too tired to do anything" }
            ]
        },
        {
            id: 17,
            options: [
                { id: 0, text: "My appetite is no worse than usual" },
                { id: 1, text: "My appetite is not as good as it used to be" },
                { id: 2, text: "My appetite is much worse now" },
                { id: 3, text: "I have no appetite at all anymore" }
            ]
        },
        {
            id: 18,
            options: [
                { id: 0, text: "I haven't lost much weight, if any, lately" },
                { id: 1, text: "I have lost more than five pounds" },
                { id: 2, text: "I have lost more than ten pounds" },
                { id: 3, text: "I have lost more than fifteen pounds" }
            ]
        },
        {
            id: 19,
            options: [
                { id: 0, text: "I am no more worried about my health than usual" },
                { id: 1, text: "I am worried about physical problems like aches, pain, upset stomach or constipation" },
                { id: 2, text: "I am very worried about physical problems and it's hard to think of much else" },
                { id: 3, text: "I am so worried about my physical problems that I cannot think of anything else" }
           
    
            ]
        },
        {
            id: 20,
            options: [
                { id: 0, text: "I am no more worried about my health than usual" },
                { id: 1, text: "I am worried about physical problems like aches, pain, upset stomach or constipation" },
                { id: 2, text: "I am very worried about physical problems and it's hard to think of much else" },
                { id: 3, text: "I am so worried about my physical problems that I cannot think of anything else" }
           
    
            ]
        },
        {
            id: 21,
            options: [
                { id: 0, text: "I have not noticed any recent changes in my interest in sex." },
                { id: 1, text: "I am less interested in sex than I used to be." },
                { id: 2, text: "I have almost no interest in sex." },
                { id: 3, text: "I have lost interest in sex completely." }
           
    
            ]
        },
    ]

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
            const res = await createTest({type: 'Depression self check', score, result: result.level}).unwrap()
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
        if (score <= 10) return {
            level: "Normal Ups and Downs",
            message: "These ups and downs are considered normal.",
            color: "bg-blue-50 border-blue-200 text-blue-800",
            showResources: false
        };
        if (score <= 16) return {
            level: "Mild Mood Disturbance",
            message: "You're experiencing mild mood disturbances.",
            color: "bg-blue-50 border-blue-200 text-blue-800",
            showResources: false
        };
        if (score <= 20) return {
            level: "Borderline Clinical Depression",
            message: "You may be experiencing borderline clinical depression.",
            color: "bg-yellow-50 border-yellow-200 text-yellow-800",
            showResources: false
        };
        if (score <= 30) return {
            level: "Moderate Depression",
            message: "We recommend seeking professional help.",
            color: "bg-yellow-50 border-yellow-200 text-yellow-800",
            showResources: true
        };
        if (score <= 40) return {
            level: "Severe Depression",
            message: "It is highly recommended to seek professional help immediately.",
            color: "bg-red-50 border-red-200 text-red-800",
            showResources: true
        };
        return {
            level: "Extreme Depression",
            message: "You are highly recommended to seek professional help. Here are contacts for immediate attention.",
            color: "bg-red-50 border-red-200 text-red-800",
            showResources: true
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
                <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg">
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
                    {/* Player controls bar */}
                    <div className="bg-[#4AA9AD] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-black rounded-full" />
                            <div className="text-white">
                                <div className="text-sm">NF</div>
                                <div className="text-xs">The Search</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                            <div className="h-[2px] bg-black flex-1" />
                            <button className="text-[#1E90FF]">⟲</button>
                            <button className="text-[#1E90FF]">◀◀</button>
                            <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                                <span className="text-[#1E90FF]">▶</span>
                            </button>
                            <button className="text-[#1E90FF]">▶▶</button>
                            <button className="text-[#1E90FF]">⟳</button>
                            <div className="h-[2px] bg-black flex-1" />
                        </div>
                        <button className="text-[#1E90FF]">🔊</button>
                    </div>

                    {/* Main content area */}
                    <div className="bg-[#FFFBA0] p-4">
                        <div className="relative flex justify-between items-center">
                            <img
                                src="/FreshLink Logo OG 1.png"
                                alt="Hope"
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
                            />

                            {/* Left image */}
                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                                </div>
                            </div>

                            {/* Middle image */}
                            <div className="border-[15px] border-black bg-white w-[35%] ">
                                <div className="p-1">
                                    <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-72 ml-1" />
                                </div>
                            </div>

                            {/* Right image */}
                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#4AA9AD] py-8">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="text-center">
                            <img src="/smile2.png" alt="Smile" className="w-7 h-7 mx-auto" />
                        </div>

                        <div className="flex space-x-6">
                            <Link href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaFacebookF size={20} />
                            </Link>
                            <Link href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaInstagram size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="text-center text-white text-xs mt-10">
                        © Copyright Year
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Page;