window.onload = (function () {
  function PieChart(ctx, radius) {
    this.ctx = document.getElementById("canvas2").getContext("2d");
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.x0 = this.width / 2;
    this.y0 = this.height / 2;
    this.radius = radius;
    this.outLong = radius / 8;
    this.dicX = 50;
    this.dicY = 50;
    this.dicWidth = 40;
    this.dicHeight = 14;
    this.spanY = 25;
  };
  PieChart.prototype.init = function (data) {
    this.drawPie(data);
  };
  PieChart.prototype.drawPie = function (data) {
    var that = this;
    var angleList = this.transformAngle(data);
    var startAngle = 0;
    angleList.forEach(function (item, index) {
      var color = that.randomColor();
      that.ctx.beginPath();
      that.ctx.arc(that.x0, that.y0, that.radius, startAngle, startAngle + item.angle);
      that.ctx.lineTo(that.x0, that.y0);
      that.ctx.fillStyle = color
      that.ctx.fill();
      that.drawTitle(startAngle, item.angle, color, item.title);
      startAngle += item.angle;
    });
  };
  PieChart.prototype.drawTitle = function (startAngle, angle, color, title) {
    var out = this.outLong + this.radius;
    var du = startAngle + angle / 2;
    var outX = this.x0 + out * Math.cos(du);
    var outY = this.y0 + out * Math.sin(du);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(outX, outY);
    this.ctx.strokeStyle = color;
    this.ctx.font = '14px Microsoft Yahei';
    var textWidth = this.ctx.measureText(title).width;
    this.ctx.textBaseline = "bottom";
    if (outX > this.x0) {
      this.ctx.textAlign = "left";
      this.ctx.lineTo(outX + textWidth, outY);
    } else {
      this.ctx.textAlign = "right";
      this.ctx.lineTo(outX - textWidth, outY);
    }
    this.ctx.stroke();
    this.ctx.fillText(title, outX, outY);
  };
  PieChart.prototype.drawDic = function (title) {
    this.ctx.fillRect(this.dicX, this.dicY, this.dicWidth, this.dicHeight);
    this.ctx.font = '12px Microsoft Yahei';
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(title, this.dicX + this.dicWidth + 10, this.dicY + this.dicHeight / 2);
    this.dicY += this.spanY;
  };
  PieChart.prototype.transformAngle = function (data) {
    var total = 0;
    data.forEach(function (item, index) {
      total += item.per;
    });
    data.forEach(function (item, index) {
      item.angle = item.per / total * 2 * Math.PI;
    });
    return data;
  };
  PieChart.prototype.randomColor = function () {
    var r = Math.floor(Math.random() * 255 + 1);
    var g = Math.floor(Math.random() * 255 + 1);
    var b = Math.floor(Math.random() * 255 + 1);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  let xhr = new XMLHttpRequest();
  xhr.open("get", "https://gongjuhao.com/api/?type=week", false);
  xhr.send(null);

  var data = [
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    },
    {
      title: undefined,
      per: undefined
    }
  ];

  for (let i = 0; i < JSON.parse(xhr.responseText).data.xAxis.length; i++) {
    data[i].title = JSON.parse(xhr.responseText).data.xAxis[i];
  }

  for (let i = 0; i < JSON.parse(xhr.responseText).data.series.length; i++) {
    data[i].per = JSON.parse(xhr.responseText).data.series[i];
  }

  this.ctx =  document.getElementById("canvas2").getContext("2d");
  var pieChart = new PieChart(ctx, 150);
  pieChart.init(data);
})()