window.onload = (function () {
  var list = document.querySelector('.carousel');
  var imgArr = list.getElementsByTagName('img');
  list.style.width = 767 * imgArr.length + 'px';
  var index = 0;
  var timer;
  var tag = document.getElementById('tag');
  var tagArr = tag.getElementsByTagName('div');
  tagArr[index].style.backgroundColor = 'black';
  for (i = 0; i < tagArr.length; i++) {
    tagArr[i].num = i;
    tagArr[i].onclick = function () {
      index = this.num;
      clearInterval(timer);
      setTag();
      list.style.left = -767 * index + 'px';
      setTimeout(() => {
        auto()
      }, 3000)
    }
  }
  auto()

  function setTag() {
    if (index >= imgArr.length - 1) {
      index = 0;
      list.style.left = 0;
    }
    for (i = 0; i < tagArr.length; i++) {
      tagArr[i].style.backgroundColor = '';
    }
    tagArr[index].style.backgroundColor = 'black';
  }
  //auto
  function auto() {
    timer = setInterval(function () {
      index++;
      index %= imgArr.length;
      move(list, -767 * index, 40, 'left', function () {
        setTag();
      })
    }, 2000)
  }

  //move函数
  function move(box, target, speed, way, callback) {
    //parseInt不能少,getStyle得到的属性后面是带px的，转化为纯数字
    var current = parseInt(getStyle(list, way));
    if (current > target) {
      speed = -speed;
    }
    box.timer = setInterval(function () {
      var oldValue = parseInt(getStyle(list, way));
      var newValue = oldValue + speed;
      if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
        newValue = target;
      }
      box.style[way] = newValue + 'px';
      if (newValue == target) {
        clearInterval(box.timer);
        callback && callback();
      }
    }, 50)
  }

  function getStyle(obj, key) {
    return getComputedStyle(obj, null)[key];
  }
})()