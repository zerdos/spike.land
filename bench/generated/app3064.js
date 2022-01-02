  import { h, Component, render } from './preact.js?n=3064';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3064!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  