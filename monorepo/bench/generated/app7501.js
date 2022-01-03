  import { h, Component, render } from './preact.js?n=7501';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7501!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  