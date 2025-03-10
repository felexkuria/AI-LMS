// AI Learning Hub Scripts
function toggleContent(id) {
    const content = document.getElementById(id);
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

// Add copy functionality to all code blocks and insert YouTube video
document.addEventListener('DOMContentLoaded', function() {
    // Insert YouTube video after the title
    const pageTitle = document.querySelector('.text-4xl.font-bold.text-gray-900.mb-8');
    if(pageTitle) {
        const videoSection = document.createElement('div');
        videoSection.className = 'bg-white rounded-lg shadow-md p-6 mb-8';
        videoSection.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              Featured Video Tutorial
            </h2>
            <h3 class="text-lg text-gray-700 mb-3">
              GitHub Pages &amp; CI/CD Mastery: Automate Your Website Deployment in 15 Minutes
            </h3>
            <div class="video-container">
              <iframe 
                src="https://www.youtube.com/embed/U3ywm2bVZ3Q" 
                title="GitHub Pages &amp; CI/CD Mastery: Automate Your Website Deployment in 15 Minutes" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
        `;
        pageTitle.parentNode.insertBefore(videoSection, pageTitle.nextSibling);
    }
    // Find all code blocks (elements with class 'bg-blue-50 rounded-md')
    const codeBlocks = document.querySelectorAll('.bg-blue-50.rounded-md');
    
    codeBlocks.forEach((block, index) => {
        // Create copy button with clipboard icon
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
        copyButton.className = 'copy-btn';
        copyButton.title = 'Copy to clipboard';
        copyButton.dataset.blockId = 'code-block-' + index;
        
        // Position the button
        block.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.background = 'rgba(255, 255, 255, 0.8)';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.padding = '5px';
        
        // Add event listener for copy functionality
        copyButton.addEventListener('click', function() {
            const codeText = block.innerText.replace('Copy', ''); // Remove "Copy" text from copied content
            navigator.clipboard.writeText(codeText)
                .then(() => {
                    // Show "Copied" feedback briefly
                    const originalSvg = copyButton.innerHTML;
                    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/></svg> Copied!';
                    setTimeout(() => {
                        copyButton.innerHTML = originalSvg;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
        
        // Append the button to the code block
        block.appendChild(copyButton);
    });
});

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