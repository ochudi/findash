# Fin Dash

**Fin Dash** is a modern financial dashboard that enables users to track stock and cryptocurrency prices, trends, and market data in real-time.

## Features

- **Real-time Stock & Crypto Tracking**  
- **Modern UI with Tailwind CSS**  
- **Next.js 14 App Router**  
- **Sidebar Navigation**  
- **Optimized Performance**  

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **UI Components:** Radix UI, ShadCN  
- **Data Fetching:** REST API / WebSockets (if applicable)  

## Project Structure

```
fin-dash/
│── app/
│   ├── layout.tsx       # Layout with Sidebar
│   ├── page.tsx         # Home (Dashboard)
│   ├── stocks/          # Stocks Page
│   ├── crypto/          # Crypto Page
│   ├── ...              # Other Pages...
│── components/
│   ├── ui/              # Reusable UI Components
│   ├── ...              # Other Components
│── public/              # Static Assets
│── styles/              # Global Styles
│── tailwind.config.ts
│── postcss.config.mjs
│── next.config.js
│── package.json
```

## Getting Started

### Clone the Repository
```sh
git clone https://github.com/ochudi/fin-dash.git
cd fin-dash
```

### Install Dependencies
```sh
npm install
# OR
pnpm install
```

### Run the Development Server
```sh
npm run dev
```
Now, open [http://localhost:3000](http://localhost:3000) in your browser.

## UI Preview
![Fin Dash UI Preview](https://ik.imagekit.io/chewdee/findash.png?updatedAt=1742743057754)

## Configuration
- **Tailwind Config:** Customize styles in `tailwind.config.ts`
- **Sidebar Navigation:** Edit `components/app-sidebar.tsx`
- **API Keys:** If using external APIs, add credentials in `.env.local`

## Contributing
Feel free to contribute! Fork the repo and create a pull request.

## License
MIT License © 2025 Fin Dash