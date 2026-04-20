 
// 获取元素
  const quizOptions = document.querySelectorAll('.quizOption');
  const handPrint = document.getElementById('handPrint');
  const handTip = document.getElementById('handTip');
  const userName = document.getElementById('userName');
  const generateBtn = document.getElementById('generateBtn');
  const declarationBox = document.getElementById('declarationBox');
  const finalText = document.getElementById('finalText');
  const badge = document.getElementById('badge');
  const quizBox = document.getElementById('quizBox');

  // 答题逻辑
  quizOptions
.forEach(option => {
    option
.addEventListener('click', function() {
      if (this.textContent === '文明守护') {
        // 答题正确
        quizBox
.innerHTML = '<p style="color:#2E8B57; font-size:1.2em; margin:0; padding: 20px 0;">✅ 考验通过！你已获得守护资格</p>';
        // 解锁手印
        handPrint
.style.opacity = 1;
        handTip
.textContent = '点击手印，点亮守护勋章';
        // 绑定手印点击事件
        handPrint
.addEventListener('click', activateBadge);
      } else {
        // 答题错误
        this.style.background = '#F8D7DA';
        setTimeout(() => {
          alert('❌ 答错啦！保护古建筑需要文明守护哦～');
          this.style.background = '#F1E6D7';
        }, 300);
      }
    });
  });

  // 点亮勋章逻辑
  function activateBadge() {
    // 显示勋章（此时勋章底部位置固定）
    badge
.style.opacity = 1;
    badge
.style.transform = 'scale(1)';
    // 解锁输入框和生成按钮
    userName
.disabled = false;
    generateBtn
.disabled = false;
    generateBtn
.style.background = '#8B1A1A';
    generateBtn
.style.cursor = 'pointer';
    handTip
.textContent = '勋章已点亮，输入名字生成宣言吧～';
  }

  // 生成宣言逻辑
  generateBtn
.addEventListener('click', function() {
    const name = userName.value.trim();
    if (!name) {
      alert('请输入你的名字哦～');
      return;
    }
    // 生成宣言文本
    const declaration = `${name}承诺：用心守护中华古建筑，尊重历史，文明观赏，让千年文脉永续传承！`;
    finalText
.textContent = declaration;
    // 显示宣言框（自动实现底部对齐）
    declarationBox
.style.display = 'block';
  });