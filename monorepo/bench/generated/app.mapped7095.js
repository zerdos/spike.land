  import { h, Component, render } from 'lib/preact.js?n=7095';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7095!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  