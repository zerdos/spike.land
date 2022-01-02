  import { h, Component, render } from './preact.js?n=4005';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4005!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  