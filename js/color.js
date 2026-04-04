// ==============================================
// 四合院模型上色 - 独立JS文件
// 自动生成高清线稿，无需图片
// ==============================================
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('coloringCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let isDrawing = false
  let currentColor = '#8B1A1A'
  let brushSize = 5

  // 初始化绘制线稿
  drawBaseLine()

  // 颜色选择
  const colorOptions = document.querySelectorAll('.color-option')
  colorOptions.forEach(option => {
    option.addEventListener('click', function () {
      colorOptions.forEach(opt => opt.style.border = '2px solid transparent')
      currentColor = this.dataset.color
      this.style.border = `2px solid ${currentColor === '#FFFFFF' ? '#8B1A1A' : '#fff'}`
    })
  })
  if (colorOptions.length > 0) colorOptions[0].click()

  // 画笔大小
  const brushSizeSlider = document.getElementById('brushSize')
  const brushSizeValue = document.getElementById('brushSizeValue')
  if (brushSizeSlider && brushSizeValue) {
    brushSizeSlider.addEventListener('input', function () {
      brushSize = parseInt(this.value)
      brushSizeValue.textContent = brushSize + 'px'
    })
  }

  // 绘图事件
  canvas.addEventListener('mousedown', startDraw)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDraw)
  canvas.addEventListener('mouseleave', stopDraw)

  function startDraw(e) {
    isDrawing = true
    const pos = getPos(e)
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2)
    ctx.fillStyle = currentColor
    ctx.fill()
  }

  function draw(e) {
    if (!isDrawing) return
    const pos = getPos(e)
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  function stopDraw() {
    isDrawing = false
    ctx.beginPath()
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    }
  }

  // 清空画布
  document.getElementById('clearCanvas')?.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBaseLine()
  })

  // 重置线稿
  document.getElementById('resetDrawing')?.addEventListener('click', drawBaseLine)

  // 保存作品
  document.getElementById('saveDrawing')?.addEventListener('click', () => {
    const link = document.createElement('a')
    link.download = '四合院上色作品_' + Date.now() + '.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    alert('保存成功！')
  })

  // 一键上色
  document.querySelectorAll('.part-color-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const part = this.dataset.part
      const color = this.querySelector('span').style.backgroundColor
      ctx.fillStyle = color

      // 给四合院部件上色
      switch (part) {
        case 'roof':
          fillAllRoofs()
          break
        case 'wall':
          fillWalls()
          break
        case 'pillar':
          fillPillars()
          break
        case 'base':
          fillBase()
          break
      }
      drawBaseLine()
    })
  })

  // ==============================================
  // 自动生成：四合院完整高清线稿（可直接上色）
  // ==============================================
  function drawBaseLine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // 正房
    ctx.beginPath()
    ctx.rect(280, 280, 240, 120)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(260, 280)
    ctx.lineTo(400, 180)
    ctx.lineTo(540, 280)
    ctx.closePath()
    ctx.stroke()

    // 东厢房
    ctx.beginPath()
    ctx.rect(120, 350, 100, 80)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(110, 350)
    ctx.lineTo(170, 300)
    ctx.lineTo(230, 350)
    ctx.closePath()
    ctx.stroke()

    // 西厢房
    ctx.beginPath()
    ctx.rect(580, 350, 100, 80)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(570, 350)
    ctx.lineTo(630, 300)
    ctx.lineTo(690, 350)
    ctx.closePath()
    ctx.stroke()

    // 倒座房
    ctx.beginPath()
    ctx.rect(280, 450, 240, 60)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(270, 450)
    ctx.lineTo(400, 410)
    ctx.lineTo(530, 450)
    ctx.closePath()
    ctx.stroke()

    // 大门
    ctx.beginPath()
    ctx.rect(360, 500, 80, 50)
    ctx.stroke()

    // 院墙
    ctx.beginPath()
    ctx.rect(100, 270, 600, 280)
    ctx.stroke()

    // 立柱
    const pillars = [300, 360, 420, 480, 140, 200, 600, 660]
    pillars.forEach(x => {
      ctx.beginPath()
      ctx.rect(x, 280, 16, 120)
      ctx.stroke()
    })
  }

  // 一键填充屋顶
  function fillAllRoofs() {
    ctx.beginPath()
    ctx.moveTo(260, 280)
    ctx.lineTo(400, 180)
    ctx.lineTo(540, 280)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(110, 350)
    ctx.lineTo(170, 300)
    ctx.lineTo(230, 350)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(570, 350)
    ctx.lineTo(630, 300)
    ctx.lineTo(690, 350)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(270, 450)
    ctx.lineTo(400, 410)
    ctx.lineTo(530, 450)
    ctx.closePath()
    ctx.fill()
  }

  // 填充墙面
  function fillWalls() {
    ctx.fillRect(281, 281, 238, 118)
    ctx.fillRect(121, 351, 98, 78)
    ctx.fillRect(581, 351, 98, 78)
    ctx.fillRect(281, 451, 238, 58)
  }

  // 填充柱子
  function fillPillars() {
    const pillars = [300, 360, 420, 480, 140, 200, 600, 660]
    pillars.forEach(x => {
      ctx.fillRect(x + 1, 281, 14, 118)
    })
  }

  // 填充基座
  function fillBase() {
    ctx.fillRect(101, 271, 598, 278)
  }
})