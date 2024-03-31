import { CSSResult, LitElement, unsafeCSS } from 'lit';

import styles from './TailwindGlobal.css';

const tailwindElement = unsafeCSS(styles);

export const TailwindElement = (style?: CSSResult) =>
  class extends LitElement {
    static styles = [tailwindElement, unsafeCSS(style)];
  };
