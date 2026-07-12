/* ==========================================================================
   Premium Personal Portfolio Script Engine
   Handles dynamic loading, theme switching, publications filter, search,
   typewriter effect, and modal interactions.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure CONFIG is loaded
  if (typeof CONFIG === "undefined") {
    console.error("CONFIG data not found. Please ensure config.js is loaded before script.js.");
    return;
  }

  // Initialize UI components
  initTheme();
  loadProfileData();
  initTypewriter();
  renderInterests();
  renderEducation();
  renderSkills();
  renderNews();
  renderExperience();
  renderTraining();
  renderProjects();
  renderPublications();
  renderAwards();
  renderCertifications();
  
  initHeaderEffects();
  initMobileNav();
  initBibtexModal();
  initBackToTop();
  
  // Initial call to render SVG icons
  lucide.createIcons();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light/Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  } else {
    // Default to dark mode (per user guidelines, rich aesthetics dark mode feels premium)
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");

    const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
  });
}

/* --------------------------------------------------------------------------
   2. Profile & Info Population
   -------------------------------------------------------------------------- */
function loadProfileData() {
  const profile = CONFIG.profile;

  // Set Document Title
  document.title = profile.name + " | Multimodal AI Researcher";

  // Set Header Logo Text
  const nameParts = profile.name.split(" ");
  const logoName = nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}` : profile.name;
  document.getElementById("logo-text").textContent = logoName;

  // Hero Section
  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-subtitle").textContent = profile.title + " | " + profile.subtitle;
  
  const avatarImg = document.getElementById("profile-avatar");
  avatarImg.src = profile.avatar;
  avatarImg.alt = profile.name + " Photo";
  avatarImg.onerror = () => {
    // Fallback if avatar image fails to load
    avatarImg.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"; // Aesthetic abstract art
  };

  const cvBtn = document.getElementById("cv-download-btn");
  cvBtn.href = profile.socials.resume || "#";
  if (!profile.socials.resume) {
    cvBtn.style.display = "none";
  }

  // Social Links in Hero
  const socialsContainer = document.getElementById("hero-socials");
  socialsContainer.innerHTML = "";
  
  const socialIcons = {
    scholar: { icon: "graduation-cap", label: "Google Scholar" },
    linkedin: { icon: "linkedin", label: "LinkedIn" },
    github: { icon: "github", label: "GitHub" },
    resume: { icon: "file-text", label: "Resume" }
  };

  Object.entries(profile.socials).forEach(([platform, url]) => {
    if (!url) return;
    const configItem = socialIcons[platform];
    if (!configItem) return;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "social-icon-btn";
    a.setAttribute("aria-label", configItem.label);
    
    if (platform === "linkedin") {
      a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9" rx="1"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
    } else if (platform === "github") {
      a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
    } else {
      a.innerHTML = `<i data-lucide="${configItem.icon}"></i>`;
    }
    
    socialsContainer.appendChild(a);
  });

  // About Me Section
  document.getElementById("info-affiliation").innerHTML = profile.affiliation || profile.location;
  document.getElementById("info-email").textContent = profile.email;
  document.getElementById("info-location").textContent = profile.location;
  document.getElementById("about-bio").innerHTML = profile.bio;
  document.getElementById("about-bio-detailed").innerHTML = profile.bioDetailed;

  // Footer
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  document.getElementById("footer-logo-name").textContent = profile.name;
  document.getElementById("footer-name").textContent = profile.name;
  document.getElementById("footer-tagline").textContent = profile.footerTagline || "Focusing on robust, trustworthy, and scalable AI solutions.";
}

/* --------------------------------------------------------------------------
   3. Typewriter Animation for Taglines
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const words = CONFIG.profile.tagline;
  const typewriterText = document.getElementById("typewriter-text");
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      // Add character
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Typing speed
    }

    // Word completed typing
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at full word
      isDeleting = true;
    } 
    // Word fully cleared
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  if (words && words.length > 0) {
    type();
  }
}

/* --------------------------------------------------------------------------
   4. Research Interests Grid
   -------------------------------------------------------------------------- */
function renderInterests() {
  const container = document.getElementById("interests-container");
  container.innerHTML = "";

  CONFIG.interests.forEach(interest => {
    const card = document.createElement("div");
    card.className = "interest-card glass-panel";
    card.innerHTML = `
      <h3>${interest.title}</h3>
      <p>${interest.description}</p>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   5. Education Timeline
   -------------------------------------------------------------------------- */
function renderEducation() {
  const container = document.getElementById("education-timeline");
  container.innerHTML = "";

  CONFIG.education.forEach(edu => {
    const item = document.createElement("div");
    item.className = "edu-item";
    item.innerHTML = `
      <div class="edu-meta">
        <h4 class="edu-degree">${edu.degree}</h4>
        <span class="edu-period">${edu.period}</span>
      </div>
      <p class="edu-institution">${edu.institution}</p>
      <p class="edu-details">${edu.details}</p>
    `;
    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   6. Technical Skills Grid
   -------------------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById("skills-container");
  container.innerHTML = "";

  const categories = {
    ml_dl: "Machine Learning & Deep Learning",
    genai: "Generative AI & LLMs",
    languages: "Programming Languages",
    web_db: "Web Development & Databases",
    systems: "Systems & Version Control"
  };

  Object.entries(CONFIG.skills).forEach(([key, list]) => {
    const categoryTitle = categories[key] || key.toUpperCase();
    
    const block = document.createElement("div");
    block.className = "skills-category-block";
    
    let badgesHtml = "";
    list.forEach(skill => {
      badgesHtml += `<span class="skill-badge">${skill}</span>`;
    });

    block.innerHTML = `
      <h4>${categoryTitle}</h4>
      <div class="skills-badges-list">
        ${badgesHtml}
      </div>
    `;
    container.appendChild(block);
  });
}

/* --------------------------------------------------------------------------
   7. News Timeline
   -------------------------------------------------------------------------- */
function renderNews() {
  const timeline = document.getElementById("news-timeline");
  timeline.innerHTML = "";

  if (!CONFIG.news || CONFIG.news.length === 0) {
    timeline.innerHTML = "<p class='text-muted'>No news updates yet.</p>";
    return;
  }

  CONFIG.news.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "timeline-item";
    
    let linkHtml = "";
    if (item.link) {
      linkHtml = `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="timeline-link">Learn More <i data-lucide="external-link"></i></a>`;
    }

    itemDiv.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card glass-panel">
        <div class="timeline-meta">
          <span class="timeline-date">${item.date}</span>
        </div>
        <p class="timeline-title">${item.text}</p>
        ${linkHtml}
      </div>
    `;
    timeline.appendChild(itemDiv);
  });
}

/* --------------------------------------------------------------------------
   8. Experience Timeline
   -------------------------------------------------------------------------- */
function renderExperience() {
  const container = document.getElementById("work-experience-timeline");
  container.innerHTML = "";

  CONFIG.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "exp-item";
    
    let detailsHtml = "";
    exp.details.forEach(bullet => {
      detailsHtml += `<li>${bullet}</li>`;
    });

    let linkHtml = "";
    if (exp.link) {
      linkHtml = `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="exp-link" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-top: 0.75rem; text-decoration: none;"><i data-lucide="external-link" style="width: 14px; height: 14px; display: inline-block;"></i> Read News Article</a>`;
    }

    item.innerHTML = `
      <div class="exp-header">
        <h4 class="exp-role">${exp.role}</h4>
        <span class="exp-period">${exp.period}</span>
      </div>
      <p class="exp-company">${exp.company}</p>
      <ul class="exp-details">
        ${detailsHtml}
      </ul>
      ${linkHtml}
    `;
    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   9. Industrial Training Timeline
   -------------------------------------------------------------------------- */
function renderTraining() {
  const container = document.getElementById("training-timeline");
  container.innerHTML = "";

  CONFIG.training.forEach(train => {
    const item = document.createElement("div");
    item.className = "training-item glass-panel";
    item.innerHTML = `
      <div class="training-meta">
        <h4 class="training-title">${train.title}</h4>
        <span class="training-period">${train.period}</span>
      </div>
      <p class="training-provider">${train.provider}</p>
      <p class="training-desc">${train.details}</p>
    `;
    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   10. Projects Grid
   -------------------------------------------------------------------------- */
function renderProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  CONFIG.projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card glass-panel";

    let tagsHtml = "";
    project.tags.forEach(tag => {
      tagsHtml += `<span class="project-tag">${tag}</span>`;
    });

    card.innerHTML = `
      <div class="project-info">
        <div class="project-header-row">
          <div class="project-icon-box">
            <i data-lucide="folder-git-2"></i>
          </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
      </div>
      <div class="project-footer">
        <div class="project-tags" style="margin-bottom: 1.25rem;">
          ${tagsHtml}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   11. Publications rendering, filter & search
   -------------------------------------------------------------------------- */
let activeCategory = "all";
let searchQuery = "";

function renderPublications() {
  const container = document.getElementById("publications-container");
  const clearBtn = document.getElementById("search-clear-btn");
  const countText = document.getElementById("pubs-count-text");

  // Filtering publications
  const filtered = CONFIG.publications.filter(pub => {
    const matchesCategory = activeCategory === "all" || pub.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.venue.toLowerCase().includes(query) ||
      pub.year.toString().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Clear search button visibility
  if (searchQuery.trim().length > 0) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }

  // Update counts
  if (filtered.length === 0) {
    countText.textContent = "No publications match your criteria.";
    container.innerHTML = `
      <div class="no-results glass-panel" style="padding: 3rem; text-align: center; color: var(--text-muted);">
        <i data-lucide="file-warning" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--secondary);"></i>
        <p>We couldn't find any publications matching "${searchQuery}" in this category.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  countText.textContent = `Showing ${filtered.length} of ${CONFIG.publications.length} publications.`;
  container.innerHTML = "";

  // Render cards
  filtered.forEach((pub, index) => {
    const card = document.createElement("div");
    card.className = "pub-card glass-panel";
    
    // Category Badge
    let badgeClass = "badge-conference";
    let badgeText = "Conference";
    if (pub.category === "journal") {
      badgeClass = "badge-journal";
      badgeText = "Journal";
    } else if (pub.category === "under-review") {
      badgeClass = "badge-review";
      badgeText = "Preprint / Review";
    }

    // Impact Factor / Publisher Tag details
    let impactHtml = "";
    if (pub.impactFactor) {
      impactHtml = `<span class="pub-badge badge-journal" style="background: rgba(251,191,36,0.1); border-color: rgba(251,191,36,0.25); color: #fbbf24;">Impact Factor: ${pub.impactFactor}</span>`;
    }

    // Links buttons
    let linksHtml = "";
    if (pub.links) {
      const linkConfig = {
        arxiv: { label: "arXiv", icon: "file-text" },
        project: { label: "Project Page", icon: "globe" },
        code: { label: "Code", icon: "github" },
        ieee: { label: "IEEE Xplore", icon: "external-link" },
        science_direct: { label: "ScienceDirect", icon: "external-link" },
        springer: { label: "Springer", icon: "external-link" }
      };

      Object.entries(pub.links).forEach(([key, url]) => {
        if (!url) return;
        const details = linkConfig[key] || { label: key.toUpperCase(), icon: "link-2" };
        let iconHtml = `<i data-lucide="${details.icon}"></i>`;
        if (details.icon === "github") {
          iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
        }
        linksHtml += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="pub-link-btn">
            ${details.icon === "github" ? iconHtml : iconHtml + " "}${details.label}
          </a>
        `;
      });
    }

    // Always append a dynamically generated BibTeX button
    linksHtml += `
      <button class="pub-link-btn bibtex-btn" data-pub-index="${index}">
        <i data-lucide="quote"></i> BibTeX
      </button>
    `;

    // Supplementary Note
    const noteHtml = pub.note ? `<span class="pub-note">${pub.note}</span>` : "";

    card.innerHTML = `
      <div class="pub-header">
        <span class="pub-badge ${badgeClass}">${badgeText}</span>
        ${impactHtml}
        <span class="pub-year">${pub.year}</span>
      </div>
      <h3 class="pub-title">${pub.title}</h3>
      <p class="pub-authors">${pub.authors}</p>
      <p class="pub-venue">${pub.venue}</p>
      ${noteHtml}
      <div class="pub-links">
        ${linksHtml}
      </div>
    `;

    container.appendChild(card);
  });

  // Re-run lucide on the dynamically created icons
  lucide.createIcons();

  // Attach BibTeX event listeners to the new buttons
  document.querySelectorAll(".bibtex-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const pubIdx = parseInt(e.currentTarget.getAttribute("data-pub-index"));
      const pub = filtered[pubIdx];
      showBibtexModal(pub);
    });
  });
}

// Search and Filter Listeners
document.getElementById("pub-search").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderPublications();
});

document.getElementById("search-clear-btn").addEventListener("click", () => {
  document.getElementById("pub-search").value = "";
  searchQuery = "";
  renderPublications();
});

const filterTabs = document.querySelectorAll(".filter-tab");
filterTabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    filterTabs.forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.getAttribute("data-category");
    renderPublications();
  });
});

/* --------------------------------------------------------------------------
   12. BibTeX Citation Generator & Modal
   -------------------------------------------------------------------------- */
function generateBibTeX(pub) {
  const cleanAuthors = pub.authors.replace(/<\/?b>/g, "").replace(/\*/g, "").trim();
  const firstAuthorLastName = cleanAuthors.split(" ")[0].replace(/[^a-zA-Z]/g, "") || "sran";
  const bibKey = `${firstAuthorLastName.toLowerCase()}${pub.year}${pub.title.split(" ")[0].toLowerCase().replace(/[^a-z]/g, "")}`;
  
  let entryType = "inproceedings";
  let booktitleOrJournalField = "booktitle";

  if (pub.category === "journal") {
    entryType = "article";
    booktitleOrJournalField = "journal";
  } else if (pub.category === "under-review") {
    entryType = "misc";
    booktitleOrJournalField = "howpublished";
  }

  let bibtex = `@${entryType}{${bibKey},\n`;
  bibtex += `  title={${pub.title}},\n`;
  bibtex += `  author={${cleanAuthors.replace(/\s+/g, " ")}},\n`;
  
  if (pub.category === "under-review") {
    bibtex += `  howpublished={arXiv preprint},\n`;
  } else {
    bibtex += `  ${booktitleOrJournalField}={${pub.venue}},\n`;
  }
  
  bibtex += `  year={${pub.year}}\n`;
  bibtex += `}`;
  
  return bibtex;
}

function initBibtexModal() {
  const modal = document.getElementById("bibtex-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const copyBtn = document.getElementById("modal-copy-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  copyBtn.addEventListener("click", () => {
    const bibtexCode = document.getElementById("bibtex-code").textContent;
    navigator.clipboard.writeText(bibtexCode).then(() => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i data-lucide="check"></i> Copied!`;
      lucide.createIcons();
      copyBtn.disabled = true;

      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        lucide.createIcons();
        copyBtn.disabled = false;
      }, 2000);
    }).catch(err => {
      console.error("Clipboard copy failed:", err);
    });
  });
}

function showBibtexModal(pub) {
  const modal = document.getElementById("bibtex-modal");
  const codeBlock = document.getElementById("bibtex-code");
  
  codeBlock.textContent = generateBibTeX(pub);
  modal.classList.add("open");
}

/* --------------------------------------------------------------------------
   13. Awards & Certifications
   -------------------------------------------------------------------------- */
function renderAwards() {
  const container = document.getElementById("awards-container");
  container.innerHTML = "";

  CONFIG.awards.forEach(award => {
    const item = document.createElement("div");
    item.className = "award-item glass-panel";
    item.innerHTML = `
      <div class="award-trophy-box">
        <i data-lucide="trophy"></i>
      </div>
      <div class="award-info">
        <h4 class="award-title">${award.title}</h4>
        <span class="award-issuer">${award.issuer}</span>
        <span class="award-date">${award.date}</span>
        <p class="award-desc">${award.details}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderCertifications() {
  const container = document.getElementById("certs-container");
  container.innerHTML = "";

  CONFIG.certifications.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card glass-panel";
    card.innerHTML = `
      <h4 class="cert-title">${cert.title}</h4>
      <span class="cert-issuer">${cert.issuer}</span>
      <span class="cert-date">${cert.date}</span>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   14. References

/* --------------------------------------------------------------------------
   15. Sticky Header & Active ScrollSpy
   -------------------------------------------------------------------------- */
function initHeaderEffects() {
  const header = document.getElementById("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let currentSectionId = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 120) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   16. Mobile Menu Logic
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMenu() {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  mobileToggle.addEventListener("click", toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   17. Floating Scroll-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
