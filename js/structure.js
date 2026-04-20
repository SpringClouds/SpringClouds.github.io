// ========== 营造典籍 · 创意交互终极版 ==========
document.addEventListener('DOMContentLoaded', function () {
  const cover = document.getElementById('bookCover');
  const toggleBtn = document.getElementById('toggleDetail');
  const readDemo = document.getElementById('readDemo');
  const detail = document.getElementById('bookDetail');
  const tabItems = document.querySelectorAll('.tab-item');
  const knowledgeContent = document.getElementById('knowledgeContent');

  let isOpen = false;

  // 知识内容
  const knowledgeData = {
    know1: "【榫卯】一凹一凸咬合而成，不用一钉一胶，让木构建筑千年不倒，是中国古建的灵魂技艺。",
    know2: "【斗拱】立柱与横梁间的承重构件，既能分散屋顶压力，又是建筑等级与美学的核心象征。",
    know3: "【飞檐】向上弯曲的屋檐曲线，实现排水、采光、美学三合一，是东方建筑独有的标志性造型。",
    know4: "【彩画】古代建筑的等级语言，和玺、旋子、苏式三大类，兼具装饰、祈福与身份象征。"
  };

  // ------------------------------
  // 3D书本效果
  // ------------------------------
  cover.style.transition = "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
  cover.addEventListener('mousemove', (e) => {
    const rect = cover.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    cover.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
  });
  cover.addEventListener('mouseleave', () => {
    cover.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

  // ------------------------------
  // 按钮微动效
  // ------------------------------
  [toggleBtn, readDemo].forEach(btn => {
    btn.style.transition = "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)";
    btn.addEventListener("mousedown", () => btn.style.transform = "scale(0.96)");
    btn.addEventListener("mouseup", () => btn.style.transform = "scale(1)");
    btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
  });

  // ------------------------------
  // 展开/收起
  // ------------------------------
  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    detail.style.maxHeight = isOpen ? "1000px" : "0";
    detail.style.opacity = isOpen ? "1" : "0";
    toggleBtn.innerHTML = isOpen ? "📘 收起介绍" : "🔍 展开完整介绍";
    toggleBtn.style.background = isOpen ? "#8b0000" : "#b11";
  });

  // ------------------------------
  // 真实试读
  // ------------------------------
  readDemo.addEventListener('click', () => {
    const demoContent = `
<!DOCTYPE html>
<meta charset="utf-8">
<title>《营造技艺》正版试读</title>
<style>
body{max-width:850px;margin:30px auto;padding:25px;font-size:17px;line-height:1.9;font-family:微软雅黑}
h1{color:#900;text-align:center}
h2{color:#b11;margin-top:30px;border-left:6px solid #b11;padding-left:12px}
.yuwen{font-family:宋体;font-size:19px;line-height:2.2;background:#f8f5f0;padding:15px;border-radius:8px}
.baihua{color:#666;margin-top:10px}
</style>
<h1>《营造技艺》· 正版试读章节</h1>
<h2>第一章：榫卯——木作之始</h2>
<div class="yuwen">
凡构屋之制，以木为本。柱梁相承，榫卯相契，不用一钉，而屋自固。
<br><br>
榫者，木之凸也；卯者，木之凹也。一榫一卯，相合为用，乃古匠不传之秘。
</div>
<div class="baihua">
【白话】：建房以木材为根本，柱梁支撑、榫卯咬合，不用钉子也能坚固千年。
</div>

<h2>第二章：斗拱——屋之权衡</h2>
<div class="yuwen">
斗拱者，所以载梁，而持檐也。
层叠而上，散力于柱，使屋不倾。
古之殿堂，唯皇家可用重拱重昂，以示等级。
</div>
<div class="baihua">
【白话】：斗拱支撑屋顶、分散重量，是古建“减震器”，也是皇家等级的象征。
</div>

<h2>第三章：飞檐——曲而成美</h2>
<div class="yuwen">
檐者，屋之翼也。曲而向上，以泄雨，以纳光，以观美。
</div>
<div class="baihua">
【白话】：飞檐如房屋翅膀，弯曲造型兼具排水、采光与东方美学。
</div>

<br>
<p style="color:#900;font-weight:bold;text-align:center;">—— 正版书籍试读结束 ——</p>
`;
    const w = window.open('', '_blank', 'width=880,height:750');
    w.document.write(demoContent);
    w.document.close();
  });

  // ------------------------------
  // ✅ 创意知识标签切换（超级好看）
  // ------------------------------
  tabItems.forEach((tab, index) => {
    // 创意古风样式
    tab.style.padding = "10px 20px";
    tab.style.background = "#fff";
    tab.style.borderRadius = "30px";
    tab.style.cursor = "pointer";
    tab.style.border = "1px solid #e0d0b0";
    tab.style.transition = "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
    tab.style.fontWeight = "500";
    tab.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";

    // 悬浮：发光 + 上浮
    tab.addEventListener("mouseenter", () => {
      tab.style.transform = "translateY(-3px) scale(1.08)";
      tab.style.boxShadow = "0 6px 12px rgba(180, 0, 0, 0.15)";
      tab.style.borderColor = "#b11";
    });

    tab.addEventListener("mouseleave", () => {
      tab.style.transform = "translateY(0) scale(1)";
      tab.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
    });

    // 点击：高亮 + 内容淡入动画
    tab.addEventListener("click", () => {
      tabItems.forEach(t => {
        t.style.background = "#fff";
        t.style.color = "#333";
        t.style.borderColor = "#e0d0b0";
      });
      tab.style.background = "linear-gradient(135deg, #b11, #8b0000)";
      tab.style.color = "#fff";
      tab.style.borderColor = "#8b0000";

      // 创意淡入动画
      knowledgeContent.style.opacity = 0;
      knowledgeContent.style.transform = "translateY(10px)";
      setTimeout(() => {
        knowledgeContent.innerText = knowledgeData[tab.dataset.target];
        knowledgeContent.style.opacity = 1;
        knowledgeContent.style.transform = "translateY(0)";
      }, 80);
    });
  });
});