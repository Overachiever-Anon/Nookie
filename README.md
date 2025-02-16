# Nookpedia Companion

A comprehensive **Animal Crossing** companion application built with React and Material-UI, featuring island management, villager tracking, and collection features.

## Features
- 🏝️ **Island Dashboard**: Manage and track your island's progress
- 🏡 **Villager Management**: Keep track of your island residents
- 🌸 **Garden Planner**: Plan and organize your island's flora
- 💰 **Turnip Price Tracker**: Monitor and predict turnip prices
- 🎵 **Music Player**: Listen to K.K. Slider's performances and hourly music
- 🎨 **Island Designer**: Plan and visualize your island layout
- 🏪 **Virtual Market**: Browse and track items
- 🦉 **Museum Progress**: Track your museum donations
- 🤝 **Trading System**: Connect with other players

## Tech Stack
- React 18
- Material-UI v5
- React Router v6
- Three.js for 3D visualizations
- Chart.js for data visualization
- Vite for build tooling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Overachiever-Anon/Nookie.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add your Nookipedia API key:
    ```plaintext
    VITE_NOOKIPEDIA_API_KEY=your_api_key_here
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:5173](http://localhost:5173)

## Building for Production
```bash
npm run build
```

## Project Structure
```
/   ├── public/
│       ├── audio/         # Audio assets
│       └── videos/        # Video assets
├── src/
│       ├── components/    # Reusable UI components
│       ├── contexts/      # React contexts
│       ├── pages/         # Application pages
│       └── App.jsx        # Main application component
└── vite.config.js         # Vite configuration
```

## Features in Detail

### Audio System
- Background music system with hourly tracks
- Ambient sound effects
- K.K. Slider performances

### Island Management
- Island progress tracking
- Villager relationship management
- Garden planning tools
- Museum collection tracking

### Trading System
- Item cataloging
- Trading post
- Turnip price predictions

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Nintendo for Animal Crossing
- Nookipedia API for game data
- Material-UI team for the component library
