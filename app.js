// ─── STATE ───────────────────────────────────────────
var currentLang = 'ka';
var task1Done = false;
var task2Done = false;
var task3Done = false;
var pigPicked = false;
var isDrawing = false;
var drawColor = '#e74c3c';
var starsEarned = 0;

// ─── LANGUAGE ────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.textContent.includes(lang === 'ka' ? 'ქართული' : 'English'));
  });
  document.querySelectorAll('[data-ka]').forEach(function(el) {
    el.textContent = lang === 'ka' ? el.getAttribute('data-ka') : el.getAttribute('data-en');
  });
}

// ─── NAVIGATION ──────────────────────────────────────
function goHome() {
  showScreen('screen-home');
  document.getElementById('success-overlay').classList.add('hidden');
}

function goLesson(num) {
  resetLesson(num);
  showScreen('screen-lesson-' + num);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function resetLesson(num) {
  if (num === 1) {
    task1Done = false;
    task2Done = false;
    task3Done = false;
    pigPicked = false;
    starsEarned = 0;

    // Reset apple
    var body = document.getElementById('apple-body');
    var leaf = document.getElementById('apple-leaf');
    if (body) body.setAttribute('fill', '#ddd');
    if (leaf) leaf.setAttribute('fill', '#bbb');
    document.getElementById('num1-display').style.opacity = '0.15';
    document.getElementById('fb-task1').textContent = '';
    document.getElementById('fb-task1').className = 'task-feedback';

    // Reset canvas
    clearDraw();
    document.getElementById('fb-task2').textContent = '';
    document.getElementById('fb-task2').className = 'task-feedback';

    // Reset pigs
    document.querySelectorAll('.pig-item').forEach(function(p) {
      p.classList.remove('correct', 'wrong');
    });
    pigPicked = false;
    document.getElementById('fb-task3').textContent = '';
    document.getElementById('fb-task3').className = 'task-feedback';

    // Lock tasks 2 and 3
    lockTask('task2');
    lockTask('task3');

    // Reset stars
    starsEarned = 0;
    for (var i = 1; i <= 3; i++) {
      var star = document.getElementById('star' + i);
      if (star) { star.textContent = '☆'; star.classList.remove('earned'); }
    }
  }
}

function unlockTask(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = '1';
  el.style.pointerEvents = 'auto';
  el.classList.add('unlocked');
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function lockTask(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = '0.4';
  el.style.pointerEvents = 'none';
  el.classList.remove('unlocked');
}

function earnStar() {
  starsEarned++;
  var star = document.getElementById('star' + starsEarned);
  if (star) {
    star.textContent = '⭐';
    star.classList.add('earned');
  }
}

// ─── TASK 1: COLOR APPLE ─────────────────────────────
function colorApple() {
  if (task1Done) return;
  task1Done = true;

  var body = document.getElementById('apple-body');
  var leaf = document.getElementById('apple-leaf');
  body.setAttribute('fill', '#e74c3c');
  leaf.setAttribute('fill', '#2ecc71');

  var numDisplay = document.getElementById('num1-display');
  numDisplay.style.opacity = '1';
  numDisplay.style.animation = 'none';
  numDisplay.style.transition = 'opacity 0.4s, transform 0.4s';
  setTimeout(function() {
    numDisplay.style.transform = 'scale(1.2)';
    setTimeout(function() { numDisplay.style.transform = 'scale(1)'; }, 200);
  }, 10);

  var fb = document.getElementById('fb-task1');
  fb.textContent = currentLang === 'ka' ? '🎉 ბრავო! სწორია!' : '🎉 Excellent! Correct!';
  fb.className = 'task-feedback good';

  // Stop pulse
  var pulse = document.getElementById('apple-pulse');
  if (pulse) pulse.style.animation = 'none';

  earnStar();
  setTimeout(function() { unlockTask('task2'); }, 700);
}

// ─── TASK 2: DRAW ────────────────────────────────────
var canvas, ctx;

function initCanvas() {
  canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);
}

function getPos(e) {
  var r = canvas.getBoundingClientRect();
  var scaleX = canvas.width / r.width;
  var scaleY = canvas.height / r.height;
  var src = e.touches ? e.touches[0] : e;
  return {
    x: (src.clientX - r.left) * scaleX,
    y: (src.clientY - r.top) * scaleY
  };
}

function startDraw(e) {
  e.preventDefault();
  isDrawing = true;
  var p = getPos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  e.preventDefault();
  if (!isDrawing) return;
  var p = getPos(e);
  ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = drawColor;
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function stopDraw(e) {
  isDrawing = false;
}

function pickColor(btn) {
  drawColor = btn.getAttribute('data-color');
  document.querySelectorAll('.col-dot').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

function clearDraw() {
  if (!canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function doneDrawing() {
  if (task2Done) return;
  task2Done = true;

  var fb = document.getElementById('fb-task2');
  fb.textContent = currentLang === 'ka' ? '🎨 შესანიშნავია!' : '🎨 Amazing work!';
  fb.className = 'task-feedback good';

  earnStar();
  setTimeout(function() { unlockTask('task3'); }, 700);
}

// ─── TASK 3: PIGS ────────────────────────────────────
function pickPig(btn, isCorrect) {
  if (pigPicked) return;

  if (isCorrect) {
    pigPicked = true;
    btn.classList.add('correct');

    var fb = document.getElementById('fb-task3');
    fb.textContent = currentLang === 'ka' ? '🐷 სწორია! ერთი გოჭი!' : '🐷 Correct! One pig!';
    fb.className = 'task-feedback good';

    earnStar();
    setTimeout(function() { showSuccess(); }, 900);
  } else {
    btn.classList.add('wrong');
    var fb2 = document.getElementById('fb-task3');
    fb2.textContent = currentLang === 'ka' ? '🙈 კიდევ სცადე!' : '🙈 Try again!';
    fb2.className = 'task-feedback bad';
    setTimeout(function() {
      btn.classList.remove('wrong');
      fb2.textContent = '';
      fb2.className = 'task-feedback';
    }, 800);
  }
}

// ─── SUCCESS ─────────────────────────────────────────
function showSuccess() {
  var overlay = document.getElementById('success-overlay');
  overlay.classList.remove('hidden');

  // Update success text based on lang
  var title = overlay.querySelector('.success-title');
  if (title) {
    title.textContent = currentLang === 'ka' ? 'ბრავო! გაიმარჯვე!' : 'Well done! You won!';
  }
  var homeBtn = overlay.querySelector('.action-btn span');
  if (homeBtn) {
    homeBtn.textContent = currentLang === 'ka' ? '🏠 მთავარი' : '🏠 Home';
  }
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initCanvas();
});
