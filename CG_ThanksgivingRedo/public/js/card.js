class Card
{
	constructor(x, y, rx, ry, flipSpeed, color, text, val, maxVal)
	{
		this.x = x;
		this.y = y;
		this.rx = rx;
		this.ry = ry;
		this.flipSpeed = flipSpeed; //how many frames it takes to flip
		this.color = color;
		this.isFlipping = false;
		this.text = text;
		this.val = val;
		this.maxVal = maxVal;
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

	drawBar(xShift, yShift, rxShift, ryShift, ctx, canvasWidth, canvasHeight, color)
	{
		var xBar = this.x + this.rx * xShift;
		var yBar = this.y + this.ry * yShift;
		var rxBar = this.rx * rxShift;
		var ryBar = this.ry * ryShift;
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.arc((xBar - rxBar) * canvasWidth, yBar * canvasHeight, ryBar * canvasHeight, Math.PI/2, 3*Math.PI/2);
		ctx.lineTo((xBar + rxBar) * canvasWidth, (yBar - ryBar) * canvasHeight);
		ctx.arc((xBar + rxBar) * canvasWidth, yBar * canvasHeight, ryBar * canvasHeight, 3*Math.PI/2, Math.PI/2);
		ctx.lineTo((xBar - rxBar) * canvasWidth, (yBar + ryBar) * canvasHeight);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
	}

	HSLtoRGB(h,s,l)
	{
		var c = (1 - Math.abs(2 * l - 1)) * s;
		var x = c * (1 - Math.abs(((h*360) / 60) % 2 - 1));
		var m = l - c/2;

		var r, g, b;
		if (h >= 0 && h < (1/6))
		{ r = c; g = x; b = 0; }
		else if (h >= (1/6) && h < (2/6))
		{ r = x; g = c; b = 0; }
		else if (h >= (2/6) && h < (3/6))
		{ r = 0; g = c; b = x; }
		else if (h >= (3/6) && h < (4/6))
		{ r = 0; g = x; b = c; }
		else if (h >= (4/6) && h < (5/6))
		{ r = x; g = 0; b = c; }
		else if (h >= (5/6) && h <= 1)
		{ r = x; g = 0; b = x; }

		r = Math.floor((r+m)*255);
		g = Math.floor((g+m)*255);
		b = Math.floor((b+m)*255);

		
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	drawVal(ctx, canvasWidth, canvasHeight)
	{
		var xShift = -0.8 + (0.8 * (this.val/this.maxVal));
		var rxShift = 0.8 * (this.val/this.maxVal);
		this.drawBar(0.0, 0.6, 0.8, 0.2, ctx, canvasWidth, canvasHeight, "rgb(0,0,0)");
		this.drawBar(xShift, 0.6, rxShift, 0.15, ctx, canvasWidth, canvasHeight, this.HSLtoRGB((this.val/this.maxVal)/3,1,0.5));
		var fontSize = Math.ceil(Math.min((this.ry * canvasHeight) / 5, (this.rx * canvasWidth) / 8))
		ctx.font = "" + fontSize + "px Arial";
	    ctx.fillStyle = "rgb(0,0,0)";
		ctx.textAlign = "center";
		ctx.fillText(this.val + " / " + this.maxVal, (this.x - this.rx*0.75) * canvasWidth, (this.y + this.ry * 0.35) * canvasHeight);

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

		this.drawVal(ctx, canvasWidth, canvasHeight);
	}
}