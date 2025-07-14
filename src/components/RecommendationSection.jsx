import React, { useState, useEffect } from 'react';

function RecommendationSection({ recommendations }) {
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Automatically show recommendations when new data is provided
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setShowRecommendations(true);
    }
  }, [recommendations]);

  const handleToggleRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  return (
    <div className="recommendation-section">
      <h2>Recommendations</h2>
      <button onClick={handleToggleRecommendations}>
        {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
      </button>
      {showRecommendations && (
        <div className="anime-list">
          {recommendations && recommendations.length > 0 ? recommendations.map(rec => (
            <div key={rec.entry?.mal_id || `anime-${rec.votes}`} className="anime-card">
              <img src={rec.entry?.images?.jpg?.image_url || ''} alt={rec.entry?.title || 'Unknown Title'} />
              <h4>{rec.entry?.title || 'Unknown Title'}</h4>
              <p>Votes: {rec.votes || 0}</p>
            </div>
          )) : <p>No recommendations available.</p>}
        </div>
      )}
    </div>
  );
}

export default RecommendationSection;

//Add RecommendationSection component to fetch and show related anime