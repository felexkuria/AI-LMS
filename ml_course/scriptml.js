// JavaScript code for ML course page
// Add any interactive features here

// Stepper function for navigating between sections
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('.section');
    
    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'section-navigator';
    navContainer.style.position = 'fixed';
    navContainer.style.bottom = '20px';
    navContainer.style.right = '20px';
    navContainer.style.backgroundColor = '#f0f0f0';
    navContainer.style.padding = '10px';
    navContainer.style.borderRadius = '5px';
    navContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    navContainer.style.zIndex = '1000';
    
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&larr; Previous';
    prevButton.style.marginRight = '10px';
    prevButton.style.padding = '8px 16px';
    prevButton.style.cursor = 'pointer';
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next &rarr;';
    nextButton.style.padding = '8px 16px';
    nextButton.style.cursor = 'pointer';
    
    // Add counter display
    const counter = document.createElement('span');
    counter.style.margin = '0 15px';
    counter.style.fontWeight = 'bold';
    
    // Add buttons to container
    navContainer.appendChild(prevButton);
    navContainer.appendChild(counter);
    navContainer.appendChild(nextButton);
    
    // Add container to body
    document.body.appendChild(navContainer);
    
    // Initialize current section index
    let currentSectionIndex = 0;
    
    // Function to update display
    function updateDisplay() {
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show current section
        sections[currentSectionIndex].style.display = 'block';
        
        // Update counter
        counter.textContent = `${currentSectionIndex + 1} / ${sections.length}`;
        
        // Update button states
        prevButton.disabled = currentSectionIndex === 0;
        prevButton.style.opacity = currentSectionIndex === 0 ? '0.5' : '1';
        
        nextButton.disabled = currentSectionIndex === sections.length - 1;
        nextButton.style.opacity = currentSectionIndex === sections.length - 1 ? '0.5' : '1';
        
        // Scroll to top of the section
        window.scrollTo({
            top: sections[currentSectionIndex].offsetTop - 20,
            behavior: 'smooth'
        });
    }
    
    // Add event listeners
    prevButton.addEventListener('click', function() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            updateDisplay();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            updateDisplay();
        }
    });
    
    // Initialize the display
    updateDisplay();
});