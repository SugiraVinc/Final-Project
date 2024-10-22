'use client'
import React, { useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Page = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            question: "Question 1",
            options: [
                "I do not feel sad",
                " I feel sad",
                " I am sad all the time and I can't snap out of it",
                " I am so sad and unhappy that I can't stand it"
            ]
        },
        {
            question: "Question 2",
            options: [
                "I am not particularly discouraged about the future",
                "I feel discouraged about the future",
                "I feel I have nothing to look forward to",
                " I feel the future is hopeless and that things cannot be done"
            ]
        },
        {
            question: "Question 3",
            options: [
                " I do not feel like a failure",
                " I feel I have failed more than the average person",
                "As I look back on my life, all I can see is a lot of failures",
                "I feel I am a complete failure as a person"
            ]
        },

        {
            question: "Question 4",
            options: [
                "I get as much satisfaction out of things as I used to",
                "I don’t enjoy things the way I used to",
                "I don't get real satisfaction out of anything anymore",
                "I am dissatisfied or bored with everything"
            ]
        },
        
        {
            question: "Question 5",
            options: [
                "I don’t feel particularly guilty",
                "I feel guilty a good part of the time",
                "I feel quite guilty most of the time",
                "I feel guilty all of the time"
            ]
        },

        {
            question: "Question 6",
            options: [
                "I don’t feel I am being punished",
                "I feel I may be punished",
                "I expect to be punished",
                "I feel I am being punished"
            ]
        },

        {
            question: "Question 7",
            options: [
                "I don’t feel disappointed in myself",
                "I am disgusted with myself",
                "I am disgusted with myself",+
                "I hate myself"
            ]
        },

        {
            question: "Question 8",
            options: [
                "I don’t feel I am any worse than anybody else",
                "I am critical of myself for my weakness or mistakes",
                "I blame myself all the time for my faults",
                "I blame myself for everything bad that happens",
            ]
        },

        {

            question: "Question 8",
            options: [
                "I don’t feel I am any worse than anybody else",
                "I am critical of myself for my weakness or mistakes",
                "I blame myself all the time for my faults",
                "I blame myself for everything bad that happens"
            ]
        },

        {
            question: "Question 9",
            options: [
                "I don’t have any thoughts of killing myself", 
                "I have thoughts of killing myself, but I would not carry them out", 
                "I would like to kill myself",
                "I would kill myself if I had the chance"
            ]
        },

        {
            question: "Question 10",
            options: [
                "I don’t cry any more than usual", 
                "I cry more now tha I used to", 
                "I cry all the time now",
                "I used to be able to cry , but now I can’t cry even though I want to"
            ]
        },

        {
            question: "Question 11",
            options: [
                "I am no more irritated by things that I ever was",
                "I am slightly more irritated now than usual",
                "I am quite annoyed or irritated a good deal of the time",
                "I feel irritated all the time"
            ]
        },

        {
            question: "Question 12",
            options: [
                "I have not lost interest in other people",
                "I am less interested in other people than I used to be",
                "I have lost most of my interest in other people",
                "I have lost all of my interest in other people."
            ]
        },

        {
            question: "Question 13",
            options: [
                "I make decisions about as well as I ever could", 
                "I put off making decisions more than I used to",
                "I have greater difficulty in making decisions more than I used to",
                "I can't make decisions at all anymore"
            ]
        },

        {
            question: "Question 14",
            options: [
                "I don’t feel that I look any worse than I used to",
                "I am worried that I am looking old or unattractive",
                "I feel there are permanent changes in my appearance that make me look unattractive",
                "I believe that I look ugly"
            ]
        },

        {
            question: "Question 15",
            options: [
                "I can work about as well as before",
                "It takes an extra effort to get started at doing something",
                "I have to push myself very hard to do anything",
                "I can't do any work at all"
            ]
        },

        {
            question: "Question 16",
            options: [
                "I can sleep as well as usual",
                "I don’t sleep as well as I used to",
                "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep", 
                "I wake up several hours earlier than I used to and cannot get back to sleep"
            ]
        },

        {
            question: "Question 17",
            options: [
                "I don't get more tired than usual", 
                "I get tired more easily than I used to", 
                "I get tired from doing almost anything",
                "I am too tired to do anything"
            ]
        },

        {
            question: "Question 18",
            options: [
                "My appetite is no worse than usual",
                "My appetite is not as good as It used to be",
                "My appetite is much worse now",
                "I have no appetite at all anymore. "
            ]
        },

        {
            question: "Question 19",
            options: [
                "I haven't lost much weight, if any, lately",
                "I have lost more than five pounds",
                "I have lost more than ten pounds",
                "I have lost more than fifteen pounds"
            ]
        },

        {
            question: "Question 20",
            options: [
                "I am no more worried about my health than usual",
                "I am worried about physical problems like aches, pain, upset stomach or constipation",
                "I am very worried about physical problems and it's hard to think of much else",
                "I am so worried about my physical problems that I cannot think of anything else"
            ]
        },

        {
            question: "Question 21",
            options: [
                "I have not noticed any recent changes in my interest in sex",
                "I am less interested in sex than I used to be",
                "I have almost no interest in sex",
                "I have lost interest in sex completely"
            ]
        },


    ]

    const handleAnswerSelect = (answer) => {
        setAnswers({
            ...answers,
            [currentQuestion]: answer
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log('Submitted answers:', answers);
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg">
                            {/* Question display */}
                            <div className="bg-white p-6 mb-6 rounded-lg">
                                <h2 className="text-black text-xl font-semibold mb-4">
                                    Question {currentQuestion + 1} of {questions.length}
                                </h2>
                                <p className="text-black text-lg mb-4">
                                    {questions[currentQuestion].question}
                                </p>
                                
                                {/* Multiple choice options */}
                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <label key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`question${currentQuestion}`}
                                                value={option}
                                                checked={answers[currentQuestion] === option}
                                                onChange={() => handleAnswerSelect(option)}
                                                className="form-radio h-5 w-5 text-blue-600" 
                                            />
                                            <span className="text-black text-lg">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Next/Submit button */}
                            <button 
                                className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
                                onClick={currentQuestion === questions.length - 1 ? handleSubmit : handleNextQuestion}
                                disabled={!answers[currentQuestion]}
                            >
                                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

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
    )
}

export default Page;