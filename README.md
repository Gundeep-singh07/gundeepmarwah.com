
# Gundeep Marwah Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS.

## Features

- Responsive design that works well on desktop, tablet, and mobile devices
- Dark mode theme with custom gradient animations
- Interactive UI components with smooth animations
- Newsletter subscription functionality
- Contact form with email notifications
- Sidebar navigation for mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Setting up the Backend Server

1. Navigate to the server directory:
   ```bash
   cd src/server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=3010
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   NODE_ENV=development
   ```

   Note: For Gmail, you'll need to use an App Password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for instructions.

4. Start the server:
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

## Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- React.js
- Tailwind CSS
- Node.js
- Express
- Nodemailer

## License

This project is licensed under the MIT License - see the LICENSE file for details.
