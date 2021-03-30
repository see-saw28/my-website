import Window from "./js/window";

var windowElements = document.querySelectorAll(".windows .win");
const icons = document.querySelectorAll(".windows .icon")

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


icons.forEach((ico) => {
  ico.addEventListener("mousedown", () => {

        if(ico.id=='txt'){
            console.log('open '+ico.id)
            const doc = document.querySelector(".windows")
              //console.log(doc)
              var newDiv = document.createElement('div');
              console.log(newDiv);
              document.querySelector('.windows').insertBefore(newDiv,document.querySelector(' .icon'));

              newDiv.innerHTML='<div id="top">'
                                     +'<div class="windows-title"><p>me.txt</p></div>'
                                   + ' <div class="option">'
                                    +     '<div class="red"> _ </div>'
                                  +       '<div class="off"> X </div>'
                                  +   '</div>'
                                + '</div>'
                               + ' <div id="cv_all">'
                                 +    '<h1>Paul GAIGNE</h1>'
                                + '</div>'
              newDiv.classList.add("win");
              newDiv.setAttribute('data-width', "700");
              newDiv.setAttribute('data-height', "250");
              console.log(newDiv.dataset)



              windowList.push(new Window(newDiv));
        }
        if(ico.id=='image'){
                    console.log('open '+ico.id)
                    const doc = document.querySelector(".windows")
                      //console.log(doc)
                      var newDiv = document.createElement('div');
                      console.log(newDiv);
                      document.querySelector('.windows').insertBefore(newDiv,document.querySelector(' .icon'))
                      var newImg=document.createElement("IMG");
                      newImg.src="/P1000674.7afa8308.JPG"
                      newImg.width="400"
                      newImg.style="border-radius: 10px"
                      newDiv.innerHTML='<div id="top">'
                                                   +' <div class="windows-title"><p>myself.png</p></div>'
                                                   +' <div class="option">'
                                                     +'   <div class="red"> _ </div>'
                                                    +'    <div class="off"> X </div>'
                                                  +'  </div>'
                                              +'  </div>'
                                              +'  <div id="cv_all">'
                                               //+'    <img src="/doc/P10006741.JPG" width="400" style="border-radius: 10px" />'
                                              +'  </div>'
                      var inserts=document.querySelectorAll('#cv_all');
                      var insert=inserts[inserts.length-1];
                      insert.appendChild(newImg);
                      newDiv.classList.add("win");
                      newDiv.setAttribute('data-width', "450");
                      newDiv.setAttribute('data-height', "380");
                      newDiv.id='image';
                      console.log(newDiv.dataset)



                      windowList.push(new Window(newDiv));
                }
        });

});
export { windowList };

