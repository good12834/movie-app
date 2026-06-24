# CineVerse - Movie App

A full-stack entertainment platform built with React + Vite on the frontend and Express + MySQL on the backend. Browse, search, and manage your movie watchlist with a premium React user experience.

## Features

- Search Movies - Find movies by title
- Category Browsing - Explore movies by genre
- Movie Details - View detailed information about each movie
- Add Movies - Contribute new movies to the platform
- Watchlist - Save movies to your personal watchlist
- User Profile - Manage your account and preferences

## Tech Stack

### Frontend
- React 19 - UI library
- Vite 5 - Build tool and dev server
- React Router 6 - Client-side routing
- Material UI 6 - UI component library
- Bootstrap 5 - CSS framework
- Tailwind CSS 3 - Utility-first CSS
- Axios - HTTP client
- React Social Icons - Social media links

### Backend
- Express 5 - Web framework
- MySQL2 - Database driver
- CORS - Cross-origin resource sharing
- dotenv - Environment variables
- TMDB API - Movie database integration

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL database
- TMDB API Key (Get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/good12834/movie-app.git
cd movie-app
```

2. Install all dependencies (frontend + backend):
```bash
npm run install-all
```

3. Set up the MySQL database:
- Create a MySQL database
- Import the schema from `backend/schema.sql`
- Configure the database connection in `backend/.env`

4. Configure environment variables in `backend/.env`:
- Add your MySQL credentials (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
- Add your TMDB API key (TMDB_API_KEY)

## Running the Application

Start both frontend and backend concurrently:

```bash
npm run frontend   # Frontend runs on http://localhost:5173
npm run backend    # Backend runs on http://localhost:3001
```

Or run them simultaneously:
```bash
# Terminal 1
npm run backend

# Terminal 2
npm run frontend
```

## Available Scripts

### Root Level
- `npm run frontend` - Start frontend development server
- `npm run backend` - Start backend development server
- `npm run install-all` - Install dependencies for both frontend and backend

### Frontend (`/frontend`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

### Backend (`/backend`)
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## Project Structure

```
movie-app/
├── frontend/
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── Footer/
│       │   └── MovieCard/
│       ├── pages/           # Page components
│       │   ├── Home/
│       │   ├── Category/
│       │   ├── MovieDetail/
│       │   ├── Search/
│       │   ├── AddMovie/
│       │   ├── Watchlist/
│       │   └── Profile/
│       ├── App.jsx          # Main App component
│       ├── main.jsx         # Entry point
│       └── index.css        # Global styles
├── backend/
│   ├── server.js            # Express server setup
│   ├── db.js                # Database connection
│   ├── schema.sql           # Database schema
│   ├── tmdbRoutes.js        # TMDB API routes
│   └── package.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Built with love by Your Name

---

Note: This project uses MySQL as the database. Make sure to have MySQL installed and running before starting the backend server.
