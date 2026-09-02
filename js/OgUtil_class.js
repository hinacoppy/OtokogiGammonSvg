// OgUtil_class.js
// DOM utility functions (jQuery-free)
'use strict';

class OgUtil {
  static domShow(el)  { el.style.display = "block"; }
  static domHide(el)  { el.style.display = "none"; }
  static domToggle(el, show) { show ? OgUtil.domShow(el) : OgUtil.domHide(el); }

  static domSetPos(el, pos) { //jQueryの.css({left,top,bottom})相当
    if (pos.left   !== undefined) { el.style.left   = pos.left   + "px"; }
    if (pos.top    !== undefined) { el.style.top    = pos.top    + "px"; }
    if (pos.bottom !== undefined) { el.style.bottom = pos.bottom + "px"; }
  }

  //display:noneの要素はgetBoundingClientRect()が0を返すため、
  //一時的に表示状態にして計測してから元に戻す(jQueryは非表示要素でも正しく計測できるため、それに合わせる)
  static measureHidden(el, fn) {
    if (getComputedStyle(el).display !== "none") { return fn(); }
    const prevDisplay = el.style.display;
    const prevVisibility = el.style.visibility;
    el.style.visibility = "hidden";
    el.style.display = "block";
    const result = fn();
    el.style.display = prevDisplay;
    el.style.visibility = prevVisibility;
    return result;
  }

  static domOuterWidth(el, includeMargin) { //jQueryの.outerWidth(true)相当
    return OgUtil.measureHidden(el, () => {
      const rect = el.getBoundingClientRect();
      if (!includeMargin) { return rect.width; }
      const cs = getComputedStyle(el);
      return rect.width + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
    });
  }

  static domOuterHeight(el, includeMargin) { //jQueryの.outerHeight(true)相当
    return OgUtil.measureHidden(el, () => {
      const rect = el.getBoundingClientRect();
      if (!includeMargin) { return rect.height; }
      const cs = getComputedStyle(el);
      return rect.height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom);
    });
  }

  //空白区切りの複数クラス名に対応(jQueryの.addClass()/.removeClass()相当)
  static domAddClass(el, classNames)    { el.classList.add(...classNames.split(" ")); }
  static domRemoveClass(el, classNames) { el.classList.remove(...classNames.split(" ")); }

  //CSSのtransition+rAFはページ読み込み直後など未描画の状態だとrAFの発火タイミング次第で
  //アニメーションせず即座に最終状態へ飛んでしまうことがあるため、Web Animations APIで
  //開始状態と終了状態を1回のアニメーションとして確実に実行する
  static domSlideDown(el, duration = 300) { //jQueryの.slideDown()相当
    el.getAnimations().forEach(a => a.cancel()); //連打などで前のslide中アニメーションが残っていたら止める
    OgUtil.domShow(el);
    //offsetHeightはbox-sizingに関係なく実際の描画高さ(content+padding+border)を返すため、
    //アニメーション中だけbox-sizing:border-boxにしてheight指定値とズレないようにする
    //(content-boxのままだとscrollHeight(=content+padding)をheightに指定してしまい、
    //paddingの分だけ実際より大きくなり、終了時にheightを解除すると其の分縮んで見える)
    const height = el.offsetHeight;
    const prevBoxSizing = el.style.boxSizing;
    el.style.boxSizing = "border-box";
    el.style.overflow = "hidden";
    el.style.height = "0px";
    //fill:"forwards"で終了後も最終値を保持させ、onfinish内でcancel()してから
    //スタイルを確定することで、アニメーション終了時に開始前の値へ一瞬戻る
    //チラつきが起きないようにする
    const anim = el.animate([{ height: "0px" }, { height: height + "px" }], { duration, fill: "forwards" });
    anim.onfinish = () => {
      anim.cancel();
      el.style.height = "";
      el.style.overflow = "";
      el.style.boxSizing = prevBoxSizing;
    };
  }

  static domSlideUp(el, duration = 300) { //jQueryの.slideUp()相当
    el.getAnimations().forEach(a => a.cancel()); //連打などで前のslide中アニメーションが残っていたら止める
    const height = el.offsetHeight;
    const prevBoxSizing = el.style.boxSizing;
    el.style.boxSizing = "border-box";
    el.style.overflow = "hidden";
    el.style.height = height + "px";
    const anim = el.animate([{ height: height + "px" }, { height: "0px" }], { duration, fill: "forwards" });
    anim.onfinish = () => {
      anim.cancel();
      OgUtil.domHide(el);
      el.style.height = "";
      el.style.overflow = "";
      el.style.boxSizing = prevBoxSizing;
    };
  }

  static domAnimatePos(el, pos, duration = 300) { //jQueryの.animate({left,top}, duration)相当
    return new Promise(resolve => {
      el.style.transition = `left ${duration}ms, top ${duration}ms`;
      requestAnimationFrame(() => { OgUtil.domSetPos(el, pos); });
      setTimeout(() => {
        el.style.transition = "";
        resolve();
      }, duration);
    });
  }

}
