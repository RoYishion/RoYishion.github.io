window.onload = (function () {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "https://gongjuhao.com/api/?type=week", false);
  xhr.send(null);

  var oUl = document.getElementById('leftUl');
  var figureLeft = [0, 1000, 2000, 3000, 4000, 5000, 6000];
  figureLeft.sort(function (i, l) {
    return l - i;
  });
  var oLi = oUl.getElementsByTagName('li');
  for (var i = 0; i < figureLeft.length; i++) {
    oLi[i].innerHTML = figureLeft[i];
  }

  var oUl1 = document.getElementById('bottomUl');
  var figuerBottom = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  figuerBottom.sort(function (i, l) {
    return i - l;
  });
  var oLi1 = oUl1.getElementsByTagName('li');
  for (var k = 0; k < figuerBottom.length; k++) {
    oLi1[k].firstChild.innerHTML = figuerBottom[k];
  }

  var figuerHeight = JSON.parse(xhr.responseText).data.series;
  var mid1 = document.getElementById('midUl');
  var midLi = mid1.getElementsByTagName('li');
  for (var j = 0; j < figuerHeight.length; j++) {
    midLi[j].style.height = figuerHeight[j] * 0.04 + "px";
    midLi[j].style.bottom = -(420 - figuerHeight[j] * 0.04) + 'px';
  }
})()