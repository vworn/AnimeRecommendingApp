import React from 'react';
import AnimeCard from './AnimeCard';

function AnimeList({ animeList = [], loading, onShowRecommendations }) {
  if (loading) return <p>Loading...</p>;
  if (!animeList || !animeList.length) return <p>No anime found.</p>;

  return (
    <div className="anime-list">
      {animeList.map(anime => (
        <AnimeCard
          key={anime.mal_id}
          anime={anime}
          onShowRecommendations={onShowRecommendations}
        />
      ))}
    </div>
  );
}

export default AnimeList;

//Implement AnimeList component to render grid of AnimeCard items