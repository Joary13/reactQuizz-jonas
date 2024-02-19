import React from 'react';
import Options from './Options';
import { useQuizz } from '../contexts/QuizContext';

export default function Question() {
  const { questions, index, numQuestions } = useQuizz();
  const question = index < numQuestions ? questions[index] : null;
  if (question === null) return;
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
