var title = document.querySelector("#title");
var desc = document.querySelector("#description");
var btn = document.querySelector("#btn");
var tasklist = document.querySelector(".tasklist");
var arrayoftasks = [];
var search = document.querySelector("#searcinput");
var currentEditId = null;

//make array == local storage 

if(localStorage.getItem("tasks")){
    arrayoftasks=JSON.parse(localStorage.getItem("tasks"));
    addelementtotasklists(arrayoftasks);

}



//delete btn 
tasklist.addEventListener("click",function (e) {
    if(e.target.classList.contains("delete_btn")){
    deleteTaskWith(e.target.parentElement.getAttribute("id"));
    e.target.parentElement.remove() 
    }
    
})


//done botton 
tasklist.addEventListener("click", function (e) {
    if (e.target.classList.contains("taskstatus")) {
        e.target.classList.add("taskdone");
        e.target.classList.remove("taskstatus");
    } else if (e.target.classList.contains("taskdone")) {
        e.target.classList.add("taskstatus");
        e.target.classList.remove("taskdone");
    }
});



//edite btn 
tasklist.addEventListener("click",function (e) {
    if(e.target.classList.contains("edit_btn")){
    edittaskwith(e.target.parentElement.getAttribute("id"));
    }
    
})

function edittaskwith(id) {
    const todo = arrayoftasks.find(task => task.id == id);
    if (todo) {
        title.value = todo.title;
        desc.value = todo.desc;
        currentEditId = id; // نخزن ال id اللي بنعدله
        btn.innerText = "Save Edit"; // نغير شكل الزرار بدل Add
    }
}



//main
btn.addEventListener("click", function () {
    
    if (title.value !== "" && desc.value !== "") {
        
        // هنا validation
        if (!validateInputs(title.value, desc.value)) {
            return; // لو validation غلط، وقف الكود
        }
        
        //edit button 
        if (currentEditId) {
            updateTask(currentEditId);
        } else {

            //add new task
            const todo = {
                id: Date.now(),
                title: title.value,
                desc: desc.value,
                done: false 
            };

            addtodotoarray(todo);
            addelementtotasklists(arrayoftasks);

            title.value = "";
            desc.value = "";
            currentEditId = null;
            btn.innerText = "Add";
        }

    } else {
        window.alert("input is required");
    }
});




function addtodotoarray(todo){
    arrayoftasks.push(todo);
    addtolocalstorage(arrayoftasks);
}




//display tasks
function addelementtotasklists(arrayoftasks){
   


   //clear the tasklist
    tasklist.innerHTML = "";

    //appear the values is tasklist
    arrayoftasks.forEach((todo) => {
        //create div for task
        var div = document.createElement("div")
        div.id= todo.id;
        div.className = "task";
        div.appendChild(document.createTextNode(todo.title));


        // //create class for buttons
        // var bottons = document.createElement("div");
        // bottons.className = "bottons";
        // div.appendChild(bottons)
       
         //edit button 
         var edit = document.createElement("button");
         edit.className = "edit_btn";
         edit.appendChild(document.createTextNode("Edit"));
         div.appendChild(edit)
       
       
       
        //delte btn 
        var del = document.createElement("button");
        del.className = "delete_btn";
        del.appendChild(document.createTextNode("delete"));
        div.appendChild(del)

        
        //done btn 
        var del = document.createElement("button");
        del.className = "taskstatus";
        del.appendChild(document.createTextNode("done"));
        div.appendChild(del)
      

        tasklist.appendChild(div)        
    });
}




//add to local storage 
function  addtolocalstorage(arrayoftasks){
    localStorage.setItem("tasks",JSON.stringify(arrayoftasks))
}

function gitfromlocalstorage(){
    var data = localStorage.getItem("tasks")
    if(data){
        tasks =JSON.parse(data);
        
    }
}

function deleteTaskWith(id){

    arrayoftasks= arrayoftasks.filter((todo)=>todo.id != id )
    addtolocalstorage(arrayoftasks);
 }




 function logarray(){
    console.log(arrayoftasks);
    
 }




 //search 
 searcinput.addEventListener("input",function(){
    
  var srch=  arrayoftasks.filter(todo => todo.title.includes(search.value))
  addelementtotasklists(srch);


 })
 

 //update task
 function updateTask(id) {
    arrayoftasks = arrayoftasks.map(todo => {
        if (todo.id == id) {
            return {
                ...todo,
                title: title.value,
                desc: desc.value
            };
        }
        return todo;
    });
    // location.reload();
    addelementtotasklists(arrayoftasks);
    addtolocalstorage(arrayoftasks); 
    location.reload();
}



function validateInputs(title, description) {
    // Regular expression  title
    const titleRegex = /^[A-Z][a-z]{3,8}$/;
  
    // Validation  title
    if (!titleRegex.test(title)) {
      alert("Title must start with an uppercase letter followed by 3 to 8 lowercase letters.");
      return false;
    }
  
    // Validation  description
    if (description.length < 20) {
      alert("Description must be more than 20 characters.");
      return false;
    }
  
    return true; 
  }
  
 logarray()
