import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import './GlobalLoading.css';

const GlobalLoadingIndicator = () => {
  const { loading } = useContext(LoadingContext);

  return loading ? (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  ) : null;
};

export default GlobalLoadingIndicator;
