class GameScene extends Phaser.Scene {
  platforms;
  limitText = 2;
  text;

  constructor() {
    super({ key: "gameScene" });

    this.card = [];
    this.loops = 0;
    this.box = null;
    this.info = null;
    this.discountText = null;
    this.discountTextEnd = null;
    this.discountValue = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a");
  }

  preload() {
    console.log("Game Scene");
    this.load.image("uniqlo", "./assets/uniqlo.jpg");
    this.load.image("ground", "./assets/platform.png");

    this.load.image("gift", "./assets/uniqlo-id.png");
    this.load.image("gift-jp", "./assets/uniqlo-jp.png");
    this.load.image("gift-black", "./assets/uniqlo-id-black.png");
    this.load.atlas("flares", "assets/flares.png", "assets/flares.json");
  }

  create() {
    function shuffleArray(arr) {
      let gifts = ["gift", "gift-jp", "gift-black"];
      let discounts = [0, 0, 0, "5", "5", 10, 20, 10, 0];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length >= 4) {
          const randomGift = Math.floor(Math.random() * gifts.length);
          const discount = Math.floor(Math.random() * (discounts.length - 1)) || 0;
          arr[i][2] = gifts[randomGift];
          arr[i][3] = parseInt(discounts[discount]) || 0;
          discounts.splice(discount, 1);
        }
      }
    }

    this.card = [
      [1700, 200, "gift", 0],
      [1300, 200, "gift", 0],
      [1300, 550, "gift-jp", 5],
      [1700, 550, "gift-jp", 5],
      [1700, 900, "giftjp", 10],
      [1300, 900, "gift", 10],
      [925, 900, "gift-black", 20],
      [550, 900, "gift-black", 0],
      [200, 900, "gift-black", 0],
    ];

    // Call the function to shuffle values at index 2 and 3
    shuffleArray(this.card);

    this.background = this.add.image(0, 0, "uniqlo").setScale(1.0);
    this.background.setOrigin(0, 0);
    this.platforms = this.physics.add.sprite(1920 / 2, 1180, "ground").setScale(3.2);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(1500, 750, "ground").setScale(1.5);
    this.platforms.create(1500, 400, "ground").setScale(1.5);

    this.box = this.physics.add.staticGroup();
    for (let i = 0; i < this.card.length; i++) {
      const box = this.box.create(this.card[i][0], this.card[i][1], this.card[i][2]).setScale(0.2);
      box.setInteractive();
      box.value = this.card[i][3];
      box.on("pointerdown", () => {
        if (this.limitText > 0) {
          this.limitText = this.limitText - 1;
          this.discountValue += box.value;
          box.destroy();
          if (box.value > 0) {
            alert(`Selamat anda mendapatkan discount: ${box.value}\n limit Anda: ${this.limitText}`);
          } else {
            alert(`Yah Anda belum beruntung!\n Silahakan coba lagi, limit Anda: ${this.limitText}`);
          }

          if (this.limitText == 0) {
            const emitter = this.add.particles(1920 / 2, 1080 / 2, "flares", {
              frame: "red",
              blendMode: "ADD",
              lifespan: 1000,
              frequency: 16,
              scale: { start: 0.8, end: 0.1 },
              stopAfter: 32,
            });

            emitter.addEmitZone({
              type: "edge",
              source: new Phaser.Geom.Circle(0, 0, 260),
              quantity: 32,
            });
            emitter.on('complete', () => {
                emitter.start();
            });
            this.discountTextEnd = this.add.text(1920 / 2, 1080 / 2, `${this.discountValue}%`, { font: "194px Courier", fill: "#000000" }).setOrigin(0.5);
            const config0 = {
              x: 725,
              y: 200,
              text: "Selamat Discount Anda Sebesar",
              style: {
                fontSize: "32px",
                fontFamily: "Arial",
                color: "#ffffff",
                backgroundColor: "#ff00ff",
              },
            };

            this.make.text(config0);
            // this.info = this.add.text(1920 / 2, 300, `Selamat Discount Anda Sebesar`, { font: "44px Courier", fill: "#00ff00" }).setOrigin(0.5);
          }
        }
      });
    }

    this.discountText = this.add.text(10, 10, `Discount: 0`, { font: "48px Courier", fill: "#000000" });
    this.text = this.add.text(10, 50, "Limit: 2", { font: "48px Courier", fill: "#000000" });
  }

  update() {
    this.discountText.setText(`Discount: ${this.discountValue || 0}`);
    this.text.setText(`limit: ${this.limitText}`);
  }
}

export default GameScene;
