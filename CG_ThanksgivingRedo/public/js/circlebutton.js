import Button from './Button'

class CircleButton extends Button
{
	constructor(x, y, rInactive, rActive, cFill, cActive, cStroke, wStroke, image = "None", link = "None", text = "", cText = "rgb(0,0,0)")
	{
	    super(x, y, cFill, cActive, cStroke, wStroke, link, text, cText); //added this to Abdul's code b/c of error
		this.rInactive = rInactive;
		this.rActive = rActive;
		this.rCurrent = rInactive;
		this.image = image;
		this.drawing = new Image();
		this.drawing.src = this.image;
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		ctx.beginPath();
		ctx.lineWidth = this.wStroke;
		ctx.strokeStyle = this.cStroke;
		var r = this.rCurrent * Math.min(canvasWidth, canvasHeight)
		ctx.arc(this.x * canvasWidth,this.y * canvasHeight,r,0,2*Math.PI);
		ctx.fillStyle = this.cCurrent;
		ctx.fill();
		ctx.stroke();
		if (this.image !== "None")
		{
			var sqrR = r / Math.sqrt(2);
			console.log(this.image + " " + this.drawing);
			this.drawing.onload = function() {
			    ctx.drawImage(this.drawing, 0, 0);
	 		};
	  		//ctx.drawImage(this.drawing, this.x * canvasWidth - sqrR, this.y * canvasHeight - sqrR, sqrR * 2, sqrR * 2);
	  	}
	  	ctx.font = "" + r*0.4 + "px Arial";
	    ctx.fillStyle = this.cText;
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x * canvasWidth, (this.y - this.rCurrent * 1.1) * canvasHeight); 
	}

	isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight)
	{
		var r = this.rCurrent * Math.min(canvasWidth, canvasHeight)
		if (Math.sqrt(Math.pow(this.x * canvasWidth - mouseX, 2) + Math.pow(this.y * canvasHeight - mouseY, 2)) < r + this.wStroke / 2)
			return true;
		else return false;
	}

	size(mouseX, mouseY, canvasWidth, canvasHeight)
	{
		if (this.isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight))
			this.rCurrent = (this.rCurrent * 9 + this.rActive) / 10;
		else this.rCurrent = (this.rCurrent * 9 + this.rInactive) / 10;
	}
}