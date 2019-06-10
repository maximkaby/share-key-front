import {Manager} from 'socket.io-client';
import {RECONNECT_TIMEOUT} from "../constants/Global";

const manager = new Manager('ws://localhost:5000', {
  reconnection: true,
  reconnectionDelay: RECONNECT_TIMEOUT,
  reconnectionDelayMax: RECONNECT_TIMEOUT,
  randomizationFactor: 1
})

export const socket = manager.socket('/', {
  forceNew: false
});

