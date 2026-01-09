// Note: categories, CLOCK_CONFIG, icons, WEATHER_CONFIG, and weatherIconMap are loaded from config.js

// Animation state
let initialAnimationComplete = false;

// DOM elements
const clock1TimeElement = document.getElementById('clock1Time');
const clock2TimeElement = document.getElementById('clock2Time');
const clock1LabelElement = document.getElementById('clock1Label');
const clock2LabelElement = document.getElementById('clock2Label');
const dateElement = document.querySelector('.date');
const weekdayElement = document.querySelector('.weekday');
const weekNumberElement = document.querySelector('.week-number');

// Dual dial elements
const dial1 = document.getElementById('dial1');
const dial2 = document.getElementById('dial2');
const sunIcon1 = document.getElementById('sunIcon1');
const moonIcon1 = document.getElementById('moonIcon1');
const sunIcon2 = document.getElementById('sunIcon2');
const moonIcon2 = document.getElementById('moonIcon2');
const dialRing1 = dial1?.querySelector('.dial-ring');
const dialRing2 = dial2?.querySelector('.dial-ring');
const dialMarker1 = dial1?.querySelector('.dial-marker');
const dialMarker2 = dial2?.querySelector('.dial-marker');

const linksContainer = document.querySelector('.links-container');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

// Stock elements
const stockWidget = document.getElementById('stockWidget');
const stockSymbolElement = document.getElementById('stockSymbol');
const stockPriceElement = document.getElementById('stockPrice');
const stockChangeElement = document.getElementById('stockChange');

// Weather elements
const weatherContainer = document.querySelector('.weather-container');
const weatherIcon = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feelsLike');
const weatherConditionElement = document.getElementById('weatherCondition');

// Stock functions
function fetchStockData() {
  if (!stockWidget) return;
  
  // Use config symbol
  const symbol = STOCK_CONFIG.symbol || 'GRANGX.ST';
  
  // Check cache
  const cachedStock = getCachedStockData();
  if (cachedStock) {
    updateStockUI(cachedStock);
    return;
  }
  
  // CORS Proxy logic to fetch simplified Yahoo Finance Data
  // We use query1.finance.yahoo.com/v8/finance/chart/SYMBOL
  const proxyUrl = 'https://corsproxy.io/?';
  const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
  
  console.log(`📈 Fetching stock data for ${symbol} via proxy...`);

  fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => {
      if (!response.ok) throw new Error('Stock Proxy API Error');
      return response.json();
    })
    .then(data => {
      // Parse Yahoo Finance Response
      try {
        const result = data.chart.result[0];
        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        
        // Calculate Change
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        const stockData = {
          symbol: symbol,
          price: currentPrice,
          changePercent: changePercent,
          timestamp: Date.now()
        };
        
        cacheStockData(stockData);
        updateStockUI(stockData);
      } catch (e) {
        throw new Error('Invalid Yahoo Data Structure');
      }
    })
    .catch(err => {
      console.error('Stock fetch failed:', err);
      // Fallback UI or stay hidden
      if (stockPriceElement) stockPriceElement.textContent = '--.--';
      if (stockChangeElement) stockChangeElement.textContent = '--%';
    });
}

function updateStockUI(data) {
  if (!stockSymbolElement || !stockPriceElement || !stockChangeElement) return;
  
  stockSymbolElement.textContent = data.symbol;
  stockPriceElement.textContent = data.price.toFixed(2);
  
  const change = data.changePercent;
  const sign = change >= 0 ? '+' : '';
  stockChangeElement.textContent = `${sign}${change.toFixed(2)}%`;
  
  // Update classes for color
  stockChangeElement.classList.remove('positive', 'negative');
  if (change >= 0) {
    stockChangeElement.classList.add('positive');
  } else {
    stockChangeElement.classList.add('negative');
  }
}

function cacheStockData(data) {
  try {
    localStorage.setItem(`stock_cache_${data.symbol}`, JSON.stringify(data));
  } catch (e) { console.error('Cache error', e); }
}

function getCachedStockData() {
  try {
    const symbol = STOCK_CONFIG.symbol;
    const raw = localStorage.getItem(`stock_cache_${symbol}`);
    if (!raw) return null;
    
    const data = JSON.parse(raw);
    const age = Date.now() - data.timestamp;
    
    if (age > STOCK_CONFIG.cacheTimeMs) {
      console.log('Stock cache expired');
      return null;
    }
    return data;
  } catch(e) { return null; }
}

// Location caching functions
function cacheLocationData(coords) {
  try {
    const locationData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now()
    };
    localStorage.setItem(WEATHER_CONFIG.locationCacheKey, JSON.stringify(locationData));
    console.log('Location cached successfully:', coords);
  } catch (error) {
    console.error('Error caching location data:', error);
  }
}

function getCachedLocationData() {
  try {
    const cachedItem = localStorage.getItem(WEATHER_CONFIG.locationCacheKey);
    if (!cachedItem) return null;

    const locationData = JSON.parse(cachedItem);

    // Check if cache has expired
    if (Date.now() - locationData.timestamp > WEATHER_CONFIG.cacheTimeMs) {
      console.log('Location cache expired, refreshing...');
      localStorage.removeItem(WEATHER_CONFIG.locationCacheKey);
      return null;
    }

    console.log('Using cached location:', locationData);
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  } catch (error) {
    console.error('Error getting cached location data:', error);
    return null;
  }
}

// Geolocation function - moved here before weather functions
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60 * 60 * 1000 // 1 hour
      }
    );
  });
}

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

/**
 * Formats time for a specific timezone or local time
 * @param {string} timezone - IANA timezone identifier (e.g., 'Europe/Stockholm') or null for local
 * @returns {string} Formatted time string (HH:MM)
 */
function formatTimeForTimezone(timezone) {
  const now = new Date();
  if (!timezone) {
    // Return local time
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone
  });
}

function getCurrentHourAngleForTimezone(timezone) {
  const now = new Date();
  let timeInTimezone;
  
  if (!timezone) {
    // Use local time
    timeInTimezone = now;
  } else {
    timeInTimezone = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
  }
  
  const hours = timeInTimezone.getHours();
  const minutes = timeInTimezone.getMinutes();
  const totalHours = hours % 12 + minutes / 60;
  return (totalHours / 12) * 360;
}

function checkIsDayTimeForTimezone(timezone) {
  const now = new Date();
  let timeInTimezone;
  
  if (!timezone) {
    // Use local time
    timeInTimezone = now;
  } else {
    timeInTimezone = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
  }
  
  const hours = timeInTimezone.getHours();
  // Fixed Day Logic: Day is between 6 AM and 9 PM
  return hours >= 6 && hours < 21;
}

// Helper to update clock label with country flag
function updateClockLabelWithFlag(element, labelText, countryCode) {
  if (!element) return;
  
  element.innerHTML = '';
  element.classList.add('with-flag');
  
  if (countryCode) {
    const flagImg = document.createElement('img');
    flagImg.src = `https://flagcdn.com/h24/${countryCode.toLowerCase()}.png`;
    flagImg.alt = countryCode;
    flagImg.className = 'country-flag';
    // Add small delay to loading to prevent layout shifts if possible, or just standard load
    element.appendChild(flagImg);
  }
  
  const textSpan = document.createElement('span');
  textSpan.textContent = labelText;
  element.appendChild(textSpan);
}

// Helper to update a single dial based on timezone and DOM elements
function updateSingleDial(dialRing, sunIcon, moonIcon, timezone) {
  if (!dialRing || !sunIcon || !moonIcon) return;

  const rotationAngle = getCurrentHourAngleForTimezone(timezone);
  const isDay = checkIsDayTimeForTimezone(timezone);

  dialRing.style.transform = `rotate(${rotationAngle}deg)`;

  sunIcon.style.opacity = isDay ? 1 : 0;
  sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';
  moonIcon.style.opacity = isDay ? 0 : 1;
  moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
}

// Update day/night dials for both timezones
function updateDayNightDials() {
  // Update dial 1 (Sweden timezone)
  updateSingleDial(dialRing1, sunIcon1, moonIcon1, CLOCK_CONFIG.clock1.timezone);

  // Update dial 2 (local time or configured timezone)
  const clock2Timezone = CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone;
  updateSingleDial(dialRing2, sunIcon2, moonIcon2, clock2Timezone);
}

// Initialize and Update Clocks
function updateClock() {
  const now = new Date();
  
  // Get times for both configured timezones/local
  const clock1TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  const clock2TimeString = CLOCK_CONFIG.clock2.useLocalTime ? 
    formatTimeForTimezone(null) : 
    formatTimeForTimezone(CLOCK_CONFIG.clock2.timezone);
  
  const dateString = formatDate(now);
  const weekdayString = getWeekday(now);
  const weekNumber = getWeekNumber(now);

  // Update both clocks with smooth transitions
  updateTimeWithTransition(clock1TimeString, clock1TimeElement);
  updateTimeWithTransition(clock2TimeString, clock2TimeElement);

  if (dateElement && dateElement.textContent !== dateString) {
    dateElement.style.opacity = 0;
    dateElement.style.transform = 'translateY(8px)';

    requestAnimationFrame(() => {
      dateElement.textContent = dateString;
      // Force reflow
      dateElement.offsetHeight;
      dateElement.style.opacity = 1;
      dateElement.style.transform = 'translateY(0)';
    });
  }

  if (weekdayElement && weekdayElement.textContent !== weekdayString) {
    weekdayElement.style.opacity = 0;
    weekdayElement.style.transform = 'translateY(8px)';

    requestAnimationFrame(() => {
      weekdayElement.textContent = weekdayString;
      // Force reflow
      weekdayElement.offsetHeight;
      weekdayElement.style.opacity = 1;
      weekdayElement.style.transform = 'translateY(0)';
    });
  }

  if (weekNumberElement) {
    weekNumberElement.textContent = `Week ${weekNumber}`;
  }

  // Update dual day/night dials
  updateDayNightDials();
}

// Update time with smooth digit transitions
function updateTimeWithTransition(newTimeString, timeElement) {
  if (!timeElement) return;
  
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

      requestAnimationFrame(() => {
        // Force reflow
        digitSpan.offsetHeight;
        digitSpan.style.opacity = 1;
        digitSpan.style.transform = 'translateY(0)';
      });
    }

    timeElement.appendChild(digitSpan);
  });
}

// Create link sections
function createLinkSections() {
  // Add null check for linksContainer
  if (!linksContainer) {
    console.error('Links container element not found');
    return;
  }
  
  categories.forEach((category, index) => {
    const section = document.createElement('div');
    section.className = 'link-section';
    
    // Apply initial styles for animation
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
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
    
    // Animate each section with a staggered delay
    setTimeout(() => {
      requestAnimationFrame(() => {
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      });
    }, 100 * index); // Stagger the animations
  });
}

// Handle search logic
function handleSearch(e) {
  e.preventDefault();
  
  const query = searchInput.value.trim();
  if (!query) return;

  const parts = query.split(' ');
  const command = parts[0].toLowerCase();
  
  if (SEARCH_COMMANDS[command]) {
    const searchProvider = SEARCH_COMMANDS[command];
    const actualQuery = query.substring(command.length).trim();
    
    if (actualQuery) {
      window.location.href = searchProvider.url + encodeURIComponent(actualQuery);
    } else {
       // Revert to standard google search if no query text provided
       window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  } else {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
}

function updateSearchVisuals() {
  const query = searchInput.value;
  const parts = query.split(' ');
  const command = parts[0].toLowerCase();
  const searchIcon = document.querySelector('.search-icon');
  
  if (!searchIcon) return;

  // Visual cue triggers when a valid command is followed by space
  if (query.length > 0 && SEARCH_COMMANDS[command] && (query.indexOf(' ') === command.length)) {
    const provider = SEARCH_COMMANDS[command];
    searchIcon.innerHTML = icons[provider.icon] || icons.search;
    searchIcon.classList.add('active-command'); // Could add a class for extra styling
    searchInput.placeholder = `Search ${provider.label}...`;
  } else {
    // Reset to default
    if (searchIcon.innerHTML !== icons.search) {
       searchIcon.innerHTML = icons.search;
       searchIcon.classList.remove('active-command'); 
       searchInput.placeholder = 'Google...';
    }
  }
}

// Handle search input focus
function setupSearchInput() {
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  if (searchInput) {
    // Generate tooltip from config
    const shortcuts = Object.entries(SEARCH_COMMANDS)
      .map(([key, cmd]) => `'${key} ' for ${cmd.label}`)
      .join(', ');
    searchInput.title = `Shortcuts: ${shortcuts}`;

    searchInput.addEventListener('input', updateSearchVisuals);
    
    // Auto focus on page load after a short delay to allow transitions to complete
    setTimeout(() => {
      searchInput.focus();
    }, 500);
  }
} // End setupSearchInput

// Weather functions - restructured for better flow
function setupWeather() {
  // Show placeholder immediately
  showWeatherPlaceholder();
  
  // Then fetch weather data
  const deferWeatherLoad = window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1000));
  
  deferWeatherLoad(() => {
    initializeWeatherWithLocation(false); // Always fetch fresh
  });

  // Add event listener to weather icon for manual refresh
  if (weatherIcon) {
    weatherIcon.addEventListener('click', () => {
      // Manual refresh
      initializeWeatherWithLocation(false);
    });
  }
}

function showWeatherPlaceholder() {
  if (weatherIcon) weatherIcon.innerHTML = icons['cloud'];
  if (temperatureElement) temperatureElement.textContent = '--°';
  if (feelsLikeElement) feelsLikeElement.textContent = 'Realfeel: --°';
  if (weatherConditionElement) weatherConditionElement.textContent = 'Loading...';
}

// Unified location determination flow used both on startup and manual refresh
function initializeWeatherWithLocation(quietMode = false) {
  // Step 1: Try to get location using the secure cache -> fetch -> failsafe flow
  determineUserLocation()
    .then(coords => {
      console.log('Location determined:', coords);
      // Step 2: Use the determined location to fetch weather (always fresh)
      fetchWeatherData(true, quietMode, coords); // Always force refresh
    })
    .catch(error => {
      console.error('Failed to determine location:', error);
      if (!quietMode) {
        displayWeatherError();
      }
    });
}

// Secure location determination: cache -> geolocation -> Stockholm failsafe
function determineUserLocation() {
  return new Promise((resolve, reject) => {
    // Step 1: Check for cached location coordinates
    const cachedLocation = getCachedLocationData();
    
    if (cachedLocation) {
      console.log('Using cached location');
      resolve(cachedLocation);
      return;
    }
    
    // Step 2: No cached location, try geolocation if enabled
    if (WEATHER_CONFIG.useGeolocation) {
      console.log('No cached location, requesting geolocation');
      getUserLocation()
        .then(coords => {
          // Cache the coordinates for future use
          cacheLocationData(coords);
          resolve(coords);
        })
        .catch(error => {
          console.warn('Geolocation failed, using Stockholm failsafe:', error);
          // Step 3: Fallback to Stockholm coordinates
          const fallbackCoords = {
            latitude: WEATHER_CONFIG.defaultLat,
            longitude: WEATHER_CONFIG.defaultLon
          };
          resolve(fallbackCoords);
        });
    } else {
      // Step 3: Geolocation disabled, use Stockholm coordinates
      console.log('Geolocation disabled, using Stockholm failsafe');
      const defaultCoords = {
        latitude: WEATHER_CONFIG.defaultLat,
        longitude: WEATHER_CONFIG.defaultLon
      };
      resolve(defaultCoords);
    }
  });
}

function fetchWeatherData(forceRefresh = false, quietMode = false, coordinates = null) {
  // We should always have coordinates by this point from determineUserLocation
  if (!coordinates) {
    console.error('fetchWeatherData called without coordinates');
    if (!quietMode) {
      displayWeatherError();
    }
    return;
  }

  // Always fetch fresh weather data - no caching
  // Show loading state (unless in quiet mode)
  if (weatherIcon && !quietMode) {
    weatherIcon.innerHTML = `<div class="weather-loader"></div>`;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${WEATHER_CONFIG.units}&appid=${WEATHER_CONFIG.apiKey}`;

  console.log(`🌤️ Fetching fresh weather data at ${new Date().toLocaleString()}`);
  console.log(`📍 Location: ${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`✅ Fresh weather data received at ${new Date().toLocaleString()}`);
      console.log(`🌡️ Temperature: ${Math.round(data.main.temp)}°C (feels like ${Math.round(data.main.feels_like)}°C)`);
      console.log(`☁️ Condition: ${data.weather[0].description}`);
      
      // Just display the data - no caching
      displayWeatherData(data, false);
    })
    .catch(error => {
      console.error(`❌ Weather fetch failed at ${new Date().toLocaleString()}:`, error);
      if (!quietMode) {
        displayWeatherError();
      }
    });
}

// New function to set temperature gradient
function setTemperatureGradient(temperature) {
  if (!weatherIcon) return;
  
  // Updated temperature ranges
  // Freezing: below 0°C
  // Cold: 0°C to 10°C
  // Mild: 10°C to 20°C
  // Warm: 20°C to 28°C
  // Hot: 28°C to 32°C
  // Very Hot: 32°C to 39°C
  // Scorching: above 39°C
  let color;
  let gradient;
  
  if (temperature < 0) {
    gradient = 'linear-gradient(135deg, var(--temp-freezing-1), var(--temp-freezing-2))';
    color = 'var(--blue-300)';
  } else if (temperature < 10) {
    gradient = 'linear-gradient(135deg, var(--temp-cold-1), var(--temp-cold-2))';
    color = 'var(--blue-300)';
  } else if (temperature < 20) {
    gradient = 'linear-gradient(135deg, var(--temp-mild-1), var(--temp-mild-2))';
    color = 'var(--green-300)';
  } else if (temperature < 28) {
    gradient = 'linear-gradient(135deg, var(--temp-warm-1), var(--temp-warm-2))';
    color = 'var(--amber-300)';
  } else if (temperature < 32) {
    gradient = 'linear-gradient(135deg, var(--temp-hot-1), var(--temp-hot-2))';
    color = 'var(--orange-300)';
  } else if (temperature < 39) {
    gradient = 'linear-gradient(135deg, var(--temp-very-hot-1), var(--temp-very-hot-2))';
    color = 'var(--red-300)';
  } else {
    gradient = 'linear-gradient(135deg, var(--temp-scorching-1), var(--temp-scorching-2))';
    color = 'var(--purple-300)'; // Using purple for scorching temperatures
  }
  
  // Set the icon color
  weatherIcon.style.color = color;
  
  // Also set the temperature text color to match
  if (temperatureElement) {
    temperatureElement.style.color = color;
  }
  
  // Apply the gradient to the ::after pseudo-element
  const styleElem = document.createElement('style');
  styleElem.textContent = `.weather-icon::after { background: ${gradient}; }`;
  
  // Remove any previous custom styles
  const oldStyle = document.getElementById('weather-gradient-style');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  // Add the new style
  styleElem.id = 'weather-gradient-style';
  document.head.appendChild(styleElem);
}

function displayWeatherData(data, fromCache = false) {
  try {
    // Get icon from mapping or use cloud as fallback
    const iconCode = data.weather[0].icon || '03d';
    const iconName = weatherIconMap[iconCode] || 'cloud';

    // Get temperature and round to nearest whole number
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);

    // Get location name for tooltips
    const locationTooltip = `${data.name}, ${data.sys.country}`;

    console.log(`🔄 Weather UI updated at ${new Date().toLocaleString()}`);
    console.log(`📊 Displayed: ${temperature}°C, ${data.weather[0].description}, ${iconName} icon`);

    // Update UI
    if (weatherIcon) weatherIcon.innerHTML = icons[iconName];
    if (temperatureElement) temperatureElement.textContent = `${temperature}°`;
    if (feelsLikeElement) {
      feelsLikeElement.textContent = `Realfeel: ${feelsLike}°`;
    }
    
    // Update "Current Location" label to actual city name and add tooltip
    if (clock2LabelElement && CLOCK_CONFIG.clock2.useLocalTime) {
      let city = data.name ? data.name.toUpperCase() : '';
      
      // Truncate overly long city names
      if (city.length > 16) {
        city = city.substring(0, 14) + '..';
      }
      
      const country = data.sys.country ? data.sys.country : '';
      // We already show the flag, so we just need the city name
      const labelText = city || '';
      
      if (labelText) {
        updateClockLabelWithFlag(clock2LabelElement, labelText, country);
      }
      
      clock2LabelElement.title = locationTooltip;
      clock2LabelElement.style.cursor = 'help'; // Visual cue that hover has info
    }

    // Set the temperature gradient based on "feels like" temperature
    setTemperatureGradient(feelsLike);
    
    if (weatherConditionElement) {
      // Capitalize first letter of each word
      const description = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      weatherConditionElement.textContent = description;
      weatherConditionElement.title = locationTooltip; // Add tooltip here too
    }

    // Don't manipulate opacity here - let the entrance animation handle it
    // for the initial load. Only handle visibility.
    if (weatherContainer && weatherContainer.style.visibility === 'hidden') {
      weatherContainer.style.visibility = 'visible';
    } else if (!initialAnimationComplete && weatherContainer) {
      // Don't interfere with the initial animation
    } else if (weatherContainer && !fromCache) {
      // If this is a refresh after initial load, add the update animation
      weatherContainer.classList.add('weather-updated');
      setTimeout(() => {
        weatherContainer.classList.remove('weather-updated');
      }, 1000);
    }

    // Note: Dial updates are now handled strictly by time in updateClock(),
    // completely independent of weather data.
  } catch (error) {
    console.error('Error parsing weather data:', error);
    displayWeatherError();
  }
}

function displayWeatherError() {
  if (weatherIcon) {
    weatherIcon.innerHTML = icons['cloud'];
    const styleElem = document.createElement('style');
    styleElem.textContent = `.weather-icon::after { background: linear-gradient(135deg, var(--temp-mild-1), var(--temp-mild-2)); }`;
    styleElem.id = 'weather-gradient-style';
    
    const oldStyle = document.getElementById('weather-gradient-style');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    document.head.appendChild(styleElem);
    
    // Set icon and temperature text color
    const color = 'var(--text-color-dim)';
    weatherIcon.style.color = color;
    if (temperatureElement) {
      temperatureElement.style.color = color;
    }
  }
  
  if (temperatureElement) temperatureElement.textContent = '--°';
  if (feelsLikeElement) feelsLikeElement.textContent = 'Realfeel: --°';
  if (weatherConditionElement) weatherConditionElement.textContent = 'Weather Unavailable';

  // Revert label to fallback on error
  if (clock2LabelElement && CLOCK_CONFIG.clock2.useLocalTime) {
    updateClockLabelWithFlag(clock2LabelElement, CLOCK_CONFIG.clock2.label, null);
    clock2LabelElement.title = '';
    clock2LabelElement.style.cursor = 'inherit';
  }
}

// Clean and focused entrance animations
function performEntranceAnimations() {
  const rotationAngle1 = getCurrentHourAngleForTimezone(CLOCK_CONFIG.clock1.timezone);
  const clock2Timezone = CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone;
  const rotationAngle2 = getCurrentHourAngleForTimezone(clock2Timezone);
  const isDay1 = checkIsDayTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  const isDay2 = checkIsDayTimeForTimezone(clock2Timezone);
  
  // Set initial states for both dials
  if (dialRing1) {
    dialRing1.style.transition = 'none';
    dialRing1.style.transform = 'rotate(0deg)';
  }
  
  if (dialRing2) {
    dialRing2.style.transition = 'none';
    dialRing2.style.transform = 'rotate(0deg)';
  }
  
  if (dialMarker1) {
    dialMarker1.style.transition = 'none';
    dialMarker1.style.opacity = '0';
    dialMarker1.style.transform = 'translate(-50%, -50%) scale(0)';
  }
  
  if (dialMarker2) {
    dialMarker2.style.transition = 'none';
    dialMarker2.style.opacity = '0';
    dialMarker2.style.transform = 'translate(-50%, -50%) scale(0)';
  }
  
  // Set initial states for sun/moon icons
  if (sunIcon1) {
    sunIcon1.style.transition = 'none';
    sunIcon1.style.opacity = '0';
    sunIcon1.style.transform = `rotate(${isDay1 ? -120 : 0}deg)`;
  }
  
  if (moonIcon1) {
    moonIcon1.style.transition = 'none';
    moonIcon1.style.opacity = '0';
    moonIcon1.style.transform = `rotate(${isDay1 ? 0 : 120}deg)`;
  }
  
  if (sunIcon2) {
    sunIcon2.style.transition = 'none';
    sunIcon2.style.opacity = '0';
    sunIcon2.style.transform = `rotate(${isDay2 ? -120 : 0}deg)`;
  }
  
  if (moonIcon2) {
    moonIcon2.style.transition = 'none';
    moonIcon2.style.opacity = '0';
    moonIcon2.style.transform = `rotate(${isDay2 ? 0 : 120}deg)`;
  }
  
  // Set initial state for time displays
  if (clock1TimeElement) {
    const clock1TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
    clock1TimeElement.innerHTML = '';
    
    clock1TimeString.split('').forEach(digit => {
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      clock1TimeElement.appendChild(digitSpan);
    });
  }
  
  if (clock2TimeElement) {
    const clock2TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone);
    clock2TimeElement.innerHTML = '';
    
    clock2TimeString.split('').forEach(digit => {
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      clock2TimeElement.appendChild(digitSpan);
    });
  }
  
  // Set timezone labels
  if (clock1LabelElement) {
    updateClockLabelWithFlag(clock1LabelElement, CLOCK_CONFIG.clock1.label, CLOCK_CONFIG.clock1.countryCode);
  }
  
  if (clock2LabelElement) {
    // Initial state for clock 2 (will be updated by weather if available)
    updateClockLabelWithFlag(clock2LabelElement, CLOCK_CONFIG.clock2.label, null);
  }
  
  // Set initial states for date elements
  if (dateElement) {
    dateElement.style.transition = 'none';
    dateElement.style.opacity = '0';
    dateElement.style.transform = 'translateY(20px)';
  }
  
  if (weekdayElement) {
    weekdayElement.style.transition = 'none';
    weekdayElement.style.opacity = '0';
    weekdayElement.style.transform = 'translateY(15px)';
  }
  
  if (weekNumberElement) {
    weekNumberElement.style.transition = 'none';
    weekNumberElement.style.opacity = '0';
  }
  
  if (weatherContainer) {
    weatherContainer.style.transition = 'none';
    weatherContainer.style.opacity = '0';
    weatherContainer.style.transform = 'translateY(20px)';
    weatherContainer.style.visibility = 'visible';
  }
  
  // Force browser reflow
  document.body.offsetHeight;
  
  // Start animations with updated timing
  requestAnimationFrame(() => {
    // 1. Animate both dial rings
    if (dialRing1) {
      dialRing1.style.transition = 'transform 1.8s ease-out';
      dialRing1.style.transform = `rotate(${rotationAngle1 + 360}deg)`;
    }
    
    if (dialRing2) {
      dialRing2.style.transition = 'transform 1.8s ease-out';
      dialRing2.style.transform = `rotate(${rotationAngle2 + 360}deg)`;
    }
    
    // 2. Fade in and rotate active icons for both dials
    const activeIcon1 = isDay1 ? sunIcon1 : moonIcon1;
    const activeIcon2 = isDay2 ? sunIcon2 : moonIcon2;
    
    if (activeIcon1) {
      activeIcon1.style.transition = 'opacity 1s ease, transform 1.2s ease';
      activeIcon1.style.opacity = '1';
      activeIcon1.style.transform = 'rotate(0deg)';
    }
    
    if (activeIcon2) {
      activeIcon2.style.transition = 'opacity 1s ease, transform 1.2s ease';
      activeIcon2.style.opacity = '1';
      activeIcon2.style.transform = 'rotate(0deg)';
    }
    
    // 4. Animate date elements - starts immediately with 120ms stagger
    if (dateElement) {
      dateElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      dateElement.style.opacity = '1';
      dateElement.style.transform = 'translateY(0)';
    }
    
    setTimeout(() => {
      if (weekdayElement) {
        weekdayElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        weekdayElement.style.opacity = '1';
        weekdayElement.style.transform = 'translateY(0)';
      }
    }, 120);
    
    setTimeout(() => {
      if (weekNumberElement) {
        weekNumberElement.style.transition = 'opacity 0.8s ease';
        weekNumberElement.style.opacity = '1';
      }
    }, 240);
    
    // 5. Weather elements - starts immediately
    if (weatherContainer) {
      weatherContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      weatherContainer.style.opacity = '1';
      weatherContainer.style.transform = 'translateY(0)';
    }

    // New: Stock Widget Animation
    if (stockWidget) {
       stockWidget.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
       stockWidget.style.opacity = '1';
       stockWidget.style.transform = 'translateY(0)';
    }
    
    // 6. Animate both marker dots - delayed start after 1200ms
    setTimeout(() => {
      if (dialMarker1) {
        dialMarker1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dialMarker1.style.opacity = '1';
        dialMarker1.style.transform = 'translate(-50%, -50%) scale(1)';
      }
      
      if (dialMarker2) {
        dialMarker2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dialMarker2.style.opacity = '1';
        dialMarker2.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 1200);
  });
  
  // Mark animation as complete after all animations have finished
  setTimeout(() => {
    initialAnimationComplete = true;
  }, 2000);
}

// Initialize the page
function init() {
  // Create link sections and setup search input first
  createLinkSections();
  setupSearchInput();
  
  // Immediately update clocks
  updateClock();
  setInterval(updateClock, 1000);
  
  // Setup weather with cached data first
  setupWeather();
  
  // Fetch Stock Data
  fetchStockData();

  // Perform entrance animations last, based on available data
  performEntranceAnimations();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);