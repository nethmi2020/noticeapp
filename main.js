const addBox= document.querySelector (".add-box");
 popupBox= document.querySelector(".popup-box");
 closepopup=document.querySelector(".close");
 title=popupBox.querySelector("input");
 desc=popupBox.querySelector("textarea");
addBtn=popupBox.querySelector("button");
 
//  Also the method getElementsByClassName(..) returns a collection of nodes, not a single element. 
//  To assign an event listener we need to loop that collection and assign event to each DOM element 
//  in it.
const months = ["January","February","March","April","May","June","July","August","September","October",
"November","December"];

const notes=JSON.parse(localStorage.getItem("notes") || "[]");

// getting localstorage notes if exhiust and parsing them
// to js object else passing an empty array to notes
 addBox.addEventListener("click",()=>{
    //  alert('hi');
    title.value="";
    desc.value="";
     popupBox.classList.add("show");
 })
 closepopup.addEventListener("click",()=>{
    //  alert('hi');
     popupBox.classList.remove("show");
 })


 function shownotes(){
     document.querySelectorAll(".note").forEach(note=> note.remove());
     notes.forEach((note)=>{
            let liTag=`
            <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="setting">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <ul class="menu">
                        <li> <i style="color:blue" class=" fa fa-pencil " ></i>Edit</li>
                        <li> Delete</li>
                        <!-- <i class=" fa fa-trash"></i> -->
                    </ul>
                </div>
            </div>
        </li> `;

        addBox.insertAdjacentHTML("afterend",liTag);
     });
 }
 shownotes();
 addBtn.addEventListener("click", e=>{
     e.preventDefault();
     let notetitle= title.value;
     notedesc=desc.value;

     if(notetitle || notedesc){
         let dateobj=new Date();
         month=months[dateobj.getMonth()];
         day=dateobj.getDay();
         year=dateobj.getFullYear();

         let noteinfo={

            title:notetitle, description:notedesc,
            date:`${month} ,${year} `
           
         }
         console.log(noteinfo);


         
         notes.push(noteinfo); 
         //adding new note to notes
     
         // saving notes to local storage
         localStorage.setItem("notes", JSON.stringify(notes));
         closepopup.click();
         shownotes();
     }
    
    
 });