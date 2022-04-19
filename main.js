const addBox= document.querySelector (".add-box");
 popupBox= document.querySelector(".popup-box");
 popuptitle= document.querySelector("header p span");
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
let isUpdate= false,updateid;


// getting localstorage notes if exhiust and parsing them
// to js object else passing an empty array to notes
 addBox.addEventListener("click",()=>{
    //  alert('hi');
    title.focus();

     popupBox.classList.add("show");
 })
 closepopup.addEventListener("click",()=>{
    //  alert('hi');
    isUpdate=false;
    title.value="";
    desc.value="";
    addBtn.innerText="Update Note";
    popuptitle.innerText="Update a note"
     popupBox.classList.remove("show");
 })


 function shownotes(){
     document.querySelectorAll(".note").forEach(note=> note.remove());
     notes.forEach((note,i)=>{
            let liTag=`
            <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="setting">
                    <i onclick="showmenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <ul class="menu">
                        <li onclick= "editnote(${i}, '${note.title}','${note.description}')"> <i style="color:blue" class=" fa fa-pencil " ></i>Edit</li>
                        <li onclick="deletenote(${i})"> Delete</li>
                        <!-- <i class=" fa fa-trash"></i> -->
                    </ul>
                </div>
            </div>
        </li> `;

        addBox.insertAdjacentHTML("afterend",liTag);
     });
 }
 shownotes();

 function showmenu(dd){
dd.parentElement.classList.add("show");
document.addEventListener("click",e=>{
    // removing show class from the stting menu on document click
    if(e.target.tagName!= "I" || e.target != dd){
        dd.parentElement.classList.remove("show");
    }
})
 }

 function deletenote(noteid){
     notes.splice(noteid,1)  //removing selected note frrom array task
    //  saving updated notes to local stirage
    localStorage.setItem("notes", JSON.stringify(notes));
    shownotes();
 }

 function editnote(noteid, title1,description){
     addBox.click();
     isUpdate=true;
     updateid=noteid;
     title.value=title1;
     desc.value=description;
     addBtn.innerText="Update Note";
     popuptitle.innerText="Update a note";
     console.log(noteid, title,description);
 }

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
        // console.log(noteinfo);

         if(!isUpdate){
             notes.push(noteinfo);
         }
         else{
             isUpdate=false;
             notes[updateid]=noteinfo ;// updating new note to notes
         }
         
         notes.push(noteinfo); 
         //adding new note to notes
     
         // saving notes to local storage
         localStorage.setItem("notes", JSON.stringify(notes));
         closepopup.click();
         shownotes();
     }
    
    
 });