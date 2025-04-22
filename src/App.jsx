import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import AnimeList from './components/AnimeList';
import RecommendationSection from './components/RecommendationSection';
import './index.css';

function App() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState({ trending: false, search: false, recommendations: false });
  const [error, setError] = useState(null);

  // Reusable fetch function
  const fetchData = async (url, onSuccess, onErrorKey) => {
    try {
      setError(null);
      const response = await fetch(url);
      const data = await response.json();
      onSuccess(data.data);
    } catch (err) {
      console.error(err);
      setError(`Failed to load ${onErrorKey}.`);
    }
  };

  // Fetch trending anime
  useEffect(() => {
    setLoading((prev) => ({ ...prev, trending: true }));
    fetchData(
      'https://api.jikan.moe/v4/top/anime',
      (data) => {
        setTrendingAnime(data);
        setLoading((prev) => ({ ...prev, trending: false }));
      },
      'trending anime'
    );
  }, []);

  // Handle search
  const handleSearch = (query) => {
    if (!query) return;
    setLoading((prev) => ({ ...prev, search: true }));
    fetchData(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`,
      (data) => {
        setSearchResults(data);
        setRecommendations([]);
        setLoading((prev) => ({ ...prev, search: false }));
      },
      'search results'
    );
  };

  // Handle recommendations fetch
  const handleShowRecommendations = (id) => {
    setLoading((prev) => ({ ...prev, recommendations: true }));
    fetchData(
      `https://api.jikan.moe/v4/anime/${id}/recommendations`,
      (data) => {
        setRecommendations(data);
        setLoading((prev) => ({ ...prev, recommendations: false }));
      },
      'recommendations'
    );
  };

  return (
    <div className="app-container">
      <h1>Anime Recommender</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      <h2>Trending Anime</h2>
      <AnimeList
        animeList={trendingAnime}
        loading={loading.trending}
        onShowRecommendations={handleShowRecommendations}
      />
      {searchResults.length > 0 ? (
        <>
          <h2>Search Results</h2>
          <AnimeList
            animeList={searchResults}
            loading={loading.search}
            onShowRecommendations={handleShowRecommendations}
          />
        </>
      ) : (
        loading.search && <p>Searching...</p>
      )}
      {recommendations.length > 0 ? (
        <RecommendationSection recommendations={recommendations} />
      ) : (
        loading.recommendations && <p>Loading recommendations...</p>
      )}
    </div>
  );
}

export default App;