const canvas =document.getElementById('canvas');
const ctx= canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height= window.innerHeight;
let text="LET VAR MAP FOR IF {} () ''  JAVA C++  C# SQL" ;
text= text.split(" ")
let fontSize =15;
let row =canvas.height/fontSize;
let rowType=[];
for (let x=0 ; x<row;x++ ){
  rowType[x]=1;
 
}
export const drawText=()=>{
  ctx.fillStyle = "rgba(0, 0, 0, 0.05";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
  ctx.fillStyle="#fff";
  ctx.font=`${fontSize}px 'Chakra Petch', sans-serif`;
  for (let i=0 ;i<rowType.length;i++){
    let textType=text[Math.floor(Math.random()*text.length)]
    ctx.fillText(textType,rowType[i]*fontSize,i*fontSize);
    if (rowType[i]*fontSize>canvas.width &&Math.random() > 0.999){
      rowType[i]=0;
     
    }
    rowType[i]+=2;
  }
}
