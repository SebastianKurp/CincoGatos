class Card
{
	constructor(x, y, rx, ry, flipSpeed, color, text)
	{
		this.x = x;
		this.y = y;
		this.rx = rx;
		this.ry = ry;
		this.flipSpeed = flipSpeed; //how many frames it takes to flip
		this.color = color;
		this.isFlipping = false;
		this.text = text
	}

	drawFlip(ctx, frame, origColorBack, canvasWidth, canvasHeight)
	{
		if (frame > this.flipSpeed)
		{
			this.isFlipping = false;
			this.color = origColorBack;
		}
		else this.isFlipping = true;

		var x = this.x * canvasWidth;
		var y = this.y * canvasHeight;
		var rx = this.rx * canvasWidth;
		var ry = this.ry * canvasHeight;

		var theta = (Math.PI / this.flipSpeed) * frame + Math.PI / 2;
		var height = Math.abs(Math.sin(theta));
		var colorFront = "rgb(" + Math.ceil(this.color[0] - ((1 - height) * this.color[0]/2)) + "," + 
			Math.ceil(this.color[1] - ((1 - height) * this.color[1]/2)) + "," + 
			Math.ceil(this.color[2] - ((1 - height) * this.color[2]/2)) + ")";
		var colorBack = "rgb(" + Math.ceil(origColorBack[0] - ((1 - height) * origColorBack[0]/2)) + "," + 
			Math.ceil(origColorBack[1] - ((1 - height) * origColorBack[1]/2)) + "," + 
			Math.ceil(origColorBack[2] - ((1 - height) * origColorBack[2]/2)) + ")";
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.lineJoin = "round";

		if ((theta % (Math.PI * 2)) < Math.PI)
		{
			ctx.fillStyle = colorFront;
			ctx.moveTo(x-rx-(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
			ctx.lineTo(x-rx+(Math.sqrt(1-height*height)*(rx/5)),y+(ry*height));
			ctx.lineTo(x+rx-(Math.sqrt(1-height*height)*(rx/5)),y+(ry*height));
			ctx.lineTo(x+rx+(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
			ctx.lineTo(x-rx-(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
		}
		else
		{
			ctx.fillStyle = colorBack;
			ctx.moveTo(x-rx+(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
			ctx.lineTo(x-rx-(Math.sqrt(1-height*height)*(rx/5)),y+(ry*height));
			ctx.lineTo(x+rx+(Math.sqrt(1-height*height)*(rx/5)),y+(ry*height));
			ctx.lineTo(x+rx-(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
			ctx.lineTo(x-rx+(Math.sqrt(1-height*height)*(rx/5)),y-(ry*height));
		}
		ctx.fill();
		ctx.stroke();
	}

	draw(ctx, canvasWidth, canvasHeight)
	{
		var x = this.x * canvasWidth;
		var y = this.y * canvasHeight;
		var rx = this.rx * canvasWidth;
		var ry = this.ry * canvasHeight;

		ctx.beginPath();
		ctx.lineJoin = "round";

	    ctx.moveTo(x-rx,y-ry);
		ctx.lineTo(x-rx,y+ry);
		ctx.lineTo(x+rx,y+ry);
		ctx.lineTo(x+rx,y-ry);
		ctx.lineTo(x-rx,y-ry);

	    ctx.fillStyle = "rgb(" + this.color[0]  + "," + this.color[1] + "," + this.color[2] + ")";
	    ctx.fill();
	    ctx.lineWidth = 6;
	    ctx.strokeStyle = "rgb(0,0,0)";
	    ctx.stroke();

	    ctx.font = "" + Math.ceil(Math.min(ry / 3, rx / 5)) + "px Arial";
	    ctx.fillStyle = "rgb(0,0,0)";
		ctx.textAlign = "center";
		ctx.fillText(this.text, x, y); 
	}
}