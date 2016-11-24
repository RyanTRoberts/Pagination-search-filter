var studentNo = document.getElementsByTagName('li').length;        //get length of student list
var pagesNeeded = '';        //used to calculate pages needed with 10 students per page
var pageNum = 1;        //set current page on pageload
const $page = document.querySelector('.page');
const $pageHeader = $page.querySelector('.page-header');      //select the main div in which to add content
var pages = 0;         //current amount of pages
var matches = 0;       //amount of search results
var p = 0;      //current page value
var results = [];       // will be populated with search results
const $studentsListItems = document.getElementById('student-list').children;

// This is just so that we can treat HTMLCollections like really-real Arrays
HTMLCollection.prototype.forEach = Array.prototype.forEach;

//Store student-items into an array
const $studentsList = document.getElementById('student-list').children;
const $links = document.getElementsByClassName('pageNumbers');


// Helper functions
function show(el) {
    el.style.display = 'block';
}

function hide(el) {
    el.style.display = 'none';
}


//Add required search bar and pagination links to the page
function addContent(){
  $pageHeader.insertAdjacentHTML('beforeend', '<div class="student-search"><input id="searchInput" placeholder="Search for students..."><button id="searchButton">Search</button></div>');        //insert search bar into page header
  pagination()
}


function pagination(){
  pagesNeeded = Math.ceil(studentNo / 10);
  $page.insertAdjacentHTML('beforeend', '<div class="pagination"><ul class="pageNum">');        //insert opening div and ul tags
  document.querySelector('.pagination').insertAdjacentHTML('beforeend', "</ul></div>");         //close the ul and div tags
  while(pages < pagesNeeded){
    pages += 1;    //update amount of current pages
    document.querySelector('.pageNum').insertAdjacentHTML('beforeend', '<li><a  class="pageNumbers" href="#">' + pages + '</a></li>');        //populate the ul with pages numbers needed
  }

}


addContent()        //call addContent to add search and pagination to the page
filterStudentsHTML(0,10)        //run filterStudentsHTML to hide all students after the first 10

$($links).on('click', function() {        //when a link is clicked,

    p = this.innerText;     //get the value of link clicked
    pageNum = p;    // set pageNum to value of link clicked

    filterStudentsHTML((pageNum * 10) - 10, pageNum * 10);       //run function to change page
})


//show only ten students per page
function filterStudentsHTML(minInclusiveInt, maxInclusiveInt) {


    minInclusiveInt = minInclusiveInt || 0;       //point to start hiding students
    maxInclusiveInt = maxInclusiveInt || $studentsListItems.length;       //point to stop hiding students

    for (var i = 0; i < $studentsListItems.length; i++) {       //will run for each student
        if (i < minInclusiveInt) {
            $($studentsList[i]).fadeOut()       //hide all students before minInclusiveInt
        } else if (i >= maxInclusiveInt) {
            $($studentsList[i]).fadeOut()       //hide all students after maxInclusiveInt
        } else {
            $($studentsList[i]).fadeIn()        //show ten students depending on page number
        }
    }
}

//when user clicks the search button
function onSearchSubmit(event) {
    results = [];       //clear any previous search results
    const $input = document.getElementById('searchInput');      //store the user search
    const char = $input.value.toLowerCase();       //make search lower case
    const query = [];
    query.push(char);
    matches = 0;       // value to store the number of results


    if (query === '') {       //If the user searches nothing, do nothing
        return false
    }


    $studentsList.forEach(function ($li) {        //compare user Search against names and emails of students
        const name = $li.querySelector('h3').textContent;        //select all names to compare
        const email = $li.querySelector('span').textContent;       //select all emails to compare

          if (name.includes(query) || email.includes(query)) {        //if user search is present in name or email.
              results.push($( "li" ).index( $li ));        //add the index of matched search to the results array
              matches += 1;       //update the amount of matches
          }
    })
    updatePagination()        //add new pagination to correspond with user search results
}


$( "#searchInput" ).keyup(onSearchSubmit);        //add click event to searchbutton

function updateStudents(){        //used to update the displayed students to the results of the search
  $($studentsList).hide();        //hide all students

  if(results.length > 0){
    for (var i = 0; i < 10; i++){
      $($studentsList[results[i]]).show();        //show students from 1-10 using stored result indexes
    }
  } else {
    alert("Sorry, your search had no matches")
  }
}



function updatePagination() {       //function to update the pagination after a user search
  $(".pageNum").empty()       //remove all curent page links
  var resultNo = results.length;
  pages = 1;

  while (pages <= Math.ceil(resultNo/10)){

    $(".pageNum").append('<li><a  class="pageNumbers" href="#">' + pages + '</a></li>');        //populate the ul with pages numbers needed
    pages += 1;    //update amount of current pages
  }
  updateStudents()
  searchPagination()
}


function searchPagination() {
  $($links).on('click', function() {        //When user clicks on search result pagination,

      p = this.innerText;       //get the value of link clicked
      $($studentsList).fadeOut();        //hide all students

      //if page number is equal to X
      //show 10 students from the results array, based on X, using var i to select students
      if (p == 1){
        for (var i = 0; i < 10; i++){
          $($studentsList[results[i]]).fadeIn()
        }
      } else if (p == 2){
        for (var i = 11; i <= 20; i++){
          $($studentsList[results[i]]).fadeIn()
        }
      } else if (p == 3){
        for (var i = 21; i <= 30; i++){
          $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 4){
        for (var i = 31; i <= 40; i++){
          $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 5){
        for (var i = 41; i <= 50; i++){
          $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 6){
          for (var i = 50; i <= 60; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 7){
          for (var i = 60; i <= 70; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 8){
          for (var i = 60; i <= 70; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      }else if (p == 9){
          for (var i = 70; i <= 80; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 10){
          for (var i = 80; i <= 90; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      } else if (p == 11){
          for (var i = 90; i <= 100; i++){
            $($studentsList[results[i]]).fadeIn();
        }
      }
  })
}
