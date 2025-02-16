import { React } from "react";
import paragraph from "./paragraph";
import { useNavigate } from "react-router-dom";

export default function Hero(){
    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-6xl p-3 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-600 mb-5 text-center">Got Old Gadgets? Let’s Recycle Them! 🌍</h1>
                {paragraph.map((item, index) => {
                    return (
                        <p key={index} className="text-white mb-5">
                            {item}
                        </p>
                    );
                })}
                <div className="text-center">
                    <button
                        onClick={() => {
                            alert('Woohoo! Thanks for doing your part. 🎉');
                            navigate("/login");
                        }}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Recycle My E-Waste Now!
                    </button>
                </div>
                
                {/* <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
                    Got Old Gadgets? Let’s Recycle Them! 🌍
                </h1>
                <p className="text-gray-700 mb-4">
                    Hey there! 👋 Ever wondered what happens to your old phone, laptop, or that ancient gaming console you’ve been hoarding? Spoiler alert: they don’t just disappear. In fact, they end up as <span className="font-semibold">e-waste</span>, and it’s a BIG problem.
                </p>
                <p className="text-gray-700 mb-4">
                    But don’t worry, we’ve got your back! Instead of letting your gadgets collect dust (or worse, end up in a landfill), why not recycle them the right way? By doing so, you’re not just decluttering your space—you’re helping save the planet. 🌱
                </p>
                <p className="text-gray-700 mb-4">
                    Here’s the deal: e-waste is packed with valuable stuff like gold, silver, and copper. Yep, your old phone is basically a tiny treasure chest! 🏴‍☠️ When you recycle, we extract these materials and reuse them, so we don’t have to mine more from the Earth. Cool, right?
                </p>
                <p className="text-gray-700 mb-6">
                    So, what are you waiting for? Dig out those old gadgets, click the button below, and let’s give them a second life. Together, we can make a difference—one recycled device at a time. 💪
                </p>
                <div className="text-center">
                    <button
                        onClick={() => alert('Woohoo! Thanks for doing your part. 🎉')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Recycle My E-Waste Now!
                    </button>
                </div> */}

            </div>
        </div>
    );
}