import React, { useEffect, useState } from "react";
import GameBrain from "./gameBrain";
import video from "./pics/mainBackground.mp4";
const Header = () => {
  const [category, setCategory] = useState(null);
  const [dificulty, setDificulty] = useState(null);
  const [game, setGame] = useState(false);

  // useEffect(() => {
  //   console.log(category);
  //   console.log(dificulty);
  // }, [category]);
  return (
    <>
      {!game && (
        <div className="container">
          <h1 className="mind-arcade">Mind Arcade</h1>
          <video className="background-video" autoPlay loop muted playsInline>
            <source src={video} type="video/mp4" />
            Your browser does not support the video.
          </video>
          <div className="content">
            <h1>Welcome to Q&A</h1>
            <p>Choose Any Question Category</p>
            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="" selected disabled>
                  Choose
                </option>
                <option value="history">History</option>
                <option value="science">Science</option>
                <option value="geography">Geography</option>
                <option value="movies">Movies</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="technology">Technology</option>
                <option value="math">Math</option>
                <option value="literature">Literature</option>
                <option value="animals">Animals</option>
              </select>
              <select onChange={(e) => setDificulty(e.target.value)}>
                <option value="" disabled selected>
                  Choose Dificulty
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              onClick={() => {
                if (!category || !dificulty) {
                  alert("Please select both category and a dificulty level!");
                } else {
                  setGame(true);
                }
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}
      {game && <GameBrain category={category} difficulty={dificulty} />}
      <footer>
        <p>© 2024 Pavel Adrian. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Header;
