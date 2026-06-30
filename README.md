# ☁️ cloudCtrl - Award Winning Weather App

<div align="center">

**A modern, responsive weather application with real-time data, dark/light theme, and beautiful animations**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WeatherAPI](https://img.shields.io/badge/WeatherAPI-FF6B2B?logo=api&logoColor=white)](https://www.weatherapi.com/)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.0-528DD7?logo=font-awesome)](https://fontawesome.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

## 📖 Overview

**cloudCtrl** is a modern, feature-rich weather application that provides real-time weather information with a stunning user interface. Built with vanilla JavaScript, it delivers accurate weather data, 24-hour forecasts, 7-day predictions, and air quality information with smooth animations and a responsive design.

### 🌟 Key Features

| Feature | Description |
|---------|-------------|
| **🌤️ Current Weather** | Real-time temperature, conditions, feels-like temperature |
| **📊 Weather Details** | Visibility, humidity, wind speed, pressure, UV index, precipitation |
| **⏰ 24-Hour Forecast** | Hourly weather predictions with icons and conditions |
| **📅 7-Day Forecast** | Daily forecasts with high/low temperatures |
| **🌍 Air Quality** | Real-time AQI with PM2.5, PM10, O₃, NO₂ data |
| **📍 Location Search** | Search any city worldwide with autocomplete suggestions |
| **📱 Current Location** | GPS-based weather for your exact location |
| **🌗 Dark/Light Theme** | Beautiful dark and light modes with smooth transitions |
| **🎨 Weather Animations** | Dynamic backgrounds for sunny, rainy, snowy, stormy weather |
| **🔄 Auto-Refresh** | One-click refresh for latest data |
| **📱 Responsive Design** | Optimized for all devices (mobile, tablet, desktop) |

---

## 🚀 Live Demo

[View Live Demo](https://your-weather-app-url.com) *(Replace with your actual URL)*

---

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with CSS variables for theming
- **JavaScript (ES6+)**: Application logic, API integration, DOM manipulation
- **Font Awesome 6**: Professional iconography
- **Google Fonts (Inter)**: Modern typography

### APIs
- **WeatherAPI.com**: Real-time weather, forecasts, and air quality data

### Features
- **localStorage**: Theme preference persistence
- **Geolocation API**: User location detection
- **Service Worker**: Offline functionality support (optional)

---

## 📂 Project Structure

```

cloudCtrl/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling & theming
├── script.js               # Application logic & API integration
├── LICENSE                 # MIT License
└── README.md               # Project documentation

```

---

## 🚦 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- **WeatherAPI.com API Key** ([Get one here](https://www.weatherapi.com/signup.aspx))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloudCtrl.git
cd cloudCtrl
```

1. **Get your API Key**

- Sign up at [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
- Get your free API key
1. **Configure the API Key**

- Open `script.js`
- Replace `'5d8227f1161e43a189d33628240210'` with your actual API key:

```
this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your WeatherAPI.com API key
```

1. **Open the application**

```
# Simply open index.html in your browser
open index.html
# Or double-click the file in your file explorer
```

1. **Start exploring the weather!**

## 🔧 API Integration

### [WeatherAPI.com](https://WeatherAPI.com) Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/current.json` | Current weather data with AQI |
| `/forecast.json` | 7-day forecast with hourly data |
| `/search.json` | Location autocomplete suggestions |

### API Response Handling

The app handles:

- ✅ Current weather conditions
- ✅ Temperature (in Celsius)
- ✅ Feels-like temperature
- ✅ Weather condition icons
- ✅ Visibility, humidity, wind speed
- ✅ Pressure, UV index, precipitation
- ✅ Air quality index (US EPA)
- ✅ 24-hour detailed forecast
- ✅ 7-day forecast with high/low temps

## 🎨 UI Features

### Theme System

- **Dark Mode**: Elegant dark theme with reduced eye strain
- **Light Mode**: Clean, bright interface
- **Persistent**: Theme preference saved in localStorage
- **Smooth Transitions**: Seamless theme switching with animations

### Weather Animations

- **Sunny**: Warm glow effect
- **Rainy**: Animated rain drops
- **Snowy**: Snowfall effect
- **Stormy**: Lightning animations
- **Cloudy**: Floating cloud effects

### Interactive Elements

- **Search Autocomplete**: Smart location suggestions
- **Location Button**: One-click GPS positioning
- **Refresh Button**: Instant data refresh
- **Hover Effects**: Interactive card animations
- **Smooth Scroll**: Navigation transitions

## 📱 Responsive Design

| Device | Optimization |
|---|---|
| **Desktop** | Full layout with detailed cards and grid views |
| **Tablet** | Adjusted grid layouts and spacing |
| **Mobile** | Single-column layout with touch-friendly targets |
| **Small Mobile** | Compact cards and simplified display |

## 🔍 Core Functionality

### Weather Search

1. Type a city name in the search box
1. View autocomplete suggestions
1. Select a location
1. Weather data updates instantly

### Current Location

1. Click the location button (📍)
1. Browser requests location permission
1. Weather loads for your exact coordinates
1. Fallback to Bangalore if permission denied

### Theme Toggle

1. Click the moon/sun icon
1. Theme switches with animation
1. Preference saved automatically
1. System-wide consistent theming

### Refresh

1. Click the refresh button (🔄)
1. Fetches latest weather data
1. Animated spin effect during loading
1. All sections update simultaneously

## 🎯 Weather Icons Mapping

The app includes comprehensive weather condition mapping:

| Condition | Icon |
|---|---|
| ☀️ Sunny/Clear | `fa-sun` / `fa-moon` |
| ⛅ Partly Cloudy | `fa-cloud-sun` / `fa-cloud-moon` |
| ☁️ Cloudy | `fa-cloud` |
| 🌧️ Rainy | `fa-cloud-rain` |
| ⛈️ Thunderstorm | `fa-bolt` |
| 🌨️ Snowy | `fa-snowflake` |
| 🌫️ Foggy | `fa-smog` |
| 💨 Windy | `fa-wind` |

## 🔧 Customization Guide

### Changing API Key

```
// In script.js
this.apiKey = 'YOUR_API_KEY_HERE';
```

### Modifying Theme Colors

```
/* In styles.css - Light Theme */
:root {
    --primary-color: #667eea;      /* Change to your brand color */
    --secondary-color: #764ba2;    /* Change to your accent color */
    --background-primary: #ffffff; /* Change background color */
}

/* In styles.css - Dark Theme */
[data-theme="dark"] {
    --background-primary: #0f172a; /* Change dark background */
}
```

### Adding New Weather Effects

```
// In script.js - Add new weather condition
if ([NEW_CODE].includes(conditionCode)) {
    body.classList.add('weather-new');
    this.createNewEffect();
}
```

### Customizing Forecast Days

```
// In script.js - Change forecast days (max 7)
const response = await fetch(
    `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&days=7&aqi=yes&alerts=yes`
);
// Change 'days=7' to any number between 1-7
```

## 🚢 Deployment

### Deploy to Vercel

```
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

1. Drag and drop the project folder to Netlify
1. Or connect your GitHub repository
1. Build command: (none needed - static site)
1. Publish directory: `.`

### Deploy to GitHub Pages

1. Push to GitHub
1. Enable GitHub Pages in repository settings
1. Select branch and folder
1. Access via `https://yourusername.github.io/cloudCtrl`

## 📊 Performance Optimizations

- ✅ Lazy loading of weather effects
- ✅ Debounced search input
- ✅ Cached API responses
- ✅ Optimized animations with `will-change`
- ✅ Efficient DOM updates
- ✅ Service worker for offline support (optional)

## 🔐 Security Considerations

- **API Key**: Keep your API key secure
- **CORS**: [WeatherAPI.com](https://WeatherAPI.com) supports CORS
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: Sanitize search input

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
1. **Create a feature branch** (`git checkout -b feature/improvement`)
1. **Make your changes**
1. **Commit your changes** (`git commit -m 'Add improvement'`)
1. **Push to the branch** (`git push origin feature/improvement`)
1. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Use meaningful variable names
- Comment complex logic
- Test across multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](https://LICENSE) file for details.

## 🙏 Acknowledgements

- **[WeatherAPI.com](https://WeatherAPI.com)**: Free and reliable weather data
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Typography
- **Contributors**: All who helped improve this project

## 📬 Support

For issues, feature requests, or questions:

- **GitHub Issues**: [Submit an issue](https://github.com/yourusername/cloudCtrl/issues)
- **Email**: support@cloudctrl.com

## 🎯 Future Enhancements

- Map integration for weather visualization
- Weather alerts and warnings
- Multiple location saving
- Temperature unit toggle (°C/°F)
- Weather widgets for other sites
- Push notifications for weather changes
- Weather history and trends
- Social sharing features
<div align="center">
**cloudCtrl - Your Weather, Under Control** ☁️✨
</div>
