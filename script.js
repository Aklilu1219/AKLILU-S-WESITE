/* ==========================================================================
   Aklilu Workineh - Full Stack Developer Portfolio
   External JavaScript (script.js)
   ========================================================================== */

/* 1. Typing Animation Effect */
const words = [
    "Full Stack Web Applications",
    "Node.js & Express REST APIs",
    "Modern React & TypeScript SPAs",
    "Scalable Database Architectures",
    "Academic Management Systems",
     "UI/UX Designer",
      "E_COMMERANCE"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

/* 2. Seasonal Aurora Palettes */
const SEASONS = [
    { key: "spring", label: "Spring build", icon: "fa-seedling" },
    { key: "summer", label: "Summer build", icon: "fa-sun" },
    { key: "autumn", label: "Autumn build", icon: "fa-leaf" },
    { key: "winter", label: "Winter build", icon: "fa-snowflake" }
];

let seasonIndex = 0;

function applySeason(index) {
    const season = SEASONS[index];
    document.documentElement.setAttribute("data-season", season.key);

    const tag = document.getElementById("season-tag");
    if (tag) {
        tag.innerHTML = `<i class="fas ${season.icon}"></i> ${season.label}`;
    }
}

function startSeasonCycle() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        applySeason(0);
        return;
    }
    applySeason(seasonIndex);
    setInterval(() => {
        seasonIndex = (seasonIndex + 1) % SEASONS.length;
        applySeason(seasonIndex);
    }, 8000);
}

/* 3. Theme Toggle (Dark / Light) */
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("portfolio_theme", next);

    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.className = next === "light" ? "fas fa-sun" : "fas fa-moon";
    }
}

function initTheme() {
    const saved = localStorage.getItem("portfolio_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.className = saved === "light" ? "fas fa-sun" : "fas fa-moon";
    }
}

/* 4. Navigation & Mobile Menu */
function toggleMobileNav() {
    const navList = document.getElementById("nav-list");
    const menuToggle = document.getElementById("menu-toggle");
    if (!navList) return;

    const isOpen = navList.classList.toggle("responsive");
    if (menuToggle) {
        menuToggle.innerHTML = isOpen ? "&#10005;" : "&#9776;";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll("#nav-list a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const navList = document.getElementById("nav-list");
            if (navList) navList.classList.remove("responsive");
            const menuToggle = document.getElementById("menu-toggle");
            if (menuToggle) menuToggle.innerHTML = "&#9776;";
        });
    });

    // Back to top button
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Scroll spy
    if ("IntersectionObserver" in window) {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        navLinks.forEach((l) => {
                            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
                        });
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );
        sections.forEach((sec) => observer.observe(sec));
    }
}

/* 5. Live In-Browser Document Viewer (CV & Cover Letter) */
let currentDoc = "cv";
let isEditingDoc = false;

function openDocModal(type) {
    currentDoc = type || "cv";
    switchDocTab(currentDoc);
    const modal = document.getElementById("doc-modal");
    if (modal) modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeDocModal() {
    const modal = document.getElementById("doc-modal");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function switchDocTab(type) {
    currentDoc = type;
    const cvTabBtn = document.getElementById("tab-btn-cv");
    const clTabBtn = document.getElementById("tab-btn-cl");
    const cvContent = document.getElementById("doc-content-cv");
    const clContent = document.getElementById("doc-content-cl");
    const modalTitle = document.getElementById("doc-modal-title");

    if (type === "cv") {
        if (cvTabBtn) cvTabBtn.classList.add("active");
        if (clTabBtn) clTabBtn.classList.remove("active");
        if (cvContent) cvContent.style.display = "block";
        if (clContent) clContent.style.display = "none";
        if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-file-alt"></i> Curriculum Vitae (CV)';
    } else {
        if (clTabBtn) clTabBtn.classList.add("active");
        if (cvTabBtn) cvTabBtn.classList.remove("active");
        if (clContent) clContent.style.display = "block";
        if (cvContent) cvContent.style.display = "none";
        if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-envelope-open-text"></i> Cover Letter';
    }
}

function toggleEditDoc() {
    isEditingDoc = !isEditingDoc;
    const paper = document.getElementById("paper-canvas");
    const editBtn = document.getElementById("btn-edit-doc");
    if (!paper) return;

    paper.classList.toggle("is-editing", isEditingDoc);
    const editableFields = paper.querySelectorAll(".editable-field");

    editableFields.forEach((field) => {
        field.contentEditable = String(isEditingDoc);
    });

    if (editBtn) {
        editBtn.innerHTML = isEditingDoc
            ? '<i class="fas fa-eye"></i> View Mode'
            : '<i class="fas fa-edit"></i> Edit Mode';
    }
}

function printDocument() {
    window.print();
}

function copyDocumentText() {
    let text = "";
    if (currentDoc === "cv") {
        const cvEl = document.getElementById("doc-content-cv");
        text = cvEl ? cvEl.innerText : "";
    } else {
        const clEl = document.getElementById("doc-content-cl");
        text = clEl ? clEl.innerText : "";
    }

    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById("btn-copy-doc");
        if (copyBtn) {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
        }
    });
}

function downloadDocumentText() {
    const filename = currentDoc === "cv" ? "Aklilu_Workineh_CV.txt" : "Aklilu_Workineh_Cover_Letter.txt";
    let text = "";
    if (currentDoc === "cv") {
        const cvEl = document.getElementById("doc-content-cv");
        text = cvEl ? cvEl.innerText : "";
    } else {
        const clEl = document.getElementById("doc-content-cl");
        text = clEl ? clEl.innerText : "";
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openCleanTab() {
    const url = currentDoc === "cv" ? "cv.html" : "cover-letter.html";
    window.open(url, "_blank");
}

/* 6. VS Code Project Export Modal */
function openVsCodeModal() {
    const modal = document.getElementById("vscode-modal");
    if (modal) modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeVsCodeModal() {
    const modal = document.getElementById("vscode-modal");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "auto";
}

const VSCODE_FILES = {
    "index.html": `<!-- Aklilu Workineh - Full Stack Developer Portfolio -->
<!DOCTYPE html>
<html lang="en" data-theme="dark" data-season="spring">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aklilu Workineh | Full Stack Developer</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Complete Portfolio Sections -->
    <script src="script.js"></script>
</body>
</html>`,
    "style.css": `/* Aklilu Workineh Portfolio External Stylesheet */
:root {
    --bg-color: #0a0e1a;
    --card-bg: #131a2b;
    --text-color: #e8ecf5;
    --accent-color: #38bdf8;
    --accent-2: #34d399;
}
/* Theme & seasonal styles... */`,
    "script.js": `// Interactive typing effect, seasonal aurora & document modal
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    startSeasonCycle();
    initTheme();
});`,
    "README.md": `# Aklilu Workineh - Portfolio Project for VS Code

## How to Run in Visual Studio Code:
1. Extract the downloaded archive.
2. Open the folder in VS Code (\`File > Open Folder\`).
3. Right click \`index.html\` and select "Open with Live Server", or double click \`index.html\` to open directly in any web browser.
4. Enjoy inspecting and editing the code!`
};

function selectCodeFile(filename) {
    const tabs = document.querySelectorAll(".code-tab-btn");
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.file === filename));

    const codePre = document.getElementById("code-preview");
    if (codePre && VSCODE_FILES[filename]) {
        codePre.textContent = VSCODE_FILES[filename];
    }
}

function copyCodeSnippet() {
    const codePre = document.getElementById("code-preview");
    if (!codePre) return;

    navigator.clipboard.writeText(codePre.textContent).then(() => {
        const copyBtn = document.getElementById("btn-copy-snippet");
        if (copyBtn) {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
        }
    });
}

async function downloadVsCodeZip() {
    const downloadBtn = document.getElementById("btn-download-zip");
    if (downloadBtn) {
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bundling Files...';
        downloadBtn.disabled = true;
    }

    try {
        // Check for JSZip
        if (typeof JSZip === "undefined") {
            // Load JSZip dynamically if not already in window
            await new Promise((resolve, reject) => {
                const s = document.createElement("script");
                s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        const zip = new JSZip();

        // Fetch current live file contents
        const [htmlRes, cssRes, jsRes] = await Promise.all([
            fetch("index.html").catch(() => null),
            fetch("style.css").catch(() => null),
            fetch("script.js").catch(() => null),
        ]);

        const htmlText = htmlRes && htmlRes.ok ? await htmlRes.text() : VSCODE_FILES["index.html"];
        const cssText = cssRes && cssRes.ok ? await cssRes.text() : VSCODE_FILES["style.css"];
        const jsText = jsRes && jsRes.ok ? await jsRes.text() : VSCODE_FILES["script.js"];

        zip.file("index.html", htmlText);
        zip.file("style.css", cssText);
        zip.file("script.js", jsText);
        zip.file("README.md", VSCODE_FILES["README.md"]);

        // Fetch profile photo
        try {
            const imgRes = await fetch("Asset3.jpg");
            if (imgRes.ok) {
                const imgBlob = await imgRes.blob();
                zip.file("Asset3.jpg", imgBlob);
            }
        } catch (e) {
            console.warn("Could not bundle Asset3.jpg", e);
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Aklilu_Workineh_Portfolio_VSCode.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Full Project (.ZIP)';
                downloadBtn.disabled = false;
            }, 3000);
        }
    } catch (err) {
        console.error("ZIP creation failed:", err);
        alert("Failed to build ZIP file automatically. You can download individual files below.");
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Full Project (.ZIP)';
            downloadBtn.disabled = false;
        }
    }
}

/* 7. Contact Form Dispatcher */
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
        return;
    }

    const subject = `Portfolio Inquiry from ${name}`;
    const body = `${message}\n\n— Sent by: ${name} (${email})`;
    const mailto = `mailto:akliluworkineh699@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    document.getElementById("contact-form").reset();
    alert("Thank you! Your default mail client has been opened to send this message.");
}

/* Modal ESC Key and Backdrop Clicks */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDocModal();
        closeVsCodeModal();
    }
});

document.addEventListener("click", (e) => {
    const docModal = document.getElementById("doc-modal");
    const vsModal = document.getElementById("vscode-modal");
    if (e.target === docModal) closeDocModal();
    if (e.target === vsModal) closeVsCodeModal();
});

/* Lifecycle Initialization */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    startSeasonCycle();
    typeEffect();
    initNavigation();
});
