import { useEffect } from 'react';
import { useQuizz } from '../contexts/QuizContext';

function Timer() {
  const { dispatch, secondsRemaining: time } = useQuizz();
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch, time]
  );
  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{secs}
      {secs < 10 && '0'}
    </div>
  );
}

export default Timer;
