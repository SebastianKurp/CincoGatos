class progressBar
{
	constructor(val,maxVal,x,y,rx,ry,color)
	{
		this.val = val;
		this.maxVal = maxVal;
		this.x = x;
		this.y = y;
		this.rx = rx;
		this.ry = ry;
		this.color = color;
	}

	drawBar(x, rx, ry, ctx, canvasWidth, canvasHeight, color)
	{
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.arc((x - rx) * canvasWidth, this.y * canvasHeight, ry * canvasHeight, Math.PI/2, 3*Math.PI/2);
		ctx.lineTo((x + rx) * canvasWidth, (this.y - ry) * canvasHeight);
		ctx.arc((x + rx) * canvasWidth, this.y * canvasHeight, ry * canvasHeight, 3*Math.PI/2, Math.PI/2);
		ctx.lineTo((x - rx) * canvasWidth, (this.y + ry) * canvasHeight);
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

	draw(ctx, canvasWidth, canvasHeight)
	{
		var xShift =  ((this.val/this.maxVal) - 1) * this.rx + this.x;
		var rxShift = (this.val/this.maxVal) * this.rx;
		this.drawBar(this.x, this.rx, this.ry, ctx, canvasWidth, canvasHeight, this.color);
		this.drawBar(xShift, rxShift, this.ry*0.75, ctx, canvasWidth, canvasHeight, this.HSLtoRGB((this.val/this.maxVal)/3,1,0.5));
		var fontSize = Math.ceil(Math.min((this.ry * canvasHeight), (this.rx * canvasWidth)))
		ctx.font = "" + fontSize + "px Arial";
	    ctx.fillStyle = "rgb(0,0,0)";
		ctx.textAlign = "center";
		ctx.fillText(this.val + " / " + this.maxVal, (this.x - this.rx * 0.9) * canvasWidth, (this.y - this.ry * 1.5) * canvasHeight);

	}
}