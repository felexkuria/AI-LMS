// AI Learning Hub Scripts
function toggleContent(id) {
    const content = document.getElementById(id);
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

function checkAnswer(questionId, answer) {
    const feedback = document.getElementById(`${questionId}-feedback`);
    let isCorrect = false;
    
    switch(questionId) {
        case 'q1':
            isCorrect = answer === 'supervised';
            break;
        case 'q2':
            isCorrect = answer === 'unsupervised';
            break;
        case 'q3':
            isCorrect = answer === 'reinforcement';
            break;
    }
    
    if (isCorrect) {
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = 'Try again!';
        feedback.className = 'feedback incorrect';
    }
}