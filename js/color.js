// ==============================================
// 古建上色 - 终极完整版
// 自定义线稿 + 上色 + 任意位置印章 + 右键删除 + 印章大小调节
// ==============================================
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('coloringCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let isDrawing = false
  let currentColor = '#8B1A1A'
  let brushSize = 5
  let currentDrawing = 'siheyuan'
  let selectedStamp = null
  let stampSize = 60; // 印章大小

  // 你的线稿图片
  const sketchImages = {
    siheyuan: "image/sihe.jpg",
    house: "image/mingju.jpg",
    palace: "image/x4.jpg",
    bridge: "image/x2.jpg"
  }

  let stamps = [] // 保存所有印章
  let currentImage = null
  loadAndDrawImage()

  // ==========================
  // 印章大小调节
  // ==========================
  const stampSizeSlider = document.getElementById('stampSize')
  const stampSizeValue = document.getElementById('stampSizeValue')
  stampSizeSlider.addEventListener('input', function () {
    stampSize = this.value
    stampSizeValue.textContent = stampSize + 'px'
  })

  // 线稿切换
  document.getElementById('drawingSiheyuan')?.addEventListener('click', () => {
    currentDrawing = 'siheyuan'; loadAndDrawImage()
  })
  document.getElementById('drawingHouse')?.addEventListener('click', () => {
    currentDrawing = 'house'; loadAndDrawImage()
  })
  document.getElementById('drawingPalace')?.addEventListener('click', () => {
    currentDrawing = 'palace'; loadAndDrawImage()
  })
  document.getElementById('drawingBridge')?.addEventListener('click', () => {
    currentDrawing = 'bridge'; loadAndDrawImage()
  })

  // 颜色选择
  const colorOptions = document.querySelectorAll('.color-option')
  colorOptions.forEach(option => {
    option.addEventListener('click', function () {
      colorOptions.forEach(opt => opt.style.border = '2px solid transparent')
      currentColor = this.dataset.color
      this.style.border = '2px solid #fff'
      selectedStamp = null
      document.querySelectorAll('.stamp-btn').forEach(b => b.style.border = "1px solid #e8d8c8")
    })
  })
  colorOptions[0].click()

  // 画笔大小
  const brushSizeSlider = document.getElementById('brushSize')
  const brushSizeValue = document.getElementById('brushSizeValue')
  if (brushSizeSlider) {
    brushSizeSlider.addEventListener('input', function () {
      brushSize = +this.value
      brushSizeValue.textContent = brushSize + 'px'
    })
  }

  // 印章选择
  document.querySelectorAll('.stamp-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      selectedStamp = this.dataset.stamp
      document.querySelectorAll('.stamp-btn').forEach(b => b.style.border = "1px solid #e8d8c8")
      this.style.border = "2px solid #8B1A1A"
    })
  })

  // 获取坐标
  function getPos(e) {
    const r = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width),
      y: (e.clientY - r.top) * (canvas.height / r.height)
    }
  }

  // 左键：画画 / 盖印章
  canvas.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return
    const pos = getPos(e)

    if (selectedStamp) {
      stamps.push({
        text: selectedStamp,
        x: pos.x,
        y: pos.y,
        size: stampSize // 保存当前印章大小
      })
      redrawAll()
      return
    }
    startDraw(e)
  })

  // 右键：删除印章
  canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    const pos = getPos(e)

    for (let i = stamps.length - 1; i >= 0; i--) {
      const s = stamps[i]
      const dx = Math.abs(pos.x - s.x)
      const dy = Math.abs(pos.y - s.y)
      if (dx < s.size/2 && dy < s.size/2) {
        stamps.splice(i, 1)
        redrawAll()
        return
      }
    }
  })

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

  // 操作按钮
  document.getElementById('clearCanvas')?.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stamps = []
    redrawAll()
  })

  document.getElementById('resetDrawing')?.addEventListener('click', () => {
    stamps = []
    loadAndDrawImage()
  })

  document.getElementById('saveDrawing')?.addEventListener('click', () => {
    const link = document.createElement('a')
    link.download = '古建上色作品_' + Date.now() + '.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    alert('保存成功！')
  })

  // 重绘全部
  function redrawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (currentImage) ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.textAlign = "center"
    ctx.fillStyle = "#8B1A1A"
    stamps.forEach(s => {
      ctx.font = s.size + "px serif"
      ctx.fillText(s.text, s.x, s.y)
    })
    ctx.restore()
  }

  function loadAndDrawImage() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    const img = new Image()
    img.onload = function () {
      currentImage = img
      redrawAll()
    }
    img.src = sketchImages[currentDrawing]
  }
})