// ========== 多语言系统（支持 data-lang + 导航栏文本） ==========
const selector = document.getElementById("langSelector");

function updateLanguage() {
    const lang = selector.value;

    // ① 隐藏所有 data-lang
    document.querySelectorAll("[data-lang]").forEach(el => {
        el.style.display = "none";
    });

    // ② 显示当前选择语言
    document.querySelectorAll(`[data-lang='${lang}']`).forEach(el => {
        el.style.display = "block";
    });

    // ③ 切换旧的导航/标题/描述（你之前的结构）
    if (text[lang]) {
        document.getElementById("navHome").textContent = text[lang].nav[0];
        document.getElementById("navRoom").textContent = text[lang].nav[1];
        document.getElementById("navMap").textContent = text[lang].nav[2];
        document.getElementById("navContact").textContent = text[lang].nav[3];

        if (document.getElementById("title"))
            document.getElementById("title").textContent = text[lang].title;

        if (document.getElementById("desc"))
            document.getElementById("desc").textContent = text[lang].desc;

        if (document.getElementById("btn"))
            document.getElementById("btn").textContent = text[lang].btn;
    }
}

// 初始化执行一次
updateLanguage();

// 监听语言切换
selector.addEventListener("change", updateLanguage);



// =======================
//        轮播系统
// =======================
let currentIndex = 0;
const track = document.querySelector(".carousel-images");
const slides = document.querySelectorAll(".carousel-images img");
const totalSlides = slides.length;

function updateSlide() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// 自动轮播
let autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
}, 3000);

// 上一张
document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
    restartAutoPlay();
});

// 下一张
document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
    restartAutoPlay();
});

// 重启自动轮播
function restartAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }, 3000);
}


// 获取URL参数
function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || 'zh';
}

// 页面加载时
let lang = getLangFromURL();
document.getElementById("langSelector").value = lang;
// 调用语言切换函数
switchLanguage(lang);

// 给导航栏链接加上当前语言
document.querySelectorAll("nav a").forEach(a => {
  const url = new URL(a.href, location.origin);
  url.searchParams.set('lang', lang);
  a.href = url.toString();
});
