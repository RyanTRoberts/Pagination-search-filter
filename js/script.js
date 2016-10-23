//problem: webpage appears disorganised with all students listed on a single page
//solution: add pagination to show only 10 students at a time and a search bar function which will return results based on name and email adress
var search = document.querySelector('.page-header');//select header element to append search bar
var studentNo = document.getElementsByTagName('li').length;//get length of student list
var pagesNeeded = Math.ceil(studentNo / 10);//calculate pages needed with 10 students per page
var pageNum = 1;//set current page on pageload
var bodyhtml = document.querySelector('.page');//select the main div in which to add content
var pages = 0;//current amount of pages

//Store student-items into an array
var studentList = document.getElementsByClassName('student-item');
var links = document.getElementsByClassName('pageNumbers');

$('h3').addClass('searchField');

function addContent(){
  //insert search bar into page header
  search.insertAdjacentHTML('beforeend', '<div class="student-search"><input id="searchInput" placeholder="Search for students..."><button id="searchButton">Search</button></div>');
  //insert opening div and ul tags
  bodyhtml.insertAdjacentHTML('beforeend', '<div class="pagination"><ul class="pageNum">');
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
//call addContent
addContent()
//hide all students after the first 10
$(studentList).hide();
for (var p = 0; p < 10; p++){
  $(studentList[p]).show();
}

//when a link is clicked, store link value and then run the onclick function
$(links).on('click', function() {
    //get the value of link clicked
    var p = this.innerText;
    // set pageNum to value of link clicked
    pageNum = p;
    //will be used to select elements
    var x = 0;
    var y = x +10;
    //run function to change page
    onclick()
})
//change which students are shown based on which page button is clicked
function onclick(){
  //hide all students
  $(studentList).hide();
  //select a range of students depending on pageNum
  do {
    x = (pageNum - 1)*10;
    y = x+10;
  } while (pageNum == p);
  //show the students selected by above method
  for (x; x < y; x++){
    $(studentList[x]).show();
  }
}

//add search function allowing user to search student list
//store student names and student emails in an array
var names = document.getElementsByClassName('searchField');
var emails = $('email');

//when search button is clicked,
function searchStudents(){
  //retrieve input value
  var input = $('#searchInput').val();
  //cycle through names array
  for (var i = 0; i < studentNo; i++){
    //compare names values to input** ISSUE ** will not retrieve partial matches
    if(input == names[i].innerText){;
      //display any matching names
      $(studentList[i]).show();
    } else if(input !== names[i].innerText) {
      //hide other names
      $(studentList[i]).hide();
    } else {
      $(studentList[i]).show();
    }
  }
}
//add click event to searchbutton
$( "#searchButton" ).on( "click", searchStudents);
