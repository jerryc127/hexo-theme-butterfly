var canvasEl = document.querySelector('.fireworks')
if (canvasEl) {
  var ctx = canvasEl.getContext('2d')
  var numberOfParticules = 30
  var pointerX = 0
  var pointerY = 0
  // var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown'
  // Fixed the mobile scroll
  var tap = 'mousedown'
  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

  var setCanvasSize = btf.debounce(function () {
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d').scale(1, 1)
  }, 500)

  var render = anime({
    duration: Infinity,
    update: function () {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  })

  document.addEventListener(tap, function (e) {
    if (e.target.id !== 'sidebar' && e.target.id !== 'toggle-sidebar' && e.target.nodeName !== 'A' && e.target.nodeName !== 'IMG') {
      render.play()
      updateCoords(e)
      animateParticules(pointerX, pointerY)
    }
  }, false)

  setCanvasSize()
  window.addEventListener('resize', setCanvasSize, false)
}

function updateCoords (e) {
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
  pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection (p) {
  var angle = anime.random(0, 360) * Math.PI / 180
  var value = anime.random(50, 180)
  var radius = [-1, 1][anime.random(0, 1)] * value
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule (x, y) {
  var p = {}
  p.x = x
  p.y = y
  p.color = colors[anime.random(0, colors.length - 1)]
  p.radius = anime.random(16, 32)
  p.endPos = setParticuleDirection(p)
  p.draw = function () {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.fillStyle = p.color
    ctx.fill()
  }
  return p
}

function createCircle (x, y) {
  var p = {}
  p.x = x
  p.y = y
  p.color = '#F00'
  p.radius = 0.1
  p.alpha = 0.5
  p.lineWidth = 6
  p.draw = function () {
    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.lineWidth = p.lineWidth
    ctx.strokeStyle = p.color
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  return p
}

function renderParticule (anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw()
  }
}

function animateParticules (x, y) {
  var circle = createCircle(x, y)
  var particules = []
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y))
  }
  anime.timeline().add({
    targets: particules,
    x: function (p) {
      return p.endPos.x
    },
    y: function (p) {
      return p.endPos.y
    },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
}