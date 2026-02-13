/* Game Show Studio Design: Title screen with spotlight drama and bold typography */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuiz, Difficulty } from '@/contexts/QuizContext';
import { Trophy, Zap, Brain } from 'lucide-react';

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FZRVAZBm0zmKvOjvs2SXSG/sandbox/DDbShjtF5PVHQwldT8j5mP-img-1_1771004416000_na1fn_cXVpei1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRlpSVkFaQm0wem1Ldk9qdnMyU1hTRy9zYW5kYm94L0REYlNoanRGNVBWSFF3bGRUOGo1bVAtaW1nLTFfMTc3MTAwNDQxNjAwMF9uYTFmbl9jWFZwZWkxb1pYSnZMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qfhjfJsn5U2~LRqbdB3~USORHwAyIbgVvZd0jZnCSqrBOyhISDCPNVwzxLwiTMOwqv4e~Nz1mY0p8g-rbI1krmYW1JbAOny3HkSukkJx~vBMM3hF4zWE2F~mWIT3zBHwpLwX1Wwk4QvyPlzZM4h4fPlOfM9ZHmVuQoH9yxS99GC9G8nRQDB104FMIZRJuzsR7AWw-TszdFadmDaxeaG-0Lz54ChCf2~qtUPdMO76s47idNqVbUM1r2f8O9-5mvTmExgTbshobO5leFO~e9pZYfMy2Ph19ClqGTdzXfHX4SGfTMHhMNcTyQyTIsINcz8s9Jw-Uog3mK~shvX6y-CaIg__";

export default function TitleScreen() {
  const { startQuiz } = useQuiz();
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal');
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30>(10);

  const handleStart = () => {
    startQuiz(difficulty, questionCount);
  };

  const difficultyOptions: { value: Difficulty; label: string; icon: typeof Zap; color: string }[] = [
    { value: 'Easy', label: 'EASY', icon: Zap, color: 'from-green-500 to-emerald-600' },
    { value: 'Normal', label: 'NORMAL', icon: Brain, color: 'from-blue-500 to-cyan-600' },
    { value: 'Hard', label: 'HARD', icon: Trophy, color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-7xl md:text-9xl font-bold text-primary mb-4 tracking-wider drop-shadow-[0_0_30px_rgba(255,210,63,0.5)]">
            QUIZ KING
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-medium">
            クイズ王への挑戦状
          </p>
        </div>

        {/* Settings Card */}
        <Card className="p-8 bg-card/90 backdrop-blur-md border-2 border-primary/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {/* Difficulty Selection */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center tracking-wide">
              難易度を選択
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficultyOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = difficulty === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setDifficulty(option.value)}
                    className={`
                      relative p-6 rounded-xl border-2 transition-all duration-300
                      ${isSelected 
                        ? 'border-primary bg-primary/20 scale-105 shadow-lg shadow-primary/50' 
                        : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card/80 hover:scale-102'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 rounded-full bg-gradient-to-br ${option.color}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-display text-2xl font-bold text-foreground">
                        {option.label}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 rounded-xl animate-glow-pulse pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center tracking-wide">
              問題数を選択
            </h2>
            <div className="flex gap-4 justify-center">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count as 10 | 20 | 30)}
                  className={`
                    px-8 py-4 rounded-lg font-digital text-2xl font-bold transition-all duration-300
                    ${questionCount === count
                      ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/50'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105'
                    }
                  `}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button
              onClick={handleStart}
              size="lg"
              className="font-display text-3xl px-12 py-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              START QUIZ
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-8 text-muted-foreground animate-in fade-in duration-700 delay-300">
          <p className="text-sm">
            一般教養から雑学まで、あなたの知識を試そう！
          </p>
        </div>
      </div>
    </div>
  );
}
