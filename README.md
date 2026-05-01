# Personal Portfolio Website

## Overview
This project is a full-stack personal portfolio website designed to present my background, technical skills, and projects in an interactive and structured way. It combines frontend design with backend functionality to create a dynamic user experience that goes beyond a static portfolio.

The application allows visitors to explore my work, view projects dynamically, and contact me through a fully functional system that stores messages, triggers email notifications, and provides an administrative view of submissions.

---

## Features

### Frontend
- Responsive multi-section layout (Home, About, Projects, Contact)
- Smooth scrolling with section-based navigation and active link highlighting
- Glassmorphism-based UI design with consistent styling
- Dynamic project rendering from a JSON data source
- Interactive filtering system for project categories
- Typewriter animation on the homepage
- Scroll-triggered reveal animations for improved user experience

---

### About Section
- Split layout using two side-by-side glass containers
- Left panel includes:
  - Extended personal description and interests
  - Dynamically loaded image carousel displaying activities
- Right panel includes:
  - Skills displayed with animated progress bars
  - Visual representation of proficiency levels
- Layout adapts to content growth, allowing sections to expand naturally

---

### Image Carousel System
- Images are dynamically loaded from a server directory
- Backend reads image filenames using the file system (fs module)
- Frontend fetches image paths through an API endpoint
- Images rotate automatically at a set interval
- Consistent sizing enforced using CSS (`object-fit: cover`) to prevent layout distortion

---

### Backend
- Built using Node.js and Express.js
- Handles routing, API endpoints, and static file serving
- REST endpoint for processing contact form submissions
- API endpoint for dynamically serving activity images
- Structured middleware usage for JSON parsing and static assets

---

### Contact System
- Users can submit name, email, and message through a form
- Form data is:
  - Sent to the backend via a POST request
  - Stored in a MySQL database
  - Confirmed with real-time frontend feedback (success/error messages)
- Includes loading state and improved user interaction feedback

---

### Email Notification System
- Integrated using Nodemailer
- Sends an email notification whenever a new message is submitted
- Email includes sender details and message content
- Uses environment variables for secure credential handling
- Provides real-time confirmation of successful delivery in server logs

---

### Database
- MySQL database integration
- Messages stored with:
  - Name
  - Email
  - Message
  - Timestamp (auto-generated)
- Enables persistent data storage and retrieval

---

### Admin Access
- Secure route available to view submitted messages
- Displays stored messages in a structured table format
- Includes timestamp tracking for each submission
- Basic access protection implemented via query parameter
- Designed as a lightweight administrative dashboard for demonstration purposes

---

### Security Practices
- Sensitive data (email credentials, database password) stored in a `.env` file
- Environment variables used in application code via `process.env`
- `.env` excluded from version control using `.gitignore`
- Prevents exposure of private credentials in public repositories

---

## Technologies Used

**Frontend**
- HTML5  
- CSS3  
- JavaScript (Vanilla)

**Backend**
- Node.js  
- Express.js  

**Database**
- MySQL  

**Additional Tools**
- Nodemailer (email notifications)
- dotenv (environment variable management)
- fs module (dynamic file handling)

---

## Project Structure

```
portfolio-tanyaradzwa/
│
├── app.js
├── package.json
├── .env
├── .gitignore
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── images/
│   │   └── activities/
│   └── data/
│       └── projects.json
```

---

## How to Run Locally

1. Clone the repository
```
git clone <your-repo-link>
```

2. Navigate into the project folder
```
cd portfolio-tanyaradzwa
```

3. Install dependencies
```
npm install
```

4. Create a `.env` file in the root directory and add:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
DB_PASSWORD=your-database-password
```

5. Start the server
```
node app.js
```

6. Open in browser
```
http://127.0.0.1:3000
```

---

## Future Improvements

- Deploy the application for public access
- Improve mobile responsiveness across all sections
- Implement a more advanced admin dashboard with authentication
- Add pagination or search functionality for messages
- Enhance accessibility and performance optimizations

---

## Author

Tanyaradzwa Muchabaiwa  
Computer Science Student at Lewis & Clark College

---

## License
This project is developed for educational purposes.