import React, { useState } from "react";

// Example list of random users with names and image URLs
const users = [
  { name: "John Doe", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Jane Smith", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Michael Brown", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Emily Clark", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "David Lee", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Sophia Martinez", img: "https://randomuser.me/api/portraits/women/3.jpg" },
];

const Giveaway = () => {
  const [winner, setWinner] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  // Function to choose a random winner
  const chooseWinner = () => {
    setIsRolling(true);

    // Start the animation for the users to roll across
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * users.length);
      setWinner(users[randomIndex]);
      setIsRolling(false);
    }, 30000); // Stop the rolling after 30 seconds
  };

  return (
    <div className="px-7 py-4 w-full bg-theme-bg text-slate-300 rounded-2xl">
      <h2 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        Giveaway
      </h2>
      <div className="bg-brown-500 p-5 rounded-lg">
        <div className="text-white overflow-hidden relative w-full">
          {/* User List */}
          <div
            className={`flex transition-transform duration-[500ms] ${
              isRolling ? "animate-roll" : ""
            }`}
          >
            {users.map((user, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-2 p-4 border-2 border-border-info-color rounded-lg"
              >
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <p className="text-center">{user.name}</p>
              </div>
            ))}
            {/* Duplicate users to make the scroll loop */}
            {users.map((user, index) => (
              <div
                key={index + users.length}
                className="flex-shrink-0 mx-2 p-4 border-2 border-border-info-color rounded-lg"
              >
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <p className="text-center">{user.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Choose Winner Button */}
        <div className="mt-5 flex justify-center">
          <button
            className="px-6 py-3 bg-theme-color text-white rounded-lg hover:bg-theme-color/80 transition-all"
            onClick={chooseWinner}
            disabled={isRolling}
          >
            {isRolling ? "Rolling..." : "Choose Winner"}
          </button>
        </div>

        {/* Display Winner */}
        {winner && (
          <div className="mt-5 text-center text-white font-bold text-xl">
            <p>Winner: {winner.name}</p>
            <img
              src={winner.img}
              alt={winner.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mt-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Giveaway;
