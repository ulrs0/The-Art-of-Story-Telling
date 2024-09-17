import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import CardsLayer from "./pages/CardsLayer";
import StoryPage from "./pages/StoryPage";
import './App.css';

function App() {
    const [page, setPage] = useState("main-page");

    const [storyName, setStoryName] = useState("");
    const [mainCharacter, setMainCharacter] = useState("");
    const [moral, setMoral] = useState("");

    const [layerOneData, setLayerOneData] = useState({});
    const [selectedCardsLayerOne, setSelectedCardsLayerOne] = useState({});
    const [layerOneAnswers, setLayerOneAnswers] = useState({});

    const [layerTwoData, setLayerTwoData] = useState({});
    const [selectedCardsLayerTwo, setSelectedCardsLayerTwo] = useState({});
    const [layerTwoAnswers, setLayerTwoAnswers] = useState({});

    const [layerThreeData, setLayerThreeData] = useState({});
    const [selectedCardsLayerThree, setSelectedCardsLayerThree] = useState({});
    const [layerThreeAnswers, setLayerThreeAnswers] = useState({});

    const [layerFourData, setLayerFourData] = useState({});
    const [selectedCardsLayerFour, setSelectedCardsLayerFour] = useState({});
    const [layerFourAnswers, setLayerFourAnswers] = useState({});

    const [layerFiveData, setLayerFiveData] = useState({});
    const [selectedCardsLayerFive, setSelectedCardsLayerFive] = useState({});
    const [layerFiveAnswers, setLayerFiveAnswers] = useState({});

    const [storyPrompt, setStoryPrompt] = useState("");
    const [streamedStory, setStreamedStory] = useState("");

    useEffect(() => {
        fetch("/layerOne.json")
            .then(response => response.json())
            .then(data => setLayerOneData(data))
            .catch(error => console.error("Error loading JSON:", error));
        fetch("/layerTwo.json")
            .then(response => response.json())
            .then(data => setLayerTwoData(data))
            .catch(error => console.error("Error loading JSON:", error));
        fetch("/layerThree.json")
            .then(response => response.json())
            .then(data => setLayerThreeData(data))
            .catch(error => console.error("Error loading JSON:", error));
        fetch("/layerFour.json")
            .then(response => response.json())
            .then(data => setLayerFourData(data))
            .catch(error => console.error("Error loading JSON:", error));
        fetch("/layerFive.json")
            .then(response => response.json())
            .then(data => setLayerFiveData(data))
            .catch(error => console.error("Error loading JSON:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (page === "main-page") {
            setPage("layer-one");
        } else if (page === "layer-one") {
            setPage("layer-two");
        } else if (page === "layer-two") {
            setPage("layer-three");
        } else if (page === "layer-three") {
            setPage("layer-four");
        } else if (page === "layer-four") {
            setPage("layer-five");
        } else if (page === "layer-five") {
            const allAnswers = {
                ...layerOneAnswers,
                ...layerTwoAnswers,
                ...layerThreeAnswers,
                ...layerFourAnswers,
                ...layerFiveAnswers,
            };

            let storyString = `Story Elements\n`;
            storyString += `Story Name: ${storyName}\n`;
            storyString += `Main Character: ${mainCharacter}\n`;

            if (moral && moral.trim() !== "") {
                storyString += `Moral: ${moral}\n`;
            }

            storyString += `\nPropp's Functions\n`;
            Object.keys(allAnswers).forEach((functionName) => {
                storyString += `${functionName}: ${allAnswers[functionName]}\n`;
            });

            setStoryPrompt(storyString);
            setPage("story-page");
        }
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        if (page === "layer-one") {
            setPage("main-page");
        } else if (page === "layer-two") {
            setPage("layer-one");
        } else if (page === "layer-three") {
            setPage("layer-two");
        } else if (page === "layer-four") {
            setPage("layer-three");
        } else if (page === "layer-five") {
            setPage("layer-four");
        } else if (page === "story-page") {
            setPage("layer-five");
        }
    };

    return (
        <div className="App">
            <div className="back-button-container">
                <button className="back-button" onClick={handleBackClick}>
                    ← Back
                </button>
            </div>
            {page === "main-page" && <MainPage
                storyName={storyName}
                setStoryName={setStoryName}
                mainCharacter={mainCharacter}
                setMainCharacter={setMainCharacter}
                moral={moral}
                setMoral={setMoral}
                handleSubmit={handleSubmit}
            />}
            {page === "layer-one" && <CardsLayer 
                heading={"PART I: Exposition"}
                phrase={"Pick the parts of the story that show who the main characters are and where they are, so we can get ready for the adventure!"}
                layerFunction={layerOneData}
                selectedCards={selectedCardsLayerOne}
                setSelectedCards={setSelectedCardsLayerOne}
                layerAnswer={layerOneAnswers}
                setLayerAnswer={setLayerOneAnswers}
                handleSubmit={handleSubmit}
            />}
            {page === "layer-two" && <CardsLayer 
                heading={"PART II: Rising Action"}
                phrase={"Choose the exciting moments that build up the tension and lead the characters toward their biggest challenge."}
                layerFunction={layerTwoData}
                selectedCards={selectedCardsLayerTwo}
                setSelectedCards={setSelectedCardsLayerTwo}
                layerAnswer={layerTwoAnswers}
                setLayerAnswer={setLayerTwoAnswers}
                handleSubmit={handleSubmit}
            />}
            {page === "layer-three" && <CardsLayer 
                heading={"PART III: Climax"}
                phrase={"Select the moment in the story when the main character faces their greatest challenge."}
                layerFunction={layerThreeData}
                selectedCards={selectedCardsLayerThree}
                setSelectedCards={setSelectedCardsLayerThree}
                layerAnswer={layerThreeAnswers}
                setLayerAnswer={setLayerThreeAnswers}
                handleSubmit={handleSubmit}
            />}
            {page === "layer-four" && <CardsLayer 
                heading={"PART IV: Falling Action"}
                phrase={"Pick the scenes where the characters deal with the consequences of the climax."}
                layerFunction={layerFourData}
                selectedCards={selectedCardsLayerFour}
                setSelectedCards={setSelectedCardsLayerFour}
                layerAnswer={layerFourAnswers}
                setLayerAnswer={setLayerFourAnswers}
                handleSubmit={handleSubmit}
            />}
            {page === "layer-five" && <CardsLayer 
                heading={"PART V: Resolution"}
                phrase={"Choose how the story wraps up. Here, all the loose ends are tied, and the characters find closure."}
                layerFunction={layerFiveData}
                selectedCards={selectedCardsLayerFive}
                setSelectedCards={setSelectedCardsLayerFive}
                layerAnswer={layerFiveAnswers}
                setLayerAnswer={setLayerFiveAnswers}
                handleSubmit={handleSubmit}
            />}
            {page === "story-page" && <StoryPage 
                storyString={storyPrompt}
                storyName={storyName}
            />}
        </div>
    );
}

export default App;
