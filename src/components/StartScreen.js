import { useQuizz } from '../contexts/QuizContext';

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuizz();

  return (
    <div className='start'>
      <h2>welcome to the react quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'start' })}
      >
        let's start!
      </button>
    </div>
  );
}
