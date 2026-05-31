// ── STATE ─────────────────────────────────────────────
var lang = 'ka';
var completedTasks = 0;

// ── LANGUAGE ──────────────────────────────────────────
function setLang(l) {
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    var isKa = b.textContent.indexOf('ქართული') > -1;
    b.classList.toggle('active', (l==='ka' && isKa) || (l==='en' && !isKa));
  });
  document.querySelectorAll('[data-ka]').forEach(function(el) {
    el.textContent = l === 'ka' ? el.getAttribute('data-ka') : el.getAttribute('data-en');
  });
}

// ── NAVIGATION ────────────────────────────────────────
function goHome() {
  showScreen('screen-home');
  document.getElementById('win-overlay').classList.add('hidden');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function startChapter(n) {
  if (n !== 1) return;
  // reset tasks
  TASKS.forEach(function(t) { t.done = false; });
  completedTasks = 0;
  buildChapter1();
  showScreen('screen-ch1');
}

// ── BUILD CHAPTER 1 ───────────────────────────────────
function buildChapter1() {
  var wrap = document.getElementById('tasks-wrap');
  wrap.innerHTML = '';

  TASKS.forEach(function(task, idx) {
    var card = document.createElement('div');
    card.className = 'task-card' + (idx === 0 ? '' : ' locked');
    card.id = 'card-' + task.id;

    // Badge
    var badge = document.createElement('div');
    badge.className = 'task-badge';
    badge.textContent = (lang === 'ka' ? 'დავალება ' : 'Task ') + task.id;
    card.appendChild(badge);

    // Title
    var title = document.createElement('h2');
    title.className = 'task-title';
    title.textContent = lang === 'ka' ? task.title_ka : task.title_en;
    card.appendChild(title);

    // Hint
    var hint = document.createElement('p');
    hint.className = 'task-hint';
    hint.textContent = lang === 'ka' ? task.hint_ka : task.hint_en;
    card.appendChild(hint);

    // Content container
    var content = document.createElement('div');
    content.id = 'task-content-' + task.id;
    card.appendChild(content);

    // Feedback
    var fb = document.createElement('div');
    fb.className = 'task-fb';
    fb.id = 'fb-' + task.id;
    card.appendChild(fb);

    wrap.appendChild(card);

    // Build AFTER card is in DOM
    task.build(content);
  });

  updateStars(0);
}

// ── UNLOCK NEXT TASK ──────────────────────────────────
function unlockNext(taskId) {
  completedTasks++;
  updateStars(completedTasks);
  updateProgress();

  var nextId = taskId + 1;
  var nextCard = document.getElementById('card-' + nextId);
  if (nextCard) {
    nextCard.classList.remove('locked');
    nextCard.classList.add('unlocking');
    nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ── FEEDBACK ──────────────────────────────────────────
function showFb(taskId, ok, customMsg) {
  var fb = document.getElementById('fb-' + taskId);
  if (!fb) return;
  if (ok) {
    var msgs = ['🎉 ბრავო!', '⭐ სწორია!', '🌟 შესანიშნავია!', '✅ მშვენიერი!'];
    var engMsgs = ['🎉 Amazing!', '⭐ Correct!', '🌟 Excellent!', '✅ Well done!'];
    var pick = msgs[Math.floor(Math.random() * msgs.length)];
    var pickEn = engMsgs[Math.floor(Math.random() * engMsgs.length)];
    fb.textContent = lang === 'ka' ? pick : pickEn;
    fb.className = 'task-fb ok';
  } else {
    fb.textContent = customMsg || (lang === 'ka' ? '🙈 კიდევ სცადე!' : '🙈 Try again!');
    fb.className = 'task-fb err';
  }
}

function clearFb(taskId) {
  var fb = document.getElementById('fb-' + taskId);
  if (fb) { fb.textContent = ''; fb.className = 'task-fb'; }
}

// ── STARS ─────────────────────────────────────────────
function updateStars(done) {
  var total = TASKS.length; // 13
  var stars = '';
  if (done >= Math.ceil(total / 3)) stars += '⭐'; else stars += '☆';
  if (done >= Math.ceil(total * 2 / 3)) stars += '⭐'; else stars += '☆';
  if (done >= total) stars += '⭐'; else stars += '☆';
  var el = document.getElementById('hdr-stars');
  if (el) el.textContent = stars;
}

// ── PROGRESS ──────────────────────────────────────────
function updateProgress() {
  var el = document.getElementById('prog-1');
  if (el) el.textContent = completedTasks + '/13';
}

// ── WIN ───────────────────────────────────────────────
function showWin() {
  updateStars(13);
  var ov = document.getElementById('win-overlay');
  if (ov) ov.classList.remove('hidden');
  // update text
  ov.querySelector('.win-title').textContent = lang === 'ka' ? 'ბრავო! გაიმარჯვე!' : 'Amazing! You won!';
  ov.querySelector('.win-sub').textContent = lang === 'ka' ? 'რიცხვი 1 ისწავლე! 🎊' : 'You learned number 1! 🎊';
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // nothing extra needed
});
