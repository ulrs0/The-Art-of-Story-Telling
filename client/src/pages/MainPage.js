import React from "react";
import './MainPage.css';

function MainPage({ storyName, setStoryName, mainCharacter, setMainCharacter, moral, setMoral, handleSubmit }) {
    const isDisabled = !storyName || !mainCharacter;

    return (
        <div className="main-page">
            <form className="story-form" onSubmit={handleSubmit}>
                <h2>Create Your Own Story</h2>
                <div className="input-container">
                    <label>Story Name*</label>
                    <textarea
                        value={storyName}
                        onChange={(e) => setStoryName(e.target.value)}
                        placeholder="Enter Story Name"
                        className="textarea"
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Main Character*</label>
                    <textarea
                        value={mainCharacter}
                        onChange={(e) => setMainCharacter(e.target.value)}
                        placeholder="Enter Main Character"
                        className="textarea"
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Moral of the Story</label>
                    <textarea
                        value={moral}
                        onChange={(e) => setMoral(e.target.value)}
                        placeholder="Enter Moral of the Story"
                        className="moral-textarea"
                    />
                </div>
                <button type="submit" className={isDisabled ? 'disabled-button' : ''} disabled={isDisabled}>
                    Next
                </button>
            </form>
        </div>
    );
}

export default MainPage;
