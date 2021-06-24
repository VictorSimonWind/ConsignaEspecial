window.onload = () => {

verifyLocalData(listItems);

}

var listItems = [];



const addTask = (event,form) => {
event.preventDefault();

  let item = 
  {
    id: Math.floor(Math.random() * 4000),
    text: form[0].value,
    completed: false
  }
  if (localStorage['LocalData']) {
    
        listItems = JSON.parse(localStorage['LocalData']);
  }
  listItems.push(item);
  localStorage['LocalData'] = JSON.stringify(listItems);
  form[0].value = '';
  updateList(listItems);
};

const updateList = (listItems) =>{
    let list_container = document.querySelector('.list_container');
    let list = ``;
    listItems.forEach(element => {
        if (element.completed) {
            list += `<div class='item complete ' id=${element.id}>`
        } else {
            list += `<div class='item uncomplete' id=${element.id}>`    
        }
        list += `<p>${element.text}</p>
                    <button class='done' onclick='updatetask(this)'>done</button>
                    <button class='delete' onclick='updatetask(this)'>delete</button>
                 </div>
                ` 
    });
    list_container.innerHTML = list;

};

const verifyLocalData = (listItems) => {
    if (localStorage['LocalData']) {
        try {
            listItems = JSON.parse(localStorage['LocalData']);
            updateList(listItems);
        } catch (error) {
            console.log(error);
        }
        
    } 
};

const updatetask = (item) =>{
    if (item.className == 'done') {
        listItems.forEach(element => {
            if (element.id == item.parentElement.id) {
                element.completed = true;
            }
        });
    } else {
          listItems = listItems.filter(filteredItem => filteredItem.id != item.parentElement.id)
            
        }
    localStorage['LocalData'] = JSON.stringify(listItems);
    updateList(listItems);
}