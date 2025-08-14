// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = '5d8227f1161e43a189d33628240210'; // Replace with your WeatherAPI.com API key
        this.baseUrl = 'https://api.weatherapi.com/v1';
        this.currentLocation = null;
        this.searchTimeout = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.loadDefaultLocation();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshWeather();
        });

        // Location button (get current location)
        document.getElementById('locationBtn').addEventListener('click', () => {
            this.getCurrentLocation();
        });

        // Search input
        const locationInput = document.getElementById('locationInput');
        locationInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });

        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchLocation(e.target.value);
            }
        });

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Add animation effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    async loadDefaultLocation() {
        // Try to get user's location, fallback to New York
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.fetchWeatherData(`${latitude},${longitude}`);
                },
                () => {
                    this.fetchWeatherData('New York');
                }
            );
        } else {
            this.fetchWeatherData('New York');
        }
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            const locationBtn = document.getElementById('locationBtn');
            locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.fetchWeatherData(`${latitude},${longitude}`);
                    locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
                },
                (error) => {
                    this.showError('Unable to get your location');
                    locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
                }
            );
        } else {
            this.showError('Geolocation is not supported by this browser');
        }
    }

    handleSearchInput(query) {
        clearTimeout(this.searchTimeout);
        
        if (query.length < 3) {
            this.hideSuggestions();
            return;
        }

        this.searchTimeout = setTimeout(() => {
            this.fetchSuggestions(query);
        }, 300);
    }

    async fetchSuggestions(query) {
        try {
            const response = await fetch(
                `${this.baseUrl}/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`
            );
            
            if (!response.ok) throw new Error('Failed to fetch suggestions');
            
            const data = await response.json();
            this.displaySuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    displaySuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('suggestions');
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="weatherApp.selectSuggestion('${suggestion.name}, ${suggestion.region}, ${suggestion.country}')">
                <strong>${suggestion.name}</strong>, ${suggestion.region}, ${suggestion.country}
            </div>
        `).join('');

        suggestionsContainer.style.display = 'block';
    }

    selectSuggestion(location) {
        document.getElementById('locationInput').value = location;
        this.hideSuggestions();
        this.searchLocation(location);
    }

    hideSuggestions() {
        document.getElementById('suggestions').style.display = 'none';
    }

    searchLocation(query) {
        if (query.trim()) {
            this.fetchWeatherData(query);
            this.hideSuggestions();
        }
    }

    refreshWeather() {
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.classList.add('spinning');
        
        if (this.currentLocation) {
            this.fetchWeatherData(this.currentLocation);
        } else {
            this.loadDefaultLocation();
        }
        
        setTimeout(() => {
            refreshBtn.classList.remove('spinning');
        }, 1000);
    }

    async fetchWeatherData(location) {
        this.showLoading();
        this.currentLocation = location;

        try {
            // Fetch current weather and forecast
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(`${this.baseUrl}/current.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&aqi=yes`),
                fetch(`${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&days=7&aqi=yes&alerts=yes`)
            ]);

            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            this.displayWeatherData(currentData, forecastData);
            this.hideLoading();
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('Unable to fetch weather data. Please check your API key and try again.');
            this.hideLoading();
        }
    }

    displayWeatherData(currentData, forecastData) {
        const { location, current } = currentData;
        const { forecast } = forecastData;

        // Update location info
        document.getElementById('locationName').textContent = location.name;
        document.getElementById('locationDetails').textContent = `${location.region}, ${location.country}`;
        document.getElementById('localTime').textContent = this.formatDateTime(location.localtime);

        // Update current weather
        document.getElementById('currentTemp').textContent = `${Math.round(current.temp_c)}°`;
        document.getElementById('weatherCondition').textContent = current.condition.text;
        document.getElementById('feelsLike').textContent = `Feels like ${Math.round(current.feelslike_c)}°`;
        
        // Update weather icon
        this.updateWeatherIcon(current.condition.code, current.is_day);

        // Update weather details
        document.getElementById('visibility').textContent = `${current.vis_km} km`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        document.getElementById('windSpeed').textContent = `${current.wind_kph} km/h`;
        document.getElementById('pressure').textContent = `${current.pressure_mb} mb`;
        document.getElementById('uvIndex').textContent = current.uv;
        document.getElementById('precipitation').textContent = `${current.precip_mm} mm`;

        // Update air quality
        if (current.air_quality) {
            this.updateAirQuality(current.air_quality);
        }

        // Update forecasts
        this.updateHourlyForecast(forecast.forecastday[0].hour);
        this.updateDailyForecast(forecast.forecastday);

        // Update background based on weather
        this.updateBackground(current.condition.code, current.is_day);
    }

    updateWeatherIcon(conditionCode, isDay) {
        const iconElement = document.getElementById('weatherIcon');
        const iconClass = this.getWeatherIconClass(conditionCode, isDay);
        iconElement.className = iconClass;
    }

    getWeatherIconClass(code, isDay) {
        const iconMap = {
            1000: isDay ? 'fas fa-sun' : 'fas fa-moon',
            1003: isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon',
            1006: 'fas fa-cloud',
            1009: 'fas fa-cloud',
            1030: 'fas fa-smog',
            1063: 'fas fa-cloud-rain',
            1066: 'fas fa-snowflake',
            1069: 'fas fa-cloud-rain',
            1072: 'fas fa-cloud-rain',
            1087: 'fas fa-bolt',
            1114: 'fas fa-wind',
            1117: 'fas fa-wind',
            1135: 'fas fa-smog',
            1147: 'fas fa-smog',
            1150: 'fas fa-cloud-drizzle',
            1153: 'fas fa-cloud-drizzle',
            1168: 'fas fa-cloud-rain',
            1171: 'fas fa-cloud-rain',
            1180: 'fas fa-cloud-rain',
            1183: 'fas fa-cloud-rain',
            1186: 'fas fa-cloud-rain',
            1189: 'fas fa-cloud-rain',
            1192: 'fas fa-cloud-showers-heavy',
            1195: 'fas fa-cloud-showers-heavy',
            1198: 'fas fa-cloud-rain',
            1201: 'fas fa-cloud-showers-heavy',
            1204: 'fas fa-cloud-rain',
            1207: 'fas fa-cloud-rain',
            1210: 'fas fa-snowflake',
            1213: 'fas fa-snowflake',
            1216: 'fas fa-snowflake',
            1219: 'fas fa-snowflake',
            1222: 'fas fa-snowflake',
            1225: 'fas fa-snowflake',
            1237: 'fas fa-snowflake',
            1240: 'fas fa-cloud-rain',
            1243: 'fas fa-cloud-showers-heavy',
            1246: 'fas fa-cloud-showers-heavy',
            1249: 'fas fa-cloud-rain',
            1252: 'fas fa-cloud-rain',
            1255: 'fas fa-snowflake',
            1258: 'fas fa-snowflake',
            1261: 'fas fa-snowflake',
            1264: 'fas fa-snowflake',
            1273: 'fas fa-bolt',
            1276: 'fas fa-bolt',
            1279: 'fas fa-bolt',
            1282: 'fas fa-bolt'
        };

        return iconMap[code] || 'fas fa-cloud';
    }

    updateAirQuality(airQuality) {
        const aqiValue = airQuality['us-epa-index'];
        const aqiLabels = ['', 'Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
        const aqiClasses = ['', 'aqi-good', 'aqi-moderate', 'aqi-unhealthy-sensitive', 'aqi-unhealthy', 'aqi-very-unhealthy', 'aqi-hazardous'];

        document.getElementById('aqiValue').textContent = aqiValue;
        document.getElementById('aqiLabel').textContent = aqiLabels[aqiValue] || 'Unknown';
        document.getElementById('aqiValue').className = `aqi-value ${aqiClasses[aqiValue] || ''}`;

        document.getElementById('pm25').textContent = `${airQuality.pm2_5.toFixed(1)} μg/m³`;
        document.getElementById('pm10').textContent = `${airQuality.pm10.toFixed(1)} μg/m³`;
        document.getElementById('o3').textContent = `${airQuality.o3.toFixed(1)} μg/m³`;
        document.getElementById('no2').textContent = `${airQuality.no2.toFixed(1)} μg/m³`;
    }

    updateHourlyForecast(hourlyData) {
        const container = document.getElementById('hourlyForecast');
        const currentHour = new Date().getHours();
        
        // Get next 24 hours starting from current hour
        const next24Hours = hourlyData.slice(currentHour, currentHour + 24);
        
        container.innerHTML = next24Hours.map(hour => {
            const time = new Date(hour.time);
            const timeString = time.getHours() === 0 ? '12 AM' : 
                             time.getHours() === 12 ? '12 PM' :
                             time.getHours() > 12 ? `${time.getHours() - 12} PM` : `${time.getHours()} AM`;
            
            return `
                <div class="hourly-item">
                    <div class="hourly-time">${timeString}</div>
                    <div class="hourly-icon">
                        <i class="${this.getWeatherIconClass(hour.condition.code, hour.is_day)}"></i>
                    </div>
                    <div class="hourly-temp">${Math.round(hour.temp_c)}°</div>
                    <div class="hourly-condition">${hour.condition.text}</div>
                </div>
            `;
        }).join('');
    }

    updateDailyForecast(dailyData) {
        const container = document.getElementById('dailyForecast');
        
        container.innerHTML = dailyData.map((day, index) => {
            const date = new Date(day.date);
            const dayName = index === 0 ? 'Today' : 
                          index === 1 ? 'Tomorrow' : 
                          date.toLocaleDateString('en-US', { weekday: 'long' });
            
            return `
                <div class="daily-item">
                    <div class="daily-date">${dayName}</div>
                    <div class="daily-icon">
                        <i class="${this.getWeatherIconClass(day.day.condition.code, 1)}"></i>
                    </div>
                    <div class="daily-condition">${day.day.condition.text}</div>
                    <div class="daily-temps">
                        <span class="daily-high">${Math.round(day.day.maxtemp_c)}°</span>
                        <span class="daily-low">${Math.round(day.day.mintemp_c)}°</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateBackground(conditionCode, isDay) {
        const body = document.body;
        const rainDrops = document.querySelector('.rain-drops');
        
        // Clear existing weather classes
        body.className = body.className.replace(/weather-\w+/g, '');
        
        // Add weather-specific class
        if ([1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
            body.classList.add('weather-rainy');
            this.createRainEffect();
        } else if ([1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
            body.classList.add('weather-snowy');
        } else if ([1273, 1276, 1279, 1282, 1087].includes(conditionCode)) {
            body.classList.add('weather-stormy');
        } else if (conditionCode === 1000 && isDay) {
            body.classList.add('weather-sunny');
        } else {
            body.classList.add('weather-cloudy');
        }
    }

    createRainEffect() {
        const rainContainer = document.querySelector('.rain-drops');
        rainContainer.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            rainContainer.appendChild(drop);
        }
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const options = {
            weekday: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'flex';
        document.getElementById('weatherContent').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('weatherContent').style.display = 'block';
    }

    showError(message) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').querySelector('p').textContent = message;
        document.getElementById('weatherContent').style.display = 'none';
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

// Additional CSS for weather effects
const weatherEffectsCSS = `
.rain-drop {
    position: absolute;
    width: 2px;
    height: 20px;
    background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.6));
    animation: rainFall linear infinite;
}

@keyframes rainFall {
    from {
        transform: translateY(-100vh);
    }
    to {
        transform: translateY(100vh);
    }
}

.weather-rainy .bg-elements::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 149, 237, 0.1);
    pointer-events: none;
}

.weather-sunny .bg-elements::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, rgba(255, 223, 0, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.weather-stormy .bg-elements::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(75, 0, 130, 0.1);
    pointer-events: none;
    animation: lightning 3s infinite;
}

@keyframes lightning {
    0%, 90%, 100% { opacity: 0.1; }
    5%, 10% { opacity: 0.3; }
}
`;

// Add weather effects CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = weatherEffectsCSS;
document.head.appendChild(styleSheet);

// Initialize the weather app
const weatherApp = new WeatherApp();

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
  }
