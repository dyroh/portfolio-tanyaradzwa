# 🌐 Personal Portfolio Website

## 📌 Overview
This project is a fully responsive personal portfolio website developed to showcase my background, technical skills, and projects. It integrates both frontend and backend technologies to create a dynamic and interactive user experience.

The site allows visitors to explore my work, learn more about my interests, and directly contact me through a functional contact form that stores messages in a database.

---

## 🚀 Features

### 🎨 Frontend
- Responsive multi-section layout (Home, About, Projects, Contact)
- Smooth scrolling and section-based navigation
- Glassmorphism UI design with modern styling
- Dynamic project rendering from a JSON file
- Interactive project filtering system
- Animated typewriter effect
- Scroll-triggered animations

### 🧠 About Section Enhancements
- Split layout with two glass panels
- Image carousel displaying personal activities
- Skill progress bars with animation

### ⚙️ Backend
- Built with Node.js and Express
- REST API for handling contact form submissions
- Dynamic image loading from server directory

### 🗄️ Database
- MySQL integration
- Stores contact form messages (name, email, message)
- Persistent data handling

---

## 🛠️ Technologies Used

**Frontend:**
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)

**Backend:**
- Node.js  
- Express.js  

**Database:**
- MySQL  

---

## 📁 Project Structure

```
portfolio-tanyaradzwa/
│
├── app.js
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

## ▶️ How to Run Locally

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

4. Start the server
```
node app.js
```

5. Open in browser
```
http://127.0.0.1:3000
```

---

## 📬 Contact Feature

The contact form allows users to submit their information, which is:
- Sent to the backend via a POST request
- Stored in a MySQL database
- Logged for verification during development

---

## 🎯 Future Improvements

- Deploy the application for public access
- Add email notification functionality
- Enhance mobile responsiveness
- Implement admin dashboard for message viewing

---

## 👤 Author

**Tanyaradzwa Muchabaiwa**  
Computer Science Student at Lewis & Clark College

---

## 📄 License
This project is for educational purposes