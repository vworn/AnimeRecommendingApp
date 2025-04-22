import React from 'react';

function AnimeCard({ anime, onShowRecommendations }) {
  return (
    <div className="anime-card">
      <img src={anime?.images?.jpg?.image_url} alt={anime?.title || 'Anime'} />
      <h3>{anime?.title || 'Unknown Title'}</h3>
      <p>Score: {anime?.score || 'N/A'}</p>
      <button onClick={() => onShowRecommendations(anime?.mal_id)}>
        Show Recommendations
      </button>
    </div>
  );
}

export default AnimeCard;

//Create AnimeCard component to display anime image, title, score, and button