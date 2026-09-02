// OtokogiBoard_class.js
'use strict';

class OtokogiBoard {
  constructor(pointmax = 6) {
    this.pointmax = pointmax;
    this.ogid = new Ogid();
    this.colorlist = ["#666", "#33f", "#f33", "#f3f", "#3f3", "#3ff", "#ff3", "#fff"];
    this.trianglecolor = ["#236", "#632"];
    this.bgBoardConfig();
    this.prepareSvgDice();
    this.setDomNameAndStyle();
  } //end of constructor()

  prepareSvgDice() {
    this.svgDice = [];
    this.svgDice[0]  = '<svg class="dice-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"/>';
    this.svgDice[1]  = '<svg class="dice-one" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[1] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[1] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[1] += '</svg>';
    this.svgDice[2]  = '<svg class="dice-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[2] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[2] += '<circle cx="50" cy="130" r="8" stroke-width="18"/>';
    this.svgDice[2] += '<circle cx="130" cy="50" r="8" stroke-width="18"/>';
    this.svgDice[2] += '</svg>';
    this.svgDice[3]  = '<svg class="dice-three" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[3] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[3] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[3] += '<circle cx="132" cy="48" r="8" stroke-width="18" />';
    this.svgDice[3] += '</svg>';
    this.svgDice[4]  = '<svg class="dice-four" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[4] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[4] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[4] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[4] += '</svg>';
    this.svgDice[5]  = '<svg class="dice-five" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[5] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[5] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[5] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[5] += '</svg>';
    this.svgDice[6]  = '<svg class="dice-six" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[6] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[6] += '<circle cx="48" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="48" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[6] += '<circle cx="132" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[6] += '</svg>';
    this.svgDice[7]  = '<svg class="dice-six" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="10vmax">';
    this.svgDice[7] += '<rect x="7" y="7" rx="30" width="166" height="166" stroke-width="1"/>';
    this.svgDice[7] += '<circle cx="65" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="65" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="40" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="90" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="115" cy="48" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="140" cy="90" r="8" stroke-width="18"/>';
    this.svgDice[7] += '<circle cx="115" cy="132" r="8" stroke-width="18"/>';
    this.svgDice[7] += '</svg>';
  }

  setDomNameAndStyle() {
    //point triangles and offtray
    this.point = [];
    for (let p = 0; p <= 7; p++) { //ポイントは7つ用意しておく、p==0はofftray
      const domid = "pt" + p;
      const ptsvg = document.getElementById(domid);
      ptsvg.setAttribute("viewBox", "0 0 50 200");
      ptsvg.setAttribute("width", this.pointWidth);
      ptsvg.setAttribute("height", this.pointHeight);
      ptsvg.setAttribute("preserveAspectRatio", "none");
      const color = this.trianglecolor[p % 2];
      const innersvg = (p == 0) ? `<rect x="0" y="50" width="50" height="150" stroke-width="2" stroke="#000" fill="#ddd"/>`
                                : `<path d="M 0 200 L 25 50 L 50 200 Z" fill="${color}"/>`;
      ptsvg.innerHTML = innersvg;
      this.point[p] = ptsvg;
      OgUtil.domSetPos(this.point[p], this.getPosObjBottom(this.pointX[p], this.pointY));
    }
    this.pointAll = document.querySelectorAll(".point");
    OgUtil.domHide(this.point[7]); //7ポイントは最初は非表示
    this.offtray = this.point[0];

    //dice
    this.dice1 = document.getElementById('dice1');
    this.dice2 = document.getElementById('dice2');
    OgUtil.domSetPos(this.dice1, this.getPosObjTop(this.dice1X, this.diceY));
    OgUtil.domSetPos(this.dice2, this.getPosObjTop(this.dice2X, this.diceY));

    //Chequer
    this.chequer = [];
    for (let n = 0; n < 4; n++) {
      this.chequer[n] = new Chequer(n);
    }
  }

  makeThumbBoard(svg, ogid, player, iscurrent) {
    const bdwidth = 300;
    const bdheight = 230;
    const ptwidth = bdwidth / (this.pointmax + 1);
    const ptwidthhalf = ptwidth / 2;
    const ptheight = 150;
    const boardparts = [];

    svg.setAttribute("viewBox", `0 0 ${bdwidth} ${bdheight}`);
    svg.setAttribute("width", this.thumbBoardWidth);
    svg.setAttribute("height", this.thumbBoardHeight);
    svg.setAttribute("preserveAspectRatio", "none");

    //board
    const basecolor = iscurrent ? "#0c0" : "#bbb";
    const board = `<rect x="0" y="0" width="${bdwidth}" height="${bdheight}" stroke-width="5" stroke="#000" fill="${basecolor}"/>`;
    boardparts.push(board);

    //offtray
    const offtrayx = ptwidth * this.pointmax + 2;
    const offtrayy = bdheight - ptheight;
    const offtrayw = ptwidth - 4;
    const offtray = `<rect x="${offtrayx}" y="${offtrayy}" width="${offtrayw}" height="${ptheight}" stroke-width="2" stroke="#000" fill="#ddd"/>`;
    boardparts.push(offtray);

    //point triangles
    for(let p = 0; p < this.pointmax; p++) {
      const pointx = ptwidth * p;
      const pathd = `M ${pointx} ${bdheight} l ${ptwidthhalf} ${ptheight * -1} l ${ptwidthhalf} ${ptheight} z`;
      const color = this.trianglecolor[p % 2];
      const triangle = `<path d="${pathd}" fill="${color}"/>`;
      boardparts.push(triangle);
    }

    //Chequer
    const checkercolor = this.colorlist[player];
    for (let pt = 0; pt <= this.pointmax; pt++) {
      for (let n = 0; n < ogid.get_ptno(pt); n++) {
        const boffratio = (pt == 0) ? 0.4 : 0.92;
        const cx = ptwidth * (this.pointmax - pt) + ptwidthhalf;
        const cy = bdheight - ptwidth * n * boffratio - ptwidthhalf;
        const rx = ptwidth / 2 - 2; //枠線に掛からないようにちょっとだけ小さくする
        const ry = rx * boffratio; //const ry = ptwidth / 6;
        const checker = (pt == 0) ? `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${checkercolor}"/>`
                                  : `<circle cx="${cx}" cy="${cy}" r="${rx}" fill="${checkercolor}"/>`;
        boardparts.push(checker);
      }
    }

    svg.innerHTML = boardparts.join("\n");
  }

  showBoard(ogid) {
    this.ogid = ogid;
    this.showPosition(ogid);
    this.showDice(ogid);
  }

  showPosition(ogid) {
    const checkercolor = this.colorlist[ogid.player];
    let checkerid = 0;
    for (let pt = 0; pt <= this.pointmax; pt++) {
      for (let n = 0; n < ogid.get_ptno(pt); n++) {
        const boffratio = (pt == 0) ? 0.4 : 1.0;
        const ex = this.pointX[pt] + this.pointOffset;
        const ey = this.piecefirstY - (n * this.pieceHeight * boffratio);
        const ry = 24 * boffratio; //ベアオフチェッカーは楕円で描画
        const domid = this.chequer[checkerid].domid;
        const checkerdiv = document.getElementById(domid);
        const checkersvg = checkerdiv.firstElementChild;
        const ellipse = checkersvg.firstElementChild;
        ellipse.setAttribute("ry", ry);
        ellipse.setAttribute("fill", checkercolor);
        OgUtil.domSetPos(this.chequer[checkerid].dom, this.getPosObjTop(ex, ey));
        this.chequer[checkerid].point = pt;
        checkerid += 1;
      }
    }
  }

  showDice(ogid) {
    const facecolor = this.colorlist[ogid.player];
    const pipcolor = ["#666", "#33f", "#f33"].includes(facecolor) ? "#fff" : "#000"; //黒,赤,青ダイスのときは目色は白
    const dicestr = ogid.get_dice();
    const d1 = parseInt(dicestr.substring(0, 1));
    const d2 = parseInt(dicestr.substring(1, 2));
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");
    dice1.innerHTML = this.svgDice[d1];
    dice2.innerHTML = this.svgDice[d2];
    const dice1svg = dice1.firstElementChild;
    const dice2svg = dice2.firstElementChild;
    dice1svg.setAttribute("fill", facecolor);
    dice2svg.setAttribute("fill", facecolor);
    dice1svg.setAttribute("stroke", pipcolor);
    dice2svg.setAttribute("stroke", pipcolor);
  }

  animateDice(msec) {
    const diceanimclass = "faa-shake animated"; //ダイスを揺らすアニメーション
    OgUtil.domAddClass(this.dice1, diceanimclass);
    OgUtil.domAddClass(this.dice2, diceanimclass);

    const promise = new Promise(resolve => {
      setTimeout(() => { //msec秒待ってアニメーションを止める
        OgUtil.domRemoveClass(this.dice1, diceanimclass);
        OgUtil.domRemoveClass(this.dice2, diceanimclass);
        resolve();
      }, msec);
    });
    return promise;
  }

  bgBoardConfig() {
    //メインボードの大きさの定数を計算
    const mainBoardRect = document.getElementById('board').getBoundingClientRect();
    this.mainBoardWidth  = mainBoardRect.width;
    this.mainBoardHeight = mainBoardRect.height;

    //サムネイルボードの大きさの定数を計算
    const thumbBoardRect = document.getElementById("thumbboard0").getBoundingClientRect();
    this.thumbBoardWidth  = thumbBoardRect.width;
    this.thumbBoardHeight = thumbBoardRect.height;

    //ボードサイズ各種定数
    const ptnum = this.pointmax + 1;
    this.pointWidth = this.mainBoardWidth / ptnum;// - 2; //ポイントの幅を計算
    this.pointHeight = this.mainBoardHeight; //ポイント高さ
    //this.pieceWidth = this.mainBoardWidth / 8 - 20; //チェッカーは7pt用に固定（参加人数により可変）
    this.pieceWidth = this.pointWidth - 10; //チェッカーサイズはポイントサイズに連動
    this.pieceHeight = this.pieceWidth;
    this.pointOffset = (this.pointWidth - this.pieceWidth) / 2;

    //各種オブジェクトの位置定数
    this.pointY = 0;
    this.pointX = [];
    for (let p = 0; p <= this.pointmax; p++) {
      const px = this.pointmax - p;
      this.pointX[p] = px * this.pointWidth;
    }

    this.piecefirstY = this.mainBoardHeight - this.pieceHeight; //一番下のコマ位置Y

    this.diceY = this.mainBoardHeight * 0.15;
    this.dice1X = this.pointX[2];
    this.dice2X = (this.pointmax == 5) ? this.pointX[3] : this.pointX[4];
  }

  getPosObjTop(x, y) {
    return {left:x, top:y};
  }

  getPosObjBottom(x, y) {
    return {left:x, bottom:y};
  }

  obj2style(obj) {
    const left = parseFloat(obj.left);
    const top = parseFloat(obj.top);
    const bottom = parseFloat(obj.bottom);
    let style = "";
    style += (isNaN(left)) ?   "" : "left:"   + left   + "px;";
    style += (isNaN(top)) ?    "" : "top:"    + top    + "px;";
    style += (isNaN(bottom)) ? "" : "bottom:" + bottom + "px;";
    return style;
  }

  getDragEndPoint(pos) {
    const px = Math.floor(pos.left / this.pointWidth + 0.5);
    const pt = this.pointmax - px;
    return pt;
  }

  getDragStartPoint(id) {
    const chker = this.chequer.find(elem => elem.domid == id);
    const pt = chker.point;
    return pt;
  }

  getChequerOnDragging(pt) {
    const aryreverse = this.chequer.toReversed();
    const chker = aryreverse.find(elem => elem.point == pt); //一番上の(最後の)チェッカーを返す
    return chker;
  }

  flashOnMovablePoint(destpt) {
    for (const dp of destpt) {
      if (dp == 0) { this.offtray.classList.add("flash"); }
      else { this.point[dp].classList.add("flash"); }
    }
  }

  flashOffMovablePoint() {
    this.pointAll.forEach(el => el.classList.remove("flash"));
    this.offtray.classList.remove("flash");
  }

  redraw(pointmax) {
    this.pointmax = pointmax;
    this.bgBoardConfig();

    //point triangles and offtray
    for (let p = 0; p <= this.pointmax; p++) {
      OgUtil.domShow(this.point[p]);
      OgUtil.domSetPos(this.point[p], this.getPosObjBottom(this.pointX[p], this.pointY));
      const domid = "pt" + p;
      const ptsvg = document.getElementById(domid);
      ptsvg.setAttribute("width", this.pointWidth);
    }
    for (let p = this.pointmax + 1; p <= 7; p++) {
      OgUtil.domHide(this.point[p]);
    }

    //dice
    OgUtil.domSetPos(this.dice1, this.getPosObjTop(this.dice1X, this.diceY));
    OgUtil.domSetPos(this.dice2, this.getPosObjTop(this.dice2X, this.diceY));

    //checker
    for (let n = 0; n < 4; n++) {
      this.chequer[n].width = this.pieceWidth; //チェッカーの大きさを再設定
    }

    this.showBoard(this.ogid);
  }

  shuffleColor() {
    this.colorlist.sort(() => Math.random() - 0.5); //色をシャッフルする
  }

} //class OtokogiBoard
