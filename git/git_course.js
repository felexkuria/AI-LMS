// JavaScript for Git Course interactive features
document.addEventListener('DOMContentLoaded', function() {
  const courseTopics = document.querySelectorAll('#course-topics li');
  const contentDisplay = document.getElementById('content-display');
  const topicTitle = document.getElementById('topic-title');
  
  if (courseTopics && contentDisplay && topicTitle) {
    courseTopics.forEach(topic => {
      topic.addEventListener('click', function() {
        // Clear active state
        courseTopics.forEach(t => t.classList.remove('active'));
        
        // Set active state
        this.classList.add('active');
        
        // Update content
        const topicId = this.getAttribute('data-topic');
        const topicContent = document.getElementById(topicId);
        
        topicTitle.textContent = this.textContent;
        
        // Hide all content sections
        document.querySelectorAll('.topic-content').forEach(content => {
          content.classList.add('hidden');
        });
        
        // Show selected content
        if (topicContent) {
          topicContent.classList.remove('hidden');
        }
      });
    });
  }
  
  // Progress tracking
  const progressCheckboxes = document.querySelectorAll('.progress-checkbox');
  let completedItems = 0;
  
  if (progressCheckboxes) {
    // Load saved progress
    loadSavedProgress();
    
    progressCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          completedItems++;
        } else {
          completedItems--;
        }
        
        updateProgressIndicator();
        saveProgress();
      });
    });
  }
  
  function loadSavedProgress() {
    const savedProgress = localStorage.getItem('gitCourseProgress');
    if (savedProgress) {
      const checkedItems = JSON.parse(savedProgress);
      checkedItems.forEach(itemId => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
          checkbox.checked = true;
          completedItems++;
        }
      });
      
      updateProgressIndicator();
    }
  }
  
  function saveProgress() {
    const checkedItems = [];
    progressCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedItems.push(checkbox.id);
      }
    });
    
    localStorage.setItem('gitCourseProgress', JSON.stringify(checkedItems));
  }
  
  function updateProgressIndicator() {
    const progressPercent = Math.round((completedItems / progressCheckboxes.length) * 100);
    const progressText = document.querySelector('.progress-text');
    const progressRing = document.querySelector('.progress-ring circle:nth-child(2)');
    
    if (progressText && progressRing) {
      progressText.textContent = `${progressPercent}%`;
      
      const radius = progressRing.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      
      progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (progressPercent / 100) * circumference;
      progressRing.style.strokeDashoffset = offset;
    }
  }
  
  // Mobile menu toggle
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
});