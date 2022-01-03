  import { h, Component, render } from './preact.js?n=3868';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3868!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  