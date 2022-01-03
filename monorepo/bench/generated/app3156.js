  import { h, Component, render } from './preact.js?n=3156';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3156!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  