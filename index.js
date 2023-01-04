var id;
// -------------- get request using jQuey Syntax----------------------------

$(document).ready(function () {
    $.get("data.json", function (data, status) {
        localStorage.setItem("allValue", JSON.stringify(data));
        let allValue = JSON.parse(localStorage.getItem("allValue"));
    });
    headData();
});


// ----------------- below get operation for Option/select ---------------

$(document).ready(function () {
    $.get("course.json", function (data1) {
        localStorage.setItem("course", JSON.stringify(data1));
        let course = JSON.parse(localStorage.getItem("course"));
    });
});



// --------------------------- For Table Head Value function start below --------------------

function headData() {
    $("#head").html("");
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    $("#thead").append(`<tr id="headVal"></tr>`)
    for (let i = 0; i < Object.keys(allValue[0]).length; i++) {
        $("#headVal").append("<th>" + (Object.keys(allValue[0])[i]) + "</th>");
    }
    showData();
}

// ----------------- show Data on Table function start from below----------------------

function showData() {
    $("#tbody").html("");
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    for (let x = 0; x < allValue.length; x++) {
        $("tbody").append(`<tr id="trData${x}"></tr>`);
        for (let y = 0; y < Object.keys(allValue[0]).length; y++) {
            $(`#trData${x}`).append("<td>" + (Object.values(allValue[x])[y]) + "</td>")
        }

        // --------- Add Button in every <tr></tr> section ----------------
        $(`#trData${x}`).append(`<td>` + 
        `<div class="d-flex justify-content-center">` + 
        `<button class="edit mx-2 inline-block btn btn-warning" onclick="editVal(` + allValue[x].Id + `)" id="` + allValue[x].Id + `" >Edit</button>` + 
        `<button type="submit" class="delete mx-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="deleteVal(` + allValue[x].Id + `)">Delete</button>` +
        `<button class="cancel mx-2 btn btn-secondary" onclick="cancelBtn(` + allValue[x].Id + `)" id="` + allValue[x].Id + `">Cancel</button>` +
        `<button class="save mx-2 btn btn-success" onclick="SaveVal(` + allValue[x].Id + `)" id="` + allValue[x].Id + `">Save</button>` + 
        `</div>` + 
        `</td>`)
        $(".save").hide();
        $(".cancel").hide();
    }
}

// ----------------- Add Data in table section -------------------

function saveChanges(e) {
    // e.preventDefault()
    
    $("#myForm").validate();
    let course = JSON.parse(localStorage.getItem("course"));
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    let name = ($("#inputName").val());
    let email = ($("#inputEmail").val());
    let roll_No = ($("#inputRoll_No").val());

    // let idNew = allValue.length + 1; 
    // debugger
    let obj = {
        Id: parseInt(allValue.length+1),
        Name: name,
        Course: "",
        Email: email,
        Roll_No: roll_No
    }
    // debugger
    JSON.stringify(obj.Course)
    
    if($("#inputOption").val()==1){
        obj.Course = course[0].Course_change;
    }
    else if($("#inputOption").val()==2){
        obj.Course =course[1].Course_change;
    }
    else if($("#inputOption").val()==0){
        obj.Course = findObject.Course;
    }
    else if($("#inputOption").val()==3){
        obj.Course = course[2].Course_change;
    }
    else{
        obj.Course = course[3].Course_change;
    }
    debugger
    allValue.push(obj);
    localStorage.setItem("allValue", JSON.stringify(allValue));
    showData();
    // allValue.length++
    e.preventDefault();
    // allValue.length++
    // debugger
    // document.getElementById("myForm").reset();
    // e.preventDefault();
}


// ------------ below function written for delete data from the table---------

function deleteVal(Id) {
    id = Id;
}
function understood() {
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    var findObject = allValue.find(x => x.Id === id);
    let findIndex = allValue.indexOf(findObject);
    allValue.splice(findIndex, 1);
    debugger
    localStorage.setItem("allValue", JSON.stringify(allValue));
    showData();
}

// ----------- edit Data Section start from here -------------------

function editVal(id) {
    // debugger;
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    $("#"+id).parent().parent().siblings().eq(1).html("")
    $("#"+id).parent().parent().siblings().eq(2).html("")
    $("#"+id).parent().parent().siblings().eq(3).html("")
    $("#"+id).parent().parent().siblings().eq(4).html("")
    $("#"+id).parent().parent().siblings().eq(1).append(`<input class="` + id + `" type="text" id="name_td">`)
    $("#"+id).parent().parent().siblings().eq(3).append(`<input class="` + id + `" type="email" id="email_td" >`)
    $("#"+id).parent().parent().siblings().eq(4).append(`<input class="` + id + `" type="number" id="number_td">`)

    // ---------- below section for option / select course 
    var findObject = allValue.find(x => x.Id === id);
    let course = JSON.parse(localStorage.getItem("course"));
    $("#"+id).parent().parent().siblings().eq(2).append(`
    <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="selectCourse">
    <option  value="0">`+findObject.Course +`</option>`)
    for(let i=0; i<course.length; i++){
    $("#selectCourse").append(`<option value=`+course[i].ID +`>`+course[i].Course_change +`</option>`)
    }
    $("#"+id).parent().parent().siblings().eq(2).append(`</select>`);
// debugger;
    let name_td_val =findObject.Name;
    let email_td_val =findObject.Email;
    let number_td_val =findObject.Roll_No;
    // console.log(second_td_val);
    $('#name_td').val(name_td_val)
    $('#email_td').val(email_td_val)
    $('#number_td').val(number_td_val)
    $("#"+id).parent().parent('td.data').hide();
    $("#"+id).siblings('.save').show();
    $("#"+id).siblings('.cancel').show();
    $("#"+id).siblings('.delete').hide();
    $("#"+id).hide();
}
  

// -------------below section for save Value ----------------------
function SaveVal(id) {
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    let course = JSON.parse(localStorage.getItem("course"));
    var findObject = allValue.find(x => x.Id === id);
    findObject.Name =  $("input#name_td").val();
    findObject.Email =   $("input#email_td").val()
    if($("#selectCourse").val()==1){
        findObject.Course = course[0].Course_change;
    }
    else if($("#selectCourse").val()==2){
        findObject.Course =course[1].Course_change;
    }
    else if($("#selectCourse").val()==0){
        findObject.Course = findObject.Course;
    }
    else if($("#selectCourse").val()==3){
        findObject.Course = course[2].Course_change;
    }
    else{
        findObject.Course = course[3].Course_change;
    }
    findObject.Roll_No =  $("input#number_td").val()
    $("#tbody").html("");
    localStorage.setItem("allValue", JSON.stringify(allValue));
    showData();
    // debugger;
    $(this).siblings('.edit').show();
    $(this).siblings('.delete').show();
    $(this).siblings('.cancel').hide();
    $(this).hide();
  }



 function cancelBtn(id){
    let allValue = JSON.parse(localStorage.getItem("allValue"));
    var findObject = allValue.find(x => x.Id === id);
    findObject.Name =  $("input#name_td").val();
    let findIndex = allValue.indexOf(findObject);
    $("input#optionCourse").val();
    findObject.Email =   $("input#email_td").val()
    findObject.Roll_No =  $("input#number_td").val()
    $(this).siblings('.edit').show();
    $(this).siblings('.delete').show();
    $(this).siblings('.save').hide();
    // $('select').hide();
    $(this).hide();
    showData();
    
  };
  
  //   ------------------select Option for add new Data--------------------  
let course = JSON.parse(localStorage.getItem("course"));
for(let i=0; i<course.length; i++){
  $("#inputOption").append(`<option value=`+course[i].ID +`>`+course[i].Course_change +`</option>`)
}