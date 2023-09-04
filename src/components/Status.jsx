import { LoadingSpinner } from './LoadingSpinner';

const Status = ({ status, isLoading, className }) => {
  return (
    <div className={className} role='region' aria-labelledby='game-status' aria-live='assertive'>
      <h3 tabIndex="0" data-testid='status' id='game-status'>{status}</h3>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default Status;