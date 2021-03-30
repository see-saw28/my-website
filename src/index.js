import Window from "./js/window";

var windowElements = document.querySelectorAll(".windows .win");
const icons = document.querySelectorAll(".windows .icon")

const windowList = [];
var pdfTab=null;
var txtTab=null;
var imgTab=null;
window.maxZIndex = 0;

windowElements.forEach((el) => {
  windowList.push(new Window(el));
  if(el.id=='pdf'){
        pdfTab=el;
        }
  if(el.id=='txt'){
          txtTab=el;
          }
  if(el.id=='image'){
            imgTab=el;
            }
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




icons.forEach((ico) => {
    ico.addEventListener("dblclick", () => {

        if(ico.id=='txt'){
            document.querySelector('.windows').insertBefore(txtTab,document.querySelector(' .icon'));
            document.querySelector('.windows').insertBefore(txtTab,document.querySelector(' .icon'));
            txtTab.style.zIndex = window.maxZIndex++;
        }

        if(ico.id=='image'){
            console.log('open '+ico.id)
            document.querySelector('.windows').insertBefore(imgTab,document.querySelector(' .icon'));
            imgTab.style.zIndex = window.maxZIndex++;
                }

        if(ico.id=='pdf'){
            console.log('open '+ico.id)
            document.querySelector('.windows').insertBefore(pdfTab,document.querySelector(' .icon'));
            pdfTab.style.zIndex = window.maxZIndex++;
        }
        });

});
export { windowList };

