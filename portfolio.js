// Portfolio content extracted from Akhiyar Muhammed's resume
export const PORTFOLIO_VERSION = "1.1.1";

export const getResumeUrl = () => {
    const base = import.meta.env.BASE_URL || './';
    if (base === './' || base === '.') return './AKHI_RESUME_18-05.pdf';
    return `${base.replace(/\/$/, '')}/AKHI_RESUME_18-05.pdf`;
};

export const PROFILE = {
    name: "Akhiyar Muhammed",
    firstName: "Akhiyar",
    lastName: "Muhammed",
    roles: ["Data Science Engineer", "Full Stack Developer", "Team Builder", "Community Leader"],
    location: "Perumbavoor, Kerala — India",
    email: "akhiyaarmuhammed123@gmail.com",
    phone: "+91 89434 59195",
    resumeUrl: "/AKHI_RESUME_18-05.pdf",
    resumeFileName: "AKHI_RESUME_18-05.pdf",
    summary:
        "Aspiring Data Scientist and IT Developer focused on turning ideas into data-driven, human-centered software. I love building products from zero, leading communities, and combining the rigor of data science with the craft of full-stack engineering.",
    longBio:
        "I'm an engineer who completed a Diploma in Computer Engineering (78.8%) and is currently pursuing a B.Tech in Data Science at Adi Shankara Institute of Engineering & Technology. I split my time between writing production-grade code, leading student communities (CSI, Hack Club, NSS, IEDC), and learning everything I can about AI, analytics and product thinking. I care deeply about building high-performance teams, shipping impactful tools, and making technology that is accessible and intuitive.",
};

export const SOCIAL = [
    { label: "Email", href: "mailto:akhiyaarmuhammed123@gmail.com", icon: "Mail", value: "akhiyaarmuhammed123@gmail.com" },
    { label: "Phone", href: "tel:+918943459195", icon: "Phone", value: "+91 89434 59195" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/akhiyar-muhammed", icon: "Linkedin", value: "linkedin.com/in/akhiyar-muhammed" },
    { label: "GitHub", href: "https://github.com/AKHIYAR-MUHAMMED", icon: "Github", value: "github.com/AKHIYAR-MUHAMMED" },
];

export const SKILL_GROUPS = [
    {
        title: "Data Science & AI",
        tag: "01",
        category: "data",
        items: ["Python", "R", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning", "Data Analytics", "Data Visualization", "Plotly / Matplotlib", "Data Storytelling"],
    },
    {
        title: "Full Stack Development",
        tag: "02",
        category: "dev",
        items: ["JavaScript (ES6+)", "React.js", "Node.js", "FastAPI", "MongoDB", "SQL / PostgreSQL", "REST APIs", "Tailwind CSS", "C / C++", "Git & GitHub"],
    },
    {
        title: "Product & Leadership",
        tag: "03",
        category: "leadership",
        items: ["Team Building", "Technical Mentorship", "Agile / Scrum", "Public Speaking", "Community Organizing", "Problem Solving", "System Architecture"],
    },
    {
        title: "Languages I Speak",
        tag: "04",
        category: "languages",
        items: ["English (Professional)", "Malayalam (Native)", "Hindi (Fluent)", "Tamil (Conversational)", "Arabic (Elementary)"],
    },
];

export const EDUCATION = [
    {
        degree: "B.Tech — Data Science (CSE)",
        institution: "Adi Shankara Institute of Engineering & Technology, Kalady",
        period: "2024 — 2027 (Pursuing)",
        detail: "Specializing in Data Science, Machine Learning algorithms, statistical modeling and modern distributed full-stack architecture.",
    },
    {
        degree: "Diploma — Computer Engineering",
        institution: "Government Polytechnic College, Perumbavoor",
        period: "2021 — 2024",
        detail: "Graduated with 78.8%. Strong foundation in object-oriented programming, computer networks, database systems and OS fundamentals.",
    },
    {
        degree: "SSLC — High School",
        institution: "Government Higher Secondary School, Mudickal (Kerala State Board)",
        period: "Completed 2021",
        detail: "Graduated with top academic honors (98% distinction).",
    },
];

export const EXPERIENCE = [
    {
        role: "Data Analyst",
        company: "Bluestock",
        period: "2024 — Present",
        type: "Professional Experience",
        bullets: [
            "Analyzed financial market time-series datasets to identify volatility trends and algorithmic trading opportunities.",
            "Engineered interactive dashboards and automated analytical reporting pipelines using Python, Pandas, and visualization suites.",
            "Collaborated with cross-functional analytics teams to derive actionable data insights."
        ],
    },
    {
        role: "Full Stack Development Intern",
        company: "ICT Academy",
        period: "Internship",
        type: "Internship",
        bullets: [
            "Architected and deployed a comprehensive end-to-end Library Management System covering responsive UI and secure backend APIs.",
            "Designed relational database schemas, query optimizations and authentication middleware.",
            "Participated in industry-standard code reviews, sprint cycles, and modular component testing."
        ],
    },
    {
        role: "AI Web Development Intern",
        company: "INAMIGOS",
        period: "Summer 2023",
        type: "Internship",
        bullets: [
            "Engineered AI-powered interactive web applications utilizing client-side TensorFlow.js and Node.js microservices.",
            "Integrated predictive machine learning inference pipelines directly into high-throughput web frontends."
        ],
    },
];

export const PROJECTS = [
    {
        id: "lms",
        title: "Library Management System",
        category: "Full Stack",
        blurb:
            "An end-to-end digital library platform featuring member authorization, catalog search, book lending lifecycle, overdue fines calculation, and an administrative dashboard.",
        fullDescription:
            "Developed during the ICT Academy Internship, this project addresses real-world circulation workflows. Features include JWT authentication, role-based access control (Student, Faculty, Librarian), barcode/ISBN lookup, and automated overdue alerts. Designed with a decoupled architecture for maximum scalability.",
        stack: ["React", "Node.js", "Express", "REST API", "SQL", "JWT Auth", "Tailwind CSS"],
        image: "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg",
        github: "https://github.com/AKHIYAR-MUHAMMED/DAIS",
        demo: "https://github.com/akhiyaarmuhammed",
        highlights: ["Automated lending & returning workflows", "Role-based authorization system", "Full audit logging and analytics dashboard"]
    },
    {
        id: "emotion-detector",
        title: "Emotion Detector (IoT & ML)",
        category: "AI & ML",
        blurb:
            "Real-time acoustic & facial sentiment detection powered by edge machine learning on microcontrollers, streaming live emotion metrics to a WebSocket dashboard.",
        fullDescription:
            "A hybrid IoT + Machine Learning solution that analyzes vocal tone frequency and emotional indicators in real time. Deploys a lightweight quantized neural network on edge hardware, streaming metrics via WebSockets to a React-based monitoring console.",
        stack: ["Python", "TensorFlow Lite", "Arduino / ESP32", "WebSockets", "React", "Signal Processing"],
        image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1200&q=80",
        github: "https://github.com/AKHIYAR-MUHAMMED/Blogapp",
        demo: "https://github.com/akhiyaarmuhammed",
        highlights: ["Edge inference with TensorFlow Lite", "Sub-100ms latency WebSocket stream", "Interactive sentiment trend charts"]
    },
    {
        id: "pill-cam",
        title: "Pill Cam Disease Finder",
        category: "Data Science",
        blurb:
            "Diagnostic computer vision pipeline analyzing wireless capsule endoscopy (WCE) video feeds to detect gastrointestinal anomalies and mucosal lesions.",
        fullDescription:
            "Capsule endoscopy produces thousands of frames per exam. This project leverages OpenCV frame preprocessing and deep convolutional classifiers to flag bleedings, ulcers, and polyps. Includes an interactive doctor portal with diagnostic heatmaps and frame-by-frame scrubbing.",
        stack: ["Python", "OpenCV", "FastAPI", "Plotly", "D3.js", "PyTorch"],
        image: "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg",
        github: "https://github.com/JayalakshmyJayakrishnan/Deep-Care/tree/master",
        demo: "https://github.com/akhiyaarmuhammed",
        highlights: ["Automated lesion detection in endoscopic video", "FastAPI asynchronous frame analysis", "Interactive diagnostic heatmap viewer"]
    },
    {
        id: "data-playground",
        title: "Data Visualization Playground",
        category: "Data Science",
        blurb:
            "Interactive analytical notebooks and visual storytelling platform exploring public socioeconomic and financial datasets with rich Plotly and D3 charts.",
        fullDescription:
            "A collection of exploratory data analysis (EDA) studies transforming raw tabular datasets into compelling narratives. Implements distribution analysis, statistical correlation matrices, geospatial mapping, and automated PDF executive summaries.",
        stack: ["Python", "Pandas", "Matplotlib", "Plotly", "Jupyter", "Seaborn"],
        image: "https://images.pexels.com/photos/10325707/pexels-photo-10325707.png",
        github: "https://github.com/AKHIYAR-MUHAMMED/MutualFundAnalytic",
        demo: "https://github.com/akhiyaarmuhammed",
        highlights: ["Over 10+ public dataset deep dives", "High-fidelity interactive Plotly figures", "Statistical hypothesis testing writeups"]
    },
    {
        id: "hack-club",
        title: "Hack Club Build Workshops",
        category: "Community",
        blurb:
            "Curated curriculum and weekly hands-on build sprints at ASIET Hack Club — guiding 100+ students from zero to shipping production apps.",
        fullDescription:
            "Designed and facilitated high-energy weekend sprint sessions where students learn web fundamentals, git workflows, API integrations, and product deployments in single 3-hour sittings.",
        stack: ["React", "JavaScript", "Vite", "Git", "Workshops", "Mentorship"],
        image: "https://images.unsplash.com/photo-1719400471588-575b23e27bd7",
        github: "https://github.com/akhiyaarmuhammed/hack-club-builds",
        demo: "https://github.com/akhiyaarmuhammed",
        highlights: ["15+ successful campus build nights", "Over 100+ student attendees mentored", "Open-source starter templates created"]
    }
];

export const CERTIFICATIONS = [
    { 
        title: "Python for Data Science", 
        issuer: "NPTEL · IIT Madras",
        date: "2024",
        skills: "Python, NumPy, Pandas, Scipy, Linear Algebra, Statistical Computing",
        credentialId: "NPTEL-DS-IITM-2024",
        details: "Comprehensive 12-week certification covering data wrangling, algorithmic problem solving, matrix decomposition, and predictive modeling."
    },
    { 
        title: "Python 3.4.3 Training", 
        issuer: "Spoken Tutorial · IIT Bombay",
        date: "2023",
        skills: "Core Python, Data Structures, OOP, File Handling",
        credentialId: "IITB-ST-PY-2023",
        details: "Verified practical programming certification covering modular design, object-oriented concepts, exception handling, and standard library mastery."
    },
    { 
        title: "C Programming 3.4.0", 
        issuer: "Spoken Tutorial · IIT Bombay",
        date: "2022",
        skills: "Pointers, Dynamic Memory, Algorithms, Data Structures",
        credentialId: "IITB-ST-C-2022",
        details: "Foundational low-level systems programming certification covering memory management, pointer arithmetic, and algorithmic structures."
    },
    { 
        title: "C++ 3.5.0 Advanced", 
        issuer: "Spoken Tutorial · IIT Bombay",
        date: "2023",
        skills: "C++, Templates, STL, Polymorphism, OOP Design",
        credentialId: "IITB-ST-CPP-2023",
        details: "Object-oriented software development certification focusing on Standard Template Library (STL), memory safety, and inheritance models."
    },
    { 
        title: "Build with Gemini AI Studio & Antigravity", 
        issuer: "Google AI Workshop",
        date: "2024",
        skills: "Multimodal LLMs, Prompt Engineering, Agentic Workflows, Gemini API",
        credentialId: "GOOGLE-AI-GEMINI-2024",
        details: "Hands-on engineering workshop on building LLM agents, function calling, tool use, and multimodal AI product integration."
    },
    { 
        title: "AI-Ready Individual Recognition", 
        issuer: "CSI AI 100K Readiness Program",
        date: "2024",
        skills: "Generative AI, Ethics in AI, Neural Networks Basics",
        credentialId: "CSI-AI-100K-REC",
        details: "National-level recognition by Computer Society of India for demonstrating proficiency in modern artificial intelligence workflows."
    },
    { 
        title: "Robotics & Embedded Systems", 
        issuer: "Srishti Innovative Edu. Services",
        date: "2023",
        skills: "Microcontrollers, Sensor Interfacing, Arduino, C",
        credentialId: "SRISHTI-ROBOTICS-2023",
        details: "Applied embedded engineering workshop involving sensor calibration, PWM motor control, and autonomous robotics logic."
    },
    { 
        title: "ICT International Conclave on Skills & Tech", 
        issuer: "ICT Academy International Delegation",
        date: "2024",
        skills: "Industry 4.0, Cloud Computing, Full-Stack Trends",
        credentialId: "ICT-CONCLAVE-2024",
        details: "International summit participation exploring emerging paradigms in cloud engineering, AI ethics, and developer tooling."
    },
];

export const COMMUNITY = [
    {
        role: "Joint Secretary",
        org: "Computer Society of India (CSI) · ASIET",
        period: "2024 — Present",
        note: "Driving large-scale technical symposia, national hackathons, code jams, and student technical outreach across colleges.",
    },
    {
        role: "Program Lead",
        org: "Hack Club · ASIET",
        period: "2024 — Present",
        note: "Championing the on-campus builder movement — hosting weekly ship nights, hardware experiments, and open-source project sprints.",
    },
    {
        role: "Technical Lead",
        org: "AFT — ASIET Fashion Team",
        period: "2024 — Present",
        note: "Fusing technology with stage production — designing synchronized dynamic lighting controllers, AV feeds, and digital show visuals.",
    },
    {
        role: "Technical Lead",
        org: "IEDC · GPTC Perumbavoor",
        period: "2022 — 2024",
        note: "Mentored over 80+ junior engineering students in startup incubation, project prototyping, and regional innovation competitions.",
    },
    {
        role: "Active Volunteer",
        org: "NSS (National Service Scheme) · ASIET",
        period: "2024 — Present",
        note: "Leading digital literacy drives for rural schools, environmental conservation camps, and community blood donation initiatives.",
    },
];

export const POSTS = [
    {
        id: "data-notebook",
        title: "Why every developer should keep a data notebook",
        tag: "Data Science",
        read: "5 min read",
        date: "August 2026",
        excerpt:
            "How small, daily exploratory notebooks fundamentally changed the way I think about debugging, hypothesis validation, and building full-stack products.",
        content: `
### The Power of Scratchpad Thinking

When I first transitioned from pure web development into Data Science, I treated Jupyter notebooks as purely academic tools. But within months, they became my primary engineering scratchpad.

#### 1. Faster Hypothesis Testing
Instead of writing complex API handlers or frontend state machines blindly, loading a dataframe or raw JSON payload into a quick notebook allows you to inspect data distributions, edge cases, null values, and structure within seconds.

#### 2. Visual Debugging
Seeing distribution histograms and scatter plots makes API performance bottlenecks or anomalous data shapes immediately obvious. 

#### 3. Living Documentation
A clean notebook with markdown explanations and live output cells serves as indisputable proof that an algorithm or data transformation works as intended.

**Key Takeaway:** Don't just write code; explore the shape of your data first. It saves hours of downstream refactoring.
        `
    },
    {
        id: "diploma-to-btech",
        title: "From Diploma to B.Tech — what I'd tell my younger self",
        tag: "Journey",
        read: "7 min read",
        date: "July 2026",
        excerpt:
            "Lessons from switching academic tracks, leading student clubs, and realizing that building things in public is the greatest shortcut to genuine learning.",
        content: `
### Shifting Paradigms

Moving from a 3-year hands-on Computer Engineering Diploma to a rigorous Data Science B.Tech degree gave me a rare dual perspective: the raw practical instinct of getting things to run on bare metal, paired with the theoretical depth of statistical computation.

#### Focus on Fundamentals First
Frameworks come and go every 18 months, but core understanding of memory, data structures, linear algebra, and network protocols remains immutable.

#### The Magic of Learning in Public
The moment I started sharing my weekend experiments on GitHub and organizing student hackathons, my technical growth accelerated tenfold. When you teach someone else how to build something, you truly understand it yourself.

#### Build Cross-Disciplinary Bridges
The strongest engineers aren't just coders — they understand product strategy, user empathy, and how to communicate complex technical ideas to non-technical stakeholders.
        `
    },
    {
        id: "building-communities",
        title: "Building communities that actually build things",
        tag: "Leadership",
        read: "6 min read",
        date: "June 2026",
        excerpt:
            "Notes from running Hack Club and CSI at ASIET — how to move away from passive lectures and foster a fierce ship-or-die builder culture.",
        content: `
### Moving Beyond Slide Decks

Most college clubs fall into the trap of hosting passive seminars where 50 students sit quietly watching someone talk through PowerPoint slides. At ASIET Hack Club, we decided to ban passive presentations.

#### Rule #1: Hands on Keyboards by Minute 10
Every session begins with 10 minutes of setup, followed by 90 minutes of active coding. By the end of the session, everyone must push a live demo URL.

#### Rule #2: Celebrate the Ugly First Draft
Perfection is the enemy of shipping. A janky prototype that runs locally is infinitely better than a polished idea that only exists in someone's head.

#### Rule #3: Peer Mentorship Over Top-Down Authority
When senior students sit side-by-side with freshers, debugging their errors in real time, imposter syndrome dissolves instantly.
        `
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
