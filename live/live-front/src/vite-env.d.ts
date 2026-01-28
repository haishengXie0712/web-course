/// <reference types="vite/client" />
interface RTCPeerConnection {
  addStream(stream: MediaStream): void;
  onaddstream: (ev: MediaStreamEvent) => void;
}
