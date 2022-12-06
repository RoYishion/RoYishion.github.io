window.onload = (function () {
  const canvas = document.getElementById("canvas1");
  canvas.width = 1600;
  canvas.height = 500;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, 5);
  gradient.addColorStop(0, "rgb(255,0,0)");
  gradient.addColorStop(0.2, "rgb(255,165,0)");
  gradient.addColorStop(0.3, "rgb(255,255,0)");
  gradient.addColorStop(0.6, "rgb(0,255,0)");
  gradient.addColorStop(0.7, "rgb(0,127,255)");
  gradient.addColorStop(0.8, "rgb(0,0,255)");
  gradient.addColorStop(1.0, "rgb(139,0,255)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const marginBottom = 50;
  const marginTop = 25;
  const marginLeft = 40;
  canvas.width = 1600;
  canvas.height = 500;
  context.strokeStyle = "rgb(0,0,0,1)";
  context.lineWidth = 0.09;
  /* 因为默认画布坐标系原点是左上角而我们熟悉的坐标系原点是左下角,
  所以首先关于水平方向镜像处理 */
  context.scale(1, -1);
  /* 镜像处理后坐标系到了画布的下面，所以我们需要平移，
  而因为镜像，向上平移其实是原图形的向下translate，所以是-canvas.height，
  坐标系左边底部需要边距所以根据需求平移 */
  context.translate(marginLeft, -canvas.height + marginBottom);

  // 数据
  let xhr = new XMLHttpRequest();
  xhr.open("get", "https://gongjuhao.com/api/?type=month", false);
  xhr.send(null);

  const data = pointsData  = [
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    },
    {
      x: undefined,
      y: undefined
    }
  ];

  for (let i = 0; i < JSON.parse(xhr.responseText).data.xAxis.length; i++) {
    x = JSON.parse(xhr.responseText).data.xAxis[i];
    data[i].x = x;
  }

  for (let i = 0; i < JSON.parse(xhr.responseText).data.series.length; i++) {
    data[i].y = JSON.parse(xhr.responseText).data.series[i];
  }

  // x轴刻度之间的单位宽度
  const widthOfOne = (canvas.width - marginLeft * 2) / (pointsData.length - 1);
  // y轴刻度之间的单位高度
  const heightOfOne = (canvas.height - marginBottom - marginTop) / 6;
  // 保存坐标原点，后面的操作都需要
  context.save();
  // 绘制x轴和与x轴平行的刻度线
  for (let i = 0; i < 6; i++) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width - marginLeft * 2, 0);
    context.closePath();
    context.stroke();
    //每次绘制完之后往上平移循环绘制下一条
    context.translate(0, heightOfOne);
  }
  // 回到原点，方便下一步的操作
  context.restore();

  // 保存坐标原点，后面的操作都需要
  context.save();
  // 绘制x轴下面的小刻度线
  for (let i = 0; i < data.length; i++) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, -5);
    context.closePath();
    context.stroke();
    context.translate(widthOfOne, 0);
  }
  // 回到原点，方便下一步的操作
  context.restore();

  //绘制X轴上的信息
  context.save();
  //因为是镜像，直接绘制文字就是倒置的，所以要再一次镜像处理还原文字
  context.scale(1, -1);
  context.font = "10pt Calibri";
  for (let i = 0; i < data.length; i++) {
    context.stroke();
    if (i === 0) {
      context.translate(0, 15);
    } else {
      context.translate(widthOfOne, 0);
    }
    // 获取x轴上刻度信息的字符长度
    const textWidth = context.measureText(data[i].x);
    // 保持字体中点显示在刻度的下面
    context.fillText(data[i].x, -textWidth.width / 2, 0);
  }
  context.restore();

  //绘制Y轴刻度上的信息
  context.save()
  context.scale(1, -1);
  context.translate(-40, 0);
  context.font = "10pt Calibri";
  for (let i = 0; i < 6; i++) {
    context.stroke();
    context.fillText((2000 * i).toString() + '人', 0, 0);
    context.translate(0, -heightOfOne);
  }
  context.restore()

  // 每个点的x轴，y轴像素位置
  const Point = {
    createNew: function (x, y) {
      const point = {};
      point.x = x;
      point.y = y;
      return point;
    }
  }

  // 单位像素高度 坐标系实际像素高度/y轴范围
  const danweiHeight = 3 / 80;
  const points = new Array(data.length);
  for (let i = 0; i < points.length; i++) {
    points[i] = Point.createNew(0 + widthOfOne * i, data[i].y * danweiHeight);
  }

  // 绘制折线
  context.save();
  context.beginPath();
  for (let i = 0; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.strokeStyle = "rgb(93,111,194)"
  context.lineWidth = 1
  context.shadowBlur = 5;
  context.stroke();
  context.closePath();
  context.restore();

  // 绘制折点
  context.save();
  for (let i = 0; i < points.length; i++) {
    context.beginPath();
    context.arc(points[i].x, points[i].y, 3, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = 'rgb(49,131,186)';
    context.shadowBlur = 5;
    context.shadowColor = 'rgb(49,131,186)';
    context.fill()
  }
  context.restore();

  // 在每个折点上显示数值
  context.save();
  context.scale(1, -1);
  context.font = "7pt Calibri";
  context.fillStyle = "rgb(93,111,194)";
  for (let i = 0; i < points.length; i++) {
    context.stroke();
    const textWidth = context.measureText(data[i].y);
    context.fillText(data[i].y + '人', -textWidth.width / 2 + points[i].x, -points[i].y - 10);
  }
  context.restore();
})()