/* Game Show Studio Design: Quiz state management with dramatic feedback */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Difficulty = 'Easy' | 'Normal' | 'Hard';

export interface Question {
  id: number;
  difficulty: Difficulty;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizSettings {
  difficulty: Difficulty;
  questionCount: 10 | 20 | 30;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  isAnswered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  settings: QuizSettings;
  isQuizActive: boolean;
  isLoading: boolean;
}

interface QuizContextType extends QuizState {
  startQuiz: (difficulty: Difficulty, questionCount: 10 | 20 | 30) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  goToHome: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<QuizSettings>({
    difficulty: 'Normal',
    questionCount: 10,
  });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load questions from JSON
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        const data = await response.json();
        setAllQuestions(data.questions);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const startQuiz = (difficulty: Difficulty, questionCount: 10 | 20 | 30) => {
    // Filter questions by difficulty
    const filteredQuestions = allQuestions.filter(
      (q) => q.difficulty === difficulty
    );

    // Shuffle and select questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setSettings({ difficulty, questionCount });
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers(new Array(selected.length).fill(null));
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsQuizActive(true);
  };

  const answerQuestion = (answerIndex: number) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.answerIndex;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Quiz finished
      setIsQuizActive(false);
    }
  };

  const restartQuiz = () => {
    startQuiz(settings.difficulty, settings.questionCount);
  };

  const goToHome = () => {
    setIsQuizActive(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const value: QuizContextType = {
    questions,
    currentQuestionIndex,
    score,
    answers,
    isAnswered,
    selectedAnswer,
    isCorrect,
    settings,
    isQuizActive,
    isLoading,
    startQuiz,
    answerQuestion,
    nextQuestion,
    restartQuiz,
    goToHome,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
