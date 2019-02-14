import Game from './client/game';
import BootScreen from './client/screens/loading/boot';

class Bootstrap {

  constructor() {
    // Initialize the video.
    if (!me.video.init(600, 400, { wrapper : "screen", scale: 1.75 })) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(() => {
        me.utils.function.defer(me.plugin.register, this, me.debug.Panel, "debug");
      });
    }

    me.state.set(me.state.LOADING, new BootScreen());

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(Game.resources);
    me.sys.gravity = 0;
    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);

  }

  loaded() {
    console.log('loaded');
    /*
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(States.default.CHARACTER_CREATE, new CharacterCreateScreen());
    me.state.set(States.default.MAIN_MENU, new MainMenuScreen());

    Object.keys(Game.references.entities).forEach((name) => {
      me.pool.register(name, Game.references.entities[name]);
    });

    me.state.change(States.default.MAIN_MENU);
    */
  }

  static boot()
  {
    const bootstrap = new Bootstrap();
    return bootstrap;
  }
}

window.onReady(() => {
  Bootstrap.boot();
});