// 时间轴数据
const timelineData = [
    {
        dynasty: '商周时期',
        title: '礼制初成',
        desc: '四合院布局雏形出现，台基、木构架技术成熟。青铜器纹样应用于建筑装饰，奠定中国建筑的礼制基础。',
        year: '约公元前1600年 - 公元前256年'
    },
    {
        dynasty: '秦汉时期',
        title: '高台雄风',
        desc: '高台建筑兴盛，斗拱出现，砖石结构发展。阿房宫、未央宫等巨型宫殿群建成，"秦砖汉瓦"成为经典。',
        year: '公元前221年 - 公元220年'
    },
    {
        dynasty: '隋唐时期',
        title: '技术巅峰',
        desc: '建筑技术高峰，赵州桥建成，长安城规划严谨。佛光寺大殿为现存最古木构建筑之一，斗拱硕大雄浑。',
        year: '581年 - 907年'
    },
    {
        dynasty: '宋元时期',
        title: '法式规范',
        desc: '《营造法式》颁布，建筑标准化。园林艺术成熟，晋祠圣母殿为宋代代表作，装修精细，色彩华丽。',
        year: '960年 - 1368年'
    },
    {
        dynasty: '明清时期',
        title: '集大成者',
        desc: '紫禁城建成，官式建筑高度标准化。园林艺术巅峰，徽派、岭南等地方风格成熟，呈现百花齐放之势。',
        year: '1368年 - 1912年'
    }
];

// 初始化时间轴
function initTimeline() {
    const container = document.getElementById('timelineRiver');
    if (!container) {
        console.error('找不到时间轴容器 #timelineRiver');
        return;
    }

    console.log('初始化历史长河模块...');

    // 生成时间轴HTML
    let html = `
        <div class="timeline-river">
            <div class="river-flow"></div>
    `;

    timelineData.forEach((item, index) => {
        html += `
            <div class="timeline-boat" data-index="${index}">
                <div class="boat-sail"></div>
                <div class="boat-body">
                    <span class="dynasty-badge">${item.dynasty}</span>
                    <h3 style="margin-bottom: 10px; font-size: 1.3em;">${item.title}</h3>
                    <p style="line-height: 1.8; opacity: 0.95;">${item.desc}</p>
                    <div class="water-ripple"></div>
                </div>
                <div class="timeline-compass">${item.dynasty.substring(0, 2)}</div>
                <div class="ripple"></div>
                <div class="ripple"></div>
                <div class="ripple"></div>
                <div class="boat-anchor">⚓</div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-boat').forEach(item => {
        observer.observe(item);
    });

    console.log('历史长河模块初始化完成');
}

// 页面加载时自动初始化
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
});