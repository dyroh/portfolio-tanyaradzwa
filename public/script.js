document.addEventListener("DOMContentLoaded", () => {

    /* ================= SCROLL REVEAL ================= */
    const reveals = document.querySelectorAll(".reveal, .section");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));


    /* ================= TYPEWRITER ================= */
    const words = [
        "Computer Science Student",
        "Developer",
        "Python Programmer",
        "Java Programmer",
        "Web Designer",
        "Technopreneur",
        "Creative Thinker",
        "Digital Storyteller",
        "Innovator",
        "Problem Solver",
        "Creator",
        "Public Speaker"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typingText = document.getElementById("typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 60 : 100);
    }

    typeEffect();


    /* ================= LOAD PROJECTS ================= */
    fetch("./data/projects.json")
        .then(res => res.json())
        .then(projects => {
            const container = document.getElementById("projects-container");

            projects.forEach(p => {
                const card = document.createElement("div");
                card.classList.add("project-card");
                card.dataset.category = p.category;

                card.innerHTML = `
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <a href="${p.link}" class="btn-small" target="_blank">View Project</a>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error(err));


    /* ================= FILTER ================= */
    const filterButtons = document.querySelectorAll(".filter-buttons button");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            document.querySelectorAll(".project-card").forEach(card => {
                const category = card.dataset.category;

                card.style.display =
                    filter === "all" || filter === category
                        ? "block"
                        : "none";
            });
        });
    });


    /* ================= NAV HIGHLIGHT ================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

});



/* ============FRONT END LOGIC ========= */

document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const status = document.getElementById("form-status");

    status.textContent = "Sending...";
    status.style.color = "#b5b9ff";

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    try {
        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "#4c7dff";
            this.reset();
        } else {
            status.textContent = "❌ Something went wrong.";
            status.style.color = "red";
        }

    } catch (err) {
        status.textContent = "❌ Server error. Try again later.";
        status.style.color = "red";
    }
});

/*===================SKILLS BARS=============== */
/* ================= LOAD SKILLS ================= */
fetch("./data/skills.json")
    .then(res => res.json())
    .then(skills => {
        const container = document.getElementById("skills-container");

        skills.forEach(skill => {
            const div = document.createElement("div");
            div.classList.add("skill");

            div.innerHTML = `
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span class="skill-level">${skill.level}</span>
                </div>
                <div class="bar">
                    <div class="bar-fill" data-width="${skill.percent}%"></div>
                </div>
            `;

            container.appendChild(div);
        });

        // ANIMATE AFTER elements are added
        setTimeout(() => {
            document.querySelectorAll(".bar-fill").forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 1500);
    })
    .catch(err => console.error(err));

/*===================IMAGE CAROUSEL =============== */
let images = [];
let index = 0;

const carousel = document.getElementById("carousel");

fetch("/api/activity-images")
    .then(res => res.json())
    .then(data => {
        images = data;

        if (carousel && images.length > 0) {
            showImage();
            setInterval(showImage, 2500);
        }
    });

function showImage() {
    carousel.innerHTML = `
        <img src="${images[index]}" style="width:100%; border-radius:10px;">
    `;
    index = (index + 1) % images.length;
}