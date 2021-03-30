import { createWindow } from "../index";


export default class Window {
  constructor(el, initX, initY,off) {
    console.log('new')
    this.el = el;
    let height = 300;
    let width = 300;
    this.el.style.zIndex = window.maxZIndex++;
    this.isGrabbed = false;
    this.isReduced = false;
    this.isInit = false;

    this.grabOffset = { x: 0, y: 0 };

    if (this.el.dataset.width && this.el.dataset.height) {

      width = this.el.dataset.width;
      height = this.el.dataset.height;
      console.log(width,height)
    }
    this.el.style.width = width + "px";
    this.el.style.height = height + "px";
    const rectangle = this.el.getBoundingClientRect();
    if (this.el.dataset.initX && this.el.dataset.initY) {
          this.posX =
            (this.el.dataset.initX / 100) ;
          this.posY =
            (this.el.dataset.initY / 100) ;
        }
    else{
        this.posX = Math.random() ;
        this.posY = Math.random() ;
    }

    this.setWindowPosition();
    const close=el.querySelector(".off")

    const reduce=el.querySelector(".red")


    const to_open=el.querySelector("#top")



    close.addEventListener("mousedown", (e) => this.Close(e));

    if (to_open!=null){
            to_open.addEventListener("mousedown", (e) => this.Move(e));
            }

    if (reduce!=null){
    reduce.addEventListener("mouseup", (e) => this.Reduce(e));
    }

    if (to_open!=null){
            to_open.addEventListener("mousedown", (e) => this.Open(e));
            }


    el.addEventListener("mousedown", (e) => this.onMouseDown(e));
  }

  Close(e) {
      console.log('close');
      this.el.remove()
      var windowElements = document.querySelectorAll(".windows .win");
      if (windowElements.length==0){

      const doc=document.querySelector(".windows")
      //console.log(doc)
      doc.innerHTML=`<div id="win" data-init-x="30" data-init-y="30" data-width="1800" data-height="250">
                            <div id="top">
                                <div class="windows-title"><p>me.txt</p></div>
                                <div class="option">
                                    <div class="red"> _ </div>
                                    <div class="off"> X </div>
                                </div>
                            </div>
                            <div id="cv_all"><h1>Well done ;)</h1>

                            </div>

                        </div>
                        <script src="src/index.js"></script>`;
      createWindow(this.el);
      console.log(windowList);


    }
      }

  Open(e){
      var x=0;
      var y=0;
      if(this.isReduced){
          console.log('open');
          this.isReduced = false;
          this.el.firstElementChild.classList.remove("is-reduced");
          this.el.querySelector(".red").innerHTML='_';
          const rectangle = this.el.getBoundingClientRect();
          x=this.posX * (window.innerWidth - rectangle.width);
          y=this.posY* (window.innerHeight - rectangle.height);
          const reduced=document.querySelectorAll(".is-reduced");


          this.el.style.transform = `translate3d(${x}px, ${y }px, 0)`;

      }

  }
  Reduce(e) {
            var x=0;
            var y=0;
            if(!this.isReduced){
            console.log('reduce');
            const reduced=document.querySelectorAll(".is-reduced");
            this.el.style.transition='transform 230ms ease-in-out'
            x=30;
            if (reduced.length>0){

            reduced.forEach((win)=>{
            x+=5;
            x+=parseInt(win.parentNode.dataset.width,10)})
            console.log(x)}
            this.isReduced = true;
            this.el.firstElementChild.classList.add("is-reduced")
            this.el.querySelector(".red").innerHTML='☐';
            y=window.innerHeight - 42;

        const rectangle = this.el.getBoundingClientRect();
        //this.el.style.transition= 'transform 230ms ease-in-out';
        this.el.style.transform = `translate3d(${x}px, ${y }px, 0)`;


        }

        }
  Move(e){
  console.log('move')
  var x1=30;

  const reduced=document.querySelectorAll(".is-reduced");
    if (reduced.length>0){
        reduced.forEach((red)=>{
            console.log(x1);
            red.parentNode.style.transform = `translate3d(${x1}px, ${(window.innerHeight - 42)}px, 0)`;
            x1+=parseInt(red.parentNode.dataset.width,10);
            x1+=5;
            }
        )
    }
  }

  onMouseDown(e) {
    //console.log(e);
    if (!this.isReduced){
    this.el.style.zIndex = window.maxZIndex++;
    this.isGrabbed = true;
    this.el.classList.add("is-grabbed");

    //computing offset between mouse and card origin
    const rectangle = this.el.getBoundingClientRect();
    this.grabOffset = {
      x: e.clientX - rectangle.x,
      y: e.clientY - rectangle.y
    };}
  }

  setWindowPosition() {
    const rectangle = this.el.getBoundingClientRect();

    this.el.style.transform = `translate3d(${this.posX * (window.innerWidth - rectangle.width)}px, ${this.posY* (window.innerHeight - rectangle.height)}px, 0)`;
  }


}

