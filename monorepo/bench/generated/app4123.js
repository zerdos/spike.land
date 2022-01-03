  import { h, Component, render } from './preact.js?n=4123';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4123!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  