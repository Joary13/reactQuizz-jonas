import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from './StartScreen.js';

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'loading':
      return { ...state, status: 'loading' };
    case 'error':
      return { ...state, status: 'error' };
    default:
      throw new Error('Action unknown');
  }
}

const initialState = {
  questions: [],
  // "loading","error","ready","active","finished"
  status: 'loading',
};
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, {
    initialState,
  });
  console.log(questions);
  const numQuestions = questions && questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        // dispatch({ type: 'loading' });
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
        console.error('Error');
      }
    }
    fetchData();
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
