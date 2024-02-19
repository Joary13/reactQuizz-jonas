import { useQuizz } from '../contexts/QuizContext';

function Options({ question }) {
  const { dispatch, answer } = useQuizz();
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, id) => (
        <button
          key={option}
          className={`btn btn-option ${id === answer ? 'answer' : ''} ${
            hasAnswered
              ? id === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: id })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
