import { State } from "@simple-html/core";

export type state = {
  ele5External: number;
  ele6External: number;
  ele7External: number;
  ele5Internal: number;
  ele6Internal: number;
  ele7Internal: number;
};

export const multiCountState = new State<state>("MULTI_COUNT_STATE", {
  ele5External: 0,
  ele6External: 0,
  ele7External: 0,
  ele5Internal: 0,
  ele6Internal: 0,
  ele7Internal: 0
} as state);
