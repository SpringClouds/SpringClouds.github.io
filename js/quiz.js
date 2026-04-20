// ========== 基础问答数据 ==========
const quizData = [
    {
        question: '中国古代建筑中，最高等级的屋顶形式是什么？',
        options: ['歇山顶', '庑殿顶', '悬山顶', '硬山顶'],
        correct: 1,
        explanation: '庑殿顶是最高等级的屋顶形式，四坡五脊，多用于皇宫主殿。',
        knowledge: [
            '歇山顶等级仅次于庑殿顶，又称九脊顶，常用于宫殿次要建筑或寺庙',
            '悬山顶和硬山顶属于普通民居常用形式，等级较低'
        ]
    },
    {
        question: '赵州桥的设计者是谁？',
        options: ['鲁班', '李春', '宇文恺', '李诫'],
        correct: 1,
        explanation: '赵州桥由隋代工匠李春设计建造，是世界桥梁史上的杰作。',
        knowledge: [
            '赵州桥距今已有1400多年历史，是世界现存最古老的石拱桥',
            '宇文恺是隋代建筑家，主持修建大兴城（唐长安城）；李诫著《营造法式》'
        ]
    },
    {
        question: '北京四合院的大门一般开在哪个方位？',
        options: ['正南', '东南', '正东', '西南'],
        correct: 1,
        explanation: '四合院大门开在东南角，取"紫气东来"之意。',
        knowledge: [
            '四合院遵循"前堂后寝"的布局，体现传统家庭伦理秩序',
            '四合院的影壁（照壁）有遮挡视线、装饰和风水作用'
        ]
    },
    {
        question: '福建土楼的"四菜一汤"指的是什么？',
        options: ['五种菜肴', '五座土楼', '五种建筑材料', '五个家族'],
        correct: 1,
        explanation: '指福建南靖县的田螺坑土楼群，由一座方楼、三座圆楼和一座椭圆楼组成。',
        knowledge: [
            '土楼主要由客家人建造，兼具防御和居住功能',
            '土楼以生土为主要材料，结合竹木、石材建造，坚固耐用'
        ]
    },
    {
        question: '《营造法式》是哪个朝代的建筑典籍？',
        options: ['唐代', '宋代', '明代', '清代'],
        correct: 1,
        explanation: '北宋李诫编撰，是中国古代最完整的建筑技术书籍。',
        knowledge: [
            '《营造法式》包含设计、施工、材料、工价等完整体系',
            '唐代《营缮令》更早，但内容远不如《营造法式》详细系统'
        ]
    },
    {
        question: '中国木构建筑不用钉子，主要依靠什么连接？',
        options: ['胶水', '绳索', '榫卯', '铁丝'],
        correct: 2,
        explanation: '榫卯是木构件凹凸咬合结构，不用一钉一胶即可千年稳固。',
        knowledge: [
            '榫卯分明榫、暗榫、燕尾榫、格肩榫等数十种形式',
            '榫卯结构抗震极强，是中国古建智慧的核心'
        ]
    },
    {
        question: '斗拱在古建筑中的主要作用不包括？',
        options: ['承重支撑', '抗震减震', '装饰美观', '防水防潮'],
        correct: 3,
        explanation: '斗拱主要用于承重、抗震、装饰，不具备防水防潮功能。',
        knowledge: [
            '斗拱是中国木构建筑独有的标志性构件',
            '斗拱层数越多，建筑等级越高，多见于皇家宫殿与寺庙'
        ]
    },
    {
        question: '故宫太和殿的屋顶属于哪种形式？',
        options: ['单檐庑殿顶', '重檐庑殿顶', '重檐歇山顶', '攒尖顶'],
        correct: 1,
        explanation: '太和殿是中国等级最高建筑，采用重檐庑殿顶。',
        knowledge: [
            '重檐=两层屋檐，等级远高于单檐',
            '庑殿顶是古代屋顶形制中的最高规格'
        ]
    },
    {
        question: '下列哪项不属于江南园林的造园理念？',
        options: ['移步换景', '小中见大', '气势恢宏', '曲径通幽'],
        correct: 2,
        explanation: '气势恢宏是皇家园林特点，江南园林追求精巧雅致自然。',
        knowledge: [
            '拙政园、留园、狮子林、沧浪亭为苏州四大名园',
            '江南园林多用假山、流水、漏窗、回廊营造意境'
        ]
    },
    {
        question: '窑洞民居主要分布在我国哪个地区？',
        options: ['黄土高原', '云贵高原', '青藏高原', '内蒙古高原'],
        correct: 0,
        explanation: '窑洞主要分布在黄土高原，利用黄土直立性好、不易坍塌建造。',
        knowledge: [
            '窑洞分靠崖窑、地坑窑、锢窑三种',
            '窑洞冬暖夏凉，是低碳环保的传统民居'
        ]
    },
    {
        question: '中国古建彩画中等级最高的是？',
        options: ['苏式彩画', '旋子彩画', '和玺彩画', '民间彩画'],
        correct: 2,
        explanation: '和玺彩画是最高等级，仅用于皇宫、坛庙的主要殿堂。',
        knowledge: [
            '和玺彩画以龙凤纹为主，用色华丽，大量使用金色',
            '旋子彩画次之，苏式彩画多用于园林、住宅'
        ]
    },
    {
        question: '“飞檐”的主要功能不包括？',
        options: ['排水', '采光', '装饰', '防火'],
        correct: 3,
        explanation: '飞檐向上弯曲，利于排水、采光、美观，但不具备防火功能。',
        knowledge: [
            '飞檐是中国古建筑最具美感的造型特征',
            '屋檐曲线向上扬起，被称为“翼角翘起”'
        ]
    },
    
];

// ========== 拓展知识问答库（随机小问答） ==========
const extraKnowledgeQuiz = [
    { title: '小知识问答', question: '故宫太和殿采用的是哪种屋顶形式？', answer: '重檐庑殿顶（最高规格）' },
    { title: '小知识问答', question: '中国古建“斗拱”的主要作用是什么？', answer: '承重、抗震、装饰，木构核心构件' },
    { title: '小知识问答', question: '苏州园林属于哪种建筑风格？', answer: '江南私家园林，移步换景、小中见大' },
    { title: '小知识问答', question: '长城砖为何能千年不腐？', answer: '糯米灰浆粘合，强度高、耐水性极强' },
    { title: '小知识问答', question: '窑洞主要分布在我国哪个地区？', answer: '黄土高原（陕西、山西、甘肃）' },
    { title: '小知识问答', question: '中国古建“墙倒屋不塌”的原因是什么？', answer: '主要承重靠柱子，墙体不承重' },
    { title: '小知识问答', question: '天坛祈年殿屋顶是什么颜色？', answer: '蓝色，象征天空，代表皇权与天对话' },
    { title: '小知识问答', question: '“五脊六兽”中的“五脊”指哪种屋顶？', answer: '庑殿顶，一条正脊+四条垂脊' },
    { title: '小知识问答', question: '中国古代建筑主要用什么木材？', answer: '楠木、柏木、松木、杉木等优质硬木' },
    { title: '小知识问答', question: '四合院中“倒座房”位于哪个位置？', answer: '院落最南侧，门房、客房使用' },
    { title: '小知识问答', question: '古建筑中“藻井”的作用是什么？', answer: '天花板高级装饰，象征天宇，多见于殿内' },
    { title: '小知识问答', question: '“勾心斗角”原本形容哪种古建结构？', answer: '屋檐与斗拱交错咬合的精巧结构' },
];
// 全局变量
let currentQuestion = 0;
let score = 0;
let answered = false;

// ========== 工具函数 ==========
function safeSetTextContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = content;
}

function scrollToQuizArea() {
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== 核心功能函数 ==========
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showFinalResult();
        return;
    }

    const q = quizData[currentQuestion];
    const questionEl = document.getElementById('question');
    const optionsDiv = document.getElementById('optionsContainer'); // 对应新ID
    const knowledgeDiv = document.getElementById('knowledgePanel');
    
    if (!questionEl || !optionsDiv) return;
    
    // 显示主问题（优化中式排版）
    questionEl.innerHTML = `<span style="font-weight: bold; color: #8B1A1A;">${currentQuestion + 1}、</span> ${q.question}`;
    
    // 生成选项
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, index) => {
        // 为每个选项添加唯一ID（如option_0、option_1）
        const optionId = `option_${currentQuestion}_${index}`;
        const btn = document.createElement('div');
        btn.id = optionId; // 新增选项唯一ID
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.setAttribute('data-index', index);
        btn.addEventListener('click', () => checkAnswer(index));
        optionsDiv.appendChild(btn);
    });

    // 初始化知识面板
    if (knowledgeDiv) {
        knowledgeDiv.style.display = 'none';
        knowledgeDiv.innerHTML = '';
    }

    // 隐藏结果和下一题按钮
    const resultDiv = document.getElementById('resultPanel'); // 对应新ID
    const nextBtn = document.getElementById('nextBtn');
    if (resultDiv) {
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
    }
    if (nextBtn) {
        nextBtn.style.display = 'none';
        nextBtn.removeEventListener('click', handleNextClick);
        nextBtn.addEventListener('click', handleNextClick);
    }
    
    // 重置选项样式
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('correct', 'wrong'));
    answered = false;
    scrollToQuizArea();
}

function checkAnswer(index) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    if (options.length === 0) return;
    
    // 处理答题结果
    if (index === q.correct) {
        score++;
        safeSetTextContent('scoreNum', score); // 对应新ID
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }

    // 显示结果说明（匹配国风样式）
    const resultDiv = document.getElementById('resultPanel'); // 对应新ID
    if (resultDiv) {
        const isCorrect = (index === q.correct);
        resultDiv.style.borderLeftColor = isCorrect ? '#6B8E23' : '#8B0000';
        resultDiv.style.backgroundColor = isCorrect ? '#F2F8F2' : '#FFF0F0';
        resultDiv.innerHTML = `
            <div style="color: ${isCorrect ? '#556B2F' : '#8B0000'}; font-weight: bold; margin-bottom: 10px; font-size: 1.2em;">
                ${isCorrect ? '✅ 回答正确！' : '❌ 回答错误！'}
            </div>
            <div style="color: #5A2E18; font-size: 1.1em;">${q.explanation}</div>
        `;
        resultDiv.style.display = 'block';
    }

    // 显示相关知识点面板
    const knowledgeDiv = document.getElementById('knowledgePanel');
    if (knowledgeDiv) {
        let knowledgeHTML = `
            <h4>📚 相关知识点</h4>
            <ul style="color: #5A2E18; font-size: 1.1em;">
        `;
        q.knowledge.forEach(item => {
            knowledgeHTML += `<li>${item}</li>`;
        });
        knowledgeHTML += `
            </ul>
            <div style="border-top: 1px dashed #D9B38C; padding-top: 15px; margin-top: 15px;">
                ${getRandomExtraKnowledge()}
            </div>
        `;
        knowledgeDiv.innerHTML = knowledgeHTML;
        knowledgeDiv.style.display = 'block';
    }
    
    // 显示下一题按钮
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }
    
    safeSetTextContent('totalNum', quizData.length); // 对应新ID
    scrollToQuizArea();
}

function getRandomExtraKnowledge() {
    const randomIdx = Math.floor(Math.random() * extraKnowledgeQuiz.length);
    const quiz = extraKnowledgeQuiz[randomIdx];
    // 为小问答添加唯一ID
    const extraQuizId = `extraQuiz_${randomIdx}`;
    const extraAnswerId = `extraAnswer_${randomIdx}`;
    return `
        <div id="${extraQuizId}" onclick="toggleExtraAnswer(this)" style="color: #5A2E18; font-size: 1.1em;">
            <p style="margin: 0; font-weight: 500;">❓ ${quiz.title}：${quiz.question}</p>
            <p id="${extraAnswerId}" style="display: none; margin: 10px 0 0 20px; color: #8B5A2B;">
                ✅ 答案：${quiz.answer}
            </p>
        </div>
    `;
}

function toggleExtraAnswer(el) {
    const answerEl = el.querySelector('p[id^="extraAnswer_"]');
    if (answerEl) {
        answerEl.style.display = answerEl.style.display === 'none' ? 'block' : 'none';
    }
}

function handleNextClick() {
    currentQuestion++;
    loadQuestion();
}

function showFinalResult() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    const percentage = (score / quizData.length * 100).toFixed(0);
    let message = '';
    let color = '';
    
    if (percentage >= 80) {
        message = '🏆 太棒了！你是古建筑专家！';
        color = '#8B1A1A';
    } else if (percentage >= 60) {
        message = '👍 不错！你对古建筑很了解！';
        color = '#8B5A2B';
    } else {
        message = '📚 继续加油！多了解中国古代建筑文化！';
        color = '#CD5C5C';
    }

    // 最终结果页知识总结（国风样式）
    let knowledgeSummary = `
        <div id="knowledgeSummary"> <!-- 对应新ID -->
            <h4>📖 本次答题知识总结</h4>
            <ul style="color: #5A2E18;">
                <li>中国古代建筑屋顶等级：庑殿顶 > 歇山顶 > 悬山顶/硬山顶</li>
                <li>赵州桥是隋代李春设计的世界最古老石拱桥</li>
                <li>四合院大门开在东南角，体现传统风水和礼制</li>
                <li>福建土楼是客家人的特色防御性民居</li>
                <li>《营造法式》是北宋李诫编撰的建筑技术典籍</li>
            </ul>
        </div>
    `;

    container.innerHTML = `
        <div id="finalResult">
            <h3 style="color: ${color};">${message}</h3>
            <p>得分: <span style="color: #8B1A1A; font-weight: bold;">${score}</span> / ${quizData.length}</p>
            <p>正确率: ${percentage}%</p>
            ${knowledgeSummary}
            <button id="restartBtn">🔄 重新挑战</button>
        </div>
    `;

    // 绑定重新挑战按钮事件
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    scrollToQuizArea();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    const container = document.getElementById('quizContainer');
    if (!container) return;

    // 重建答题容器结构
    container.innerHTML = `
        <div class="quiz-question" id="question"></div>
        <div class="quiz-options" id="optionsContainer"></div>
        <div class="quiz-result" id="resultPanel" style="display: none;"></div>
        <div id="knowledgePanel"></div>
        <button id="nextBtn" style="display: none;">下一题</button>
        <div id="scoreDisplay">
            得分: <span id="scoreNum">0</span> / <span id="totalNum">${quizData.length}</span>
        </div>
    `;
    
    // 重置得分显示
    safeSetTextContent('scoreNum', '0'); // 对应新ID
    safeSetTextContent('totalNum', quizData.length); // 对应新ID
    loadQuestion();
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) {
        console.error('核心容器 quizContainer 不存在，请检查HTML');
        return;
    }

    // 初始化得分和总分显示
    safeSetTextContent('totalNum', quizData.length); // 对应新ID
    safeSetTextContent('scoreNum', '0'); // 对应新ID
    // 加载第一个问题
    loadQuestion();
});