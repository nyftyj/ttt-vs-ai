import { LoadingSpinner } from './LoadingSpinner';

const Status = ({ status, isLoading, className }) => {
  return (
    <div className={className}>
      <h3 data-testid='status'>{status}</h3>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default Status;