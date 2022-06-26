const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let text = "LET VAR MAP FOR IF {} () ''  JAVA C++  C# SQL";
text = text.split(' ');
let fontSize = 15;
//define number of rows
let row = canvas.height / fontSize;
let rows = [];
//add value for each row to use this value to define X later
for (let x = 0; x < row; x++) {
  rows[x] = 1;
}

export const drawText = () => {
  //add obacity to background
  ctx.fillStyle = 'rgba(4, 28, 50, 0.05';

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = `${fontSize}px 'Chakra Petch', sans-serif`;
  //move the text by changing X & Y for each interval
  for (let i = 0; i < rows.length; i++) {
    let textType = text[Math.floor(Math.random() * text.length)];
    // define max Y should draw
    if (i * fontSize < window.innerHeight) {
      ctx.fillText(textType, rows[i] * fontSize, i * fontSize);
      //if X =screen width start again from 0 , use small random value to deley some rows
      if (rows[i] * fontSize > canvas.width && Math.random() > 0.999) {
        rows[i] = 0;
      }
    }
    rows[i] += 2;
  }
};
