const addBox= document.querySelector (".add-box");
 popupBox= document.querySelector(".popup-box");
 closepopup=document.querySelector(".close");
 
//  Also the method getElementsByClassName(..) returns a collection of nodes, not a single element. 
//  To assign an event listener we need to loop that collection and assign event to each DOM element 
//  in it.

 addBox.addEventListener("click",()=>{
    //  alert('hi');
     popupBox.classList.add("show");
 })
 closepopup.addEventListener("click",()=>{
    //  alert('hi');
     popupBox.classList.remove("show");
 })