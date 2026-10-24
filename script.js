// 年份
document.getElementById('year').textContent = new Date().getFullYear();

// 移动端菜单
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('is-open'))
);

// 滚动入场
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 灯箱：视频播放
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

function openVideo(src) {
  lightboxImg.style.display = 'none';
  lightboxImg.src = '';
  lightboxImg.hidden = true;
  lightboxPrev.style.display = 'none';
  lightboxNext.style.display = 'none';
  lightboxCounter.style.display = 'none';
  lightboxVideo.hidden = false;
  lightboxVideo.style.display = 'block';
  lightboxVideo.src = src;
  lightbox.hidden = false;
  lightboxVideo.play().catch(() => {});
}
function openImage(src) {
  closeVideo();
  lightboxImg.src = src;
  lightboxImg.hidden = false;
  lightboxImg.style.display = '';
  lightboxPrev.style.display = 'none';
  lightboxNext.style.display = 'none';
  lightboxCounter.style.display = 'none';
  lightbox.hidden = false;
}
function closeVideo() {
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.style.display = 'none';
  lightboxVideo.hidden = true;
  lightboxVideo.load();
}
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  closeVideo();
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// AIGC 作品列表面板
const worksPanel = document.getElementById('worksPanel');
const worksPanelClose = document.getElementById('worksPanelClose');
const tileAigc = document.getElementById('tileAigc');

function openWorksPanel() {
  worksPanel.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeWorksPanel() {
  worksPanel.hidden = true;
  document.body.style.overflow = '';
}
tileAigc.addEventListener('click', openWorksPanel);
worksPanelClose.addEventListener('click', closeWorksPanel);
worksPanel.addEventListener('click', e => {
  if (e.target.dataset.close) closeWorksPanel();
});
// 点击列表项 -> 关闭面板并展示作品（视频 / 图片 / 外部链接）
worksPanel.querySelectorAll('.works-item__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    closeWorksPanel();
    if (btn.dataset.link) {
      window.open(btn.dataset.link, '_blank', 'noopener');
    } else if (btn.dataset.image) {
      openImage(btn.dataset.image);
    } else {
      openVideo(btn.dataset.video);
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!worksPanel.hidden) { closeWorksPanel(); return; }
  if (!lightbox.hidden) closeLightbox();
});
