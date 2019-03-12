var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled =true
  eraser.classList.add('active') 
  pen.classList.remove('active')
}
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active') 
  eraser.classList.remove('active')
}
red.onclick = function() {
  context.strokeStyle = "red";
  red.classList.add('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
yellow.onclick = function() {
  context.strokeStyle = "yellow";
  yellow.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');
}
blue.onclick = function() {
  context.strokeStyle = "blue";
  blue.classList.add('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
}
thin.onclick = function() {
  lineWidth = 5;
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function() {
  lineWidth = 10;
  thick.classList.add('active')
  thin.classList.remove('active')
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
  console.log(context)
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  if(document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(event) {
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function() {
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
      if (!using) {return}
  
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function() {
      using = false
    }
  } else {
    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
  
      if (!using) {return}
  
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
  
    }
    canvas.onmouseup = function(aaa) {
      using = false
    }
  }

}

