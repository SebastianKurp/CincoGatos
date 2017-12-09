class Button
{
	constructor(x, y, cFill, cActive, cStroke, wStroke, link = "None", text, cText) {
		this.x = x;
		this.y = y;
		this.cFill = cFill;
		this.cActive = cActive;
		this.cCurrent = cFill;
		this.cStroke = cStroke;
		this.wStroke = wStroke;
		this.link = link;
		this.text = text;
		this.cText = cText;
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		return;
	}

	isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight)
	{
		return false;
	}

	isClicked(isMouseDown, mouseX, mouseY, canvasWidth, canvasHeight)
	{
		if (this.isTouchingMouse(mouseX, mouseY, canvasWidth, canvasHeight) && isMouseDown)
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