
initial();

function initial(){
    getInputFromKeyboard();
    deleteElement();
    drag();
}

function getInputFromKeyboard(){
    var input = document.querySelector("input");
    input.addEventListener("keypress", function(e){
        if(this.value && e.keyCode === 13){
            var ul = document.getElementById("todo");
            var li = "<li draggable='true'>" + input.value + "<i class='fas fa-times'></i></li>";
            ul.insertAdjacentHTML('afterbegin',li);
        }
    })
}

function deleteElement(){
    document.getElementById("todo").addEventListener("click", function(e){
        if(e.target && e.target.nodeName === "I"){
            fadeOutEffect(e.target);
            }
    })
    document.getElementById("doing").addEventListener("click", function(e){
        if(e.target && e.target.nodeName === "I"){
            fadeOutEffect(e.target);
        }
    })
    document.getElementById("done").addEventListener("click", function(e){
        if(e.target && e.target.nodeName === "I"){
            fadeOutEffect(e.target);
        }
    })
}

function fadeOutEffect(element){
    var li = element.parentNode;
    var fadeEffect = setInterval(function (){
        if(!li.style.opacity) li.style.opacity = 1;
        if(li.style.opacity < 0.1) {
            clearInterval(fadeEffect);
            li.parentNode.removeChild(li);
        } else {
            li.style.opacity -= 0.5;
        }
    }, 100)
}

function drag(){
    var dragged;
    document.addEventListener("dragstart", function(e){
        dragged = e;
        e.target.style.opacity = .5;
    },false)

    document.addEventListener("dragend", function(e){
        e.target.style.opacity = "";
    },false)

    document.addEventListener("dragover", function(e){
        e.preventDefault();
    },false)

    document.addEventListener("dragenter", function(e){
        if(e.target.nodeName === "UL")e.target.style.background = "#f2f2f2";
        if(e.target.nodeName === "LI") e.target.style.background = "#f2f2f2";
    },false)

    document.addEventListener("dragleave", function(e){
        if(e.target.nodeName === "UL") e.target.style.background = "";
        if(e.target.nodeName === "LI") e.target.style.background = "";
        
    },false)

    document.addEventListener("drop", function(e){
        e.preventDefault();
        if(e.target.nodeName === "UL"){
            e.target.style.background = "";
            dragged.target.parentNode.removeChild(dragged.target);
            e.target.appendChild(dragged.target);
        }
        if(e.target.nodeName === "LI" && (e.target !== dragged.target)){
            e.target.style.background = "";
            dragged.target.parentNode.removeChild(dragged.target);
            if(dragged.pageY > e.pageY ) e.target.parentNode.insertBefore(dragged.target, e.target);
            else e.target.parentNode.insertBefore(dragged.target, e.target.nextSibling);
        }
    })
}

