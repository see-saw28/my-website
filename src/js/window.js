export default class Window {
  constructor(el, initX, initY,off) {
    this.el = el;
    let height = 300;
    let width = 300;
    this.el.style.zIndex = window.maxZIndex++;
    this.isGrabbed = false;
    this.isInit = false;

    this.grabOffset = { x: 0, y: 0 };

    if (this.el.dataset.width && this.el.dataset.height) {
      width = this.el.dataset.width;
      height = this.el.dataset.height;
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

    close.addEventListener("mousedown", (e) => this.onMouseDownClose(e));

    el.addEventListener("mousedown", (e) => this.onMouseDown(e));
  }

  onMouseDownClose(e) {
      console.log('close');
      this.el.remove()
      const windowElements = document.querySelectorAll(".windows li");
      if (windowElements.length==0){
        const doc=document.querySelector(".windows ul")
        console.log('here')
        document.body.innerHTML="<h1> Bien joué ;)</h1>"

      }
    }

  onMouseDown(e) {
    //console.log(e);
    this.el.style.zIndex = window.maxZIndex++;
    this.isGrabbed = true;
    this.el.classList.add("is-grabbed");

    //computing offset between mouse and card origin
    const rectangle = this.el.getBoundingClientRect();
    this.grabOffset = {
      x: e.clientX - rectangle.x,
      y: e.clientY - rectangle.y
    };
  }

  setWindowPosition() {
    const rectangle = this.el.getBoundingClientRect();

    this.el.style.transform = `translate3d(${this.posX * (window.innerWidth - rectangle.width)}px, ${this.posY* (window.innerHeight - rectangle.height)}px, 0)`;
  }
  changeWindowPosition() {
      const rectangle = this.el.getBoundingClientRect();


      this.el.style.transform = `translate3d(${this.posX}px, ${this.posY}px, 0)`;
    }

}
