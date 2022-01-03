  import { h, Component, render } from './preact.js?n=7071';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7071!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  