<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { io, Socket } from "socket.io-client";

const called = ref<boolean>(false); // 是否是接收方
const caller = ref<boolean>(false); // 是否是发起方
const calling = ref<boolean>(false); // 呼叫中
const communicating = ref<boolean>(false); // 视频通话中
const localVideo = ref<HTMLVideoElement>(); // video标签实例，播放本人的视频
const remoteVideo = ref<HTMLVideoElement>(); // video标签实例，播放对方的视频
const socket = ref<Socket>(null!); // Socket实例
const peer = ref<RTCPeerConnection>(null!);
const localStream = ref<MediaStream>(null!); // 本地视频流
const roomId = "001";

// 发起方发起视频请求
async function callRemote() {
  caller.value = true;
  calling.value = true;
  await getLocalStream();
  socket.value.emit("callRemote", roomId);
}

// 接收方同意视频请求
function acceptCall() {
  socket.value.emit("acceptCall", roomId);
}

// 挂断视频
function hangUp() {
  console.log("挂断视频");
}

// 获取本地流, 并设置到video标签中
async function getLocalStream() {
  if (!localVideo.value) {
    throw new Error("localVideo is not ready");
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.value.srcObject = stream;
  localVideo.value.play();
  localStream.value = stream;
  return stream;
}

onMounted(() => {
  socket.value = io("http://192.168.1.3:3000");

  // 连接成功
  socket.value.on("connectionSuccess", () => {
    socket.value.emit("joinRoom", roomId);
  });

  socket.value.on("callRemote", () => {
    if (caller.value) {
      return;
    }
    called.value = true;
    calling.value = true;
  });

  // 用户A 发起视频请求
  socket.value.on("acceptCall", async () => {
    if (!caller.value) {
      return;
    }
    // 创建 RTCPeerConnection 实例
    peer.value = new RTCPeerConnection();
    // 添加本地流
    peer.value.addStream(localStream.value);
    // 通过监听onicecandidate事件获取candidate
    peer.value.onicecandidate = (event) => {
      if (event.candidate) {
        socket.value.emit("sendCandidate", {
          candidate: event.candidate,
          roomId,
        });
      }
    };

    peer.value.onaddstream = (event) => {
      if (!remoteVideo.value) {
        throw new Error("remoteVideo is not ready");
      }
      console.log("用户A收到用户B的视频流", event);
      communicating.value = true
      calling.value = false
      remoteVideo.value.srcObject = event.stream;
      remoteVideo.value.play();
    };

    // 创建 offer
    const offer = await peer.value.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    // 设置本地 offer
    await peer.value.setLocalDescription(offer);
    // 发送 offer
    socket.value.emit("sendOffer", { offer, roomId });
  });

  // 用户B 收到 offer
  socket.value.on("sendOffer", async (offer) => {
    if (caller.value) {
      return;
    }
    // 创建 RTCPeerConnection 实例
    peer.value = new RTCPeerConnection();
    // 获取本地流
    await getLocalStream();
    // 添加本地流
    peer.value.addStream(localStream.value);
    // 通过监听onicecandidate事件获取candidate
    peer.value.onicecandidate = (event) => {
      if (event.candidate) {
        socket.value.emit("sendCandidate", {
          candidate: event.candidate,
          roomId,
        });
      }
    };

    peer.value.onaddstream = (event) => {
      if (!remoteVideo.value) {
        throw new Error("remoteVideo is not ready");
      }
      console.log("用户B收到用户A的视频流", event);
      communicating.value = true
      calling.value = false
      remoteVideo.value.srcObject = event.stream;
      remoteVideo.value.play();
    };
    // 设置远端 offer
    await peer.value.setRemoteDescription(offer);
    // 创建 answer
    const answer = await peer.value.createAnswer();
    // 设置本地 answer
    await peer.value.setLocalDescription(answer);
    // 发送 answer
    socket.value.emit("sendAnswer", { answer, roomId });
  });

  // 用户A 收到 answer
  socket.value.on("sendAnswer", async (answer) => {
    if (!caller.value) {
      return;
    }
    // 设置远端 answer
    await peer.value.setRemoteDescription(answer);
  });

  socket.value.on("sendCandidate", async (candidate) => {
    // 添加远端 candidate
    await peer.value.addIceCandidate(candidate);
  });
});
</script>

<template>
  <div class="flex flex-col justify-center gap-10 relative">
    <video
      ref="localVideo"
      class="w-full h-200 bg-gray-200 object-cover"
    ></video>
    <video
      ref="remoteVideo"
      class="w-full h-200 bg-gray-200 object-cover"
    ></video>
    <div class="flex gap-10">
      <div
        class="bg-green b-rd-8 text-20 flex-1 text-center"
        @click="callRemote"
      >
        发起视频
      </div>
      <div class="bg-red b-rd-8 text-20 flex-1 text-center" @click="hangUp">
        挂断视频
      </div>
    </div>

    <div
      v-if="caller && calling"
      class="absolute top-2/3 w-full flex flex-col items-center gap-10"
    >
      <p class="text-white">等待对方接听...</p>
      <img
        @click="hangUp"
        src="/refuse.svg"
        class="w-16 cursor-pointer"
        alt=""
      />
    </div>
    <div
      v-if="called && calling"
      class="absolute top-2/3 w-full flex flex-col items-center gap-10"
    >
      <p class="text-white">收到视频邀请...</p>
      <div class="flex gap-10">
        <img @click="hangUp" src="/refuse.svg" class="w-32 cursor-pointer" />
        <img
          @click="acceptCall"
          src="/accept.svg"
          class="w-32 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

