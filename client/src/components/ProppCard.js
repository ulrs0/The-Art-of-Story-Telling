import React, { useState, useEffect } from "react";
import './ProppCard.css';

function ProppCard({ description, example, question, selected, onClick, answer, setAnswer }) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (!selected) {
            setIsClicked(false);
        } else {
            setIsClicked(true);
        }
    }, [selected]);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClick();
    };

    const handleTextareaChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleTextareaClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`propp-card ${selected ? "selected" : ""}`} onClick={handleClick}>
            {!isClicked ? (
                <>
                    <h2 className="propp-card-description">{description}</h2>
                    {example && <p className="propp-card-example">{example}</p>}
                </>
            ) : (
                <>
                    <div className="propp-card-question">{question}</div>
                    <textarea
                        className="propp-card-textarea"
                        value={answer || ""}
                        onChange={handleTextareaChange}
                        onClick={handleTextareaClick}
                        placeholder={example || "Type your answer here..."}
                    />
                </>
            )}
        </div>
    );
}

export default ProppCard;
