import * as dom from '../../../util/dom';

class MelonJSTextLogo extends dom.globals.me.Renderable {

  constructor(w, h) {
    super(0, 0, w, h);

    const { me } = dom.globals;

    this.fontCanvas = me.video.createCanvas(256, 64);
    this.drawFont(me.video.renderer.getContext2d(this.fontCanvas));
    this.anchorPoint.set(0.0, 0.0);
  }

  drawFont(context) {
    const { me } = dom.globals;

    const melonFragment = me.pool.pull("me.Text", 0, 0, {
      font: "century gothic",
      size: 32,
      fillStyle: "white",
      textAlign: "middle",
      textBaseline : "top",
      text: "melon"
    });

    const jsFragment = me.pool.pull("me.Text", 0, 0, {
      font: "century gothic",
      size: 32,
      fillStyle: "#55aa00",
      textAlign: "middle",
      textBaseline : "top",
      bold: true,
      text: "JS"
    });

    const melonWidth = melonFragment.measureText(context).width;
    const jsWidth = jsFragment.measureText(context).width;

    this.pos.x = Math.round((this.width - melonWidth - jsWidth) / 2);
    this.pos.y = Math.round(this.height / 2 + 16);

    melonFragment._drawFont(context, "melon", 0, 0);
    jsFragment._drawFont(context, "JS", melonWidth, 0);

    me.pool.push(melonFragment);
    me.pool.push(jsFragment);
  }

  draw(renderer) {
    renderer.drawImage(this.fontCanvas, this.pos.x, this.pos.y);
  }
}

export default MelonJSTextLogo;