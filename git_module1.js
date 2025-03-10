// Git Module 1 JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Add copy buttons to code blocks
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach((block) => {
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    
    // Append the button to the pre element
    block.appendChild(copyBtn);
    
    // Add event listener for copying
    copyBtn.addEventListener('click', function() {
      const codeElement = block.querySelector('code');
      const textToCopy = codeElement ? codeElement.textContent : block.textContent;
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Show success feedback
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          copyBtn.classList.add('bg-green-100', 'text-green-800');
          
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
            copyBtn.classList.remove('bg-green-100', 'text-green-800');
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          copyBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
          copyBtn.classList.add('bg-red-100', 'text-red-800');
          
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
            copyBtn.classList.remove('bg-red-100', 'text-red-800');
          }, 2000);
        });
    });
  });
  
  // Task checkboxes functionality with local storage
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  const markCompleteBtn = document.getElementById('markComplete');
  const moduleKey = 'git_module1_progress';
  
  // Load saved progress
  function loadSavedProgress() {
    const savedProgress = localStorage.getItem(moduleKey);
    if (savedProgress) {
      const checkedItems = JSON.parse(savedProgress);
      taskCheckboxes.forEach((checkbox) => {
        if (checkedItems.includes(checkbox.id)) {
          checkbox.checked = true;
        }
      });
      
      // Update progress indicator
      updateProgressIndicator();
    }
  }
  
  // Save progress
  function saveProgress() {
    const checkedBoxes = Array.from(taskCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id);
      
    localStorage.setItem(moduleKey, JSON.stringify(checkedBoxes));
    
    // Update progress indicator
    updateProgressIndicator();
  }
  
  // Update progress visualization
  function updateProgressIndicator() {
    const total = taskCheckboxes.length;
    const completed = Array.from(taskCheckboxes).filter(checkbox => checkbox.checked).length;
    const percentage = Math.round((completed / total) * 100);
    
    // Update the progress ring if it exists
    const progressCircle = document.querySelector('.progress-ring circle:nth-child(2)');
    const percentageText = document.querySelector('.progress-ring + span');
    
    if (progressCircle && percentageText) {
      const radius = progressCircle.getAttribute('r');
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;
      
      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = offset;
      percentageText.textContent = `${percentage}%`;
    }
  }
  
  // Add event listeners to checkboxes
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
  });
  
  // Mark module complete button
  if (markCompleteBtn) {
    markCompleteBtn.addEventListener('click', function() {
      // Check all boxes
      taskCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
      
      // Save progress
      saveProgress();
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-6 right-6 bg-green-600 text-white rounded-lg shadow-lg p-4 fade-in';
      successMessage.innerHTML = `
        <div class="flex items-center">
          <i class="fas fa-check-circle text-2xl mr-3"></i>
          <div>
            <p class="font-bold">Module Completed!</p>
            <p class="text-sm">Great job! Ready for Module 2?</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 3000);
    });
  }
  
  // Load saved progress on page load
  loadSavedProgress();
});