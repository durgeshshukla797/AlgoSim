# AlgoScope - Algorithm Visualiser

A professional, minimal landing page for an Algorithm Visualiser web application built with Next.js and Tailwind CSS.

## Features

- Fixed header with navigation
- Hero section with call-to-action buttons
- Algorithms section with grid layout
- Learning flow section with illustrations
- Team members section
- Fixed footer
- Fully responsive design
- Black & white minimal theme

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Inter & Poppins** - Typography

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Fixed header component
│   ├── Hero.tsx        # Hero section
│   ├── Algorithms.tsx  # Algorithms grid
│   ├── LearningFlow.tsx # Learning flow section
│   ├── Team.tsx        # Team members section
│   └── Footer.tsx      # Fixed footer component
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```
