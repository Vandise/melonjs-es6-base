import ProgressBar from '../util/progressBar';
import MelonJSTextLogo from '../util/melonJsTextLogo';
import * as dom from '../../../util/dom';

class BootScreen extends dom.globals.me.ScreenObject {

  onResetEvent() {
    const { me } = dom.globals;

    me.game.world.addChild(new me.ColorLayer("background", "#202020", 0), 0);

    const progressBar = new ProgressBar(
        0,
        me.video.renderer.getHeight() / 2,
        me.video.renderer.getWidth(),
        8
    );

    this.loaderHdlr = me.event.subscribe(
        me.event.LOADER_PROGRESS,
        progressBar.onProgressUpdate.bind(progressBar)
    );

    this.resizeHdlr = me.event.subscribe(
        me.event.VIEWPORT_ONRESIZE,
        progressBar.resize.bind(progressBar)
    );

    me.game.world.addChild(progressBar, 1);
    me.game.world.addChild(new MelonJSTextLogo(me.video.renderer.getWidth(), me.video.renderer.getHeight()), 1);
  }

  onDestroyEvent() {
    const { me } = dom.globals;

    me.event.unsubscribe(this.loaderHdlr);
    me.event.unsubscribe(this.resizeHdlr);
    this.loaderHdlr = this.resizeHdlr = null;
  }
};

export default BootScreen;