/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Menu Scene");

    this.load.image("menuSceneBackground", "assets/menu-scene.jpg");
    this.load.image("startButton", "assets/start.png");

    this.load.atlas("ui", "assets/nine-slice.png", "assets/nine-slice.json");
  }

  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground");
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 100, "startButton");
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", () => this.clickButton());

    const panel = this.add.nineslice(1920 / 2, 300, "ui", "PopupBackground400", 500, 400, 160, 160, 100, 100);

    const content = ["Dapatkan Discount up to 30%", "Dengan memilih dua dari box uniqlo", "Anda hanya akan diberi kesempatan dua kali untuk memilih box yang berisikan nominal discount", "Selamat mencoba!", "Semoga Beruntung!"];

    const text = this.add.text(1920 / 2, 300, content, { align: "center" });

    text.setOrigin(0.5, 0.5);
    text.setWordWrapWidth(300);

    this.tweens.add({
      targets: panel,
      width: 800,
      height: 500,
      duration: 3000,
      ease: "sine.inout",
      yoyo: false,
      repeat: 0,
      onUpdate: () => {
        text.setWordWrapWidth(panel.width - 100);
      },
    });
  }

  update(time, delta) {}

  clickButton() {
    this.scene.start("gameScene");
  }
}

export default MenuScene;
