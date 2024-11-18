---
title: "Neumorphic UI Showcase 🎨"
description: "Exploring the beauty of soft UI and glass-morphism"
tags:
  - design
  - ui
  - neumorphic
  - showcase
---

# Neumorphic Design Showcase

<div style="
  padding: 40px;
  background: #1a1a1a;  /* Dark theme base */
  border-radius: 20px;
  margin: 20px 0;
">

## 🎛️ Control Panel

<div style="
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 30px;
  background: #202020;
  border-radius: 20px;
  box-shadow:
    20px 20px 60px #1a1a1a,
    -20px -20px 60px #262626;
">
  <!-- Neumorphic Button -->
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 15px;
    box-shadow:
      8px 8px 16px #1a1a1a,
      -8px -8px 16px #262626;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:active {
      box-shadow:
        inset 8px 8px 16px #1a1a1a,
        inset -8px -8px 16px #262626;
    }
  ">
    <span style="
      font-size: 1.5em;
      background: linear-gradient(45deg, #3498db, #2ecc71);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    ">POWER</span>
  </div>

  <!-- Neumorphic Slider Container -->
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 15px;
    box-shadow:
      inset 8px 8px 16px #1a1a1a,
      inset -8px -8px 16px #262626;
  ">
    <div style="
      height: 8px;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      border-radius: 4px;
      position: relative;
    ">
      <div style="
        width: 24px;
        height: 24px;
        background: #202020;
        border-radius: 50%;
        position: absolute;
        top: -8px;
        left: 70%;
        box-shadow:
          4px 4px 8px #1a1a1a,
          -4px -4px 8px #262626;
        cursor: pointer;
      "></div>
    </div>
  </div>
</div>

## 📊 Status Display

<div style="
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 25px;
">
  <!-- Neumorphic Circular Progress -->
  <div style="
    width: 150px;
    height: 150px;
    background: #202020;
    border-radius: 50%;
    box-shadow:
      8px 8px 16px #1a1a1a,
      -8px -8px 16px #262626;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  ">
    <div style="
      width: 120px;
      height: 120px;
      background: #202020;
      border-radius: 50%;
      box-shadow:
        inset 8px 8px 16px #1a1a1a,
        inset -8px -8px 16px #262626;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      color: #3498db;
    ">
      75%
    </div>
  </div>

  <!-- Neumorphic Card -->
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 15px;
    box-shadow:
      8px 8px 16px #1a1a1a,
      -8px -8px 16px #262626;
  ">
    <h3 style="
      margin: 0;
      font-size: 1.2em;
      color: rgba(255,255,255,0.9);
    ">System Status</h3>
    <div style="
      margin-top: 15px;
      padding: 10px;
      background: #202020;
      border-radius: 10px;
      box-shadow:
        inset 4px 4px 8px #1a1a1a,
        inset -4px -4px 8px #262626;
    ">
      <span style="color: #2ecc71;">● ONLINE</span>
    </div>
  </div>
</div>

## 🎮 Control Pad

<div style="
  margin-top: 40px;
  padding: 30px;
  background: #202020;
  border-radius: 20px;
  box-shadow:
    12px 12px 24px #1a1a1a,
    -12px -12px 24px #262626;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
">
  <!-- Neumorphic Buttons -->
  <div></div>
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 10px;
    box-shadow:
      5px 5px 10px #1a1a1a,
      -5px -5px 10px #262626;
    text-align: center;
    cursor: pointer;
    &:active {
      box-shadow:
        inset 5px 5px 10px #1a1a1a,
        inset -5px -5px 10px #262626;
    }
  ">▲</div>
  <div></div>

  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 10px;
    box-shadow:
      5px 5px 10px #1a1a1a,
      -5px -5px 10px #262626;
    text-align: center;
    cursor: pointer;
    &:active {
      box-shadow:
        inset 5px 5px 10px #1a1a1a,
        inset -5px -5px 10px #262626;
    }
  ">◄</div>
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 10px;
    box-shadow:
      inset 5px 5px 10px #1a1a1a,
      inset -5px -5px 10px #262626;
    text-align: center;
  ">●</div>
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 10px;
    box-shadow:
      5px 5px 10px #1a1a1a,
      -5px -5px 10px #262626;
    text-align: center;
    cursor: pointer;
    &:active {
      box-shadow:
        inset 5px 5px 10px #1a1a1a,
        inset -5px -5px 10px #262626;
    }
  ">►</div>

  <div></div>
  <div style="
    padding: 20px;
    background: #202020;
    border-radius: 10px;
    box-shadow:
      5px 5px 10px #1a1a1a,
      -5px -5px 10px #262626;
    text-align: center;
    cursor: pointer;
    &:active {
      box-shadow:
        inset 5px 5px 10px #1a1a1a,
        inset -5px -5px 10px #262626;
    }
  ">▼</div>
  <div></div>
</div>

## 🎮 Control Pad

<div style="
  margin-top: 40px;
  padding: 30px;
  background: #202020;
  border-radius: 20px;
  box-shadow:
    12px 12px 24px #1a1a1a,
    -12px -12px 24px #262626;
">
  <div style="
    display: flex;
    align-items: center;
    gap: 20px;
  ">
    <!-- Animated Loading Bars -->
    <div style="
      display: flex;
      gap: 5px;
      height: 30px;
      align-items: flex-end;
    ">
      <div style="
        width: 8px;
        background: #202020;
        border-radius: 4px;
        box-shadow:
          inset 2px 2px 4px #1a1a1a,
          inset -2px -2px 4px #262626;
        animation: equalizer 1s infinite;
        animation-delay: 0s;
      "></div>
      <div style="
        width: 8px;
        background: #202020;
        border-radius: 4px;
        box-shadow:
          inset 2px 2px 4px #1a1a1a,
          inset -2px -2px 4px #262626;
        animation: equalizer 1s infinite;
        animation-delay: 0.2s;
      "></div>
      <div style="
        width: 8px;
        background: #202020;
        border-radius: 4px;
        box-shadow:
          inset 2px 2px 4px #1a1a1a,
          inset -2px -2px 4px #262626;
        animation: equalizer 1s infinite;
        animation-delay: 0.4s;
      "></div>
    </div>
    <span>Processing</span>
  </div>
</div>

<style>
@keyframes equalizer {
  0% { height: 10px; }
  50% { height: 30px; }
  100% { height: 10px; }
}
</style>

</div>