# MyCard | Frontend

Welcome to the MyCard frontend application! This project is built using Angular and Tailwind CSS, providing a sleek and responsive user interface for sharing virtual business cards. Below, you'll find detailed information about the project, how to get started, and various other details.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Customization](#customization)
- [Authentication](#authentication)
- [Analytics](#analytics)
- [Localization](#localization)
- [License](#license)

## Features

- **Virtual Business Cards:** Easily share your personalized virtual business card via URL or QR code.
- **vCard Integration:** Allow others to directly add your contact information to their address book.
- **Custom Analytics:** Track the number of views your card receives, along with the country of origin of each viewer, visualized using Chart.js.
- **Responsive Design:** Built with Tailwind CSS to ensure a great experience on both desktop and mobile devices.
- **JWT Authentication:** Secure your application and personalize user experiences with JSON Web Token (JWT) authentication.
- **Localization Support:** The application supports translation in two languages: English (EN) and Polish (PL).

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later) or **yarn** (v1.x or later)
- **Angular CLI** (v12.x or later) installed globally
- **Git** for version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AtroxEGO/my-card-frontend
   cd my-card-frontend
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`. The application will automatically reload if you change any of the source files.

## Customization

### Tailwind CSS

You can customize the design by modifying the Tailwind CSS configuration in `tailwind.config.js`. This allows you to add custom themes, colors, and other design elements.

## Authentication

Authentication is handled using JSON Web Tokens (JWT). The `AuthService` in `src/app/shared/services/auth.service.ts` manages login, logout, and token storage. The `AuthGuard` ensures that only authenticated users can access certain routes.

## Analytics

Custom analytics are implemented to track:

- **Number of views**: How many times your business card has been viewed.
- **Country of origin**: The geographical location of each viewer.

This data is fetched from the backend and visualized using Chart.js, providing insights into your virtual card's reach.

## Localization

The application supports translation into two languages: **English (EN)** and **Polish (PL)**. Language files are stored in the `src/assets/locale/` directory, where you can add or modify translations. The default language can be configured in the application's settings.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
