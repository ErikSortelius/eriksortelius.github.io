// Data structure for link categories
const categories = [
  {
    name: "Google",
    links: [
      { name: "Search", url: "https://google.com", icon: "search" },
      { name: "Maps", url: "https://maps.google.com", icon: "map" },
      { name: "Drive", url: "https://drive.google.com", icon: "hard-drive" },
      { name: "Calendar", url: "https://calendar.google.com", icon: "calendar" }
    ]
  },
  {
    name: "Work",
    links: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "layers" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "Trello", url: "https://trello.com", icon: "trello" }
    ]
  },
  {
    name: "Fun",
    links: [
      { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
      { name: "Netflix", url: "https://netflix.com", icon: "film" },
      { name: "Spotify", url: "https://spotify.com", icon: "music" },
      { name: "Reddit", url: "https://reddit.com", icon: "message-circle" }
    ]
  },
  {
    name: "AI",
    links: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "message-square" },
      { name: "Hugging Face", url: "https://huggingface.co", icon: "git-merge" },
      { name: "Midjourney", url: "https://www.midjourney.com", icon: "image" },
      { name: "Kaggle", url: "https://kaggle.com", icon: "bar-chart" }
    ]
  },
  {
    name: "Art",
    links: [
      { name: "Behance", url: "https://behance.net", icon: "layers" },
      { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
      { name: "Pinterest", url: "https://pinterest.com", icon: "bookmark" },
      { name: "Figma", url: "https://figma.com", icon: "figma" }
    ]
  }
];

// Icon mappings - Simple SVG icons based on Lucide icons
const icons = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`,
  "hard-drive": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  trello: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
  film: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
  music: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  "message-circle": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
  "message-square": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  "git-merge": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
  "bar-chart": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
  dribbble: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>`,
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
  figma: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>`
};

// DOM elements
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const weekdayElement = document.querySelector('.weekday');
const weekNumberElement = document.querySelector('.week-number');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const dialRing = document.querySelector('.dial-ring');
const linksContainer = document.querySelector('.links-container');

// Utility functions
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function formatDate(date) {
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getWeekday(date) {
  return date.toLocaleDateString([], {
    weekday: 'long'
  });
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getCurrentHourAngle() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalHours = hours % 12 + minutes / 60;
  return (totalHours / 12) * 360;
}

function checkIsDayTime(current) {
  const hours = current.getHours();
  // Day is between 6 AM and 9 PM
  return hours >= 6 && hours < 21;
}

// Initialize and Update Clock
function updateClock() {
  const now = new Date();
  const timeString = formatTime(now);
  const dateString = formatDate(now);
  const weekdayString = getWeekday(now);
  const weekNumber = getWeekNumber(now);
  
  // Update display with smooth transitions
  updateTimeWithTransition(timeString);
  
  if (dateElement.textContent !== dateString) {
    dateElement.style.opacity = 0;
    dateElement.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      dateElement.textContent = dateString;
      dateElement.style.opacity = 1;
      dateElement.style.transform = 'translateY(0)';
    }, 300);
  }
  
  if (weekdayElement.textContent !== weekdayString) {
    weekdayElement.style.opacity = 0;
    weekdayElement.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      weekdayElement.textContent = weekdayString;
      weekdayElement.style.opacity = 1;
      weekdayElement.style.transform = 'translateY(0)';
    }, 300);
  }
  
  weekNumberElement.textContent = `Week ${weekNumber}`;
  
  // Update day/night dial
  updateDayNightDial(now);
}

// Update time with smooth digit transitions
function updateTimeWithTransition(newTimeString) {
  const currentTimeDigits = timeElement.textContent.split('');
  const newTimeDigits = newTimeString.split('');
  
  // Clear current time display
  timeElement.innerHTML = '';
  
  // Create span for each digit with transition effect
  newTimeDigits.forEach((digit, index) => {
    const digitSpan = document.createElement('span');
    digitSpan.textContent = digit;
    
    if (currentTimeDigits[index] !== digit) {
      digitSpan.style.opacity = 0;
      digitSpan.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        digitSpan.style.opacity = 1;
        digitSpan.style.transform = 'translateY(0)';
      }, 10);
    }
    
    timeElement.appendChild(digitSpan);
  });
}

// Day/Night dial updater
function updateDayNightDial(now) {
  // Rotate dial based on current hour
  const rotationAngle = getCurrentHourAngle();
  dialRing.style.transform = `rotate(${rotationAngle}deg)`;
  
  // Update sun/moon visibility based on time
  const isDay = checkIsDayTime(now);
  
  sunIcon.style.opacity = isDay ? 1 : 0;
  sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';
  
  moonIcon.style.opacity = isDay ? 0 : 1;
  moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
}

// Create link sections
function createLinkSections() {
  categories.forEach(category => {
    const section = document.createElement('div');
    section.className = 'link-section';
    
    const title = document.createElement('h2');
    title.className = `link-section-title ${category.name.toLowerCase()}`;
    title.textContent = category.name;
    
    const linkList = document.createElement('ul');
    linkList.className = 'link-list';
    
    category.links.forEach(link => {
      const linkItem = document.createElement('li');
      linkItem.className = 'link-item';
      
      const linkElement = document.createElement('a');
      linkElement.className = 'link';
      linkElement.href = link.url;
      
      const iconSpan = document.createElement('span');
      iconSpan.className = 'link-icon';
      iconSpan.innerHTML = icons[link.icon] || icons.bookmark;
      
      const linkText = document.createElement('span');
      linkText.textContent = link.name;
      
      linkElement.appendChild(iconSpan);
      linkElement.appendChild(linkText);
      linkItem.appendChild(linkElement);
      linkList.appendChild(linkItem);
    });
    
    section.appendChild(title);
    section.appendChild(linkList);
    linksContainer.appendChild(section);
  });
}

// Initialize the page
function init() {
  // Initial clock update
  updateClock();
  
  // Set up clock interval - update every second
  setInterval(updateClock, 1000);
  
  // Create link sections
  createLinkSections();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);