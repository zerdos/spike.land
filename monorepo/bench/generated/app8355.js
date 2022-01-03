  import { h, Component, render } from './preact.js?n=8355';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8355!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  