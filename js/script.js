var studentNo = document.getElementsByTagName('li').length;//get length of student list
var pagesNeeded = Math.ceil(studentNo / 10);//calculate pages needed with 10 students per page
var pageNum = 1;//set current page on pageload
const $page = document.querySelector('.page');
const $pageHeader = $page.querySelector('.page-header')//select the main div in which to add content
var pages = 0;//current amount of pages
var matches = 0;//ho
// This is just so that we can treat HTMLCollections like really-real Arrays
HTMLCollection.prototype.forEach = Array.prototype.forEach
//Store student-items into an array
const $studentsList = document.getElementById('student-list').children;
const $links = document.getElementsByClassName('pageNumbers');


// Helper functions
function show(el) {
    el.style.display = 'block'
}

function hide(el) {
    el.style.display = 'none'
}



function addContent(){
  //insert search bar into page header
  $pageHeader.insertAdjacentHTML('beforeend', '<div class="student-search"><input id="searchInput" placeholder="Search for students..."><button id="searchButton">Search</button></div>');

  pagination()
}
  //call addContent
addContent()

function pagination(){
  //insert opening div and ul tags
  $page.insertAdjacentHTML('beforeend', '<div class="pagination"><ul class="pageNum">');

  //add pages
  while(pages < pagesNeeded){
    //update amount of current pages
    pages += 1;
    //populate the ul with pages numbers needed
    document.querySelector('.pageNum').insertAdjacentHTML('beforeend', '<li><a  class="pageNumbers" href="#">' + pages + '</a></li>');
    }
    //close the ul and div tags
    document.querySelector('.pagination').insertAdjacentHTML('beforeend', "</ul></div>");

}

//hide all students after the first 10
$($studentsList).hide();

for (var p = 0; p < 10; p++){
  $($studentsList[p]).show();
}


//when a link is clicked, store link value and then run the onclick function
$($links).on('click', function() {

    var p = this.innerText;//get the value of link clicked
    pageNum = p;// set pageNum to value of link clicked

    //run function to change page
    filterStudentsHTML((pageNum * 10) - 10, pageNum * 10)
})


  //add search function allowing user to search student list
//store student names and student emails in an array
var names = document.getElementsByClassName('searchField');
var emails = $('email');

//show only ten students per page
function filterStudentsHTML(minInclusiveInt, maxInclusiveInt) {
    const $studentsListItems = document.getElementById('student-list').children;

    minInclusiveInt = minInclusiveInt || 0
    maxInclusiveInt = maxInclusiveInt || $studentsListItems.length

    for (var i = 0; i < $studentsListItems.length; i++) {
        const $li = $studentsListItems.item(i)
        if (i < minInclusiveInt) {
            hide($li)
        } else if (i >= maxInclusiveInt) {
            hide($li)
        } else {
            show($li)
        }
    }
}

//when user clicks the search button
function onSearchSubmit(event) {
    const $input = document.getElementById('searchInput')
    const query = $input.value.toLowerCase()
    matches = 0
    $input.value = ''


    if (query === '') {
        return false
    }
//compage user Search against names and emails of students
    $studentsList.forEach(function ($li) {
        const name = $li.querySelector('h3').textContent

        if (name.includes(query)) {
            show($li)
            matches += 1;
        } else {
            hide($li)
        }
    })
}

  //add click event to searchbutton
$( "#searchButton" ).on( "click", onSearchSubmit);
