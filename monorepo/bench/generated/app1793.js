  import { h, Component, render } from './preact.js?n=1793';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1793!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  