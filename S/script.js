const body = document.body;
const dialog = document.querySelector("#article-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const dialogLede = document.querySelector("#dialog-lede");
const dialogBody = document.querySelector("#dialog-body");
const dialogImage = document.querySelector("#dialog-image");
const toast = document.querySelector(".toast");
const themeButton = document.querySelector(".theme-toggle");
const root = document.documentElement;
const pixelCursors = document.querySelectorAll(".pixel-cursor");

// 修改文章内容就在这里：标题、摘要、配图、正文段落都可以直接改。
const articles = {
  "好的设计，不是让人惊叹，而是让人松一口气": {
    kicker: "DESIGN BRAIN / EP.01",
    lede: "有时候，最棒的体验不是让人“哇”，而是让人用完之后轻轻地说一句：原来可以这么简单。",
    image: "assets/pink-closeup.jpeg",
    alt: "粉色双马尾动漫角色头像",
    body: [
      "设计的价值，经常发生在你没有意识到它的时候。一次清楚的提示，一个恰到好处的默认值，或是一条不用来回寻找的路径，都会让事情轻一点。",
      "我越来越相信，创作者的工作不是制造更多注意力，而是把注意力还给真正重要的人和事。"
    ]
  },
  "给自己搭一个不会内耗的个人系统": {
    kicker: "SYSTEM CTRL / EP.02",
    lede: "把脑内的线团整理一下，再把精力还给真正重要的事。",
    image: "assets/blue-maid.webp",
    alt: "蓝发动漫角色插画",
    body: [
      "我把个人系统想成一间有很多抽屉的小房间。灵感放在手边，待办有自己的位置，暂时做不到的事也可以被温柔地收起来。",
      "系统不是为了把每天塞满，而是为了让你在疲惫的时候，仍然知道下一步该往哪里走。"
    ]
  },
  "在城市里散步，是一种低成本的远行": {
    kicker: "LIFE LINE / EP.03",
    lede: "绕一点路，去看看城市藏在转角里的小彩蛋。",
    image: "assets/cat-cafe.webp",
    alt: "动漫角色在猫咪咖啡馆里休息",
    body: [
      "散步最迷人的地方，是它不要求你抵达任何地方。你可以因为一家新开的店停下来，也可以因为一只晒太阳的猫改变路线。",
      "城市不会主动把秘密递给你，但它会在你放慢速度之后，开始露出一些可爱的细节。"
    ]
  },
  "少即是多？先问问什么是“少”": {
    kicker: "DESIGN BRAIN / EP.04",
    lede: "不是把东西删光，而是把最喜欢的那一个留下来。",
    image: "assets/purple-closeup.webp",
    alt: "紫色眼睛的动漫角色特写",
    body: [
      "“少”不是空白，也不是一种看起来很高级的克制。对我来说，它更像是把无关的声音调低，让真正想说的话变得清晰。",
      "每一次删减都应该回答一个问题：留下来的东西，是否值得被看见？"
    ]
  }
};

function syncThemeButton() {
  const isDark = body.classList.contains("dark");
  themeButton.textContent = isDark ? "☾" : "☼";
  themeButton.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
  themeButton.setAttribute("title", isDark ? "切换浅色模式" : "切换深色模式");
}

if (localStorage.getItem("s-theme") === "dark") {
  body.classList.add("dark");
}

syncThemeButton();

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("s-theme", body.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".post-card[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

function openArticle(title) {
  const article = articles[title] || articles["好的设计，不是让人惊叹，而是让人松一口气"];
  dialogTitle.textContent = title;
  dialogKicker.textContent = article.kicker;
  dialogLede.textContent = article.lede;
  dialogImage.src = article.image;
  dialogImage.alt = article.alt;
  dialogBody.innerHTML = article.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
  dialog.showModal();
}

document.querySelectorAll(".article-link, .read-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openArticle(button.dataset.title);
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

document.querySelectorAll(".gallery-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    lightboxImage.src = tile.dataset.image;
    lightboxImage.alt = tile.dataset.alt;
    lightboxCaption.textContent = tile.dataset.caption;
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const heroImage = document.querySelector("#hero-image");
const heroImages = [
  "assets/red-uniform.jpg",
  "assets/silver-closeup.jpeg",
  "assets/blonde-full.webp",
  "assets/pink-closeup.jpeg"
];
let heroIndex = 0;

window.setInterval(() => {
  heroImage.classList.add("is-changing");
  window.setTimeout(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImage.src = heroImages[heroIndex];
    heroImage.classList.remove("is-changing");
  }, 220);
}, 5200);

const progress = document.querySelector("#scroll-progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mouse-x", `${event.clientX}px`);
  root.style.setProperty("--mouse-y", `${event.clientY}px`);
  root.style.setProperty("--bg-x", `${(event.clientX / window.innerWidth - 0.5) * -28}px`);
  root.style.setProperty("--bg-y", `${(event.clientY / window.innerHeight - 0.5) * -20}px`);
  pixelCursors.forEach((cursor) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    cursor.classList.add("is-active");
  });
}, { passive: true });

window.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget) pixelCursors.forEach((cursor) => cursor.classList.remove("is-active"));
});

window.addEventListener("pointerdown", () => {
  pixelCursors.forEach((cursor) => cursor.classList.add("is-clicking"));
});

window.addEventListener("pointerup", () => {
  pixelCursors.forEach((cursor) => cursor.classList.remove("is-clicking"));
});

document.querySelector("#subscribe-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  document.querySelector("#form-message").textContent = "已加入秘密基地，下一张纸条见。";
  email.value = "";
  toast.textContent = "叮！S 已收到你的邮箱。";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
});
