import React, { useEffect, useState, useRef } from 'react';
import './StoryPage.css';
import api from '../config';

function StoryPage({ storyString, storyName }) {
    const [storyContent, setStoryContent] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [videos, setVideos] = useState({});
    const [audioLoading, setAudioLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                setStoryContent([]);
                setAudioUrl(null);
                setVideos({});
                setAudioLoading(true);
                setVideoLoading(true);

                const response = await fetch(`${api.API_URL}/writer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: storyString,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch story");
                }

                const data = await response.json();
                const paragraphs = data.story.split("\n").filter(p => p.trim() !== "");
                setStoryContent(paragraphs);

                setIsFetched(true);

                await fetchAudio(data.story);
                await fetchVideosSequentially(paragraphs);

            } catch (error) {
                console.error("Error fetching story, narration or animation:", error);
            }
        };

        fetchStory();
    }, [storyString]);

    const fetchAudio = async (story) => {
        try {
            const audioResponse = await fetch(`${api.API_URL}/narrator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    story: story,
                }),
            });

            if (!audioResponse.ok) {
                throw new Error("Failed to fetch narration");
            }

            const audioBlob = await audioResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setAudioLoading(false);
        } catch (error) {
            console.error("Error fetching narration:", error);
        }
    };

    const fetchVideosSequentially = async (paragraphs) => {
        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            try {
                const videoResponse = await fetch(`${api.API_URL}/animator`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paragraph,
                    }),
                });

                if (!videoResponse.ok) {
                    throw new Error(`Failed to fetch animation for paragraph ${index}`);
                }

                const videoBlob = await videoResponse.blob();
                const videoUrl = URL.createObjectURL(videoBlob);
                setVideos(prevVideos => ({ ...prevVideos, [index]: videoUrl }));
            } catch (error) {
                console.error(`Error fetching animation for paragraph ${index}:`, error);
            }
        }
        setVideoLoading(false);
    };

    const handleVideoPlay = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleVideoPause = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="story-page">
            <h1 className="story-title">{storyName}</h1>

            <div className="story-content">
                {isFetched ? (
                    storyContent.map((paragraph, index) => (
                        <div key={index} className="paragraph-section">
                            <p>{paragraph}</p>
                            {videos[index] ? (
                                <video
                                    controls
                                    width="600"
                                    src={videos[index]}
                                    onPlay={handleVideoPlay}
                                    onPause={handleVideoPause}
                                    onEnded={handleVideoPause}
                                />
                            ) : (
                                <div className="loading-container-video">
                                    <div className="spinner"></div>
                                    <p>Generating Animation...</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Generating Story...</p>
                    </div>
                )}
            </div>

            {audioLoading ? (
                <div className="audio-player">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Generating Narration...</p>
                    </div>
                </div>
            ) : (
                <div className="audio-player">
                    <audio ref={audioRef} controls src={audioUrl} />
                </div>
            )}
        </div>
    );
}

export default StoryPage;
