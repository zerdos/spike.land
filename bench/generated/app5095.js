  import { h, Component, render } from './preact.js?n=5095';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5095!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  