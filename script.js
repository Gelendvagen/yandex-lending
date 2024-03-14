document.addEventListener('DOMContentLoaded', function () {
  const btn1 = document.querySelector('.btn-1');
  const btn2 = document.querySelector('.btn-2');
  const block1 = document.querySelector('.s-text-1');
  const block2 = document.querySelector('.s-text-2');

  btn1.addEventListener('click', function () {
      block1.scrollIntoView({ behavior: 'smooth' });
  });

  btn2.addEventListener('click', function () {
      block2.scrollIntoView({ behavior: 'smooth' });
  });
});

function Sim(sldrId) {
  let id = document.getElementById(sldrId);
    if (id) {
      this.sldrRoot = id
    } else {
      this.sldrRoot = document.querySelector('.slider')
    };
    this.sldrList = this.sldrRoot.querySelector('.slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.slider-element');
    this.leftBtn = this.sldrRoot.querySelector('div.slider-btn-left');
    this.rightBtn = this.sldrRoot.querySelector('div.slider-btn-right');
    this.options = Sim.defaults;
    Sim.initialize(this)
  };
  
Sim.defaults = {
  loop: true,
  auto: true,
  interval: 4000,
  btn: true
};
  
Sim.prototype.elemPrev = function(num) {
  num = num || 1;
  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 3;
  this.updateSlider();
};
  
Sim.prototype.elemNext = function(num) {
  num = num || 1;
  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement > this.elemCount - 3) this.currentElement = 0;
  this.updateSlider();
};
  
Sim.prototype.updateSlider = function() {
  let index = this.currentElement;
  for (let i = 0; i < this.elemCount; i++) {
    let adjustedIndex = (index + i) % this.elemCount;
    let element = this.sldrElements[adjustedIndex];
    if (i < 3) {
      element.style.opacity = '1';
      element.style.left = (i * (320+262)) + 'px';
    } else {
      element.style.opacity = '0';
    }
  }
};
  
Sim.initialize = function(that) {
  that.elemCount = that.sldrElements.length;
  that.currentElement = 0;
  let bgTime = getTime();
  function getTime() {
    return new Date().getTime();
  };
  
  function setAutoScroll() {
    that.autoScroll = setInterval(function() {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext()
      }
    }, that.options.interval)
  };
  
  if (that.elemCount <= 1) {
    that.options.auto = false;
    that.options.btn = false;
    that.leftBtn.style.display = 'none';
    that.rightBtn.style.display = 'none'
  };
  if (that.elemCount >= 1) {
    that.sldrElemFirst.style.opacity = '1';
  };
  
  if (!that.options.loop) {
    that.leftBtn.style.display = 'none';
    that.options.auto = false;
  } else if (that.options.auto) { 
    setAutoScroll();
    that.sldrList.addEventListener('mouseenter', function() {
      clearInterval(that.autoScroll)
    }, false);
    that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
  };
  
  if (that.options.btn) {
    that.leftBtn.addEventListener('click', function() {
      let fnTime = getTime();
      if (fnTime - bgTime > 100) {
        bgTime = fnTime;
        that.elemPrev()
      }
    }, false);
    that.rightBtn.addEventListener('click', function() {
      let fnTime = getTime();
      if (fnTime - bgTime > 100) {
        bgTime = fnTime;
        that.elemNext()
      }
    }, false)
  } else {
    that.leftBtn.style.display = 'none';
    that.rightBtn.style.display = 'none'
  };
};
  
new Sim();