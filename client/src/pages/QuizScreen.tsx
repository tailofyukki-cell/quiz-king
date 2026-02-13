/* Game Show Studio Design: Quiz play screen with dramatic answer feedback */
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FZRVAZBm0zmKvOjvs2SXSG/sandbox/DDbShjtF5PVHQwldT8j5mP-img-1_1771004416000_na1fn_cXVpei1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRlpSVkFaQm0wem1Ldk9qdnMyU1hTRy9zYW5kYm94L0REYlNoanRGNVBWSFF3bGRUOGo1bVAtaW1nLTFfMTc3MTAwNDQxNjAwMF9uYTFmbl9jWFZwZWkxb1pYSnZMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qfhjfJsn5U2~LRqbdB3~USORHwAyIbgVvZd0jZnCSqrBOyhISDCPNVwzxLwiTMOwqv4e~Nz1mY0p8g-rbI1krmYW1JbAOny3HkSukkJx~vBMM3hF4zWE2F~mWIT3zBHwpLwX1Wwk4QvyPlzZM4h4fPlOfM9ZHmVuQoH9yxS99GC9G8nRQDB104FMIZRJuzsR7AWw-TszdFadmDaxeaG-0Lz54ChCf2~qtUPdMO76s47idNqVbUM1r2f8O9-5mvTmExgTbshobO5leFO~e9pZYfMy2Ph19ClqGTdzXfHX4SGfTMHhMNcTyQyTIsINcz8s9Jw-Uog3mK~shvX6y-CaIg__";

export default function QuizScreen() {
  const {
    questions,
    currentQuestionIndex,
    score,
    isAnswered,
    selectedAnswer,
    isCorrect,
    answerQuestion,
    nextQuestion,
  } = useQuiz();

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const choiceLabels = ['A', 'B', 'C', 'D'];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <Card className="px-6 py-3 bg-card/90 backdrop-blur-md border-2 border-primary/30">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg text-muted-foreground">QUESTION</span>
              <span className="font-digital text-3xl font-bold text-primary">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </Card>

          <Card className="px-6 py-3 bg-card/90 backdrop-blur-md border-2 border-primary/30">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg text-muted-foreground">SCORE</span>
              <span className="font-digital text-3xl font-bold text-primary">
                {score}
              </span>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
          <Progress value={progress} className="h-3 bg-secondary" />
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-2xl mb-8 animate-in fade-in zoom-in-95 duration-500 delay-200">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg border border-primary/30">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.answerIndex;
              const showCorrect = isAnswered && isCorrectAnswer;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && answerQuestion(index)}
                  disabled={isAnswered}
                  className={`
                    group relative p-6 rounded-xl border-2 transition-all duration-300 text-left
                    ${!isAnswered && 'hover:scale-102 hover:shadow-lg hover:border-primary/50'}
                    ${isAnswered && 'cursor-not-allowed'}
                    ${showCorrect && 'border-green-500 bg-green-500/20 scale-102 shadow-lg shadow-green-500/30'}
                    ${showIncorrect && 'border-red-500 bg-red-500/20 scale-95 opacity-60'}
                    ${!isAnswered && !isSelected && 'border-border bg-card/50 hover:bg-card/80'}
                    ${!isAnswered && isSelected && 'border-primary bg-primary/10'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Choice Label */}
                    <div
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-display text-2xl font-bold transition-colors
                        ${showCorrect && 'bg-green-500 text-white'}
                        ${showIncorrect && 'bg-red-500 text-white'}
                        ${!isAnswered && 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}
                      `}
                    >
                      {choiceLabels[index]}
                    </div>

                    {/* Choice Text */}
                    <div className="flex-1 pt-2">
                      <p className="text-lg font-medium text-foreground">{choice}</p>
                    </div>

                    {/* Result Icon */}
                    {showCorrect && (
                      <CheckCircle2 className="flex-shrink-0 w-8 h-8 text-green-500 animate-in zoom-in duration-300" />
                    )}
                    {showIncorrect && (
                      <XCircle className="flex-shrink-0 w-8 h-8 text-red-500 animate-in zoom-in duration-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {isCorrect ? '🎉 正解！' : '❌ 不正解'}
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </Card>

        {/* Next Button */}
        {isAnswered && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={nextQuestion}
              size="lg"
              className="font-display text-2xl px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  NEXT QUESTION
                  <ChevronRight className="ml-2 w-6 h-6" />
                </>
              ) : (
                'VIEW RESULTS'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
