// ── TASK DEFINITIONS FOR CHAPTER 1 ──────────────────────────────
// Each task: { id, title_ka, title_en, hint_ka, hint_en, build(container), check() → bool }

var TASKS = [

  // ── TASK 1: Color the apple ──────────────────────────────────
  {
    id: 1,
    title_ka: 'ვაშლი გაფერადე!',
    title_en: 'Color the apple!',
    hint_ka: 'დააჭირე ვაშლს 🖍️',
    hint_en: 'Tap the apple 🖍️',
    done: false,
    build: function(c) {
      c.innerHTML = `
        <div class="apple-area">
          <svg id="apple-svg" width="150" height="160" viewBox="0 0 150 160" role="button" aria-label="apple">
            <path d="M75 28 Q82 12 94 9" stroke="#8B4513" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path id="a-leaf" d="M83 20 Q98 13 95 27 Q88 32 80 24Z" fill="#ccc"/>
            <ellipse id="a-body" cx="75" cy="95" rx="52" ry="58" fill="#ddd"/>
            <ellipse cx="57" cy="74" rx="9" ry="6" fill="rgba(255,255,255,.2)"/>
          </svg>
          <div class="num-hero" id="n1" style="opacity:.15">1</div>
        </div>`;
      document.getElementById('apple-svg').addEventListener('click', function(){
        if(TASKS[0].done) return;
        document.getElementById('a-body').setAttribute('fill','#e74c3c');
        document.getElementById('a-leaf').setAttribute('fill','#27ae60');
        var n = document.getElementById('n1');
        n.style.opacity = '1';
        n.style.transform = 'scale(1.2)';
        setTimeout(function(){ n.style.transform='scale(1)'; }, 250);
        TASKS[0].done = true;
        showFb(1, true);
        setTimeout(function(){ unlockNext(1); }, 700);
      });
    }
  },

  // ── TASK 2: Draw the number 1 ────────────────────────────────
  {
    id: 2,
    title_ka: 'რიცხვი 1 დახატე!',
    title_en: 'Draw the number 1!',
    hint_ka: 'ფერი აირჩიე და 1-ის კონტური გაავლე ✏️',
    hint_en: 'Pick a color and trace the 1 ✏️',
    done: false,
    build: function(c) {
      c.innerHTML = `
        <div class="color-row" id="cpal">
          <button class="col-dot active" style="background:#e74c3c" data-c="#e74c3c"></button>
          <button class="col-dot" style="background:#f39c12" data-c="#f39c12"></button>
          <button class="col-dot" style="background:#2ecc71" data-c="#2ecc71"></button>
          <button class="col-dot" style="background:#3498db" data-c="#3498db"></button>
          <button class="col-dot" style="background:#9b59b6" data-c="#9b59b6"></button>
        </div>
        <div class="canvas-wrap">
          <canvas id="draw-canvas" width="220" height="240"></canvas>
          <svg class="canvas-guide" width="220" height="240" viewBox="0 0 220 240">
            <text x="110" y="210" text-anchor="middle" font-size="190" font-family="Fredoka One,sans-serif"
              fill="rgba(0,0,0,.06)" font-weight="900">1</text>
          </svg>
        </div>
        <div class="btn-row">
          <button class="big-btn secondary" id="clear-btn">🗑️ <span data-ka="გასუფთავება" data-en="Clear">გასუფთავება</span></button>
          <button class="big-btn primary" id="done-draw">✅ <span data-ka="მზადაა!" data-en="Done!">მზადაა!</span></button>
        </div>`;
      // canvas setup
      var canvas = document.getElementById('draw-canvas');
      var ctx = canvas.getContext('2d');
      var drawing = false;
      var color = '#e74c3c';
      var strokes = 0;
      function pos(e){
        var r=canvas.getBoundingClientRect();
        var sx=canvas.width/r.width, sy=canvas.height/r.height;
        var src=e.touches?e.touches[0]:e;
        return{x:(src.clientX-r.left)*sx,y:(src.clientY-r.top)*sy};
      }
      canvas.addEventListener('mousedown',function(e){drawing=true;var p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);});
      canvas.addEventListener('mousemove',function(e){if(!drawing)return;var p=pos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle=color;ctx.lineWidth=18;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();strokes++;});
      canvas.addEventListener('mouseup',function(){drawing=false;});
      canvas.addEventListener('mouseleave',function(){drawing=false;});
      canvas.addEventListener('touchstart',function(e){e.preventDefault();drawing=true;var p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);},{passive:false});
      canvas.addEventListener('touchmove',function(e){e.preventDefault();if(!drawing)return;var p=pos(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle=color;ctx.lineWidth=18;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();strokes++;},{passive:false});
      canvas.addEventListener('touchend',function(){drawing=false;});
      // palette
      document.getElementById('cpal').addEventListener('click',function(e){
        var btn=e.target.closest('.col-dot');
        if(!btn)return;
        color=btn.getAttribute('data-c');
        document.querySelectorAll('.col-dot').forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
      });
      document.getElementById('clear-btn').addEventListener('click',function(){
        ctx.clearRect(0,0,canvas.width,canvas.height); strokes=0;
      });
      document.getElementById('done-draw').addEventListener('click',function(){
        if(TASKS[1].done)return;
        if(strokes < 5){ showFb(2,false,'✏️ '+(lang==='ka'?'ჯერ დახატე!':'Draw first!')); return; }
        TASKS[1].done=true;
        showFb(2,true);
        setTimeout(function(){unlockNext(2);},700);
      });
    }
  },

  // ── TASK 3: Pick one pig ─────────────────────────────────────
  {
    id: 3,
    title_ka: 'ერთი გოჭი შეარჩიე!',
    title_en: 'Pick ONE pig!',
    hint_ka: 'შემოხაზე მხოლოდ 1 გოჭი 🐷',
    hint_en: 'Circle only 1 pig 🐷',
    done: false,
    build: function(c) {
      // randomize correct pig position
      var pos = Math.floor(Math.random()*3);
      var items = ['🐷','🐷','🐷'];
      c.innerHTML = '<div class="animals-row">' +
        items.map(function(_,i){
          return '<button class="animal-btn" data-ok="'+(i===pos?'1':'0')+'">🐷</button>';
        }).join('') + '</div>';
      c.querySelectorAll('.animal-btn').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(TASKS[2].done)return;
          if(btn.getAttribute('data-ok')==='1'){
            btn.classList.add('correct');
            TASKS[2].done=true;
            showFb(3,true);
            setTimeout(function(){unlockNext(3);},700);
          } else {
            btn.classList.add('wrong');
            showFb(3,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(3);},800);
          }
        });
      });
    }
  },

  // ── TASK 4: Color 1 ball (cherries) ──────────────────────────
  {
    id: 4,
    title_ka: '1 ბალი გაფერადე!',
    title_en: 'Color 1 cherry!',
    hint_ka: 'იპოვე და დააჭირე 1 ბალს 🍒',
    hint_en: 'Find and tap 1 cherry 🍒',
    done: false,
    build: function(c) {
      var groups = [
        {emoji:'🍒🍒',count:2,ok:false},
        {emoji:'🍒',count:1,ok:true},
        {emoji:'🍒🍒🍒',count:3,ok:false}
      ];
      c.innerHTML = '<div class="cherries-row">' +
        groups.map(function(g){
          return '<div class="cherry-group" data-ok="'+(g.ok?'1':'0')+'">'+
            '<div class="cherry-emoji">'+g.emoji+'</div>'+
            '<div class="cherry-count">×'+g.count+'</div></div>';
        }).join('') + '</div>';
      c.querySelectorAll('.cherry-group').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(TASKS[3].done)return;
          if(btn.getAttribute('data-ok')==='1'){
            btn.classList.add('correct');
            TASKS[3].done=true;
            showFb(4,true);
            setTimeout(function(){unlockNext(4);},700);
          } else {
            btn.classList.add('wrong');
            showFb(4,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(4);},800);
          }
        });
      });
    }
  },

  // ── TASK 5: Find all 1s ───────────────────────────────────────
  {
    id: 5,
    title_ka: 'ყველა 1 იპოვე!',
    title_en: 'Find all the 1s!',
    hint_ka: 'დააჭირე ყველა "1"-ს 🔍',
    hint_en: 'Tap every "1" you see 🔍',
    done: false,
    build: function(c) {
      var nums = [1,2,1,3,1,2,1,2,2,1,3,1,2,1,2,1];
      var total1 = nums.filter(function(n){return n===1;}).length;
      var found = 0;
      c.innerHTML = '<div class="numgrid">' +
        nums.map(function(n,i){
          return '<button class="numgrid-btn" data-n="'+n+'" data-i="'+i+'">'+n+'</button>';
        }).join('') + '</div>';
      c.querySelectorAll('.numgrid-btn').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(btn.classList.contains('found')||btn.classList.contains('wrong'))return;
          if(btn.getAttribute('data-n')==='1'){
            btn.classList.add('found');
            btn.textContent='✓';
            found++;
            if(found===total1){
              TASKS[4].done=true;
              showFb(5,true);
              setTimeout(function(){unlockNext(5);},700);
            }
          } else {
            btn.classList.add('wrong');
            showFb(5,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(5);},600);
          }
        });
      });
    }
  },

  // ── TASK 6: Trace 1s (tap to fill) ───────────────────────────
  {
    id: 6,
    title_ka: 'კონტური შეავსე!',
    title_en: 'Fill the outlines!',
    hint_ka: 'ყველა ცარიელ უჯრაში დააჭირე და 1 ჩაწერე ✍️',
    hint_en: 'Tap each empty cell to trace the 1 ✍️',
    done: false,
    build: function(c) {
      var cells = 10;
      c.innerHTML = '<div class="trace-grid">' +
        '<div class="trace-cell sample">1</div>' +
        Array(cells).fill(0).map(function(_,i){
          return '<div class="trace-cell" data-i="'+i+'"></div>';
        }).join('') + '</div>';
      var filled = 0;
      c.querySelectorAll('.trace-cell:not(.sample)').forEach(function(cell){
        cell.addEventListener('click',function(){
          if(cell.classList.contains('filled'))return;
          cell.classList.add('filled');
          cell.textContent='1';
          filled++;
          if(filled===cells){
            TASKS[5].done=true;
            showFb(6,true);
            setTimeout(function(){unlockNext(6);},700);
          }
        });
      });
    }
  },

  // ── TASK 7: Write 1s (tap to write) ──────────────────────────
  {
    id: 7,
    title_ka: 'ყველა უჯრა შეავსე!',
    title_en: 'Fill in all the cells!',
    hint_ka: 'ყველა ცარიელ კვადრატს დააჭირე ✍️',
    hint_en: 'Tap every empty square ✍️',
    done: false,
    build: function(c) {
      var cells = 9;
      c.innerHTML = '<div class="write-grid">' +
        '<div class="write-cell sample">1</div>' +
        Array(cells).fill(0).map(function(_,i){
          return '<div class="write-cell" data-i="'+i+'"></div>';
        }).join('') + '</div>';
      var written = 0;
      c.querySelectorAll('.write-cell:not(.sample)').forEach(function(cell){
        cell.addEventListener('click',function(){
          if(cell.classList.contains('written'))return;
          cell.classList.add('written');
          cell.textContent='1';
          written++;
          if(written===cells){
            TASKS[6].done=true;
            showFb(7,true);
            setTimeout(function(){unlockNext(7);},700);
          }
        });
      });
    }
  },

  // ── TASK 8: Find 1-lari coin ──────────────────────────────────
  {
    id: 8,
    title_ka: 'ერთლარიანი იპოვე!',
    title_en: 'Find the 1-lari coin!',
    hint_ka: 'რომელია 1 ლარი? დააჭირე! 🪙',
    hint_en: 'Which one is 1 lari? Tap it! 🪙',
    done: false,
    build: function(c) {
      c.innerHTML = `
        <div class="coins-row">
          <div class="coin-btn" data-ok="1">
            <div class="coin-emoji">🪙</div>
            <div class="coin-label">1 ლ.</div>
          </div>
          <div class="coin-btn" data-ok="0">
            <div class="coin-emoji">💰</div>
            <div class="coin-label">2 ლ.</div>
          </div>
        </div>`;
      c.querySelectorAll('.coin-btn').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(TASKS[7].done)return;
          if(btn.getAttribute('data-ok')==='1'){
            btn.classList.add('correct');
            TASKS[7].done=true;
            showFb(8,true);
            setTimeout(function(){unlockNext(8);},700);
          } else {
            btn.classList.add('wrong');
            showFb(8,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(8);},800);
          }
        });
      });
    }
  },

  // ── TASK 9: Buy candy with 1 lari ────────────────────────────
  {
    id: 9,
    title_ka: 'კანფეტი 1 ლარად!',
    title_en: 'Buy candy for 1 lari!',
    hint_ka: '1 ლარით რომელ კანფეტს ვიყიდი? 🍭',
    hint_en: 'Which candy can I buy for 1 lari? 🍭',
    done: false,
    build: function(c) {
      c.innerHTML = `
        <div style="text-align:center;font-size:28px;margin-bottom:12px">🪙 = 1 ლ.</div>
        <div class="candy-row">
          <div class="candy-item" data-ok="1">
            <div class="candy-emoji">🍭</div>
            <div class="candy-price">1 ლ.</div>
          </div>
          <div class="candy-item" data-ok="0">
            <div class="candy-emoji">🍬</div>
            <div class="candy-price">2 ლ.</div>
          </div>
        </div>`;
      c.querySelectorAll('.candy-item').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(TASKS[8].done)return;
          if(btn.getAttribute('data-ok')==='1'){
            btn.classList.add('correct');
            TASKS[8].done=true;
            showFb(9,true);
            setTimeout(function(){unlockNext(9);},700);
          } else {
            btn.classList.add('wrong');
            showFb(9,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(9);},800);
          }
        });
      });
    }
  },

  // ── TASK 10: Count birds → write number ──────────────────────
  {
    id: 10,
    title_ka: 'ფრინველები დათვალე!',
    title_en: 'Count the birds!',
    hint_ka: 'თითო ჯგუფში რამდენია? დააჭირე და ჩაწერე 🐓',
    hint_en: 'How many in each group? Tap to write 🐓',
    done: false,
    build: function(c) {
      var groups = [
        {birds:'🐓\n🐓🐓', count:3, display:'🐓🐓🐓'},
        {birds:'🦉', count:1, display:'🦉'}
      ];
      c.innerHTML = '<div class="birds-area">' +
        groups.map(function(g,i){
          return '<div class="bird-group">' +
            '<div class="bird-emojis">'+g.display+'</div>'+
            '<div class="bird-box" data-count="'+g.count+'" data-i="'+i+'"></div>'+
            '</div>';
        }).join('') + '</div>';
      var filled = 0;
      c.querySelectorAll('.bird-box').forEach(function(box){
        box.addEventListener('click',function(){
          if(box.classList.contains('filled'))return;
          box.classList.add('filled');
          box.textContent = box.getAttribute('data-count');
          filled++;
          if(filled===groups.length){
            TASKS[9].done=true;
            showFb(10,true);
            setTimeout(function(){unlockNext(10);},700);
          }
        });
      });
    }
  },

  // ── TASK 11: Place card in correct cell ───────────────────────
  {
    id: 11,
    title_ka: 'სწორ უჯრაში ჩადე!',
    title_en: 'Place in the right cell!',
    hint_ka: '"1"-ის გვერდით დააჭირე 🐢',
    hint_en: 'Tap next to the "1" 🐢',
    done: false,
    build: function(c) {
      var nums = [1,3,1,2,1,1];
      var correct = 0;
      var total = nums.filter(function(n){return n===1;}).length;
      c.innerHTML = '<div class="match-grid">' +
        nums.map(function(n,i){
          if(n===1){
            return '<div class="match-target">'+
              '<div class="match-num">'+n+'</div>'+
              '<div class="match-slot" data-i="'+i+'" data-ok="1"></div>'+
              '</div>';
          } else {
            return '<div class="match-target">'+
              '<div class="match-num">'+n+'</div>'+
              '<div class="match-slot" data-i="'+i+'" data-ok="0"></div>'+
              '</div>';
          }
        }).join('') + '</div>' +
        '<p style="text-align:center;color:var(--muted);font-size:13px;margin-top:8px">' +
        (lang==='ka'?'🐢 = 1-ის ბარათი':'🐢 = card for number 1') + '</p>';
      c.querySelectorAll('.match-slot').forEach(function(slot){
        slot.addEventListener('click',function(){
          if(slot.classList.contains('filled'))return;
          if(slot.getAttribute('data-ok')==='1'){
            slot.classList.add('filled');
            slot.textContent='🐢';
            correct++;
            if(correct===total){
              TASKS[10].done=true;
              showFb(11,true);
              setTimeout(function(){unlockNext(11);},700);
            }
          } else {
            slot.classList.add('wrong');
            showFb(11,false);
            setTimeout(function(){slot.classList.remove('wrong');clearFb(11);},800);
          }
        });
      });
    }
  },

  // ── TASK 12: Pick ONE ball from many ─────────────────────────
  {
    id: 12,
    title_ka: 'ერთი ბურთი ამოირჩიე!',
    title_en: 'Pick ONE ball!',
    hint_ka: 'ერთი ბურთი შემოხაზე 🔵',
    hint_en: 'Circle just one ball 🔵',
    done: false,
    build: function(c) {
      var items = [
        {label: lang==='ka'?'ბევრი':'Many', emojis:'🔵🔴🟡🟢🔵🔴', ok:false},
        {label: '1', emojis:'🟠', ok:true},
        {label: lang==='ka'?'ბევრი':'Many', emojis:'🟣🔵🟡🔴🟢', ok:false}
      ];
      c.innerHTML = '<div class="ovm-row">' +
        items.map(function(it){
          return '<div class="ovm-item" data-ok="'+(it.ok?'1':'0')+'">'+
            '<div class="ovm-emoji">'+it.emojis+'</div>'+
            '<div style="font-size:12px;font-weight:700;color:var(--muted)">'+it.label+'</div>'+
            '</div>';
        }).join('') + '</div>';
      c.querySelectorAll('.ovm-item').forEach(function(btn){
        btn.addEventListener('click',function(){
          if(TASKS[11].done)return;
          if(btn.getAttribute('data-ok')==='1'){
            btn.classList.add('correct');
            TASKS[11].done=true;
            showFb(12,true);
            setTimeout(function(){unlockNext(12);},700);
          } else {
            btn.classList.add('wrong');
            showFb(12,false);
            setTimeout(function(){btn.classList.remove('wrong');clearFb(12);},800);
          }
        });
      });
    }
  },

  // ── TASK 13: Color ONE circle ────────────────────────────────
  {
    id: 13,
    title_ka: '1 წრე გაფერადე!',
    title_en: 'Color 1 circle!',
    hint_ka: 'დააჭირე ერთ წრეს და გაფერადე 🔴',
    hint_en: 'Tap one circle to color it 🔴',
    done: false,
    build: function(c) {
      var colors = ['#e74c3c','#3498db','#2ecc71'];
      var colored = 0;
      c.innerHTML = '<div class="circles-row">' +
        colors.map(function(col,i){
          return '<div class="circle-item" data-col="'+col+'" data-i="'+i+'" style="border-color:#ccc"></div>';
        }).join('') + '</div>';
      c.querySelectorAll('.circle-item').forEach(function(circle){
        circle.addEventListener('click',function(){
          if(TASKS[12].done)return;
          if(circle.classList.contains('colored'))return;
          var col = circle.getAttribute('data-col');
          circle.style.background = col;
          circle.style.borderColor = col;
          circle.classList.add('colored');
          colored++;
          if(colored===1){
            TASKS[12].done=true;
            showFb(13,true);
            setTimeout(function(){showWin();},900);
          }
        });
      });
    }
  }

]; // end TASKS
