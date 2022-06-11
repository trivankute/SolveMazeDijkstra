const BG_COLOR = "#231f20"
const outColor = "#F62681"
const nearOutColor = "#F85797"
const insideColor = "#FFD1E3"
const startPointColor = "#ffff00"
const endPointColor = "#00e676"
const wallColor = "#5d4037"
const roadColor = "#EDEDED"
const colorArray= [
    {
        outColor: "#F62681",
        nearOutColor: "#F85797",
        insideColor: "#FFD1E3"
    },
    {
        outColor: "#00e676",
        nearOutColor: "#69f0ae",
        insideColor: "#b9f6ca"
    },
    {
        outColor: "#3C99DC",
        nearOutColor: "#66D3FA",
        insideColor: "#D5F3FE"
    },
    {
        outColor: "#651fff",
        nearOutColor: "#7c4dff",
        insideColor: "#b388ff"
    },
]
const BG_SIZE = 600
const squareSize = 30
let width
let height
width = height = BG_SIZE/squareSize
const totalSquares = (BG_SIZE/squareSize)*2-1
let time = 25
let totalTime = time*totalSquares
const createStartPoint = document.getElementById('createStartPoint')
let onlyOneStartPoint = false
const createEndPoint = document.getElementById('createEndPoint')
let onlyOneEndPoint = false
const createWalls = document.getElementById('createWalls')
const findButton = document.getElementById('findButton')
let canvas = document.getElementById('canvas')

canvas.width = canvas.height = BG_SIZE
let ctx = canvas.getContext('2d')
ctx.fillStyle = BG_COLOR
ctx.fillRect(0,0,canvas.width,canvas.height)

let array = []
let mapArray = []
let realWay = []
let startPoint = {x:0,y:0}
let endPoint = {x:5,y:5}
// let colorIndex = 0

function draw(color,x,y,n,endPoint,array)
{
    let xMouse = x-n
    let yMouse = y
    if(n==0)
    {
        ctx.fillStyle = color
        ctx.fillRect(squareSize*xMouse,squareSize*yMouse,squareSize,squareSize)
        return
    }
    let i = 0
    while(i<n)
    {
        if(xMouse<0||xMouse>=BG_SIZE/squareSize||yMouse<0||yMouse>=BG_SIZE/squareSize)
        {
            i++
            xMouse++
            yMouse--
        }
        else if((xMouse===endPoint.x&&yMouse===endPoint.y)
        ||array[yMouse][xMouse]===3)
        {
            i++
            xMouse++
            yMouse--
        }
        else    {

            ctx.fillStyle = color
            ctx.fillRect(squareSize*xMouse,squareSize*yMouse,squareSize,squareSize)
            i++
            xMouse++
            yMouse--
        }
    }
    i = 0
    while(i<n)
    {
        if(xMouse<0||xMouse>=BG_SIZE/squareSize||yMouse<0||yMouse>=BG_SIZE/squareSize
        )
        {
            i++
            xMouse++
            yMouse++
        }
        else if((xMouse===endPoint.x&&yMouse===endPoint.y)
        ||array[yMouse][xMouse]===3)
        {
            i++
            xMouse++
            yMouse++
        }
        else
        {
            ctx.fillStyle = color
            ctx.fillRect(squareSize*xMouse,squareSize*yMouse,squareSize,squareSize)
            i++
            xMouse++
            yMouse++
        }
    }
    i = 0
    while(i<n)
    {
        if(xMouse<0||xMouse>=BG_SIZE/squareSize||yMouse<0||yMouse>=BG_SIZE/squareSize
        )
        {
            i++
            xMouse--
            yMouse++
        }
        else if((xMouse===endPoint.x&&yMouse===endPoint.y)
        ||array[yMouse][xMouse]===3)
        {
            i++
            xMouse--
            yMouse++
        }
        else
        {
            ctx.fillStyle = color
            ctx.fillRect(squareSize*xMouse,squareSize*yMouse,squareSize,squareSize)
            i++
            xMouse--
            yMouse++
        }
    }
    i = 0
    while(i<n)
    {
        if(xMouse<0||xMouse>=BG_SIZE/squareSize||yMouse<0||yMouse>=BG_SIZE/squareSize
        )
        {
            i++
            xMouse--
            yMouse--   
        }
        else if((xMouse===endPoint.x&&yMouse===endPoint.y)
        ||array[yMouse][xMouse]===3)
        {
            i++
            xMouse--
            yMouse--
        }
        else
        {
            ctx.fillStyle = color
            ctx.fillRect(squareSize*xMouse,squareSize*yMouse,squareSize,squareSize)
            i++
            xMouse--
            yMouse--    
        }
    }
}

function drawEffect()
{
    let randomColor = Math.floor(Math.random()*4)
    let level = 1
    let interval = setInterval(()=>{
        if(level<totalSquares)
        {
            draw(colorArray[randomColor].outColor,startPoint.x,startPoint.y,level,endPoint,array)
            level++
        }
        else
            clearInterval(interval)
    },time)

        setTimeout(()=>{
    let level = 1
    let interval = setInterval(()=>{
        if(level<totalSquares)
        {
            draw(colorArray[randomColor].nearOutColor,startPoint.x,startPoint.y,level,endPoint,array)
            level++
        }
        else
            clearInterval(interval)
    },time)
    },time)

        setTimeout(()=>{
    let level = 1
    let interval = setInterval(()=>{
        if(level<totalSquares)
        {
            draw(colorArray[randomColor].insideColor,startPoint.x,startPoint.y,level,endPoint,array)
            level++
        }
        else
            clearInterval(interval)
    },time)
    },time*2)

        setTimeout(()=>{
    let level = 1
    let interval = setInterval(()=>{
        if(level<totalSquares)
        {
            draw(BG_COLOR,startPoint.x,startPoint.y,level,endPoint,array)
            level++
        }
        else
            clearInterval(interval)
    },time)
    },time*6)
}

function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function getEventLocation(element,event){
    var pos = getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

function findMin(queue)
{
    let min = 999
    let index = 0
    let indexInQueue = 0
    for(let i = 0;i<queue.length;i++)
    {
        if(queue[i].min<min) {min=queue[i].min;index=queue[i].index;indexInQueue=i;}
    }
    return {min,index,indexInQueue}
}

for(let i=0;i<BG_SIZE/squareSize;i++)
{
    let smallArray = []
    for(let j=0;j<BG_SIZE/squareSize;j++)
    {
        smallArray.push(-1)
    }
    array.push(smallArray)
}

createStartPoint.onclick = () => {
    if(createStartPoint.checked==true)
    {
        createEndPoint.checked=false
        createWalls.checked = false
        canvas.addEventListener('mousedown',(e) => 
        {if(!onlyOneStartPoint)
        {
        let point = getEventLocation(canvas,e)
        point.x = Math.floor(point.x/squareSize)
        point.y = Math.floor(point.y/squareSize)
        startPoint.x = point.x
        startPoint.y = point.y
        if(array[point.y][point.x]!==2 && array[point.y][point.x]!==3)
        {
            array[point.y][point.x] = 1
            onlyOneStartPoint = true
            ctx.fillStyle = startPointColor
            ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
        }
        }}
        )
    }
}

createEndPoint.onclick = (e) => {
    if(createEndPoint.checked==true)
    {
        createStartPoint.checked=false
        createWalls.checked = false
        canvas.addEventListener('mousedown',(e)=>{
            if(!onlyOneEndPoint)
            {
                let point = getEventLocation(canvas,e)
                point.x = Math.floor(point.x/squareSize)
                point.y = Math.floor(point.y/squareSize)
                endPoint.x = point.x
                endPoint.y = point.y
                if(array[point.y][point.x]!==1 && array[point.y][point.x]!==3)
                {
                    array[point.y][point.x] = 2
                    onlyOneEndPoint = true
                    ctx.fillStyle = endPointColor
                    ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
                }
            }
        })
    }
}

createWalls.onclick = () => {
    createEndPoint.checked=false
    createStartPoint.checked=false
    canvas.addEventListener('mousedown',(e)=>{
        if(createWalls.checked===true)
        {
            let point = getEventLocation(canvas,e)
            point.x = Math.floor(point.x/squareSize)
            point.y = Math.floor(point.y/squareSize)
            if(array[point.y][point.x]!==1 && array[point.y][point.x]!==2)
            {
                array[point.y][point.x] = 3
                ctx.fillStyle = wallColor
                ctx.fillRect(squareSize*point.x,squareSize*point.y,squareSize,squareSize)
            }
        }
    })
}

findButton.onclick = () =>{
    if(onlyOneStartPoint && onlyOneEndPoint)
    {
        drawEffect()
        // create dist
        let dist = []
        for(let i = 0;i<width*height;i++)
            dist.push(999)
        dist[startPoint.y*height+startPoint.x]=0
        // create prev
        let prev = []
        // define dX, dY
        let dX = [-1,0,1,0,-1,-1,1,1]
        let dY = [0,-1,0,1,-1,1,-1,1]
        // create vis
        let vis = []
        for(let i = 0;i<height*width;i++)
        {   
            let currHeight = Math.floor(i/height)
            let currWidth = i%width
            let smallVis = []
            for(let j = 0;j<8;j++)
            {
                let newHeight = dX[j]
                newHeight += currHeight 
                let newWidth = dY[j]
                newWidth += currWidth
                if(newHeight<0||newHeight>=height||newWidth<0||newWidth>=width) continue
                if(array[newHeight][newWidth]===3) continue
                smallVis.push(newHeight*height + newWidth)
            }
            vis.push(smallVis)
        }
        // create queue and reach
        let queue = []
        let reach = false
        queue.push({index:startPoint.y*height+startPoint.x,min:0})
        while(queue.length>0&&!reach)
        {
            let {index,indexInQueue} = findMin(queue)
            queue.splice(indexInQueue,1)
            for(let i=0;i<vis[index].length;i++)
            {
                if(vis[index][i]===endPoint.y*height+endPoint.x) reach = true
                let newValue = dist[index] + 1
                if(newValue<dist[vis[index][i]])
                    {
                        prev[vis[index][i]]=index
                        dist[vis[index][i]]=newValue
                        queue.push({index:vis[index][i],min:newValue})
                    }
            }
            vis[index] = []
        }
        // create realWay
        if(reach)
        {
            let realWay = []
            let c = prev[endPoint.y*height+endPoint.x]
            while(c!=startPoint.y*height+startPoint.x)
            {
                realWay.push(c)
                c=prev[c]
            }
            setTimeout(()=>{
                let i = realWay.length-1
                let interval = setInterval(()=>{
                    if(i>=0)
                    {
                        ctx.fillStyle = roadColor
                        ctx.fillRect(realWay[i]%width*squareSize,Math.floor(realWay[i]/height)*squareSize,squareSize,squareSize)
                        i--
                    }
                    else
                    {
                        clearInterval(interval)
                    }
                },50)
            },totalTime)
        }
        else
        {
            setTimeout(()=>alert("Your way is blocked"),totalTime)
            
        }
    }
    else
    {
        alert('Please draws 1 start point and 1 end point')
    }
}


