/*

import { windowList } from '../index.js'

var x = 500;
var y = 500;
var dx = Math.cos(2*3.14*Math.random());
var dy = Math.sin(2*3.14*Math.random());



function moves() {
windowList.forEach((win) => {

    let top=win.el.querySelectorAll("#top")

      if(top.length==0){

      move(win.el)}
    });
}

function move(winn) {



    if(winn.classList!="is-grabbed"){
    winn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const rect = winn.getBoundingClientRect();
    winn.posX=rect.x/(window.innerWidth - rect.width);
    winn.posY=rect.y/(window.innerHeight - rect.height);

    if(x + dx > window.innerWidth-winn.dataset.width || x + dx < 0) {
        dx = -dx;
    }
    if(y + dy > window.innerHeight-winn.dataset.height || y + dy < 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;
    }

}

setInterval(moves, 100);

*/

