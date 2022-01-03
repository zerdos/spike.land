  import { h, Component, render } from 'lib/preact.js?n=7607';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7607!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  