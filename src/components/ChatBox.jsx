import React, { useState } from "react";
import Message from "./Message";
import { useAuth } from "../context/AuthProvider";
import { GoogleGenAI } from "@google/genai";
import process from "process";

export default function ChatBox(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [input, setInput] = useState('');
    const { user } = useAuth();
    
    const [message, setMessage] = useState([
        { sender: 'user', text: 'Hello, AI!' },
        { sender: 'ai', text: `Hello ${user.username}! I'm your e-waste assistant. Ask me about proper disposal, recycling methods, or reducing electronic waste!` }
    ]);
    
    const gemini_api_key = import.meta.env.VITE_GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: gemini_api_key});

    // const items = ["Yes", "No", "Maybe", "Sure", "Absolutely", "Definitely", "I don't know", "I'm not sure", "Of course", "Why not?", 
    //     "Maybe later", "Not yet", "Ask again", "Perhaps", "I think so", "I hope so", "I’ll try", "It’s possible", 
    //     "Definitely not", "I doubt it", "Probably", "Yes, please", "No thanks", "Sounds good", "I agree", "I disagree", 
    //     "I need to check", "Let's do it", "I'll pass", "Not today", "I’m busy", "I’m free", "It’s fine", "That’s okay", 
    //     "That works", "I’m ready", "I’m not ready", "Give me a moment", "Let’s wait", "I’m thinking", "I’m sure", "It depends", 
    //     "Sounds like a plan", "I’ll consider it", "Not right now", "Let's go", "Let me think", "Not a chance", 
    //     "I agree with you", "That’s strange", "Interesting", "How curious", "I’ll be there", "I’m on my way", "I can’t make it", 
    //     "Maybe another time", "Good idea", "Not a problem", "All good", "It’s okay", "I’m in", "I’ll handle it", 
    //     "I’ll figure it out", "I need help", "Can you help?", "Let's find out", "Let’s see", "I don’t mind", "That’s fine", 
    //     "No worries", "It’s up to you", "Sure thing", "Of course not", "Absolutely not", "I forgot", "I remember", 
    //     "You’re right", "I see", "Got it", "Understood", "That makes sense", "I believe so", "I don’t believe so", 
    //     "That’s amazing", "I like it", "I love it", "It’s great", "I’m excited", "I’m happy", "I’m sad", "I’m confused", 
    //     "It’s okay, really", "It’s urgent", "It’s not urgent", "I have no idea", "It’s a mystery", "I’m on it", 
    //     "Let’s do something else", "Time will tell", "We’ll see"
    // ];

    // const sendMessage = () => {
    //     if (input.trim()) {
    //         setMessage([...message, { sender: 'user', text: input }]);
    //         setInput('');
    //         // Simulate AI response
    //         setTimeout(() => {
    //             setMessage(prevMessages => [...prevMessages, { sender: 'ai', text: `${items[Math.floor(Math.random() * 100)]}`}]);
    //         }, 1000);
    //     }
    // };

    const SYSTEM_PROMPT = `
        ROLE: You are an AI assistant for E-Collect, specializing exclusively in electronic waste (e-waste) management. 
        Your expertise includes disposal methods, recycling processes, minimizing e-waste, and eco-friendly practices. 

        INSTRUCTIONS:
        1. Respond ONLY to questions about:
        - Proper disposal/recycling of electronics/batteries/appliances
        - Local e-waste collection centers/policies
        - Reducing e-waste through repairs/reuse
        - Environmental impact of improper disposal
        - Regulatory guidelines (e.g., WEEE, EPA)
        2. For non-e-waste queries:
        - Politely decline: "I specialize in e-waste management. Ask me about recycling electronics or reducing e-waste!"
        - Never mention other topics (e.g., general recycling, plastics, unrelated environmental issues).

        EXAMPLES:
        - Valid: "How to dispose of old phones?" → Answer with steps.
        - Invalid: "How to recycle paper?" → Decline and redirect.
        - Invalid: "Climate change solutions" → Decline unless directly tied to e-waste.

        3. RESPONSE FORMATTING RULES:
        - USE BLOCK LETTERS ONLY FOR ALL HEADINGS AND SUBHEADINGS(E.G., DISPOSAL METHODS)
        - ADD 2 BLANK LINE BEFORE EACH FOR MAIN HEADING AND SUBHEADING
        - USE NUMBERED LISTS FOR STEP-BY-STEP GUIDANCE
        - USE BULLET POINTS FOR OPTIONS/CHOICES
        - KEEP SENTENCES SHORT AND CONCISE (MAX 20 WORDS)
        - If the subheadings are numbered, add new line before the number and add 2 blank lines after the subheading.
        - If the subheadings are not numbered, add new line before the subheading and add 2 blank lines after the subheading.

        KNOWLEDGE CUTOFF: Use data up to 2024. If unsure, say "Contact your local e-waste authority for the latest guidelines."
    `

    const sendMessage = async () => {
        if(input.trim()){
            try{
                setMessage(prev => [...prev, { sender: 'user', text: input }]);
                setInput('');
                setIsLoading(true);
                setError(null);

                const fullPrompt = `${SYSTEM_PROMPT}\n\nUSER QUERY: ${input}`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: fullPrompt,
                });
                
                setMessage(prev => [...prev, { sender: 'ai', text: response.text }]);

            }catch(error){
                setError("Failed to get response. Please try again.");
                setMessage(prev => [...prev, {
                    sender: 'ai',
                    text: "Sorry, I'm having trouble responding. Please try again later."
                }]);
            }finally{
                setIsLoading(false);
            }
        }
    }

    return(
        <div className="h-full pb-14 sm:p-0">
            <div className="bg-zinc-900 sm:shadow-2xl sm:shadow-cyan-200 custom-scrollbar flex flex-col h-full max-w-3xl mx-auto py-6 px-3 rounded-lg">
                <div className="border border-zinc-700 rounded-lg flex-1 p-2 overflow-y-auto mb-4 custom-scrollbar">
                    {message.map((msg, index) => (
                        <Message key={index} sender={msg.sender} text={msg.text} isLoading={isLoading}/>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className="bg-gray-200 text-black p-2 rounded-xl">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-sm p-2">{error}</div>
                    )}
                </div>
                <div className="flex w-full max-w-3xl mx-auto p-1 sticky bottom-0 rounded-lg">
                    <input
                        type="text"
                        className="bg-zinc-950 text-white flex-1 min-w-0 p-2 py-3 sm:py-2 border border-sky-700 rounded-l-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        // autoFocus
                    />
                    <button
                        className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-400"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}