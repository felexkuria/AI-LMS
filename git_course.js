// JavaScript for Git Course interactive features
document.addEventListener('DOMContentLoaded', function() {
  const courseTopics = document.querySelectorAll('#course-topics li');
  const contentDisplay = document.getElementById('content-display');
  const topicTitle = document.getElementById('topic-title');
  const lessonVideo = document.getElementById('lesson-video');
  const commandsContainer = document.getElementById('commands-container');
  const copyCommandsBtn = document.getElementById('copy-commands');
  const backToTopicsBtn = document.getElementById('back-to-topics');

  // Course content data - populate with your actual YouTube links and Git commands
  const courseData = {
    'git-fundamentals': {
      title: 'Git Fundamentals and Installation',
      videoUrl: 'https://www.youtube.com/embed/n9MUhWLvanc?si=9n0Xnv7ua2DtEdvQ&enablejsapi=1&origin=' + window.location.origin,
      commands: `# Installing Git
git --version
# On Windows: Download from https://git-scm.com/download/win
# On Mac: brew install git
# On Linux: sudo apt-get install git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --list`
    },
    'repositories': {
      title: 'Creating and Managing Repositories',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/username/repository.git

# Check repository status
git status

# Add files to staging area
git add filename.txt
git add .  # Add all files

# Commit changes
git commit -m "Descriptive commit message"

# View commit history
git log`
    },
    'branching': {
      title: 'Branching and Merging Strategies',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# List all branches
git branch

# Create a new branch
git branch new-feature

# Switch to a branch
git checkout new-feature

# Create and switch to a new branch
git checkout -b new-feature

# Merge a branch into current branch
git merge branch-name

# Delete a branch
git branch -d branch-name`
    },
    'merge-conflicts': {
      title: 'Resolving Merge Conflicts',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# When you encounter merge conflicts
# 1. Identify the conflicted files
git status

# 2. Open each file and look for conflict markers (<<<<<<, =======, >>>>>>>)
# 3. Edit the files to resolve the conflicts
# 4. Mark as resolved
git add resolved-file.txt

# 5. Complete the merge
git commit -m "Resolved merge conflict"

# If you want to abort a merge
git merge --abort`
    },
    'github-workflows': {
      title: 'GitHub Collaboration Workflows',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# Add a remote repository
git remote add origin https://github.com/username/repository.git

# Push changes to remote
git push -u origin main

# Fetch latest changes
git fetch origin

# Pull latest changes
git pull origin main

# View remotes
git remote -v`
    },
    'pull-requests': {
      title: 'Pull Requests and Code Reviews',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# Creating a pull request on GitHub:
# 1. Push your branch to GitHub
git push origin feature-branch

# 2. Go to GitHub and click "Compare & pull request"
# 3. Add a title and description
# 4. Click "Create pull request"

# After review, merge via GitHub UI or:
git checkout main
git pull origin main
git merge feature-branch
git push origin main`
    },
    'advanced-commands': {
      title: 'Advanced Git Commands and Techniques',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# Stashing changes
git stash save "Work in progress"
git stash list
git stash apply stash@{0}
git stash pop

# Interactive rebase
git rebase -i HEAD~3  # Rebase last 3 commits

# Cherry-picking
git cherry-pick commit-hash

# Reset
git reset --soft HEAD~1  # Undo last commit, keep changes
git reset --hard HEAD~1  # Undo last commit, discard changes

# Reflog
git reflog  # View history of HEAD changes`
    },
    'github-actions': {
      title: 'GitHub Actions and CI/CD Integration',
      videoUrl: 'https://www.youtube.com/embed/your-video-id?enablejsapi=1&origin=' + window.location.origin,
      commands: `# GitHub Actions workflow YAML example
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm ci
    - run: npm test

# Place this file in .github/workflows/ci.yml`
    }
  };

  // Add click event to each course topic
  courseTopics.forEach(topic => {
    topic.addEventListener('click', function() {
      const topicId = this.getAttribute('data-topic');
      const topicData = courseData[topicId];
      
      if (topicData) {
        // Update content display with topic data
        topicTitle.textContent = topicData.title;
        lessonVideo.src = topicData.videoUrl;
        lessonVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        lessonVideo.allowFullscreen = true;
        
        // Add Git commands with syntax highlighting
        commandsContainer.innerHTML = `<pre>${topicData.commands}</pre>`;
        
        // Show content display, hide course list
        contentDisplay.style.display = 'block';
      }
    });
  });

  // Copy Git commands to clipboard
  copyCommandsBtn.addEventListener('click', function() {
    const commands = commandsContainer.querySelector('pre').textContent;
    navigator.clipboard.writeText(commands).then(() => {
      // Show feedback that commands were copied
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });

  // Back to topics button
  backToTopicsBtn.addEventListener('click', function() {
    contentDisplay.style.display = 'none';
    lessonVideo.src = ''; // Stop video playback
  });
});
