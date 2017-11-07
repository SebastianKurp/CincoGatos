class Button
{
	constructor(x, y, rInactive, rActive, cFill, cStroke, wStroke, image = "None", link = "None")
	{
		this.x = x;
		this.y = y;
		this.rInactive = rInactive;
		this.rActive = rActive;
		this.rCurrent = rInactive;
		this.cFill = cFill;
		this.cStroke = cStroke;
		this.wStroke = wStroke;
		this.image = image;
		this.link = link;
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		ctx.beginPath();
		ctx.lineWidth = this.wStroke;
		ctx.strokeStyle = this.cStroke;
		var r = this.rCurrent * Math.min(canvasWidth, canvasHeight)
		ctx.arc(this.x * canvasWidth,this.y * canvasHeight,r,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = this.cFill;
		ctx.fill();
		if (this.image != "None")
		{
			var sqrR = r / Math.sqrt(2);
			var drawing = new Image();
			drawing.src = this.image; // can also be a remote URL e.g. http://
	  		ctx.drawImage(drawing,this.x * canvasWidth - sqrR, this.y * canvasHeight - sqrR, sqrR * 2, sqrR * 2);
	  	}
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

	isClicked(isMouseDown, mouseX, mouseY, canvasWidth, canvasHeight)
	{
		if (this.isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight) && isMouseDown)
			return true;
		else return false;
	}
}