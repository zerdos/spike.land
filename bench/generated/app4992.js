  import { h, Component, render } from './preact.js?n=4992';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4992!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  