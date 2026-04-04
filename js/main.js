// ========== 页面加载初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 2000);
    
    // 初始化滚动动画
    initScrollAnimation();
    
    // 初始化营造技艺交互
    initStructureDiagram();
    
    // 初始化时间轴动画
    initTimeline();
    
    // 初始化侧边栏
    initSidebar();
    
    // 初始化花瓣飘落效果
    initPetals();
    
    // 初始化鼠标跟随墨迹
    initInkTrail();
    
    // 初始化卡片3D倾斜
    initCardTilt();
    
    // 初始化模态框关闭
    initModalClose();
});

// ========== 滚动动画 ==========
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-section').forEach(section => {
        observer.observe(section);
    });
}

// ========== 侧边栏功能 ==========
function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const dragEl = document.getElementById('sidebarDrag');
    
    if (toggleBtn && sidebarMenu) {
        toggleBtn.addEventListener('click', () => {
            sidebarMenu.classList.toggle('collapsed');
            toggleBtn.textContent = sidebarMenu.classList.contains('collapsed') ? '+' : '−';
        });
    }
    
    // 侧边栏拖动
    if (dragEl) {
        let isDragging = false;
        let offsetX, offsetY;
        
        dragEl.addEventListener('mousedown', (e) => {
            if (e.target.closest('.sidebar-header')) {
                isDragging = true;
                offsetX = e.clientX - dragEl.offsetLeft;
                offsetY = e.clientY - dragEl.offsetTop;
                dragEl.style.cursor = 'grabbing';
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            dragEl.style.left = `${e.clientX - offsetX}px`;
            dragEl.style.top = `${e.clientY - offsetY}px`;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            dragEl.style.cursor = 'move';
        });
    }
    
    // 侧边栏平滑滚动
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== 飘落花瓣效果 ==========
function initPetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.opacity = Math.random();
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.getElementById('petals-container').appendChild(petal);
        
        setTimeout(() => petal.remove(), 8000);
    }, 300);
}

// ========== 鼠标跟随墨迹效果 ==========
function initInkTrail() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            const ink = document.createElement('div');
            ink.style.position = 'fixed';
            ink.style.left = e.clientX + 'px';
            ink.style.top = e.clientY + 'px';
            ink.style.width = '20px';
            ink.style.height = '20px';
            ink.style.background = 'rgba(0,0,0,0.1)';
            ink.style.borderRadius = '50%';
            ink.style.pointerEvents = 'none';
            ink.style.zIndex = '9999';
            ink.style.animation = 'fadeOut 2s forwards';
            
            document.body.appendChild(ink);
            setTimeout(() => ink.remove(), 2000);
        }
    });
    
    // 添加淡出动画
    const style = document.createElement('style');
    style.textContent = `@keyframes fadeOut { to { opacity: 0; transform: scale(2); } }`;
    document.head.appendChild(style);
}

// ========== 卡片3D倾斜效果 ==========
function initCardTilt() {
    document.querySelectorAll('.building-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========== 模态框功能 ==========
function initModalClose() {
    // 点击模态框外部关闭
    window.onclick = function(event) {
        const modal = document.getElementById('detailModal');
        if (event.target == modal) {
            closeModal();
        }
        const partModal = document.getElementById('partModal');
        if (event.target == partModal) {
            closePartModal();
        }
    };
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closePartModal();
        }
    });
}

// ========== 建筑详情数据 ==========
const buildingData = {
    forbidden: {
        title: '北京紫禁城',
        subtitle: 'The Forbidden City',
        image: "image/z1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">
                紫禁城始建于明永乐四年（1406年），建成于永乐十八年（1420年），占地面积72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。
            </p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑特色</h3>
            <ul style="line-height: 2; margin-left: 20px; margin-bottom: 20px;">
                <li><strong>中轴对称：</strong>整个宫殿群沿南北中轴线严格对称布局，体现皇权至高无上</li>
                <li><strong>前朝后寝：</strong>外朝以太和、中和、保和三大殿为中心，内廷以乾清宫、交泰殿、坤宁宫为中心</li>
                <li><strong>黄色琉璃瓦：</strong>屋顶满铺黄色琉璃瓦，象征皇权，是最高等级的建筑色彩</li>
                <li><strong>重檐庑殿顶：</strong>太和殿采用最高等级的屋顶形式，四面斜坡，一条正脊，四条垂脊</li>
            </ul>
            <h3 style="color: #8B1A1A; margin: 20px 0;">文化价值</h3>
            <p style="line-height: 2;">1987年被列入《世界文化遗产名录》，是世界上现存规模最大、保存最为完整的木质结构古建筑之一，被誉为世界五大宫之首。</p>
        `
    },
    potala: {
        title: '拉萨布达拉宫',
        subtitle: 'Potala Palace',
        image: "image/b1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">布达拉宫始建于公元7世纪吐蕃王朝松赞干布时期，17世纪重建后成为历代达赖喇嘛的冬宫居所，也是西藏政教合一的统治中心。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑布局</h3>
            <ul style="line-height: 2; margin-left: 20px; margin-bottom: 20px;">
                <li><strong>白宫：</strong>达赖喇嘛的冬宫居所，墙身涂白色象征平静</li>
                <li><strong>红宫：</strong>历代达赖喇嘛的灵塔殿和各类佛殿，墙身涂红色象征威严</li>
                <li><strong>依山而建：</strong>建筑群依山垒砌，群楼重叠，殿宇嵯峨</li>
                <li><strong>金顶：</strong>顶部采用鎏金铜瓦，在阳光下金光闪闪</li>
            </ul>
            <h3 style="color: #8B1A1A; margin: 20px 0;">艺术成就</h3>
            <p style="line-height: 2;">宫内珍藏大量佛像、壁画、唐卡、经书等文物，是藏民族建筑艺术和文化遗产的杰出代表，1994年被列入《世界文化遗产名录》。</p>
        `
    },
    county: {
        title: '平遥县衙',
        subtitle: 'Pingyao County Office',
        image: "image/p1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">平遥县衙坐落于平遥古城中心，始建于北魏，定型于元明清，保存下来最早的建筑建于元至正六年（1346年），距今已有六百多年历史。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑格局</h3>
            <ul style="line-height: 2; margin-left: 20px; margin-bottom: 20px;">
                <li><strong>六进院落：</strong>中轴线上有大门、大堂、宅门、二堂、内宅、大仙楼六进院落</li>
                <li><strong>左文右武：</strong>东侧为粮厅、花厅等文职机构，西侧为牢房、督捕厅等武职机构</li>
                <li><strong>前朝后寝：</strong>前部为办公区域，后部为县令及家眷生活区域</li>
            </ul>
            <h3 style="color: #8B1A1A; margin: 20px 0;">历史价值</h3>
            <p style="line-height: 2;">是中国现存保存最完整的四大古衙之一，也是全国现存规模最大的县衙，为研究中国古代县级政权机构提供了珍贵的实物资料。</p>
        `
    },
    confucius: {
        title: '曲阜孔庙',
        subtitle: 'Qufu Confucius Temple',
        image: "image/k1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">曲阜孔庙是祭祀中国古代著名思想家和教育家孔子的祠庙，始建于鲁哀公十七年（公元前478年），历代增修扩建。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑规模</h3>
            <ul style="line-height: 2; margin-left: 20px; margin-bottom: 20px;">
                <li><strong>九进院落：</strong>南北长0.6公里，东西宽0.15公里，共有九进院落</li>
                <li><strong>五殿：</strong>大成殿、奎文阁、杏坛、圣迹殿、启圣殿等</li>
            </ul>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑特色</h3>
            <p style="line-height: 2;">大成殿与故宫太和殿、岱庙天贶殿并称"东方三大殿"，1994年被列入《世界文化遗产名录》。</p>
        `
    },
    courtyard: {
        title: '北京四合院',
        subtitle: 'Siheyuan',
        image: "image/s1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑特色</h2>
            <p style="line-height: 2; margin-bottom: 20px;">四合院是中国北方的传统民居形式，以北京四合院最为典型。其布局以南北纵轴对称布置，坐北朝南，大门一般开在东南角。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">文化内涵</h3>
            <p style="line-height: 2;">四合院体现了中国传统的宗法礼制观念，长幼有序，男女有别，内外有别。</p>
        `
    },
    tulou: {
        title: '福建土楼',
        subtitle: 'Fujian Tulou',
        image: "image/t1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">福建土楼产生于宋元，成熟于明末、清代和民国时期，是客家人聚族而居的堡垒式住宅。2008年被列入《世界文化遗产名录》。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑类型</h3>
            <ul style="line-height: 2; margin-left: 20px;">
                <li><strong>圆楼：</strong>最富盛名，如承启楼、振成楼，象征团圆</li>
                <li><strong>方楼：</strong>四角规整，如遗经楼</li>
                <li><strong>五凤楼：</strong>府第式土楼，三堂两横</li>
            </ul>
        `
    },
    hui: {
        title: '徽派建筑',
        subtitle: 'Hui Style Architecture',
        image: "image/h1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑特色</h2>
            <p style="line-height: 2; margin-bottom: 20px;">徽派建筑流行于安徽南部及江西、浙江部分地区，以粉墙黛瓦、马头墙、砖木石雕为特征，是江南民居的代表。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑元素</h3>
            <ul style="line-height: 2; margin-left: 20px;">
                <li><strong>马头墙：</strong>阶梯状山墙，防火防盗</li>
                <li><strong>四水归堂：</strong>天井院落，雨水流入院内</li>
                <li><strong>三雕艺术：</strong>砖雕、木雕、石雕装饰精美</li>
            </ul>
        `
    },
    zhaozhou: {
        title: '赵州桥',
        subtitle: 'Zhaozhou Bridge',
        image: "image/zh1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">赵州桥位于河北省赵县，由隋代工匠李春设计建造，距今已有1400多年历史，是世界上现存年代最久远、跨度最大、保存最完整的单孔坦弧敞肩石拱桥。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">技术创新</h3>
            <ul style="line-height: 2; margin-left: 20px;">
                <li><strong>敞肩拱：</strong>在大拱两端各设两个小拱，世界桥梁史上的首创</li>
                <li><strong>纵向并列砌筑：</strong>28道独立拱券并列组成</li>
            </ul>
        `
    },
    luzhou: {
        title: '卢沟桥',
        subtitle: 'Marco Polo Bridge',
        image: "image/l1.jpg",
        content: `
            <h2 style="color: #8B1A1A; margin-bottom: 20px;">建筑概况</h2>
            <p style="line-height: 2; margin-bottom: 20px;">卢沟桥位于北京西南，始建于金大定二十九年（1189年），是北京现存最古老的石造联拱桥。</p>
            <h3 style="color: #8B1A1A; margin: 20px 0;">建筑结构</h3>
            <ul style="line-height: 2; margin-left: 20px;">
                <li><strong>联拱石桥：</strong>全长266.5米，11孔不等跨圆拱</li>
                <li><strong>望柱石狮：</strong>281根望柱，柱头雕刻石狮501个</li>
            </ul>
        `
    }
};

// ========== 打开模态框 ==========
function openModal(id) {
    const data = buildingData[id];
    if (!data) return;
    
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <img src="${data.image}" style="width: 100%; height: 400px; object-fit: cover; margin-bottom: 30px; border: 3px solid var(--gold);">
        <h1 style="font-size: 2.5em; color: var(--primary-red); margin-bottom: 10px;">${data.title}</h1>
        <p style="color: #999; margin-bottom: 30px;">${data.subtitle}</p>
        ${data.content}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ========== 关闭模态框 ==========
function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closePartModal() {
    const modal = document.getElementById('partModal');
    if (modal) modal.style.display = 'none';
}

// ========== 部件介绍弹窗 ==========
function openPartModal() {
    document.getElementById('partModal').style.display = 'flex';
}

// ========== 滚动视差效果 ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.ink-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========== 返回顶部按钮功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // 监听滚动事件，控制按钮显示/隐藏
    window.addEventListener('scroll', function() {
        // 滚动超过300px时显示按钮
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击按钮返回顶部
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 可选：添加点击音效
        if (typeof AudioManager !== 'undefined' && AudioManager.playClick) {
            AudioManager.playClick();
        }
    });
});