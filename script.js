const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

// make coordinate origin the middle of the canvas
ctx.translate(width / 2, height / 2);

// create new HTMLImageElement object, set its src to the image we want to load
// and add an onload event handler that will cause the draw() function to fire 
// when the image is laoded
const image = new Image();
image.src = "walk-right.png";
// why is this not draw()? because we don't want to call the
// function, we want to assign it as the event handler
image.onload = draw; 

// next, we add some variables to keep track of the position the sprite is
// to be drawn on the screen, and the sprite number we want to display
let sprite = 0;
let posX = 0;

// now we can define the draw() function. The rest of the code goes here
function draw() {
  // first, we clear the canvas to prepare for drawing each frame. We have to specify 
  // the top-left corner of the rectangle as the negative of the half of the canvas width
  // and height, because we translated the origin to the center of the canvas earlier
  ctx.fillRect(-(width / 2), -(height / 2), width, height);
  
  // now we draw the sprite. We use the drawImage() method, which takes 9 arguments:
  // the image to draw, the x and y coordinates of the top-left corner of the portion of the
  // image to draw, the width and height of the portion of the image to draw, the x and y
  // coordinates of the top-left corner of where we want to draw the image on the canvas, and
  // the width and height that we want to draw the image on the canvas
  ctx.drawImage(image, sprite * 102, 0, 102, 148, 0 + posX, -74, 102, 148);

  // alter sprite value after each draw (after some, anyway)
  // if the value of posX is a multiple of 13, we move on to the next sprite by incrementing it
  // (wrapping to 0 after we're done with sprite #5). This effectively slows down the animation
  // by only updating it every 13 frames, or roughly about 5 times per second (requestAnimationFrame() 
  // fires at 60fps, so 60 / 13 = 4.6). We are deliberately slowing down the frame rate because we
  // only have 6 sprites to work with, and if we updated the sprite value every frame, the animation
  // would be over in a second. Inside the outer block we use an if...else statement to checker 
  // whether the sprite value is 5 (the last sprite, given that the sprite numbers run from 0 to 5).
  // If it is, we set it back to 0, otherwise we increment it by 1.
  if (posX % 13 === 0) {
    if (sprite === 5) {
      sprite = 0;
    } else {
      sprite++;
    }
  } // end if (posX % 13 === 0)

  // next we need to work out how to change the posX value on each frame
  // we use another if...else statement to see if the value of posX has become greater than 
  // width/2, which means our character has walked off the right-hand side of the screen. If it
  // has, we calc a position that would put the character just to the left of the left side of the
  // screen, and assign it to posX. If it hasn't, we increment posX by 2. This will make him
  // move a little bit to the right on each frame, giving the illusion of walking
  if (posX > width / 2) {
    let newStartPos = -(width / 2 + 102);
    posX = Math.ceil(newStartPos);
    console.log(posX);
  } else {
    posX += 2;
  } // end if (posX > width / 2)

  // finally, we need to make the animation loop by calling requestAnimationFrame() recursively
  // at the end of the draw() function. This will cause the draw() function to be called again
  window.requestAnimationFrame(draw);

}

