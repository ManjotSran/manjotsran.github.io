const CONFIG = {
  profile: {
    name: "Manjot Singh Sran",
    title: "Incoming Ph.D. Student in Computer Science",
    subtitle: "Multimodal AI, Fusion & Soft Computing",
    tagline: ["a researcher", "a computer scientist", "a machine learning engineer"],
    bio: "I am an incoming Ph.D. student in Computer Science at the University of Manitoba (starting Sept. 2026), where I will be supervised by Dr. Mengjun Hu and Dr. Sheela Ramanna. I recently graduated with an M.S. in Applied Computer Science from the University of Winnipeg with a GPA of 4.375/4.5 and the highest distinction.",
    bioDetailed: "My research centers on developing multimodal AI methods for reliable prediction across heterogeneous data modalities. I design and analyze fusion architectures (including Mixture-of-Experts, gating mechanisms, and shared-private representation learning) with a focus on robustness to noise and missing modalities. Additionally, I integrate deep-learning-based fusion with uncertainty-aware soft-computing techniques like tolerance near sets to manage ambiguity.",
    avatar: "assets/img/avatar.png",
    email: "sran-m36@webmail.uwinnipeg.ca",
    location: "Winnipeg, MB, Canada",
    footerTagline: "Focusing on robust, trustworthy, and scalable AI solutions.",
    socials: {
      scholar: "https://scholar.google.com/citations?user=nuR-Zg4AAAAJ&hl=en",
      linkedin: "https://www.linkedin.com/in/manjot-singh-sran-ab6001273",
      github: "https://github.com/ManjotSran",
      resume: "Manjot_Sran_CV.pdf"
    }
  },
  interests: [
    {
      title: "Multimodal Fusion & Architectures",
      description: "Designing early, mid, late fusion networks with attention, gating, and Mixture-of-Experts (MoE) routing."
    },
    {
      title: "Representation Learning",
      description: "Developing shared-private feature disentanglement frameworks to capture cross-modal interactions."
    },
    {
      title: "Uncertainty Management",
      description: "Leveraging tolerance near sets and ambiguity-aware clustering to quantify and manage prediction uncertainty."
    }
  ],
  education: [
    {
      institution: "University of Manitoba, Winnipeg, Canada",
      degree: "Incoming Ph.D. Student in Computer Science",
      period: "Starting Sept. 2026",
      details: "Supervisors: Dr. Mengjun Hu and Dr. Sheela Ramanna"
    },
    {
      institution: "The University of Winnipeg, Winnipeg, Canada",
      degree: "M.S. in Applied Computer Science",
      period: "Jan. 2024 – May 2026",
      details: "<b>GPA: 4.375 / 4.5</b><br>Thesis: <i>SPriG-TLC: A Novel Framework for Shared-Only Fusion with Private Feature Regulation and Tolerance-Based Ambiguity-Aware Clustering for Multimodal Affective Computing</i><br><b>Thesis passed with distinction</b>. Supervisor: Dr. Sheela Ramanna"
    },
    {
      institution: "IKG Punjab Technical University, Jalandhar, India",
      degree: "B.Tech. in Computer Science and Engineering",
      period: "June 2019 – June 2023",
      details: "<b>Graduated with Distinction | CGPA: 8.83 / 10 (88.3%)</b><br>Tier-1 accredited program by NBA (National Board of Accreditation, India)"
    }
  ],
  skills: {
    ml_dl: [
      "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face Transformers", 
      "OpenCV", "torchvision", "librosa"
    ],
    genai: [
      "LangChain", "LangGraph", "LlamaIndex", "OpenAI API", 
      "RAG (Retrieval-Augmented)", "Vertex AI"
    ],
    languages: [
      "Python", "C", "C++", "JavaScript", "Solidity"
    ],
    web_db: [
      "HTML", "CSS", "Bootstrap", "Django", "Flask", "jQuery", 
      "SQL (PostgreSQL/Access)", "SQLite", "XML"
    ],
    systems: [
      "Linux", "Git", "Docker", "Cisco Packet Tracer"
    ]
  },
  experience: [
    {
      role: "Teaching Assistant (Applications of Database Systems - ACS-2814)",
      company: "University of Winnipeg",
      period: "Sept. 2025 – Dec. 2025",
      details: [
        "Led weekly labs and tutorials on ER modeling, database normalization, and SQL (DDL/DML) query design.",
        "Provided office-hours support to students, troubleshooting configurations in MS Access and SQL Server.",
        "Assisted with quizzes/exams administration and delivered actionable feedback on query optimization."
      ]
    },
    {
      role: "Senior Research Assistant",
      company: "University of Winnipeg",
      period: "Aug. 2024 – Nov. 2024",
      details: [
        "Collaborated on drafting and reviewing key proposal sections for an NSERC grant application.",
        "Synthesized research objectives, methodologies, and projected impacts to ensure alignment with guidelines.",
        "Managed application deadlines and provided administrative and editorial support to finalize submissions on time."
      ]
    },
    {
      role: "Participant (Pathfinder Cohort)",
      company: "North Forge Founders Program",
      period: "June 2025 – Sept. 2025",
      details: [
        "Participated in a regional startup incubator to accelerate an early-stage digital health venture.",
        "Conducted user research with dementia caregivers to identify unmet needs and support system workflow gaps.",
        "Refined value propositions, business models, and pitched prototypes to mentors and stakeholders."
      ]
    }
  ],
  training: [
    {
      title: "Data Science and Machine Learning",
      provider: "TCIL-IT, Chandigarh, India",
      period: "Jan. 2023 – June 2023",
      details: "Six months of industrial training. Explored ML algorithms, hyperparameter tuning, performance evaluation, and built a cricket score prediction project."
    },
    {
      title: "Blockchain Technology",
      provider: "NIELIT, Chandigarh, India",
      period: "July 2022 – Aug. 2022",
      details: "Six weeks of industrial training. Developed smart contracts using Solidity, studied decentralized applications (DApps), and implemented an Ethereum project."
    },
    {
      title: "Web Technologies",
      provider: "Guru Nanak Dev Engineering College, Ludhiana, India",
      period: "July 2021 – Aug. 2021",
      details: "Four weeks of training. Focused on responsive layouts, accessibility, and web development using HTML, CSS, JavaScript, and Bootstrap."
    }
  ],
  projects: [
    {
      title: "Prompt-to-Video Generation Platform",
      description: "Built an end-to-end prompt-only AI video generation pipeline: user prompt → LLM-based scene planning → SDXL keyframe synthesis → Stable Video Diffusion rendering. Added reliability mechanisms, including quality-gating and automatic fallback retries (seed and tuning adjustments), to improve coherence and reduce identity drift. Deployed with FastAPI backend and Gradio UI.",
      tags: ["FastAPI", "Gradio", "Stable Diffusion", "SVD", "LLMs", "Python"]
    },
    {
      title: "Feature Disentanglement & MoE Fusion for Affective Computing",
      description: "Designed a shared-private disentanglement framework for multimodal affective computing. Implemented sparse top-k Mixture-of-Experts fusion with joint-router and separate-router variants. Evaluated on five benchmarks for sentiment intensity prediction and emotion classification across tri-modal settings, with complete expert-usage analysis.",
      tags: ["PyTorch", "Mixture of Experts", "Sentiment Analysis", "Representation Learning"]
    },
    {
      title: "Exploring Audio-Visual Fusion Strategies",
      description: "Conducted a comparative analysis of Early, Mid, and Late fusion strategies for Speech Emotion Recognition using Wav2Vec2 audio features and VideoMAE video features. Achieved 95.39% accuracy on RAVDESS and 86.84% accuracy on CREMA-D with Late Fusion techniques, demonstrating the strength of decision-level fusion.",
      tags: ["Wav2Vec2", "VideoMAE", "PyTorch", "Emotion Recognition"]
    },
    {
      title: "KD-Tree Construction and Search Algorithms",
      description: "Implemented KD-tree construction for managing k-dimensional data attributes. Developed Exact, Range, and Nearest Neighbor search algorithms. Optimized for execution speed and compared performance directly against linear brute-force search.",
      tags: ["Algorithms", "C++", "Data Structures", "Optimization"]
    },
    {
      title: "Employee Management Systems Web Application",
      description: "Built a secure full-stack web application with Python and Django framework. Implemented CRUD operations with Django ORM on SQLite. Designed a user-friendly UI for adding, deleting, filtering, and updating employee records.",
      tags: ["Django", "SQLite", "Python", "Web Development"]
    }
  ],
  news: [
    {
      date: "07/2026",
      text: "Our paper <b>SPriG: Shared-Only Fusion with Improvement-Guided Private Gating for Multimodal Affective Computing</b> has been published online in <i>Information Fusion (Elsevier)</i> [Impact Factor: 17.4]!",
      link: "https://doi.org/10.1016/j.inffus.2026.104606"
    },
    {
      date: "05/2026",
      text: "Completed my M.S. in Applied Computer Science at The University of Winnipeg. My thesis passed with distinction! Awarded the Graduate Studies Scholarship.",
      link: null
    },
    {
      date: "04/2026",
      text: "Honored with the competitive <b>Graduate Student Research Award (GSRA)</b> ($7,000) from The University of Winnipeg.",
      link: null
    },
    {
      date: "09/2025",
      text: "Presented a research talk on <b>Robust Alzheimer's Disease Detection via Multimodal Fusion</b> at the University of Winnipeg Physics Colloquium.",
      link: null
    },
    {
      date: "09/2025",
      text: "Served as a Teaching Assistant for Applications of Database Systems at the University of Winnipeg (Fall Term).",
      link: null
    },
    {
      date: "06/2025",
      text: "Participated in North Forge's Founders Program (Pathfinder Cohort) to accelerate an early-stage digital health startup.",
      link: null
    },
    {
      date: "03/2025",
      text: "Presented 'Advancing Emotion Recognition with Artificial Intelligence' at UWinnipeg's 3MT (Three-Minute Thesis) competition.",
      link: null
    },
    {
      date: "08/2024",
      text: "Joined the University of Winnipeg as a Senior Research Assistant, drafting and developing proposal objectives for NSERC grant applications.",
      link: null
    }
  ],
  publications: [
    {
      title: "SPriG: Shared-Only Fusion with Improvement-Guided Private Gating for Multimodal Affective Computing",
      authors: "<b>Manjot Singh Sran</b>, Sheela Ramanna",
      venue: "Information Fusion (Elsevier), Volume 112",
      year: 2026,
      category: "journal",
      publisher: "Elsevier",
      impactFactor: "17.4",
      links: {
        science_direct: "https://doi.org/10.1016/j.inffus.2026.104606"
      }
    },
    {
      title: "DiMoE: Disentangled Representation Learning with Mixture-of-Experts Fusion for Sentiment Intensity Prediction and Emotion Classification",
      authors: "<b>Manjot S. Sran</b>, Sheela Ramanna, Ketan Kotecha",
      venue: "Algorithms (MDPI)",
      year: 2026,
      category: "under-review",
      publisher: "MDPI",
      links: {}
    },
    {
      title: "TLC-STRIDE: An Ambiguity-Aware Framework for Multimodal Sentiment Prediction",
      authors: "<b>Manjot S. Sran</b>, Sheela Ramanna",
      venue: "Elsevier Journal",
      year: 2026,
      category: "under-review",
      publisher: "Elsevier",
      links: {}
    }
  ],
  certifications: [
    {
      title: "Explainable Machine Learning (XAI)",
      issuer: "Duke University",
      date: "March 2025"
    },
    {
      title: "NLP: Twitter Sentiment Analysis",
      issuer: "Coursera Project Network",
      date: "March 2025"
    },
    {
      title: "Google AI Essentials",
      issuer: "Google",
      date: "Nov. 2024"
    },
    {
      title: "Deep Learning",
      issuer: "Illinois Institute of Technology",
      date: "Nov. 2024"
    },
    {
      title: "Critical Thinking for Better Decisions in the ChatGPT Era",
      issuer: "Deep Teaching Solutions",
      date: "Nov. 2024"
    },
    {
      title: "Data Science Math Skills",
      issuer: "Duke University",
      date: "Aug. 2024"
    },
    {
      title: "Deep Learning Applications for Computer Vision",
      issuer: "University of Colorado Boulder",
      date: "Aug. 2024"
    },
    {
      title: "Mathematics for Machine Learning: Multivariate Calculus",
      issuer: "Imperial College London",
      date: "Aug. 2024"
    },
    {
      title: "CS50 SQL (Databases)",
      issuer: "Harvard University",
      date: "Dec. 2023"
    },
    {
      title: "CS50B (CS for Business)",
      issuer: "Harvard University",
      date: "Sept. 2023"
    },
    {
      title: "CS50x (Introduction to Computer Science)",
      issuer: "Harvard University",
      date: "Aug. 2023"
    },
    {
      title: "Google Data Analytics",
      issuer: "Google on Coursera",
      date: "May 2023"
    },
    {
      title: "Python for Data Science and Machine Learning",
      issuer: "Udemy",
      date: "April 2023"
    },
    {
      title: "CS50's Introduction to Programming with Python",
      issuer: "Harvard University",
      date: "Feb. 2023"
    },
    {
      title: "Blockchain Technology Training Certificate",
      issuer: "NIELIT, Chandigarh",
      date: "Dec. 2022"
    }
  ],
  awards: [
    {
      title: "Graduate Student Research Award (GSRA)",
      issuer: "The University of Winnipeg",
      date: "April 2026",
      details: "Competitive $7,000 graduate research award recognizing student-led research excellence."
    },
    {
      title: "Graduate Studies Scholarship",
      issuer: "The University of Winnipeg",
      date: "May 2026, Aug 2025, May 2025, July 2024",
      details: "Academic scholarships awarded throughout the Master's program."
    }
  ]
};
