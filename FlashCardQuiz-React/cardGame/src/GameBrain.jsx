import React, { useEffect, useState } from "react";

const GameBrain = ({ category, difficulty }) => {
  const [categoryModule, setCategoryModule] = useState(null);
  const [filteredElements, SetFilteredElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lifes, setLifes] = useState(3);
  const [hints, setHints] = useState(0);
  const [hintText, setHintText] = useState("");
  const [endOfTheGame, setEndOfTheGame] = useState(false);
  const [gameWinMessage, setGameWinMessage] = useState(false);

  useEffect(() => {
    if (lifes === 0) {
      setEndOfTheGame(true);
    }

    if (filteredElements) {
      currentIndex === filteredElements.length - 1
        ? setGameWinMessage(true)
        : "";
    }

    // console.log(filteredElements[0].options.length);
    // console.log(filteredElements[0].correctIndex);
    // if (categoryModule) {
    //   console.log(
    //     categoryModule.filter((elem) => elem.difficulty === difficulty)
    //   );
    // }
  }, [lifes, totalPoints]);

  useEffect(() => {
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

      import(`./categoriesFiles/${categoryName}`)
        .then((elem) => {
          setCategoryModule(elem.default || elem);
        })
        .catch((err) => console.log(err));
    }
  }, [category]);

  useEffect(() => {
    if (categoryModule && category) {
      const timer = setTimeout(() => {
        const data = categoryModule.filter(
          (elem) => elem.difficulty === difficulty
        );
        SetFilteredElements(data);
        console.log(data);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [categoryModule, difficulty]);

  if (!categoryModule) {
    return <p>Loading...</p>;
  }

  const checkAnswer = (number) => {
    // console.log(filteredElements[currentIndex].correctAnswer);

    setHintText("");
    const correctIndex = filteredElements[currentIndex].options.findIndex(
      (elem) => elem === filteredElements[currentIndex].answer
    );
    // console.log("answer:", filteredElements[currentIndex].answer);
    console.log("correct index:", correctIndex);
    if (parseInt(number) - 1 === correctIndex) {
      console.log("egale");
      setTotalPoints((prev) => prev + 1);

      currentIndex < filteredElements.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : "";
    } else {
      setLifes((prev) => prev - 1);
    }
  };

  const showHint = () => {
    setHintText(filteredElements[currentIndex].hint);
    setHints((prevHintNumbs) => prevHintNumbs + 1);
    console.log(hints);
  };
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="quiz-container">
        <h1>Category: {category}</h1>
        <div className="quiz-main">
          {filteredElements.length > 0 ? (
            <>
              <h3>{filteredElements[currentIndex].question}</h3>
              <ol>
                {filteredElements[currentIndex].options.map((e, index) => (
                  <li key={index}>{e}</li>
                ))}
              </ol>
              <input
                type="number"
                onChange={(e) => setUserGuess(e.target.value)}
              />
              {!endOfTheGame && !gameWinMessage && (
                <>
                  <div>
                    <button onClick={() => checkAnswer(userGuess)}>
                      Check
                    </button>

                    <button onClick={showHint}>Hint</button>
                  </div>
                </>
              )}
              <h2>Points: {totalPoints}</h2>
              <h2>Lifes: {lifes}</h2>
              <h2>Hints Used:{hints}</h2>
              <p className="hint-text">{hintText}</p>
              {endOfTheGame && (
                <div className="end-game-message">
                  <h1>Better Luck next time!</h1>
                  <h3>
                    You Got: {totalPoints}/{filteredElements.length - 1} points!
                  </h3>
                  <button onClick={() => reloadPage()}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              )}

              {gameWinMessage && (
                <div className="win-message">
                  <h1>Congratulations!</h1>
                  <h2>
                    You won the {category} category on {difficulty} mode!
                  </h2>
                  <p>
                    Points: {totalPoints}/{filteredElements.length - 1}
                  </p>
                  <button onClick={() => reloadPage()}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Loading filtered questions...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GameBrain;
