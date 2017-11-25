class Bar extends Button
{
	constructor(x, y, rx, ry, cFill, cActive, cStroke, wStroke, link = "None", text = "", cText = "rgb(0,0,0)")
	{
    	super(x, y, cFill, cActive, cStroke, wStroke, link, text, cText); //react gave error w/o call to super
		this.rx = rx;
		this.ry = ry;
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		ctx.beginPath();
		ctx.lineWidth = this.wStroke;
		ctx.strokeStyle = this.cStroke;
		ctx.arc((this.x - this.rx + this.ry) * canvasWidth, this.y * canvasHeight, this.ry * canvasHeight, Math.PI/2, 3*Math.PI/2);
		ctx.lineTo((this.x + this.rx - this.ry) * canvasWidth, (this.y - this.ry) * canvasHeight)
		ctx.arc((this.x + this.rx - this.ry) * canvasWidth, this.y * canvasHeight, this.ry * canvasHeight, 3*Math.PI/2, Math.PI/2);
		ctx.lineTo((this.x - this.rx + this.ry) * canvasWidth, (this.y + this.ry) * canvasHeight)
		ctx.fillStyle = this.cCurrent;
		ctx.fill();
		ctx.stroke();

		var fontSize = Math.ceil(Math.min((this.ry * canvasHeight)*0.8, (this.rx * canvasWidth)*0.2))
		ctx.font = "" + fontSize + "px Arial";
	    ctx.fillStyle = this.cText;
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x * canvasWidth, this.y * canvasHeight + fontSize/2); 
	}

	isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight)
	{
		if (mouseX > (this.x - this.rx) * canvasWidth - this.wStroke/2 && mouseX < (this.x + this.rx) * canvasWidth + this.wStroke/2 &&
			mouseY > (this.y - this.ry) * canvasHeight - this.wStroke/2 && mouseY < (this.y + this.ry) * canvasHeight + this.wStroke/2)
		{
			this.cCurrent = this.cActive;
			return true;
		}
		else 
		{
			this.cCurrent = this.cFill;
			return false;
		}
	}
}