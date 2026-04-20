document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('puzzleBoard');
  const stepCount = document.getElementById('stepCount');
  const timeCount = document.getElementById('timeCount');
  const resetBtn = document.getElementById('resetBtn');

  const moveSound = new Audio('https://cdn.jsdelivr.net/gh/yeszao/static@main/pop.mp3');
  const winSound = new Audio('https://cdn.jsdelivr.net/gh/yeszao/static@main/win.mp3');

  let size = 3;
  let tiles = [];
  let steps = 0;
  let startTime = null;
  let timer = null;
  let blankIndex = size * size - 1;

  // 精致图标 + 文字 一一对应
 const buildingParts = [
    { icon: "🌿", text: "草木" },
    { icon: "🪨", text: "夯土" },
    { icon: "🔥", text: "陶瓦" },
    { icon: "🪵", text: "木构" },
    { icon: "🧱", text: "青砖" },
    { icon: "🏺", text: "琉璃" },
    { icon: "⛩️", text: "斗拱" },
    { icon: "🏯", text: "砖石" }

  ];

  // 🔥 精致美观样式（不改动逻辑，只变好看）
  const style = document.createElement('style');
  style.textContent = `
    #puzzleBoard div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: bold;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: 0.2s;
    }
    #puzzleBoard div:hover:not([style*="f1f1f1"]) {
      transform: scale(1.03);
      box-shadow: 0 4px 10px rgba(146, 43, 33, 0.2);
    }
    #puzzleBoard .icon {
      font-size: 26px;
    }
    #puzzleBoard .text {
      font-size: 18px;
      color: #922b21;
    }
  `;
  document.head.appendChild(style);

  function init() {
    clearInterval(timer);
    steps = 0;
    startTime = null;
    timer = null;
    stepCount.textContent = '0';
    timeCount.textContent = '00:00';
    blankIndex = size * size - 1;

    tiles = [0, 1, 2, 3, 4, 5, 6, 7, 'blank'];
    shuffleTiles();
    render();
  }

  function render() {
    board.innerHTML = '';
    tiles.forEach((idx, pos) => {
      const div = document.createElement('div');
      const isBlank = idx === 'blank';

      div.style.background = isBlank ? '#f1f1f1' : '#ffffff';
      div.style.color = isBlank ? '#999' : '#922b21';
      div.style.cursor = isBlank ? 'default' : 'pointer';

      if (isBlank) {
        div.innerText = '空格';
        div.style.fontSize = '20px';
      } else {
        const p = buildingParts[idx];
        div.innerHTML = `<span class="icon">${p.icon}</span><span class="text">${p.text}</span>`;
      }

      div.dataset.pos = pos;
      div.addEventListener('click', () => handleClick(pos));
      board.appendChild(div);
    });
  }

  function handleClick(pos) {
    const idx = tiles[pos];
    if (idx === 'blank') return;

    const row = Math.floor(pos / size);
    const col = pos % size;
    const bPos = blankIndex;
    const bRow = Math.floor(bPos / size);
    const bCol = bPos % size;

    const isNeighbor =
      (row === bRow && Math.abs(col - bCol) === 1) ||
      (col === bCol && Math.abs(row - bRow) === 1);

    if (!isNeighbor) return;

    moveSound.currentTime = 0;
    moveSound.play().catch(() => {});

    const tile = board.children[pos];
    tile.classList.add('tile-move');
    setTimeout(() => tile.classList.remove('tile-move'), 200);

    [tiles[pos], tiles[blankIndex]] = [tiles[blankIndex], tiles[pos]];
    blankIndex = pos;
    steps++;
    stepCount.textContent = steps;

    if (!startTime) {
      startTime = Date.now();
      timer = setInterval(updateTime, 1000);
    }

    render();
    checkWin();
  }

  function shuffleTiles() {
    let arr = tiles.filter(i => i !== 'blank');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    tiles = [...arr, 'blank'];
    blankIndex = tiles.length - 1;
  }

  function checkWin() {
    let win = true;
    for (let i = 0; i < 8; i++) {
      if (tiles[i] !== i) { win = false; break; }
    }
    if (win && blankIndex === 8) {
      clearInterval(timer);
      winSound.play().catch(() => {});
      setTimeout(() => alert(`✅ 营造完成！\n步数：${steps}\n时间：${timeCount.textContent}`), 200);
    }
  }

  function updateTime() {
    if (!startTime) return;
    const sec = Math.floor((Date.now() - startTime) / 1000);
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timeCount.textContent = `${m}:${s}`;
  }

  function createPetals() {
    const petals = document.getElementById('petals');
    const count = 20;
    const colors = ['#ffd6e6', '#ffc0d9', '#ffe6f2', '#ffb0c8'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('petal');
      const size = Math.random() * 12 + 8;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = (Math.random() * 5 + 5) + 's';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      petals.appendChild(p);
    }
  }

  resetBtn.onclick = init;
  init();
  createPetals();
});