// ========== 页面加载初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // 终极强制锁定页面顶部
    // ==============================================
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 其他功能正常运行
    initScrollAnimation();
    initStructureDiagram();
    initTimeline();
    initSidebar();
    initPetals();
    initInkTrail();
    initCardTilt();
    initModalClose();
});

// 智能回到顶部 —— 有锚点就不顶，无锚点才回顶
window.addEventListener('DOMContentLoaded', function() {
    // 禁用浏览器自动记忆滚动
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // 如果 URL 没有 #锚点，才回到顶部
    if (!window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }
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
            const rect = card.getBoundingObject();
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
const buildingData = {
    xianyang: {
        title: '秦代咸阳宫',
        subtitle: 'Xianyang Palace',
        image: "image/xian.jpg",
        content: `
            <style>
                /* 标题样式：无缩进，靠左对齐 */
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0; /* 标题强制无缩进 */
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0; /* 标题强制无缩进 */
                    line-height: 1.8;
                }
                /* 段落内容：首行缩进2字符，换行对齐 */
                .arch-item-p {
                    text-indent: 2em; /* 首行缩进2字符 */
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                /* 列表容器：无缩进 */
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                }
                /* 列表项：首行缩进2字符，换行对齐 */
                .arch-item-li {
                    text-indent: 2em; /* 首行缩进2字符 */
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative; /* 用于序号定位 */
                    padding-left: 1.5em; /* 给序号留位置 */
                }
                /* 自定义列表序号，避免缩进影响 */
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em; /* 序号位置固定，不随缩进移动 */
                    top: 0;
                }
                /* 重置列表计数器 */
                .arch-item-ul {
                    counter-reset: li;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                咸阳宫采用“法天象地”的规划形制，以渭河为天上银河，宫殿群沿渭水两岸分布，无固定单一宫墙，形成“渭水贯都，以象天汉”的宏大格局，总面积相当于近百个故宫，是秦代宫殿“多宫制”的核心体现。
            </p>
            <h3 class="arch-title-h3">发展历史</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">始建于战国中期（秦孝公时期），最初为秦都咸阳的宫城雏形，规模较小，仅作为国君居住、理政场所；</li>
                <li class="arch-item-li">秦惠文王时期开始扩建，新增宫殿群落，逐步形成横跨渭水两岸的布局，成为秦国政治中心；</li>
                <li class="arch-item-li">秦始皇统一六国后（公元前221年），大规模扩建，融合各国宫殿建筑风格，增设章台宫、阿房宫（未完工）等，形成空前宏大的宫殿集群；</li>
                <li class="arch-item-li">秦末（公元前206年），项羽攻入咸阳，纵火焚烧咸阳宫，大部分建筑被毁，仅留存部分夯土台基遗迹。</li>
            </ul>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">以夯土为主要建材，建造高大台基，依托黄土山体因地制宜开凿宫殿，节省人力物力；</li>
                <li class="arch-item-li">宫殿顶部覆盖陶瓦，部分核心殿宇采用彩绘装饰，彰显皇权威严，开创秦汉高台建筑先河；</li>
                <li class="arch-item-li">排水系统精巧，利用地形坡度设计暗渠，有效应对北方降水，体现早期工程智慧。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                作为中国第一个大一统王朝的皇宫，咸阳宫承载着秦代“大一统”的政治理念，奠定了中国古代帝国皇宫的规划基础，其“依山为城、傍水为都”的理念，深刻影响了后世未央宫、大明宫等皇家宫殿的建造，成为秦汉建筑文化的源头，见证了秦王朝统一天下的辉煌与兴衰。
            </p>
        `
    },
    weiyang: {
        title: '汉代未央宫',
        subtitle: 'Weiyang Palace',
        image: "image/wei.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                未央宫采用“前朝后寝、中轴对称”的规整形制，总面积约5平方公里，为故宫的6倍，沿中轴线依次分布大门、仪门、前殿、后殿、内宅等建筑，分为行政、居住、祭祀三大功能区域，是中国古代宫城布局的典范。
            </p>
            <h3 class="arch-title-h3">发展历史</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">建于汉高祖七年（公元前200年），由丞相萧何主持建造，最初作为西汉都城长安的皇宫核心，替代临时宫殿长乐宫；</li>
                <li class="arch-item-li">汉惠帝、汉景帝时期，逐步扩建，增设宫殿、园林、祭祀场所，完善宫城功能，形成“前朝后寝”的完整格局；</li>
                <li class="arch-item-li">汉武帝时期（公元前140年-公元前87年），大规模修缮扩建，新增建章宫等附属宫殿，达到规模顶峰；</li>
                <li class="arch-item-li">西汉灭亡后，新莽、东汉、西晋、前赵等十余个朝代沿用未央宫作为理政场所，直至隋代迁都后，逐渐荒废；</li>
                <li class="arch-item-li">2014年，未央宫遗址被列入《世界文化遗产名录》，成为“丝绸之路：长安-天山廊道的路网”的重要组成部分。</li>
            </ul>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">以夯土高台为核心，主体建筑建于高大台基之上，凸显皇权至高无上的地位；</li>
                <li class="arch-item-li">建筑采用木构架体系，屋顶覆盖青瓦，檐角装饰斗拱，结构稳固且兼具观赏性；</li>
                <li class="arch-item-li">殿内采用彩绘、木雕、砖雕等装饰工艺，题材多为祥瑞图案，体现汉代审美风尚。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                未央宫不仅是西汉的政治中心，更是汉文化的核心载体，其布局体现了汉代“礼制为先”的思想。开创的“前朝后寝、中轴对称”布局，被后世历代皇宫沿用千年，被誉为“中国古代宫城建筑的活化石”，见证了西汉400年的兴衰与汉文化的繁荣。
            </p>
        `
    },
    daming: {
        title: '唐代大明宫',
        subtitle: 'Daming Palace',
        image: "image/da.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                大明宫采用“三重殿宇、轴线递进”的形制，占地面积3.2平方公里，相当于4.5个故宫，沿中轴线依次排布含元殿、宣政殿、紫宸殿三大核心殿宇，分为外朝、中朝、内朝三部分，兼具行政、居住、园林、祭祀等多重功能。
            </p>
            <h3 class="arch-title-h3">发展历史</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">始建于唐太宗贞观八年（634年），由唐太宗李世民下令建造，最初为太上皇李渊避暑居住，名为“永安宫”，后改名“大明宫”；</li>
                <li class="arch-item-li">唐高宗龙朔二年（662年），大规模扩建，耗时两年完工，正式成为唐代皇宫，替代太极宫作为政治中心；</li>
                <li class="arch-item-li">武则天时期，进一步修缮扩建，增设明堂、天堂等建筑，完善宫城布局，达到规模顶峰，成为当时世界上最辉煌的宫殿群；</li>
                <li class="arch-item-li">唐末（896年），黄巢起义军攻入长安，大明宫遭到严重破坏，后续又经战乱损毁，逐渐荒废；</li>
                <li class="arch-item-li">1996年，大明宫遗址被列为全国重点文物保护单位；2014年，列入《世界文化遗产名录》，成为“丝绸之路”的重要遗迹。</li>
            </ul>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">采用成熟的木构架体系，斗拱结构精巧，檐角飞翘，屋顶覆盖黄瓦，彰显盛唐皇家气派；</li>
                <li class="arch-item-li">含元殿采用“龙尾道”设计，台阶层层递进，气势磅礴，是唐代建筑艺术的巅峰之作；</li>
                <li class="arch-item-li">园林与宫殿融为一体，引龙首渠水入园，打造山水相依的景观，体现“天人合一”的理念。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                大明宫是盛唐文明的集中体现，其宏大的规模、精湛的工艺，彰显了唐代国力的强盛与开放包容的文化气度。其建筑风格影响了东亚各国的宫殿建造，成为唐代文化对外传播的重要载体，见证了盛唐的辉煌与衰落，是中国宫殿建筑的巅峰之作。
            </p>
        `
    },
    shuntian: {
        title: '顺天府府衙',
        subtitle: 'Shuntian Prefecture',
        image: "image/shun.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                顺天府府衙采用“官署规制、中轴对称”的形制，整体为六进院落，沿中轴线依次布置大门、仪门、大堂、二堂、内宅、后苑，前半部分为行政办公区域，后半部分为官员居住区域，布局规整，等级森严。
            </p>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">主体建筑采用砖木结构，屋顶为硬山顶，覆盖灰瓦，檐下装饰简单斗拱，庄重朴素，符合地方官署规范；</li>
                <li class="arch-item-li">大堂采用“明三暗五”的开间设计，内部宽敞明亮，便于审理案件、处理政务，彰显司法威严；</li>
                <li class="arch-item-li">院落地面铺设青石板，排水系统完善，墙体采用青砖砌筑，坚固耐用，适配北方气候。</li>
            </ul>
            <h3 class="arch-title-h3">历史影响</h3>
            <p class="arch-item-p">
                顺天府府衙见证了元明清三代都城的治理体系，其行政模式、建筑规制成为后世地方首府的典范，为研究古代京畿地区的行政制度、司法体系提供了珍贵的实物例证，承载着明清时期的城市治理文化。
            </p>
        `
    },
    xingbu: {
        title: '刑部衙门',
        subtitle: 'Ministry of Justice',
        image: "image/xing.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                刑部衙门采用“中央官署标准形制”，整体为五进院落，沿中轴线排布大门、仪门、大堂、二堂、档案库，分区明确，前区为审案、办公区域，后区为档案存储、官员值守区域，体现司法机构的严谨性。
            </p>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">建筑采用砖木结构，屋顶为歇山顶，覆盖灰瓦，檐下斗拱规整，装饰简洁庄重，凸显司法机构的严肃性；</li>
                <li class="arch-item-li">大堂内部设置审判台、囚笼等司法设施，地面铺设青石板，便于清洁，适应司法办公需求；</li>
                <li class="arch-item-li">档案库采用防火、防潮设计，墙体厚实，门窗密闭，有效保护律法档案、案件卷宗的完整。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵</h3>
            <p class="arch-item-p">
                刑部衙门作为明清全国最高司法行政机构，其建筑布局、设施配置，体现了古代“礼法结合、依法治世”的理念，是传统律法文化的物质载体，彰显了古代司法体系的严谨与权威。
            </p>
        `
    },
    liangjiang: {
        title: '两江总督府',
        subtitle: 'Liangjiang Governor Office',
        image: "image/du.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                两江总督府采用“军政合一、轴线递进”的形制，整体为七进院落，沿中轴线依次布置大门、仪门、大堂、二堂、三堂、内宅、后苑，前半部分为军政办公区域，后半部分为居住、休闲区域，规模宏大，气势威严。
            </p>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">主体建筑采用砖木结构，屋顶为硬山顶，核心殿宇覆盖黄瓦（彰显封疆大吏地位），檐下斗拱精美，装饰有彩绘、木雕；</li>
                <li class="arch-item-li">大堂采用“明五暗七”的开间设计，内部宽敞，可容纳数百人议事，适配军政办公需求；</li>
                <li class="arch-item-li">设有专门的军事议事厅、粮秣仓储区，墙体坚固，设有防御设施，体现军政合一的特点。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵</h3>
            <p class="arch-item-p">
                两江总督府作为清代最高级别的地方军政衙署，其建筑彰显了封疆大吏的威仪，融合了江南建筑的精巧与北方官署的庄重，承载着清代地方治理、军政管理的文化内涵，是江南地区政治地位的象征。
            </p>
        `
    },
    cave: {
        title: '陕北窑洞',
        subtitle: 'Shaanxi Cave Dwelling',
        image: "image/yao.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                陕北窑洞采用“因地制宜、顺势而建”的形制，主要分为土窑、石窑、砖窑三类，多沿黄土山坡开凿，呈水平排列或阶梯状分布，单孔窑洞为独立居住单元，多孔窑洞相连形成院落，布局简洁实用。
            </p>
            <h3 class="arch-title-h3">为何这样建</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">适配地形：陕北地区黄土层深厚（可达数十米），且黄土直立性好，不易坍塌，适合直接开凿窑洞，无需平整土地、搬运大量建材，节省人力物力；</li>
                <li class="arch-item-li">适配气候：陕北属于温带大陆性气候，冬季严寒、夏季炎热，窑洞墙体厚实、顶部拱形，导热性差，能有效阻隔外界冷热，实现“冬暖夏凉”，减少取暖、降温成本；</li>
                <li class="arch-item-li">适配生活需求：当地百姓以农耕为主，窑洞内部可铺设土炕、砌灶台，兼具居住、烹饪、储物功能，且结构稳固，抵御风沙、暴雨等自然灾害的能力强；</li>
                <li class="arch-item-li">适配经济水平：古代陕北经济落后，缺乏木材、砖瓦等建材，黄土为天然原料，开凿窑洞无需复杂工艺，符合当地百姓的经济条件。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                陕北窑洞是黄土高原劳动人民适应自然环境的智慧结晶，其简洁朴素的建筑风格，彰显了北方人民务实、坚韧的生活态度，承载着陕北地区的民俗文化、生活方式。作为北方黄土高原最具代表性的民居，延续千年，为研究古代北方民居建筑、地域文化提供了重要实物依据，是人与自然和谐共生的典范。
            </p>
        `
    },
    diaojiao: {
        title: '湘黔吊脚楼',
        subtitle: 'Hunan-Guizhou Stilted Building',
        image: "image/jiao.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                湘黔吊脚楼采用“干栏式、依山而建”的形制，多分布于山区、河谷地带，房屋主体建于木质立柱之上，底层架空，上层为居住区域，屋顶多为歇山顶，呈错落有致的阶梯状分布，适配山地地形。
            </p>
            <h3 class="arch-title-h3">为何这样建</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">适配地形：湘黔地区多山地、丘陵，平地稀少，吊脚楼依山而建，利用立柱抬高房屋，无需平整大片土地，充分利用山地空间，节省土地资源；</li>
                <li class="arch-item-li">适配气候：湘黔地区属于亚热带季风气候，多雨、潮湿，夏季炎热，底层架空设计可有效通风防潮、防止蚊虫滋生，上层门窗开阔，便于采光通风，缓解炎热；</li>
                <li class="arch-item-li">适配自然灾害：当地多山洪、滑坡等灾害，底层架空可避免洪水浸泡房屋，木质结构轻便且采用榫卯拼接，抗震性强，能减少山体滑坡带来的损坏；</li>
                <li class="arch-item-li">适配生活需求：当地百姓多以农耕、林业为生，底层架空可用于堆放农具、饲养牲畜，上层作为居住区域，功能分区明确，贴合生产生活习惯。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                湘黔吊脚楼是南方少数民族与汉族民居文化融合的产物，其建筑布局、装饰风格，承载着湘黔地区的民俗风情、宗教信仰，体现了南方人民顺应自然、与山水共生的生活理念。作为南方干栏式建筑的杰出代表，其精湛的榫卯工艺、独特的布局理念，影响了南方多地的民居建造，为研究南方民居建筑、少数民族文化提供了重要实物载体。
            </p>
        `
    },
    jiangnan: {
        title: '江南水乡民居',
        subtitle: 'Jiangnan Water Town Dwelling',
        image: "image/jn.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                江南水乡民居采用“依水而建、前街后河”的形制，多为砖木结构的两层小楼，外墙以白灰粉刷（粉墙），屋顶覆盖青黑色小瓦（黛瓦），房屋沿河道呈线性分布，多设水埠、临河开窗，内部采用穿斗式结构，院落小巧精致，形成“枕水而居”的布局特征。
            </p>
            <h3 class="arch-title-h3">为何这样建</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">适配地形：江南地区河网密布、水网纵横，民居依水而建，直接利用河道作为交通、取水、排水通道，无需额外修建水利设施，最大化利用水资源；</li>
                <li class="arch-item-li">适配气候：江南属于亚热带季风气候，梅雨季节多雨、夏季闷热，粉墙反射阳光降低室内温度，黛瓦吸水率低且排水性好，穿斗式结构通风性强，缓解潮湿闷热；</li>
                <li class="arch-item-li">适配生产生活：当地百姓以水运、渔业、手工业为主，临河设埠头便于装卸货物、出行乘船，底层临街设商铺、上层居住，实现“前店后宅”的生活生产一体化；</li>
                <li class="arch-item-li">适配材料资源：江南地区盛产木材、砖瓦、石材，砖木结构取材便利，且木材耐腐蚀、石材防水，适配水乡潮湿的环境，降低建筑维护成本。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                江南水乡民居是江南地区“水文化”与建筑艺术融合的典范，粉墙黛瓦的美学风格、依水而居的布局理念，彰显了江南人民温婉、灵动的生活态度，承载着昆曲、苏绣、水乡民俗等地域文化。作为南方水乡民居的核心代表，其建筑形制影响了长三角地区的民居建造，为研究古代江南经济、文化、建筑技艺提供了鲜活的实物样本，是中国水乡建筑文化的瑰宝。
            </p>
        `
    },
    guangji: {
        title: '潮州广济桥',
        subtitle: 'Guangji Bridge',
        image: "image/g.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                广济桥采用“梁桥+拱桥+浮桥”结合的独特形制，横跨韩江，全长518米，分为东、西两段梁桥，中段为浮桥，可开合通航，桥身设有亭台楼阁，兼具交通、商贸、观景多重功能，是古代桥梁形制的创新典范。
            </p>
            <h3 class="arch-title-h3">建造者与建造历程</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">主要建造者：南宋乾道七年（1171年），由潮州知州曾汪主持始建，最初仅修建西段石梁桥，名为“康济桥”；</li>
                <li class="arch-item-li">后续扩建：南宋淳熙元年（1174年），潮州知州朱江主持修建东段石梁桥，与西段相连，初步形成桥梁雏形；</li>
                <li class="arch-item-li">形制完善：南宋绍熙元年（1190年），潮州知州沈宗禹主持增设中段浮桥，采用船只连接，可开合通航，解决韩江通航与交通的矛盾，正式定名为“广济桥”；</li>
                <li class="arch-item-li">历代修缮：明清时期，多位潮州官员主持修缮广济桥，增设亭台楼阁，完善桥面设施，形成“桥中有楼、楼中有景”的特色，直至现代仍有修缮保护。</li>
            </ul>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">东段梁桥采用石梁结构，西段采用石拱结构，中段浮桥由船只连接，可根据通航需求开合，结构灵活，兼顾交通与通航；</li>
                <li class="arch-item-li">桥墩采用“尖嘴形”设计，减少水流冲击力，适配韩江湍急的水流，增强桥梁稳定性，延长使用寿命；</li>
                <li class="arch-item-li">桥上建有12座亭台楼阁，造型各异，采用木构架、彩绘装饰，兼具实用性与观赏性，形成独特的“桥楼一体”风格。</li>
            </ul>
        `
    },
    luoyang: {
        title: '泉州洛阳桥',
        subtitle: 'Luoyang Bridge',
        image: "image/qiao.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                洛阳桥采用“跨海石梁桥”形制，横跨泉州湾洛阳江入海口，全长834米，宽7米，共有46个桥墩，桥身采用石梁铺砌，桥面平整宽阔，是中国现存最早的跨海大石桥，形制规整，气势恢宏。
            </p>
            <h3 class="arch-title-h3">建造者与建造历程</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">主要建造者：北宋皇祐五年（1053年），由泉州知州蔡襄主持建造，是蔡襄在泉州任职期间的重要政绩之一；</li>
                <li class="arch-item-li">建造筹备：蔡襄上任后，发现洛阳江入海口无桥，百姓渡海不便且常遇危险，于是上书朝廷，请求修建桥梁，得到批准后，亲自勘察地形、设计方案；</li>
                <li class="arch-item-li">施工过程：北宋皇祐五年至嘉祐四年（1053-1059年），历时6年建成，施工期间，蔡襄创新采用“种蛎固基”“筏型基础”等技术，解决跨海建桥的难题；</li>
                <li class="arch-item-li">历代修缮：明清时期，多次对洛阳桥进行修缮，弥补海水侵蚀、战乱带来的损坏，保留了原有的建筑形制与工艺特色，至今仍能正常通行。</li>
            </ul>
            <h3 class="arch-title-h3">工艺特色</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">首创“种蛎固基”技术，利用牡蛎的分泌物将桥墩石块胶结在一起，增强桥墩稳定性，抵御海水侵蚀，这是古代跨海建桥的重大技术创新；</li>
                <li class="arch-item-li">采用“筏型基础”，在水下铺设石堤作为桥基，分散桥梁重量，适应跨海复杂地形与水流冲击，开创现代桥梁筏型基础的先河；</li>
                <li class="arch-item-li">桥墩采用“船形”设计，两端呈尖嘴状，减少海水、潮流的冲击力，保护桥墩不受损坏，延长桥梁使用寿命。</li>
            </ul>
        `
    },
    yunzhao: {
        title: '晋祠鱼沼飞梁',
        subtitle: 'Yuzhao Feiliang Bridge of Jinci',
        image: "image/2.jpg",
        content: `
            <style>
                .arch-title-h2 {
                    color: #8B1A1A;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-title-h3 {
                    color: #8B1A1A;
                    margin: 20px 0;
                    margin-left: 0;
                    padding-left: 0;
                    text-indent: 0;
                    line-height: 1.8;
                }
                .arch-item-p {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 20px;
                    margin-left: 0;
                    padding-left: 0;
                }
                .arch-item-ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                    counter-reset: li;
                }
                .arch-item-li {
                    text-indent: 2em;
                    line-height: 2;
                    margin-bottom: 8px;
                    position: relative;
                    padding-left: 1.5em;
                }
                .arch-item-li::before {
                    content: counter(li) ".";
                    counter-increment: li;
                    position: absolute;
                    left: 0.5em;
                    top: 0;
                }
            </style>

            <h2 class="arch-title-h2">建筑形制</h2>
            <p class="arch-item-p">
                晋祠鱼沼飞梁建于北宋时期，采用“十字形、木石混合”形制，桥身横跨鱼沼之上，东西向连接圣母殿与献殿，南北向延伸出两翼，整体呈十字形布局，底部以34根八角形石柱支撑，桥面铺木板，栏板为石雕构件，是国内现存唯一的宋代十字形桥梁。
            </p>
            <h3 class="arch-title-h3">为何这样建</h3>
            <ul class="arch-item-ul">
                <li class="arch-item-li">适配地形：晋祠鱼沼为天然泉池，十字形布局可同时连接泉池四周的建筑，无需绕路，最大化利用有限空间；</li>
                <li class="arch-item-li">适配功能：作为晋祠核心礼制建筑的连接桥，十字形布局符合古代“中轴对称、四方通达”的礼制理念，彰显祭祀建筑的庄重性；</li>
                <li class="arch-item-li">适配材料：黄河流域山西地区石材丰富，底部石柱采用本地青石，耐腐蚀、承重力强，桥面木板便于修缮，贴合宋代建筑工艺；</li>
                <li class="arch-item-li">适配气候：北方干燥少雨，木石结构不易腐朽，八角形石柱减少水流冲击，适配汾河流域（黄河支流）的水文环境。</li>
            </ul>
            <h3 class="arch-title-h3">文化内涵与历史影响</h3>
            <p class="arch-item-p">
                晋祠鱼沼飞梁是黄河流域宋代桥梁建筑的孤例，十字形布局突破了传统桥梁的线性结构，体现了北方建筑“实用与礼制结合”的设计理念，承载着晋地的祭祀文化、建筑技艺。作为国内现存最早的十字形桥梁，为研究宋代桥梁工程、北方古建筑提供了唯一的实物样本，是黄河流域古建筑的瑰宝。
            </p>
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
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击按钮返回顶部
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (typeof AudioManager !== 'undefined' && AudioManager.playClick) {
            AudioManager.playClick();
        }
    });
});