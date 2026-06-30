// Portfolio content extracted from Akhiyar Muhammed's resume

export const PROFILE = {
    name: "Akhiyar Muhammed",
    firstName: "Akhiyar",
    lastName: "Muhammed",
    roles: ["Data Science Engineer", "Full Stack Developer", "Team Builder", "Product Mindset"],
    location: "Perumbavoor, Kerala — India",
    email: "akhiyaarmuhammed123@gmail.com",
    phone: "+91 89434 59195",
    resumeUrl: "/AKHI_RESUME_18-05.pdf",
    summary:
        "Aspiring Data Scientist and IT Developer focused on turning ideas into data-driven, human-centered software. I love building products from zero, leading communities, and combining the rigor of data science with the craft of full-stack engineering.",
    longBio:
        "I'm an engineer who just finished a Diploma in Computer Engineering and is now pursuing a B.Tech in Data Science at Adi Shankara Institute of Engineering & Technology. I split my time between writing code, leading student communities (CSI, Hack Club, NSS), and learning everything I can about AI, analytics and product thinking. I care a lot about people — building teams, shipping things together, and making technology that feels useful and kind.",
};

export const SOCIAL = [
    { label: "Email", href: "mailto:akhiyaarmuhammed123@gmail.com", icon: "Mail" },
    { label: "Phone", href: "tel:+918943459195", icon: "Phone" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "Linkedin" },
    { label: "GitHub", href: "https://github.com/", icon: "Github" },
];

export const SKILL_GROUPS = [
    {
        title: "Data Science",
        tag: "01",
        items: ["Python", "R", "Pandas / NumPy", "Machine Learning", "Data Analytics", "Data Visualization", "Data Storytelling"],
    },
    {
        title: "Full Stack",
        tag: "02",
        items: ["JavaScript", "React", "Node.js", "FastAPI", "MongoDB", "REST APIs", "C / C++"],
    },
    {
        title: "Product & People",
        tag: "03",
        items: ["Team Building", "Project Management", "Public Speaking", "Mentorship", "Cybersecurity Basics", "Problem Solving"],
    },
    {
        title: "Languages I Speak",
        tag: "04",
        items: ["English", "Malayalam", "Hindi", "Tamil", "Arabic"],
    },
];

export const EDUCATION = [
    {
        degree: "B.Tech — Data Science (CSE)",
        institution: "Adi Shankara Institute of Engineering & Technology, Kalady",
        period: "2024 — 2027 (Pursuing)",
        detail: "Specializing in Data Science, Machine Learning and modern full-stack development.",
    },
    {
        degree: "Diploma — Computer Engineering",
        institution: "Government Polytechnic College, Perumbavoor",
        period: "2021 — 2024",
        detail: "Graduated with 78.8%. Foundations in programming, networking and software engineering.",
    },
    {
        degree: "SSLC — Government Higher Secondary School, Mudickal",
        institution: "Kerala State Board",
        period: "Completed 2021",
        detail: "Graduated with 98%.",
    },
];

export const EXPERIENCE = [
    {
        role: "Full Stack Development Intern",
        company: "ICT Academy",
        period: "Internship",
        bullets: [
            "Designed and developed a full-stack Library Management System covering both frontend and backend.",
            "Translated user requirements into clean schemas, REST APIs and a responsive UI.",
            "Worked closely with mentors to follow industry development workflows and code review culture.",
        ],
    },

        {
            role: "Data Analyst",
            company: "Bluestock",
            period: "2024 — Present",
            bullets: [
                "Analyzed financial market data to identify trends and inform trading strategies.",
                "Built dashboards and reports using Python, Pandas, and Tableau."
            ],
        },
        {
            role: "AI Web Development Intern",
            company: "INAMIGOS",
            period: "Summer 2023",
            bullets: [
                "Developed AI-powered web components using TensorFlow.js and Node.js.",
                "Integrated machine learning models into responsive front‑end interfaces."
            ],
        },
    ];

export const PROJECTS = [
    {
        title: "Library Management System",
        blurb:
            "An end-to-end library platform with member management, book inventory, lending workflow and an admin dashboard. Built during my ICT Academy internship.",
        stack: ["Full Stack", "REST API", "SQL", "Auth"],
        image: "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg",
        link: "#",
    },
    {
        title: "Data Visualization Playground",
        blurb:
            "Interactive notebooks exploring public datasets — turning raw numbers into stories. Focused on clean Matplotlib / Plotly visuals and clear narrative.",
        stack: ["Python", "Pandas", "Matplotlib", "Plotly"],
        image: "https://images.pexels.com/photos/10325707/pexels-photo-10325707.png",
        link: "#",
    },
    {
        title: "Hack Club Build Sessions",
        blurb:
            "Curated and led weekly build sessions at ASIET Hack Club — small, shippable projects that teach students to design, code and demo in one sitting.",
        stack: ["Community", "Workshops", "Mentorship"],
        image: "https://images.unsplash.com/photo-1719400471588-575b23e27bd7",
        link: "#",
    },

        {
            title: "Emotion Detector (IoT & ML)",
            blurb: "Real-time emotion detection using a microcontroller, microphone, and a lightweight ML model. The system streams sentiment scores to a web dashboard.",
            stack: ["Python", "TensorFlow Lite", "Arduino", "WebSockets", "React"],
            image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1200&q=80",
            link: "#",
        },
        {
            title: "Pill Cam Disease Finder",
            blurb: "Analyzed capsule endoscopy video data to detect gastrointestinal diseases. Interactive site visualizes findings with charts and heatmaps.",
            stack: ["Python", "OpenCV", "FastAPI", "Plotly", "D3.js"],
            image: "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg",
            link: "#",
        },
    ];

export const CERTIFICATIONS = [
    { title: "Python for Data Science", issuer: "NPTEL · IIT Madras" },
    { title: "Python 3.4.3", issuer: "Spoken Tutorial · IIT Bombay" },
    { title: "C Programming 3.4.0", issuer: "Spoken Tutorial · IIT Bombay" },
    { title: "C++ 3.5.0", issuer: "Spoken Tutorial · IIT Bombay" },
    { title: "Build with Gemini AI Studio & Antigravity", issuer: "Google AI Workshop" },
    { title: "AI-Ready Individual Recognition", issuer: "CSI AI 100K Readiness Program" },
    { title: "Robotics Workshop", issuer: "Srishti Innovative Edu. Services" },
    { title: "ICT International Conclave on Skills, Engineering & Technology", issuer: "Participant" },
];

export const COMMUNITY = [
    {
        role: "Joint Secretary",
        org: "Computer Society of India (CSI) · ASIET",
        note: "Driving technical events, hackathons and student outreach.",
    },
    {
        role: "Program Lead",
        org: "Hack Club · ASIET",
        note: "Leading the on-campus Hack Club — weekly build nights and ship-or-die culture.",
    },
    {
        role: "Technical Lead",
        org: "AFT — ASIET Fashion Team",
        note: "Bringing tech and creative production together for campus shows.",
    },
    {
        role: "Technical Lead",
        org: "IEDC · GPTC Perumbavoor",
        note: "Mentored junior students and ran innovation & entrepreneurship sessions.",
    },
    {
        role: "Active Volunteer",
        org: "NSS · ASIET",
        note: "Community service, awareness drives and outreach programs.",
    },
];

export const POSTS = [
    {
        title: "Why every developer should keep a data notebook",
        tag: "Data Science",
        read: "5 min read",
        excerpt:
            "How small, daily notebooks changed the way I think about debugging, learning and shipping side projects.",
        date: "Coming soon",
    },
    {
        title: "From Diploma to B.Tech — what I'd tell my younger self",
        tag: "Journey",
        read: "7 min read",
        excerpt:
            "Lessons from switching colleges, leading clubs and learning to learn in public.",
        date: "Coming soon",
    },
    {
        title: "Building communities that actually build things",
        tag: "Leadership",
        read: "6 min read",
        excerpt:
            "Notes from running Hack Club and CSI at ASIET — how to keep a builder community alive.",
        date: "Coming soon",
    },
];

export const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "community", label: "Community" },
    { id: "writing", label: "Writing" },
    { id: "contact", label: "Contact" },
];


