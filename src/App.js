import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';

import Header from './Header.js';
import Main from './Main.js';

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, question: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Action unknown');
  }
}

const initialState = {
  question: [],
  // "loading","error","ready","active","finished"
  status: 'loading',
};
function App() {
  const [state, dispatch] = useReducer(reducer, { initialState });

  useEffect(function () {
    async function fetchData() {
      try {
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
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}

export default App;
