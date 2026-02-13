/* Game Show Studio Design: Main quiz flow controller */
import { useQuiz } from '@/contexts/QuizContext';
import TitleScreen from './TitleScreen';
import QuizScreen from './QuizScreen';
import ResultScreen from './ResultScreen';

export default function Home() {
  const { isQuizActive, questions, currentQuestionIndex, isLoading } = useQuiz();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="font-display text-4xl font-bold text-primary mb-4 animate-pulse">
            LOADING...
          </div>
          <p className="text-muted-foreground">問題データを読み込んでいます</p>
        </div>
      </div>
    );
  }

  // Show title screen if quiz is not active
  if (!isQuizActive) {
    return <TitleScreen />;
  }

  // Show result screen if all questions are answered
  if (currentQuestionIndex >= questions.length) {
    return <ResultScreen />;
  }

  // Show quiz screen during active quiz
  return <QuizScreen />;
}
