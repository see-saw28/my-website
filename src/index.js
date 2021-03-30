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
        if(ico.id=='pdf'){
            console.log('open '+ico.id)
            const doc = document.querySelector(".windows")
              //console.log(doc)
              var newDiv = document.createElement('div');
              console.log(newDiv);
              document.querySelector('.windows').insertBefore(newDiv,document.querySelector(' .icon'));

              newDiv.innerHTML='<div id="top">'
                                          +' <div class="windows-title"><p>mon-CV.pdf</p></div>'
                                         +'  <div class="option">'
                                            +'   <div class="red"> _ </div>'
                                            +'   <div class="off"> X </div>'
                                         +'  </div>'
                                      +' </div>'
                                     +'  <div id="cv_all">'

                                        +'   <div id="cv">'
                                          +'     <div class="leftcolumn">'

                                               +'    <div class="cv">'
                                               +'        <h3>Contact</h3>'
                                               +'        <p>paul.gaigne@ens-paris-saclay.fr</p>'
                                              +'         <p>06 24 16 21 20</p>'
                                             +'          <p>26 rue du bois</p>'
                                              +'         <p>35135 Chantepie</p>'
                                              +'         <p>Né le 28/04/2000</p>'
                                              +'         <p>Permis B</p>'
                                              +'     </div>'
                                              +'     <div class="cv">'
                                                 +'      <h3>Langues</h3>'

                                                +'       <p><strong>Anglais</strong>  Préparation à la certification Cambridge C1</p>'
                                                +'       <p><strong>Espagnol</strong>  Niveau scolaire</p>'

                                               +'    </div>'
                                                +'   <div class="cv">'
                                                 +'      <h3>Voyages</h3>'
                                                 +'      <p>États-Unis,'
                                                   +'    Chine (échange scolaire avec Centrale Pékin),'
                                                   +'    Angleterre,'
                                                   +'    Irlande,'
                                                   +'    Maroc,'
                                                    +'   Grèce,'
                                                    +'   Espagne,'
                                                    +'   Croatie,'
                                                       +'    Slovénie</p>'
                                                 +'  </div>'
                                                 +'  <div class="cv">'
                                                    +"   <h3>Centres d'interêts</h3>"
                                                   +'    <p>Handball</p>'
                                                   +'    <p>Course à pied</p>'
                                                 +'  </div>'
                                                 +'  <div class="cv">'
                                                    +'   <h3>Compétences</h3>'

                                                    +'   <p><strong>Bureautique :</strong> Latex, suite Office </p>'
                                                   +'    <p><strong>Notion avancées :</strong> Python, MatLab</p>'
                                                   +'    <p><strong>Notion de base :</strong> SQL, JavaScript, VHDL</p>'

                                                 +'  </div>'
                                            +'   </div>'
                                            +'   <div class="rightcolumn">'
                                              +'     <div class="cv">'
                                                +'       <h3>Formations et diplômes</h3>'
                                                 +'      <ul class="other">'
                                                  +'         <li>'
                                                   +'            <div><strong>Depuis sept. 2020</strong> École normale supérieur Paris-Saclay L3 - SAPHIRE - spécialité: Ingénierie Électrique</div>'
                                                  +'         </li>'
                                                   +'        <li>'
                                                     +'          <div><strong>De 2018-2020</strong> CPGE  PCSI/PSI Lycée Clemenceau (Nantes)</div>'
                                                    +'       </li>'
                                                     +'      <li>'
                                                      +'         <div><strong>Juil.2018</strong> Baccalauréat Scientifique Lycée Joliot Curie (Rennes)</div>'
                                                     +'      </li>'
                                                    +'   </ul>'
                                                +'   </div>'
                                                +'   <div class="cv">'
                                               +'        <h3>Projet professionnel</h3>'
                                                +'       <p>Travailler dans la recherche dans un domaine autour de l’énergie.</p>'
                                              +'     </div>'
                                              +'     <div class="cv">'
                                               +'        <h3>Expériences professionnelles</h3>'
                                                    +'   <ul class="other">'
                                                   +'        <li>'
                                                       +'        <div><strong>Été 2018 et 2019</strong> Préparateur de commande Lactalis,Cesson-Sévigné</div>'
                                                      +'     </li>'
                                                     +'      <li>'
                                                       +'        <div><strong>De 2016 à 2018</strong> Baby-sitting et missions Argent de poche avec la mairie</div>'
                                                      +'     </li>'
                                                   +'    </ul>'
                                               +'    </div>'

                                            +'   </div>'

                                        +'   </div>'
                                        +' </div>'
                                           +'     <div class="bottom">'
                                            +'        <a href="doc/CV_GAIGNE_Paul.pdf" target="popup">'

                                              +'          Télécharger mon CV'
                                              +'      </a>'
                                             +'   </div>'
              newDiv.classList.add("win");
              newDiv.setAttribute('data-width', "600");
              newDiv.setAttribute('data-height', "800");
              console.log(newDiv.dataset)



              windowList.push(new Window(newDiv));
        }
        });

});
export { windowList };

