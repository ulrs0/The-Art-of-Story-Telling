import React from "react";
import ProppCard from "../components/ProppCard";
import './CardsLayer.css';

function CardsLayer({ heading, phrase, layerFunction, selectedCards, setSelectedCards, layerAnswer, setLayerAnswer, handleSubmit }) {

    const handleCardClick = (functionName) => {
        setSelectedCards(prevState => ({
            ...prevState,
            [functionName]: !prevState[functionName]
        }));
    };

    const handleAnswerChange = (functionName, answer) => {
        setLayerAnswer(prevState => ({
            ...prevState,
            [functionName]: answer
        }));
    };

    const allSelectedHaveAnswers = Object.keys(selectedCards)
        .filter(functionName => selectedCards[functionName])
        .every(functionName => layerAnswer[functionName] && layerAnswer[functionName].trim() !== "");

    const selectedCount = Object.values(selectedCards).filter(selected => selected).length;

    const canProceed = selectedCount >= 2 && allSelectedHaveAnswers;

    return (
        <div className="card-layer-container">
            <div className="card-layer">
                <h1 className="card-layer-heading">
                    {heading}
                    <br />
                    <h2>{phrase}</h2>
                    <small>*Select at least 2 and answer them</small>
                </h1>
                <div className="propp-cards">
                    {Object.keys(layerFunction).map((functionName, index) => {
                        const { description, example, question } = layerFunction[functionName];
                        return (
                            <ProppCard
                                key={index}
                                description={description}
                                example={example}
                                question={question}
                                selected={!!selectedCards[functionName]}
                                answer={layerAnswer[functionName]}
                                setAnswer={(answer) => handleAnswerChange(functionName, answer)}
                                onClick={() => handleCardClick(functionName)}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="next-button-container">
                <button
                    className={`next-button ${!canProceed ? "disabled" : ""}`}
                    onClick={handleSubmit}
                    disabled={!canProceed}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CardsLayer;
