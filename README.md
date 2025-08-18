# 🍼 FirstCry AI-Powered E-commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**An AI-powered baby care e-commerce platform with intelligent chatbot, voice search, and smart recommendations**

*Built for InnovateX Hackathon organized by FED KIIT*

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [API Setup](#api-setup) • [Contributors](#contributors)

</div>

---

## 🎯 Project Overview

FirstCry AI is a modern, intelligent e-commerce platform designed specifically for baby care products. It combines cutting-edge AI technology with intuitive user experience to help parents find the perfect products for their little ones.

## ✨ Key Features

### 🤖 AI-Powered Chatbot
- **Groq AI Integration**: Powered by `llama-3.3-70b-versatile` model
- **Smart Intent Recognition**: Distinguishes between product searches and general baby care questions
- **Intelligent Product Search**: Natural language queries with advanced filtering
- **Baby Care Expertise**: Specialized in feeding, sleep training, development milestones, and safety

### 🎙️ Voice Search
- **Speech-to-Text**: Web Speech API integration
- **Hands-Free Shopping**: Perfect for busy parents
- **Real-time Transcription**: Instant voice command processing
- **Multi-language Support**: English language recognition

### 🛒 Smart Shopping Experience
- **Advanced Filtering**: Age range, price, rating, brand-specific searches
- **Smart Recommendations**: AI-powered product suggestions based on purchase history
- **Dynamic Cart Management**: Real-time cart updates with persistent storage
- **Subscription System**: Auto-delivery for essential products like diapers

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Dark/Light Mode**: Theme switching support
- **Accessibility**: WCAG compliant design principles

### 🧠 Intelligent Features
- **Product Recommendations**: Context-aware suggestions after cart additions
- **Price Intelligence**: Budget-based filtering and suggestions
- **Age-Appropriate Products**: Smart filtering by child's age (0-8 years)
- **Brand Recognition**: Supports major baby brands (Horlicks, Cerelac, Gerber, etc.)

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Lightning-fast build tool
- **React Router 6.30.1** - Client-side routing

### Styling & Animation
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Production-ready motion library
- **Radix UI** - Accessible component primitives
- **Shadcn/UI** - Beautiful component library

### AI & APIs
- **Groq SDK 0.30.0** - High-performance AI inference
- **Web Speech API** - Browser-native voice recognition
- **React Hook Form** - Performant form handling

### State Management
- **React Context** - Global state management
- **React Query** - Server state synchronization
- **Local Storage** - Persistent cart data

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser with Web Speech API support
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sambit-Mondal/bhai_ki_pull_request.git
   cd first-cry
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Groq API key
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔑 API Setup

### Groq AI Configuration

1. **Get API Key**
   - Visit [Groq Console](https://console.groq.com)
   - Create a free account
   - Generate an API key

2. **Configure Environment**
   ```env
   VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

3. **Model Specifications**
   - Model: `llama-3.3-70b-versatile`
   - Temperature: 0.7
   - Max Tokens: 500
   - Context: Baby care specialist

## 📱 Features in Detail

### AI Chatbot Capabilities
```typescript
// Example interactions
"Show me t-shirts for 2-year-old under ₹500 with 4+ rating"
"How to change diapers for newborn?"
"Find Horlicks products for toddlers"
"Baby sleep tips for 6-month-old"
```

### Voice Search Examples
- "Diaper"
- "Food"
- "Horlicks"

### Smart Filtering System through chatbot
- **Age Ranges**: 0-6m, 6-12m, 1-2y, 2-5y, 5-8y
- **Price Filters**: ₹100 - ₹10,000+ with smart suggestions
- **Rating System**: 1-5 stars with review counts
- **Categories**: Baby Food, Casuals, Traditional wear, Diapers & Essentials

## 🎨 UI Components

### Reusable Components
- `ProductCard` - Smart product display with recommendations
- `FloatingChatbot` - AI-powered chat interface
- `VoiceSearchBar` - Voice-enabled search
- `BuyNowModal` - Quick purchase flow
- `CategoryCard` - Product category display

### Animation System
- Page transitions with Framer Motion
- Micro-interactions for better UX
- Loading states and skeleton screens
- Smooth cart updates

## 🧪 Development

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── contexts/           # React Context providers
├── data/               # Static data and product catalog
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🌟 Unique Selling Points

1. **AI-First Approach**: Every interaction is enhanced by AI
2. **Parent-Centric Design**: Built understanding busy parent needs
3. **Voice-First Experience**: Hands-free shopping for convenience
4. **Smart Subscriptions**: Never run out of essentials
5. **Educational Content**: AI provides baby care advice
6. **Performance Optimized**: Sub-second load times

## 🔮 Future Enhancements

- [ ] **Multi-language Support**: Hindi, Bengali, Tamil support
- [ ] **AR Product Preview**: Try before you buy
- [ ] **Social Shopping**: Share wishlist with family
- [ ] **Expert Consultation**: Video calls with pediatricians
- [ ] **Loyalty Program**: Points and rewards system
- [ ] **Mobile App**: React Native implementation

## 👥 Contributors

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/Sambit-Mondal.png" width="100px;" alt="Sambit Mondal"/><br>
      <sub><b>Sambit Mondal</b></sub><br>
      <a href="https://github.com/Sambit-Mondal">🚀 Team Lead & Full-Stack</a>
    </td>
    <td align="center">
      <img src="https://github.com/AdarshRout.png" width="100px;" alt="Adarsh Rout"/><br>
      <sub><b>Adarsh Rout</b></sub><br>
      <span>💾 AI Integration</span>
    </td>
    <td align="center">
      <img src="https://github.com/priti-codes.png" width="100px;" alt="Priti Barman"/><br>
      <sub><b>Priti Barman</b></sub><br>
      <span>💾 Design and Presentation</span>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100x100/dc2626/ffffff?text=TB" width="100px;" alt="Tamoghna Bhattacharyya"/><br>
      <sub><b>Tamoghna Bhattacharyya</b></sub><br>
      <span>💡 Business Strategy and Planning</span>
    </td>
  </tr>
</table>

## 🏆 Hackathon Details

**Event**: InnovateX Hackathon  
**Organizer**: FED KIIT (Federation of Entrepreneurship Development, KIIT)  
**Team**: Bhai Ki Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email us at [support@firstcryai.com](mailto:support@firstcryai.com) or join our Discord community.

---

<div align="center">

**Built with ❤️ by Team Bhai Ki Pull Request**

*Making parenting easier, one AI interaction at a time*

⭐ Star us on GitHub — it helps!

</div>
