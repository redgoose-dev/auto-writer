function M(r) {
  const t = Math.floor(Math.random() * r.length);
  return r.substring(t, t + 1);
}
function w(r, t = {}) {
  return new Promise((x) => {
    if (t = Object.assign({}, {
      text: "shuffle text",
      // 최종적으로 표시되는 텍스트
      waitChar: "-",
      // 변경되기전에 표시되는 텍스트
      charSpeed: 1,
      // 한번에 바뀌는 글자의 갯수
      moveFix: 25,
      // `waitChar`문자에서 랜덤문자로 바뀔때의 딜레이 시간
      moveRange: 10,
      // 대기문자에서 랜덤 글자로 바뀌는 시간
      moveTrigger: 25,
      // 만들어지는 글자가 랜덤으로 바뀌는 횟수
      fps: 60,
      // speed
      pattern: "abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>",
      // random text pattern
      randomTextType: "unicode",
      // unicode,pattern
      stream: null
      // 실시간 콜백함수
    }, t), t.text = t.text.trim(), !t.text) return x();
    let n = [], l, i, u, d, s = !1, f;
    function g() {
      let a = u.split("").map((e) => ({ t: e }));
      d = !0;
      for (let e = i; e <= l; e++) {
        if (n[e] !== 0 && n[e] != null) {
          d = !1;
          const h = n[e];
          if (Math.abs(h) <= t.moveTrigger) {
            let c = "";
            switch (t.randomTextType) {
              case "pattern":
                c = M(t.pattern);
                break;
              case "unicode":
              default:
                const v = Math.min(Math.max(t.text.charCodeAt(e) + h, 33), 126);
                c = String.fromCharCode(v);
                break;
            }
            a.push({ t: c, m: "new" });
          } else
            a.push({ t: t.waitChar, m: "wait" });
          h > 0 ? n[e] -= 1 : n[e] += 1;
        } else
          i === e - 1 && (i = e, u = t.text.substring(0, i)), a.push({ t: t.text.charAt(e), m: "done" });
        m(a);
      }
      l <= t.text.length ? l += t.charSpeed : s = !0, d && s && y();
    }
    function y() {
      f && clearInterval(f), r && delete r.dataset.id, m(u), x(t.text);
    }
    function m(a) {
      r && (r.textContent = Array.isArray(a) ? a.map((e) => e.t).join("") : a), t.stream && typeof t.stream == "function" && t.stream(Array.isArray(a) ? a : a.split("").map((e) => ({ t: e })));
    }
    r?.dataset.id && (f = parseInt(r.dataset.id)), m(t.waitChar);
    for (let a = 0; a <= t.text.length - 1; a++)
      t.text.charAt(0) !== " " ? n[a] = (t.moveFix + Math.round(Math.random() * t.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : n[a] = 0;
    l = 0, i = 0, u = "", f && clearInterval(f), f = setInterval(g, 1e3 / t.fps), r && (r.dataset.id = f.toString());
  });
}
export {
  w as default
};
