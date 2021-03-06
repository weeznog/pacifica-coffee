$(function(){

// ============
// Variables

  var data = {}
  var items = $('.items-container').html(); // grab the items container


// ===========
// checkbox filter

  $('.filter-container').on('change', 'input[type="checkbox"]', function(e){
    e.preventDefault();

    // grab the associated name and values from checkbox
    var value = $(this).attr('value'); // ex: blonde
    var name = $(this).attr('name'); // ex: roast

    // remove checked values for same name in html
    var cValue = data[name]
    $('input[value=' + cValue + ']').prop('checked', false);

    // check to see if the box is being unchecked
    checkFilter(name, value);

    // if not data in hash then show original html from line 7
    if(data.length <= 0){
      $('.items-container'.html(items));

    // else hit index with ajax and retrieve filter partial
    }else {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/items',
        data: data
      }).done(function(data){
        console.log(data.items.length)
        // replace html with filtered partial
        var html = data.html
        $('.items-container').html(html);
      })
    } // end of else
  }) // end of change event


// ===============
// Clear filter buttons
$('.filter-container').on('click','.f-clearAll', function(e){
  e.preventDefault();

  // find all inputs and remove checkbox
  var input = $(this).parent().find('input[type="checkbox"]')
  input.prop('checked', false)

  // remove all content from data object
  data = {};
  // replace information with original
  $('.items-container').html(items);
})


// ====================
// Hide show filter Mobile

$('.filter-container').on('click', '#m-filterBtn', function(){
  console.log('click')
  $(this).next().slideToggle();
})


// ==============
// Show filter when width is tablet

  // on resize of window
    $(window).resize(function(){
      checkWidthFilter()
    })

    function checkWidthFilter() {
      if ($(window).width() > 769) {
        $('.filter-container .filter').show();
      }
    }







//================
// Helper functions

var checkFilter = function(name, value){
  if(data[name] === value){
    delete data[name]
  }else{
    // add filters to hash
    data[name] = value
  }
}



}) // end of ready