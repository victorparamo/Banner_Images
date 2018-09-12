firstImage = document.getElementById("firstImage");
secondImage = document.getElementById("secondImage");
transitionList =  document.getElementsByClassName("transitionList")[0];

firstImageHeight = window.getComputedStyle(firstImage).getPropertyValue('height');
firstImageHeight = firstImageHeight.split("px")[0];
secondImageHeight = window.getComputedStyle(secondImage).getPropertyValue('height');
transitionListHeight = window.getComputedStyle(transitionList).getPropertyValue('height');
transitionListHeight = transitionListHeight.split("px")[0];

const num = 4;
let current = 0;
const addTop = parseFloat(firstImageHeight)/num;
const addList =  parseFloat(transitionListHeight)/num
const minTop =  0 - firstImageHeight + addTop/2;
const maxTop = addTop/2;
let flag = 0;
let transitionend = 1;

firstImage.addEventListener('transitionend', function(e) {
    transitionend = 1; 
});

firstImage.style.top = `${addTop - firstImageHeight}px`;
secondImage.style.top = 0;

function scrollFunction(event){
    if(event.deltaY > 3 && flag === 0 && transitionend) {
        console.log("up");
        goUp(firstImage);
        goDown(secondImage);
        flag = 1;
        if(current <= num && current > 0){
            let top = window.getComputedStyle(transitionList).getPropertyValue('top');
            top = parseFloat(top.split("px")[0]);
            transitionList.style.top = `${top+addList}px`;
            current--;
        }
        changeLinesWidth(); 
    }
    else if(event.deltaY < -3 && flag === 0 && transitionend){
        console.log("down");
        goDown(firstImage);
        goUp(secondImage);
        flag = 1;
        if(current >= 0 && current < num-1){
            let top = window.getComputedStyle(transitionList).getPropertyValue('top');
            top = parseFloat(top.split("px")[0]);
            transitionList.style.top = `${top-addList}px`;
            current++;
        }
        changeLinesWidth(); 
    }
    if(event.deltaY > -1 && event.deltaY < 1) {
        flag = 0;
    } 
}
function goUp(element) {
    let top = window.getComputedStyle(element).getPropertyValue('top');
    top = parseFloat(top.split("px")[0]);
    const sum = top - addTop;

    if(sum > minTop && sum < maxTop){
        transitionend = 0;
        element.style.top = `${sum}px`;
    }    
}
function goDown(element) {
    let top = window.getComputedStyle(element).getPropertyValue('top');
    top = parseFloat(top.split("px")[0]);
    const sum = top + addTop;

    if(sum > minTop && sum < maxTop){
        transitionend = 0;
        element.style.top = `${sum}px`;
    }  
}
function changeLinesWidth(){
    lines =  document.getElementsByClassName("bars");

    for(i = 0; i < num; i++){
        if(i===current){
            lines[i].classList.add("active");
        }
        else{
            lines[i].classList.remove("active");
        }
    }

}  
