// Quiz App - Vanilla JavaScript

class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.settings = {
            difficulty: 'normal',
            questionCount: 10
        };
        this.selectedQuestions = [];
        
        this.init();
    }
    
    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
    }
    
    async loadQuestions() {
        try {
            const response = await fetch('questions.json');
            const data = await response.json();
            this.questions = data.questions;
        } catch (error) {
            console.error('Failed to load questions:', error);
            alert('問題データの読み込みに失敗しました。');
        }
    }
    
    setupEventListeners() {
        // Title screen
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.settings.difficulty = e.target.value;
        });
        document.getElementById('question-count').addEventListener('change', (e) => {
            this.settings.questionCount = parseInt(e.target.value);
        });
        
        // Quiz screen
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        
        // Result screen
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }
    
    startQuiz() {
        // Filter questions by difficulty
        const filteredQuestions = this.questions.filter(q => 
            q.difficulty.toLowerCase() === this.settings.difficulty.toLowerCase()
        );
        
        // Shuffle and select questions
        this.selectedQuestions = this.shuffleArray(filteredQuestions)
            .slice(0, this.settings.questionCount);
        
        if (this.selectedQuestions.length === 0) {
            alert('選択した難易度の問題が見つかりません。');
            return;
        }
        
        // Reset state
        this.currentQuestionIndex = 0;
        this.score = 0;
        
        // Show quiz screen
        this.showScreen('quiz-screen');
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Update header
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.selectedQuestions.length;
        document.getElementById('score').textContent = this.score;
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.selectedQuestions.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        
        // Update question
        document.getElementById('category').textContent = question.category;
        document.getElementById('question-text').textContent = question.question;
        
        // Display choices
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';
        
        const labels = ['A', 'B', 'C', 'D'];
        question.choices.forEach((choice, index) => {
            const choiceEl = document.createElement('div');
            choiceEl.className = 'choice';
            choiceEl.innerHTML = `
                <span class="choice-label">${labels[index]}</span>
                <span class="choice-text">${choice}</span>
            `;
            choiceEl.addEventListener('click', () => this.selectAnswer(index));
            choicesContainer.appendChild(choiceEl);
        });
        
        // Hide explanation and next button
        document.getElementById('explanation').classList.add('hidden');
        document.getElementById('next-btn').classList.add('hidden');
    }
    
    selectAnswer(selectedIndex) {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        const choices = document.querySelectorAll('.choice');
        
        // Disable all choices
        choices.forEach(choice => choice.classList.add('disabled'));
        
        // Check if correct
        const isCorrect = selectedIndex === question.answerIndex;
        
        if (isCorrect) {
            this.score++;
            choices[selectedIndex].classList.add('correct');
            document.getElementById('score').textContent = this.score;
        } else {
            choices[selectedIndex].classList.add('incorrect');
            choices[question.answerIndex].classList.add('correct');
        }
        
        // Show explanation
        const explanationEl = document.getElementById('explanation');
        const explanationText = document.getElementById('explanation-text');
        explanationText.textContent = question.explanation;
        explanationEl.classList.remove('hidden');
        
        // Show next button or finish
        const nextBtn = document.getElementById('next-btn');
        if (this.currentQuestionIndex < this.selectedQuestions.length - 1) {
            nextBtn.textContent = 'NEXT QUESTION';
        } else {
            nextBtn.textContent = 'VIEW RESULTS';
        }
        nextBtn.classList.remove('hidden');
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.selectedQuestions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        const totalQuestions = this.selectedQuestions.length;
        const accuracy = Math.round((this.score / totalQuestions) * 100);
        
        // Calculate rank
        let rank = 'C';
        if (accuracy >= 90) rank = 'S';
        else if (accuracy >= 80) rank = 'A';
        else if (accuracy >= 70) rank = 'B';
        
        // Update result screen
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-total').textContent = totalQuestions;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('rank').textContent = rank;
        
        // Show result screen
        this.showScreen('result-screen');
    }
    
    restart() {
        this.showScreen('title-screen');
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
