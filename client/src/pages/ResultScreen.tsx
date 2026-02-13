/* Game Show Studio Design: Results screen with rank celebration */
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, RotateCcw, Home } from 'lucide-react';

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FZRVAZBm0zmKvOjvs2SXSG/sandbox/DDbShjtF5PVHQwldT8j5mP-img-1_1771004416000_na1fn_cXVpei1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRlpSVkFaQm0wem1Ldk9qdnMyU1hTRy9zYW5kYm94L0REYlNoanRGNVBWSFF3bGRUOGo1bVAtaW1nLTFfMTc3MTAwNDQxNjAwMF9uYTFmbl9jWFZwZWkxb1pYSnZMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qfhjfJsn5U2~LRqbdB3~USORHwAyIbgVvZd0jZnCSqrBOyhISDCPNVwzxLwiTMOwqv4e~Nz1mY0p8g-rbI1krmYW1JbAOny3HkSukkJx~vBMM3hF4zWE2F~mWIT3zBHwpLwX1Wwk4QvyPlzZM4h4fPlOfM9ZHmVuQoH9yxS99GC9G8nRQDB104FMIZRJuzsR7AWw-TszdFadmDaxeaG-0Lz54ChCf2~qtUPdMO76s47idNqVbUM1r2f8O9-5mvTmExgTbshobO5leFO~e9pZYfMy2Ph19ClqGTdzXfHX4SGfTMHhMNcTyQyTIsINcz8s9Jw-Uog3mK~shvX6y-CaIg__";

const TROPHY_ICON = "https://private-us-east-1.manuscdn.com/sessionFile/FZRVAZBm0zmKvOjvs2SXSG/sandbox/DDbShjtF5PVHQwldT8j5mP_1771004430681_na1fn_cXVpei10cm9waHktaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRlpSVkFaQm0wem1Ldk9qdnMyU1hTRy9zYW5kYm94L0REYlNoanRGNVBWSFF3bGRUOGo1bVBfMTc3MTAwNDQzMDY4MV9uYTFmbl9jWFZwZWkxMGNtOXdhSGt0YVdOdmJnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QmJrzzp7TjbUdki1fF9XmaaSRmGD7P4VJFT11Cu74XaTZC8yB8pkOqtqQqAX5Q9QglcCJK24WrG~3i-Tsp-wVnlnvehsyc5kqi2GdAhgGkmJjfpV7OHtTZjuF1mx-lHIjbY65H3mxLoez7SysyF8BOX92Qdmb5NEGsRdI56lUGTfHaLC0odTY2B48lIzwzWvvDIUfH8D3VyGPCLqLQ5yDJ1h4hHzcPSuALLUtNhOKC9Dvhf4DKH1aVVSG8R3nk2oPi~DYO5TliBpQpLubFLdD1XoFALIjgInjSSUormnmWBHwu4nadHTkhZepJAzSJowBIwaigk3C8-ozadc~lfkVQ__";

export default function ResultScreen() {
  const { score, questions, settings, restartQuiz, goToHome } = useQuiz();

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine rank based on percentage
  const getRank = () => {
    if (percentage >= 90) return { rank: 'S', color: 'from-yellow-400 to-amber-500', message: '完璧！クイズ王の称号を授けます！' };
    if (percentage >= 75) return { rank: 'A', color: 'from-green-400 to-emerald-500', message: '素晴らしい！博識ですね！' };
    if (percentage >= 60) return { rank: 'B', color: 'from-blue-400 to-cyan-500', message: '良い成績です！' };
    if (percentage >= 40) return { rank: 'C', color: 'from-purple-400 to-violet-500', message: 'まずまずの結果です。' };
    return { rank: 'D', color: 'from-gray-400 to-slate-500', message: '次回は頑張りましょう！' };
  };

  const rankInfo = getRank();

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

      <div className="relative z-10 w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-primary mb-2 tracking-wider drop-shadow-[0_0_30px_rgba(255,210,63,0.5)]">
            RESULTS
          </h1>
          <p className="text-xl text-foreground/80">クイズ終了！</p>
        </div>

        {/* Results Card */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-2xl animate-in fade-in zoom-in-95 duration-700 delay-150">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src={TROPHY_ICON} 
                alt="Trophy" 
                className="w-32 h-32 md:w-40 md:h-40 animate-in zoom-in duration-700 delay-300"
              />
              {percentage >= 90 && (
                <div className="absolute inset-0 animate-glow-pulse" />
              )}
            </div>
          </div>

          {/* Rank Badge */}
          <div className="flex justify-center mb-8">
            <div className={`
              relative px-12 py-6 rounded-2xl bg-gradient-to-br ${rankInfo.color} 
              shadow-2xl animate-in zoom-in duration-700 delay-500
            `}>
              <span className="font-display text-8xl font-bold text-white drop-shadow-lg">
                {rankInfo.rank}
              </span>
              <div className="absolute inset-0 rounded-2xl animate-glow-pulse" />
            </div>
          </div>

          {/* Message */}
          <p className="text-center text-2xl font-bold text-foreground mb-8 animate-in fade-in duration-700 delay-700">
            {rankInfo.message}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-secondary/50 border-border text-center">
              <div className="font-display text-lg text-muted-foreground mb-2">SCORE</div>
              <div className="font-digital text-4xl font-bold text-primary">
                {score}/{totalQuestions}
              </div>
            </Card>

            <Card className="p-6 bg-secondary/50 border-border text-center">
              <div className="font-display text-lg text-muted-foreground mb-2">ACCURACY</div>
              <div className="font-digital text-4xl font-bold text-primary">
                {percentage}%
              </div>
            </Card>

            <Card className="p-6 bg-secondary/50 border-border text-center">
              <div className="font-display text-lg text-muted-foreground mb-2">DIFFICULTY</div>
              <div className="font-digital text-4xl font-bold text-primary">
                {settings.difficulty}
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={restartQuiz}
              size="lg"
              className="font-display text-2xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="mr-2 w-6 h-6" />
              RETRY
            </Button>

            <Button
              onClick={goToHome}
              size="lg"
              variant="outline"
              className="font-display text-2xl px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Home className="mr-2 w-6 h-6" />
              HOME
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
