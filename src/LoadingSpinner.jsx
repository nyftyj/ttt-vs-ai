import './index.css';

export const LoadingSpinner = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className='loader' />
    );
}