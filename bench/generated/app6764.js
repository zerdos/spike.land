  import { h, Component, render } from './preact.js?n=6764';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6764!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  