# Mini Seller Console

A lightweight sales management dashboard built with modern web technologies. This application allows users to manage leads, track their progress, convert qualified leads to opportunities, and monitor sales pipelines. It's designed for small sales teams or individual sellers looking for an efficient, intuitive console without the complexity of enterprise tools.

## 🎯 Overview

Mini Seller Console is a responsive web application that provides:

- **Lead Management**: View, search, filter, and sort leads by name, company, score, status, and source.
- **Lead Details**: Edit lead information (e.g., email, status) and validate updates.
- **Opportunity Tracking**: Convert leads to opportunities and monitor stages (Prospecting, Negotiation, Closed) with optional amount tracking.
- **User-Friendly Interface**: Dark/light theme support, mobile-responsive design, and toast notifications for feedback.
- **Data Persistence**: Uses localStorage for state management, with sample data for demonstration.

The app simulates a real-time sales workflow, starting from lead ingestion to opportunity closure, helping users prioritize high-score leads and maintain a clean pipeline.

## 🚀 Features

### Core Functionality

- **Lead Table**: Interactive table with search, filtering by status (New, Contacted, Qualified, Lost), and sorting (by score, name, company).
- **Lead Detail Panel**: Slide-in panel for viewing/editing lead details, including email validation and status updates.
- **Opportunity Conversion**: One-click conversion of qualified leads to opportunities, automatically updating lead status.
- **Opportunity Dashboard**: Dedicated view for tracking opportunities with stage badges and amount display.
- **Sorting & Filtering**: Dynamic table sorting with visual icons (asc/desc) and real-time filtering.
- **Empty States**: User-friendly messages for no data scenarios.

### UI/UX Enhancements

- **Theme Support**: Automatic dark/light mode via `next-themes`.
- **Responsive Design**: Mobile-friendly with breakpoint detection (768px threshold).
- **Notifications**: Toast alerts for success/error states using `sonner`.
- **Icons & Badges**: Lucide icons and color-coded badges for status/score visualization.
- **Loading & Error Handling**: Spinner for async operations and graceful error recovery.

### Sample Data

- Includes 50 pre-loaded leads with realistic details (e.g., names, companies, emails, scores 60-95).
- Opportunities are dynamically generated from conversions.

## 🛠️ Technologies

| Category             | Technology                                | Version         | Purpose                             |
| -------------------- | ----------------------------------------- | --------------- | ----------------------------------- |
| **Framework**        | React                                     | 19.1.1          | Core UI library                     |
| **Routing**          | React Router DOM                          | 7.8.2           | Client-side navigation              |
| **Styling**          | Tailwind CSS                              | 4.1.13          | Utility-first CSS with custom theme |
| **UI Primitives**    | Radix UI (Select, Label, Separator, etc.) | Latest          | Accessible components               |
| **Animations**       | tw-animate-css                            | 1.3.8           | Tailwind-based transitions          |
| **Icons**            | Lucide React                              | 0.544.0         | SVG icons                           |
| **Notifications**    | Sonner                                    | 2.0.7           | Toast system                        |
| **Build Tool**       | Vite                                      | 7.1.5           | Fast bundling & dev server          |
| **TypeScript**       | TypeScript                                | 5.8.3           | Type safety                         |
| **Linting**          | ESLint + TypeScript ESLint                | 9.35.0 / 8.43.0 | Code quality                        |
| **State Management** | React Hooks + localStorage                | N/A             | Simple persistence                  |

- **Custom Hooks**: `useIsMobile` for responsive detection, `useLocalStorage` for data persistence.
- **Utilities**: Email validation, status/score color mapping, class merging with `clsx` and `tailwind-merge`.

## 🔧 Setup & Installation

### Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- PNPM (recommended) or NPM/Yarn

### Quick Start

1. **Clone the Repository**:

   ```
   git clone https://github.com/Mirian97/mini-seller-console.git
   cd mini-seller-console
   ```

2. **Install Dependencies**:

   ```
   pnpm install
   ```

   (Or `npm install` / `yarn install`)

3. **Run Development Server**:

   ```
   pnpm dev
   ```

   - Opens at `http://localhost:5173`
   - Hot Module Replacement (HMR) enabled for fast development.

4. **Build for Production**:
   ```
   pnpm build
   ```
   - Outputs to `dist/` folder.
   - Preview build: `pnpm preview`.

### Scripts

| Command        | Description               |
| -------------- | ------------------------- |
| `pnpm dev`     | Start dev server with HMR |
| `pnpm build`   | Build for production      |
| `pnpm lint`    | Run ESLint                |
| `pnpm preview` | Preview production build  |

### Environment Variables

No required env vars. Data is stored in localStorage for demo purposes.

## 🎨 Customization

- **Tailwind Theme**: Edit `tailwind.config.ts` for colors, radii, etc. (Uses "New York" style with OKLCH colors).
- **Add Leads**: Extend `data/leads.json` or integrate an API in `LeadPage.tsx`.
- **Routing**: Add routes in `main.tsx` using React Router.
- **Components**: UI primitives in `src/components/ui/` are customizable via class-variance-authority (CVA).

## 📄 License & Attribution

- **License**: MIT (assumed; check repo for details).
- **Built By**: Mirian Quispe ([GitHub](https://github.com/Mirian97)).
- **Inspiration**: shadcn/ui components and Vite React template.
