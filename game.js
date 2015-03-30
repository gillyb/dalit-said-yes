var images = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg'
];

randomizeImages();
window.processing = false;

// output images then hide them

var output = '';
for (var i = 0; i < 16; i++) {
  var cardContainer = $('<div onclick="if (!window.processing) this.classList.toggle(\'flip\')"/>').addClass('flip-container');

  var front = $('<div/>').addClass('front');
  var back = $('<div/>').addClass('back')
      .append($('<img src="' + images[i] + '"/>'));
  var flipper = $('<div/>').addClass('flipper');

  flipper.append(front);
  flipper.append(back);
  cardContainer.append(flipper);
  var wrapper = $('<div/>').append(cardContainer);

  output += wrapper.html();
}
$('#container').html(output);



var guess1 = "";
var guess2 = "";
var count = 0;

$(".flip-container").click(function() {
  if (window.processing) return;

  if (count < 2 && !$(this).find(".back").hasClass("face-up")) {
    
    // increment guess count, show image, mark it as face up
    count++;
    $(this).find('.back').addClass("face-up");

    if (count == 1) {
      guess1 = $(this).find('.back img');
    }
    else {
      window.processing = true;
      guess2 = $(this).find('.back img');

      if (guess1.attr('src') == guess2.attr('src')) {
        console.log("match");
        guess1.addClass('match');
        guess2.addClass('match');
        window.processing = false;
      }
      else { 
        console.log("miss");
        setTimeout(function() {
          $('.flip-container .back').not('.match').removeClass("face-up");
          $('.flip-container .back img').not('.match').parents('.flip-container').removeClass('flip');
          window.processing = false;
        }, 1000);
      }

      guess1 = guess2 = undefined;
      
      // reset
      count = 0; 
      setTimeout(console.clear, 60000);
    }
  }
});

// randomize array of images
function randomizeImages(){
  Array.prototype.randomize = function()
  {
    var i = this.length, j, temp;
    while ( --i )
    {
      j = Math.floor( Math.random() * (i - 1) );
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  };
  
  images.randomize();
}