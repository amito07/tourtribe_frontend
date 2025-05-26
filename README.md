# TourTribe - Social Travel Community 🌍

TourTribe is a modern social traveling app built with Next.js, TypeScript, and Tailwind CSS. Connect with fellow travelers, share your adventures, and discover amazing destinations around the world.

## ✨ Features

- **Social Feed**: Share travel posts with photos and stories
- **Trip Planning**: Create and share detailed trip itineraries
- **User Profiles**: Showcase your travel experiences and connect with others
- **Interactive Navigation**: Responsive design with modern UI components
- **Real-time Updates**: Live feed of travel updates from the community
- **Destination Discovery**: Explore trending destinations and get recommendations

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Icons**: Lucide React, Heroicons
- **State Management**: React hooks and Context API
- **Development**: Turbopack for fast development

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tourtribe
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── data/                  # Mock data and API utilities
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Component Overview

### UI Components

- **Button**: Versatile button component with multiple variants
- **Card**: Container components for content display
- **Input/Textarea**: Form input components
- **Modal**: Accessible modal dialog component

### Feature Components

- **PostCard**: Social media style post display
- **TripCard**: Trip information cards
- **UserProfile**: User profile display (compact and full)
- **CreatePostForm**: Form for creating new posts
- **Navigation**: Main app navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Backend API integration
- [ ] Real-time messaging
- [ ] Interactive maps
- [ ] Photo upload functionality
- [ ] Push notifications
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Heroicons for the beautiful icon set
- Unsplash for placeholder images
