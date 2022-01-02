  import { h, Component, render } from './preact.js?n=4200';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4200!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  