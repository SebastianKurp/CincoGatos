import { Component } from 'react'

class Bar extends Component
{
	constructor(x1, y1, x2, y2, cActive, cInactive, cStroke, wStroke)
	{
    super(); //react gave error w/o call to super
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.r = (y2 - y1) / 2;
		this.cActive = cActive;
		this.cInactive = cInactive;
		this.cCurrent = cInactive;
		this.cStroke = cStroke;
		this.wStroke = wStroke;
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		ctx.beginPath();
		ctx.lineWidth = this.wStroke;
		ctx.strokeStyle = this.cStroke;
		ctx.arc((this.x1 + this.r) * canvasWidth,(this.y1 + this.r) * canvasHeight,this.r * canvasHeight, Math.PI/2, 3*Math.PI/2);
		ctx.lineTo((this.x2 - this.r) * canvasWidth, this.y1 * canvasHeight)
		ctx.arc((this.x2 - this.r) * canvasWidth,(this.y1 + this.r) * canvasHeight,this.r * canvasHeight, 3*Math.PI/2, Math.PI/2);
		ctx.lineTo((this.x1 + this.r) * canvasWidth, this.y2 * canvasHeight)
		ctx.stroke();
		ctx.fillStyle = this.cCurrent;
		ctx.fill();
	}

	color(mouseX, mouseY, canvasWidth, canvasHeight)
	{
		if (mouseX > this.x1 * canvasWidth - this.wStroke && mouseX < this.x2 * canvasWidth + this.wStroke &&
			mouseY > this.y1 * canvasHeight - this.wStroke && mouseY < this.y2 * canvasHeight + this.wStroke)
			this.cCurrent = this.cActive;
		else this.cCurrent = this.cInactive;
	}
}

export default Bar
