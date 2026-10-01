// ---------------------------------------------------------
// Projects
// ---------------------------------------------------------
const PROJECTS = [
  {
    title: "d4clans",
    description: "A Minecraft plugin that adds a full clan/team system to any server — creation, membership, and team management built directly into gameplay.",
    tags: ["Java", "Spigot/Paper API", "Minecraft Plugin"],
    url: "https://builtbybit.com/resources/d4clans.94866/?ref=discover",
    image: "https://builtbybit.com/attachments/ig_0d226009fc022c8d016a249ed7c0f48191b4a2e023df0e8516-png.1361896/?preset=fullr1"
  }
  // add future projects here: { title, description, tags, url, image }
];

// ---------------------------------------------------------
// Skills
// ---------------------------------------------------------
const SKILLS = {
  languages: ["Java", "HTML", "JavaScript", "Python"],
  focus: ["Minecraft plugin development"],
  tools: ["IntelliJ IDEA"]
};

// ---------------------------------------------------------
// Hero terminal typed text
// ---------------------------------------------------------
const INTRO_LINES = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "d4nymr, Java Developer" },
  { type: "prompt", text: "cat focus.txt" },
  { type: "output", text: "Building Minecraft plugins with Java, learning something new with every release." }
];

function renderProjects(){
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card">
      <img class="project-image" src="${p.image}" alt="${p.title} cover image">
      <div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join("")}
        </div>
      </div>
      <a class="project-link" href="${p.url}" target="_blank" rel="noopener">open →</a>
    </article>
  `).join("");
}

function renderSkills(){
  const box = document.getElementById("skillsJson");
  if (!box) return;
  const entries = Object.entries(SKILLS);
  const rows = entries.map(([key, values], i) => {
    const comma = i < entries.length - 1 ? "," : "";
    const list = values.map(v => `<span class="sval">"${v}"</span>`).join(', ');
    return `<div class="srow"><span class="skey">"${key}"</span>: [${list}]${comma}</div>`;
  }).join("");
  box.innerHTML = `<span class="brace">{</span>${rows}<span class="brace">}</span>`;
}

function typeTerminal(){
  const body = document.getElementById("terminalBody");
  if (!body) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion){
    body.innerHTML = INTRO_LINES.map(line =>
      line.type === "prompt"
        ? `<p><span class="prompt">$</span> ${line.text}</p>`
        : `<p class="output">${line.text}</p>`
    ).join("") + `<span class="cursor">▌</span>`;
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;

  function typeNextChar(){
    if (lineIndex >= INTRO_LINES.length){
      body.insertAdjacentHTML("beforeend", `<span class="cursor">▌</span>`);
      return;
    }

    const line = INTRO_LINES[lineIndex];
    let currentP = document.getElementById(`termline-${lineIndex}`);
    if (!currentP){
      currentP = document.createElement("p");
      currentP.id = `termline-${lineIndex}`;
      if (line.type === "prompt"){
        currentP.innerHTML = `<span class="prompt">$</span> <span class="typed"></span>`;
      } else {
        currentP.className = "output";
        currentP.innerHTML = `<span class="typed"></span>`;
      }
      body.appendChild(currentP);
    }

    const typedSpan = currentP.querySelector(".typed");
    typedSpan.textContent = line.text.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex >= line.text.length){
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 260);
    } else {
      setTimeout(typeNextChar, 22);
    }
  }

  typeNextChar();
}

function setupNavToggle(){
  const btn = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

function setupScrollSpy(){
  const tabs = document.querySelectorAll(".tab[data-section]");
  const sections = Array.from(tabs)
    .map(t => document.getElementById(t.dataset.section))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        tabs.forEach(t => t.classList.toggle("active", t.dataset.section === entry.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(s => observer.observe(s));
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects();
renderSkills();
typeTerminal();
setupNavToggle();
setupScrollSpy();