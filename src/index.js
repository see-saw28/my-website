import Window from "./js/window";

var windowElements = document.querySelectorAll(".windows #win");


const windowList = [];

window.maxZIndex = 0;

windowElements.forEach((el) => {
  windowList.push(new Window(el));
});

window.addEventListener("mouseup", () => {
  windowList.forEach((win) => {
    win.isGrabbed = false;
    win.el.classList.remove("is-grabbed");
  });
});

window.addEventListener("mousemove", (e) => {
  windowList.forEach((win) => {
    //console.log(e);
    if (win.isGrabbed) {
      win.el.style.transition= '';
      win.el.style.transform = `translate3d(${
              e.clientX - win.grabOffset.x
            }px, ${e.clientY - win.grabOffset.y}px, 0)`;
      const rect = win.el.getBoundingClientRect();
      win.posX=rect.x/(window.innerWidth - rect.width);
      win.posY=rect.y/(window.innerHeight - rect.height);

    }
  });
});

window.addEventListener("resize", () => {
  windowList.forEach((win) => {
    win.setWindowPosition();
    console.log(win.posX)
  });
});

export function createWindow (el){
windowList.push(new Window(el));
console.log(windowList)
};

