document.addEventListener('DOMContentLoaded', () => {
    const questionsDiv = document.getElementById('questions');
    const form = document.getElementById('quizForm');
    const result = document.getElementById('result');
    const dropdownButton = document.getElementById('dropdownMenuButton');
    let currentDifficulty = 'easy'; // Default

    // Function to generate a random math problem
    function generateProblem(difficulty) {
        let range;
        switch (difficulty) {
            case 'easy':
                range = 25;
                break;
            case 'medium':
                range = 100;
                break;
            case 'hard':
                range = 500;
                break;
            case 'extra hard':
                range = 1000;
                break;
            default:
                range = 10;
        }
        const num1 = Math.floor(Math.random() * range) + 1;
        const num2 = Math.floor(Math.random() * range) + 1;

        return {
            num1: Math.max(num1, num2),  // Ensure larger number comes first for subtraction
            num2: Math.min(num1, num2),
            answer: (Math.max(num1, num2) + Math.min(num1, num2))
        };
    }

    // Generate and display questions
    function generateQuestions() {
        questionsDiv.innerHTML = '';
        const problems = [];
        for (let i = 1; i <= 10; i++) {
            const problem = generateProblem(currentDifficulty);
            problems.push(problem);
            questionsDiv.innerHTML += `
            <div class="col">
                <div id="card${i}" class="card">
                <div class="card-body">
                    <h5 class="card-title">Question ${i}</h5>
                    <div class="input-group">
                        <span class="input-group-text">${problem.num1} + ${problem.num2} =</span>
                        <input type="number" min="0" class="form-control" id="q${i}" name="q${i}" required>
                    </div>    
                </div>
            </div>
        `;
        }
        return problems;
    }

    let problems = generateQuestions();

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault;
            currentDifficulty = e.target.id;
            dropdownButton.textContent = e.target.textContent;
            problems = generateQuestions();
        });
    });

    // Check Answers
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0;
        let alert = "";
        const inputs = form.querySelectorAll('input[type="number"]');
        inputs.forEach((input, index) => {
            const userAnswer = parseInt(input.value);
            const card = document.getElementById(`card${index + 1}`);
            if (userAnswer === problems[index].answer) {
                score++
                card.className = "card text-white bg-success";
            } else {
                card.className = "card text-white bg-danger";
            }
        });
        if (score >= 7) {
            alert = "alert alert-success";
        } else if (score < 7 && score >= 5) {
            alert = "alert alert-warning";
        } else if (score < 5) {
            alert = "alert alert-danger";
        }
        result.innerHTML = `<div class="${alert}" role="alert">
            You got ${score} out of 10 correct!
        </div>`;
        window.scrollTo(0, document.body.scrollHeight);
    });
});