import {socket} from "../index";

socket.on('reconnect_error', () => {
  console.log('recon err')
})

socket.on('send_front_ext_secret', (message) => {
  window.key += message.mySecret;
  console.log('send_front_ext_secret', message);
})
