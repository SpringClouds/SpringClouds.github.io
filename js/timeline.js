// ========== 终极增强互动 ==========
// 点击展开 + 震动 + 自动关闭其他
document.querySelectorAll('.card').forEach(card => {
  card
.addEventListener('click', () => {
    const parent = card.closest('.timeline-card');
    
    // 震动效果
    card
.classList.add('active');
    setTimeout(()=>card.classList.remove('active'),250);

    // 自动关闭其他
    document.querySelectorAll('.timeline-card').forEach(item => {
      if (item !== parent) item.classList.remove('open');
    });

    parent
.classList.toggle('open');
  });
});

// 滚动依次动画 + 延迟
const observer = new IntersectionObserver((entries) => {
  entries
.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(()=>{
        entry
.target.classList.add('visible');
      }, i * 180);
    }
  });
}, { threshold:0.1, rootMargin:'0px 0px -60px 0px' });

document.querySelectorAll('.timeline-card').forEach(c => observer.observe(c));