import Window from "./js/window";

//ensemble des fenetres
var windowElements = document.querySelectorAll(".windows .win");
//ensemble des icones
var icons = document.querySelectorAll(".windows .icon")

const windowList = [];

//memorisation des fenetres
var pdfTab=null;
var txtTab=null;
var imgTab=null;

//z-index pour placer les objets au plus haut
window.maxZIndex = 0;

//creation des objets fenetres
windowElements.forEach((el) => {
  windowList.push(new Window(el));
  //memorisation des fenetres
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

//on enleve l'attribut is-grabbed lorsqu'on lache une fenetre
window.addEventListener("mouseup", () => {
  windowList.forEach((win) => {
    win.isGrabbed = false;
    win.el.classList.remove("is-grabbed");
  });
});


//detection des mouvements de souris
window.addEventListener("mousemove", (e) => {
  windowList.forEach((win) => {
    //console.log(e);

    //mis a jour de la position de la fenetre grabbed
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


//mis a jour des position lors du redimmensionnement du navigateur
window.addEventListener("resize", () => {
  windowList.forEach((win) => {
    win.setWindowPosition();
    console.log(win.posX)
  });
});

//lecture double clicks sur une icone
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

