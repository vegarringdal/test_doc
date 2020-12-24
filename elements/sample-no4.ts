import { customElement, unSubscribe } from "@simple-html/core";
import { html } from "lit-html";
import { property, publish, subscribe, assignState } from "@simple-html/core";
import { viewState } from "../state/viewState";
import { multiCountState } from "../state/multiCountState";

@customElement("sample-no4")
export default class extends HTMLElement {
  @property() ele5 = 0;
  @property() ele6 = 0;
  @property() ele7 = 0;

  connectedCallback() {
    const [state] = multiCountState.get();
    this.ele5 = state.ele5External;
    this.ele6 = state.ele6External;
    this.ele7 = state.ele7External;

    // you could use 1 here and pass name back..
    subscribe("ele-5", this, (newValue: any) => {
      const [state, setState] = multiCountState.get();
      this.ele5 = newValue;
      setState(assignState(state, { ele5External: newValue }));
    });
    subscribe("ele-6", this, (newValue: any) => {
      const [state, setState] = multiCountState.get();
      this.ele6 = newValue;
      setState(assignState(state, { ele6External: newValue }));
    });
    subscribe("ele-7", this, (newValue: any) => {
      const [state, setState] = multiCountState.get();
      this.ele7 = newValue;
      setState(assignState(state, { ele7External: newValue }));
    });
  }

  disconnectedCallback() {
    unSubscribe("ele5", this);
    unSubscribe("ele6", this);
    unSubscribe("ele7", this);
  }

  render() {
    const [view] = viewState.get();
    return html`
      <span class="text-xl">${view.toUpperCase()}</span>
      <p class="mt-2 mb-2">
        Shows send data between elements, some elements arn always connected, so
        this will help with this if you do not want to create a state container
      </p>
      <p class="mt-2 mb-2">Edit and go to sample 1</p>

      <div class="flex flex-col">
        <span>ele-5-external: ${this.ele5}</span>
        <span>ele-6-external: ${this.ele6}</span>
        <span>ele-7-external: ${this.ele7}</span>

        <button
          class="bg-green-500 p-2 w-56"
          @click=${() => {
            publish("update");
          }}
        >
          publish all +1 to all
        </button>

        <ele-5 class="flex flex-col p-1 w-56 bg-indigo-200 mt-2"></ele-5>

        <ele-6 class="flex flex-col p-1 w-56 bg-indigo-400 mt-2"></ele-6>

        <ele-7 class="flex flex-col p-1 w-56 bg-indigo-300 mt-2"></ele-7>
      </div>
    `;
  }
}

/**
 * <ele-1></ele-1>
 */
@customElement("ele-5")
export class Ele5 extends HTMLElement {
  @property() count = 0;

  connectedCallback() {
    const [state] = multiCountState.get();
    this.count = state.ele5Internal;
    subscribe("update", this, () => {
      this.count++;
    });
  }

  disconnectedCallback() {
    unSubscribe("update", this);
    const [state, setState] = multiCountState.get();
    assignState(state, { ele5Internal: this.count });
  }

  render() {
    return html`
      <span>internal: ${this.count}</span>
      <button
        class="p-2 m-2 bg-green-500"
        @click=${() => {
          this.count++;
          publish("ele-5", this.count);
        }}
      >
        1+ and <br />
        send back current count
      </button>
    `;
  }
}

/**
 * <ele-2></ele-2>
 */

@customElement("ele-6")
export class Ele6 extends HTMLElement {
  @property() count = 0;

  connectedCallback() {
    const [state] = multiCountState.get();
    this.count = state.ele6Internal;
    subscribe("update", this, () => {
      this.count++;
    });
  }

  disconnectedCallback() {
    unSubscribe("update", this);
    const [state, setState] = multiCountState.get();
    assignState(state, { ele6Internal: this.count });
  }

  render() {
    return html`
      <span>internal: ${this.count}</span>
      <button
        class="p-2 m-2 bg-green-500"
        @click=${() => {
          this.count++;
          publish("ele-6", this.count);
        }}
      >
        1+ and <br />
        send back current count
      </button>
    `;
  }
}

/**
 * <ele-4></ele-4>
 */

@customElement("ele-7")
export class Ele7 extends HTMLElement {
  @property() count = 0;

  connectedCallback() {
    const [state] = multiCountState.get();
    this.count = state.ele7Internal;
    subscribe("update", this, () => {
      this.count++;
    });
  }

  disconnectedCallback() {
    unSubscribe("update", this);
    const [state, setState] = multiCountState.get();
    assignState(state, { ele7Internal: this.count });
  }

  render() {
    return html`
      <span>internal: ${this.count}</span>
      <button
        class="p-2 m-2 bg-green-500"
        @click=${() => {
          this.count++;
          publish("ele-7", this.count);
        }}
      >
        1+ and <br />
        send back current count
      </button>
    `;
  }
}
