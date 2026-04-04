// ========== 营造技艺交互 ==========
function initStructureDiagram() {
    const parts = document.querySelectorAll('.struct-part');
    const cards = document.querySelectorAll('.tech-card');
    
    if (!parts.length) return;
    
    // 点击建筑部位
    parts.forEach(part => {
        part.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.getAttribute('data-part');
            activatePart(key);
        });
    });
    
    // 点击卡片
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.getAttribute('data-part');
            activatePart(key);
        });
    });
    
    function activatePart(key) {
        // 清除所有激活状态
        parts.forEach(p => p.classList.remove('active'));
        cards.forEach(c => c.classList.remove('active'));
        
        // 激活对应元素
        const targetPart = document.querySelector(`.struct-part[data-part="${key}"]`);
        const targetCard = document.querySelector(`.tech-card[data-part="${key}"]`);
        
        if (targetPart) targetPart.classList.add('active');
        if (targetCard) targetCard.classList.add('active');
        
        // 可添加音效
        if (typeof AudioManager !== 'undefined' && AudioManager.playClick) {
            AudioManager.playClick();
        }
    }
    
    // 点击空白处取消激活
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.struct-diagram') && !e.target.closest('.tech-info')) {
            parts.forEach(p => p.classList.remove('active'));
            cards.forEach(c => c.classList.remove('active'));
        }
    });
}