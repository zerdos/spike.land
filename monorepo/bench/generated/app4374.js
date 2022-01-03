  import { h, Component, render } from './preact.js?n=4374';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4374!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  