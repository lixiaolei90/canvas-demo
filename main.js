let canvas = document.getElementById('canvas')


let context = canvas.getContext('2d')


let lineWidth = 5



autoSetCanvasSize(canvas)

listenToUser(canvas)

let eraserEnabled = false
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
deleteicon.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
downloadimg.onclick = function() {
  let url = canvas.toDataURL("image/png")
  let image = document.createElement('a')
  document.body.appendChild(image)
  image.href = url
  image.download = "我的画"
  image.click()
}

red.onclick = function() {
  context.strokeStyle = "red"


  red.classList.add('active')


  yellow.classList.remove('active')


  blue.classList.remove('active')


}
yellow.onclick = function() {
  context.strokeStyle = "yellow"


  yellow.classList.add('active')


  red.classList.remove('active')


  blue.classList.remove('active')


}
blue.onclick = function() {
  context.strokeStyle = "blue"


  blue.classList.add('active')


  red.classList.remove('active')


  yellow.classList.remove('active')


}
thin.onclick = function() {
  lineWidth = 5


  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function() {
  lineWidth = 10


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
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

// function drawCircle(x, y, radius) {
//   context.beginPath()
//   context.fillStyle = 'black'
//   context.arc(x, y, radius, 0, Math.PI * 2)


//   context.fill()
// }

function drawLine(x1, y1, x2, y2) {
  context.beginPath()


  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
  console.log(context)
}

function listenToUser(canvas) {


  let using = false
  let lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if(document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function(event)  {
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY
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
    canvas.ontouchmove = function(event) {
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY
      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
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
    //非触屏设备
    canvas.onmousedown = function(event) {
      let x = event.clientX
      let y = event.clientY
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
    canvas.onmousemove = function(event) {
      let x = event.clientX
      let y = event.clientY

      if (!using) {return}
  
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        let newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(event) {
      using = false
    }
  }

}

