let landing=document.querySelector('.landing');
let x=1,clearInt=0;
if(localStorage.getItem('backgroundIndex'))
landing.style.backgroundImage=`url(Images/image0${localStorage.getItem('backgroundIndex')}.jpg)`;
function randomBackgrounds(){
  clearInt=setInterval(()=>{
    if(x==5)
    x=1;
    localStorage.setItem('backgroundIndex',x);
    landing.style.backgroundImage=`url(Images/image0${x++}.jpg)`;
    
  },5000);
}
//######################################################################## Random Backgrounds ########################################################################
let settingsBox=document.querySelector('.settings-box');
let gear=document.querySelector('.gear');
gear.onclick=function(){
  settingsBox.classList.toggle('hidden');
  this.querySelector('i').classList.toggle('fa-spin');
}
let allColors=settingsBox.querySelectorAll('li');
if(localStorage.getItem('mainColor')){
  allColors.forEach(color=>{
    if(color.dataset.color==localStorage.mainColor){
      color.classList.add('active');
      document.documentElement.style.setProperty('--main-color',color.dataset.color);
    }
    else
    color.classList.remove('active');
  })
}
function changeColor(){
  allColors.forEach(color=>{
    color.addEventListener('click',(e)=>{
      allColors.forEach(c=>{
        c.classList.remove('active');
      })
      e.target.classList.add('active');
      localStorage.setItem('mainColor',e.target.dataset.color);
      document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
    })
  })
}
changeColor();
let randomSpans=document.querySelectorAll('.box.random span');
randomSpans.forEach(span=>{
  span.addEventListener('click',function(){
    console.log(this);
    randomSpans.forEach(span=>span.classList.remove('active'));
    this.classList.add('active');
    if(this.classList.contains('no')){
      clearInterval(clearInt);
    }else{
      randomBackgrounds();
    }
  })
})
document.querySelector('.reset-options').onclick=function(){
  localStorage.clear();
  location.reload();
}
//######################################################################## Settings Box       ########################################################################
let progressSpans=document.querySelectorAll('.skill-progress span');
let ourSkills=document.querySelector('.our-skills');
function fillProgress(){
  progressSpans.forEach(progress=>{
    progress.style.width=progress.dataset.progress;
  })
}
window.onscroll=function(){
  /*Skills Offset top*/
  let skillsOffSetTop=ourSkills.offsetTop;
  //sum of height of all sections above the ourSkills section
  /**Get Outer height */
  let skillsOuterHiehgt=ourSkills.offsetHeight;
  //Elements Height
  /**Get window height */
  let windowHeight=this.innerHeight;
  //Height of the window
  /**Get current scroll */
  let windowScrollTop=this.scrollY;
  console.log(windowScrollTop,skillsOffSetTop+skillsOuterHiehgt-windowHeight)
  if(windowScrollTop>=(skillsOffSetTop+skillsOuterHiehgt-windowHeight))
  fillProgress();
}
//######################################################################## Skills Section ########################################################################
let galleryImages=document.querySelectorAll('.gallery img');
galleryImages.forEach(img=>{
  img.addEventListener('click',()=>{
    let overlay=document.querySelector('.overlay');
    overlay.classList.remove('hidden');
    let box=overlay.querySelector('.box');
    let image=document.createElement('img');
    image.src=img.src;
    box.append(image);
    image.addEventListener('click',function(){
      overlay.classList.add('hidden');
      image.remove();
    })
    box.querySelector('.before').addEventListener('click',function(){
      overlay.classList.add('hidden');
      image.remove();
    })
  })
})
//######################################################################## Gallery Section ########################################################################
let bullets=document.querySelector('.nav-bullets');
let activateSpans=document.querySelectorAll('.content.bullets  span');
console.log(randomSpans);
console.log(activateSpans)
activateSpans.forEach(span=>{
  span.addEventListener('click',function(){
    if(this.classList.contains('yes'))
    bullets.classList.remove('disabled');
    else
    bullets.classList.add('disabled');
    activateSpans.forEach(x=>{
      x.classList.remove('active');
    })
    this.classList.add('active');
  })
})
let bulletsDiv=document.querySelectorAll('.nav-bullets .bullet');
bulletsDiv.forEach(bullet=>{
  bullet.addEventListener('click',function(){
    document.querySelector(`${this.dataset.hrf}`).scrollIntoView({
      behavior:"smooth"
    })
  })
})
//######################################################################## Activate bullets ########################################################################
let bars=document.querySelector('.bars');
bars.addEventListener('click',function(){
  document.querySelector('.header .container .links').classList.toggle('shown');
  document.querySelector('.settings-box .gear').classList.toggle('hidden');
})
//######################################################################## Responsive links ########################################################################
