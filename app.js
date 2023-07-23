const timerContainer=document.querySelector(".current-timers");

const setTime= document.querySelector(".set-time");
const setBtn=document.getElementById("set");
const warnContainer=document.getElementById("warn-container")
setBtn.addEventListener("click",createTimer);

function createTimer(){
    
    var inHrs=Number(document.getElementById("set-hour").value);
    var inMin=Number(document.getElementById("set-minute").value);
    var inSec=Number(document.getElementById("set-second").value); 

    if(warnContainer.querySelector(".warning")){
        warnContainer.querySelector(".warning").remove();
    } 
    
    if(inHrs>24 || inHrs<0 || inMin>60 || inMin<0 || inSec>60 || inSec<0){
        const warning=document.createElement("div");
        warning.classList.add("warning");
    
        warning.innerHTML=`
            <p style="color:red ; font-size:2.5rem">Warning:</p>
            <h2 style="font-size:4rem; margin-bottom:3rem"> Invalid Time! </h2>
        `
        warnContainer.appendChild(warning);
    
        warning.style.display="none";
        
        warning.style.display="block";
        return;
    }

    
    // timerContainer.querySelector("p").style.display="none";
    if(timerContainer.querySelector("#no-timers"))
        timerContainer.querySelector("#no-timers").remove();
    

    const newTimer=document.createElement("div");
    newTimer.classList.add("time-left");

    newTimer.innerHTML=`
    
        <p>Time Left :</p>
        <div class="inputs">
            <input type="number" id="hour" max="24" min="0" placeholder="hh" readonly value=${inHrs}>
            <span>:</span>
            <input type="number" id="minute" max="60" min="0" placeholder="mm" readonly value=${inMin}>
            <span>:</span>
            <input type="number" id="second" max="60" min="0" placeholder="ss" readonly value=${inSec}>
        </div>
        <button id="delete">Delete</button>

    `;
    const delBtn=newTimer.querySelector("#delete");
    delBtn.addEventListener("click",deleteTimer);
    
    timerContainer.appendChild(newTimer);

    

    const interval=setInterval(
        ()=>{


            disHrs=newTimer.querySelector("#hour");
            disMin=newTimer.querySelector("#minute");
            disSec=newTimer.querySelector("#second");

            if(inHrs===0 && inSec===0 && inMin===0){
                clearInterval(interval);
                timeOut();
            }

            inSec--;

            if(inSec>=10){
                disSec.value=inSec;
            }else if(inSec<10 && inSec>=0){
                disSec.value=`0${inSec}`;
            }
            else if(inSec<0){
                inMin--;
                inSec=59;
                disSec.value=inSec;
            }

            if(inMin>=10){
                disMin.value=inMin;
            }else if(inMin<10 && inMin>=0){
                disMin.value=`0${inMin}`;
            }
            else if(inMin<0){
                inHrs--;
                inMin=59;
                disMin.value=inMin;
            }

            if(inHrs>=10){
                disHrs.value=inHrs;
            }
            else if(inHrs<10 && inHrs>=0){
                disHrs.value=`0${inHrs}`;
            }
            else if (inHrs<0){
                disSec.value="00";
                disMin.value="00";
                disHrs.value="00";
            }
            
        }
        ,999
    )

    function timeOut(){
            newTimer.innerHTML=`
            <p></p>
            <h2>Time is Up!</h2>
            <button id="delete">Stop</button>

        `;

        newTimer.style.backgroundColor="#f0f757";
        newTimer.style.color="#3434a4";

        newTimer.style.justifyContent="space-around";

        const donebtn=newTimer.querySelector("button");
        donebtn.addEventListener("click",deleteTimer);
        donebtn.style.backgroundColor="#3434a4";
        donebtn.style.color="#fff"

        

    }

    function deleteTimer(){
        newTimer.remove();

        if(timerContainer.children.length===0){
            timerContainer.innerHTML=`
                <p id="no-timers">You Have No Timers Currently!</p>
            `
        }
    }
    
    // console.log(timerContainer.children.length);
}

