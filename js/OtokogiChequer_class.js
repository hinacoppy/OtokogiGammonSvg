// OtokogiChequer_class.js
'use strict';

class Chequer {
  constructor(idx, width = "10vmax") {
    this._idx = idx;
    this._domid = "chequer" + idx;
    const divelem = document.getElementById(this._domid);
    divelem.innerHTML = this.checkersvg();
    this.setSvgWidth(width);
    this._dom = document.getElementById(this._domid);
    this._point = 0;
  }

  //setter method
  set dom(x)      { this._dom = document.getElementById(this._domid); } //argument x is dummy
  set point(x)    { this._point = x; }
  set width(x)    { this.setSvgWidth(x); }

  //getter method
  get idx()      { return this._idx; }
  get dom()      { return this._dom; }
  get domid()    { return this._domid; }
  get point()    { return this._point; }

  checkersvg() {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-25 -25 50 50">';
    svg += '<ellipse cx="0" cy="0" rx="24" ry="24" fill="#666" stroke-width="1" stroke="#888"/>';
    svg += '</svg>';
    return svg;
  }

  setSvgWidth(width) {
    const divelem = document.getElementById(this._domid);
    const svg = divelem.firstElementChild;
    svg.setAttribute("width", width);
  }

} //class Chequer
