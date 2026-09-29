/* Multica 课程共用交互组件：单选题 + 回忆自测
   纯前端，无依赖，可从 file:// 直接打开。 */
(function () {
  "use strict";

  function wireQuiz(box) {
    var answer = box.getAttribute("data-answer");
    var yes = box.getAttribute("data-yes") || "答对了。";
    var no = box.getAttribute("data-no") || "再想一下。";
    var fb = box.querySelector(".fb");
    var buttons = Array.prototype.slice.call(box.querySelectorAll("button.opt"));
    var done = false;

    buttons.forEach(function (btn) {
      if (btn.getAttribute("data-key") === answer) {
        btn.setAttribute("data-correct", "1");
      }
      btn.addEventListener("click", function () {
        if (done) return;
        done = true;
        buttons.forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute("data-correct") === "1") b.classList.add("right");
        });
        var picked = btn.getAttribute("data-key");
        if (picked === answer) {
          if (fb) { fb.textContent = yes; fb.className = "fb ok"; }
        } else {
          btn.classList.add("wrong");
          if (fb) { fb.textContent = no; fb.className = "fb no"; }
        }
      });
    });
  }

  function wireRecall(box) {
    var body = box.querySelector(".recall-body");
    var btn = box.querySelector("button.reveal");
    if (!body || !btn) return;
    body.hidden = true;
    btn.addEventListener("click", function () {
      body.hidden = !body.hidden;
      btn.textContent = body.hidden ? "显示答案" : "收起答案";
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".quiz"), wireQuiz);
    Array.prototype.forEach.call(document.querySelectorAll(".recall"), wireRecall);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
