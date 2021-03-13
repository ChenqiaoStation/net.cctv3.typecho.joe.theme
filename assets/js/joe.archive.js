/*
 * @Descripttion: 
 * @version: 
 * @Author: Michael Sun @ www.cctv3.net
 * @Date: 2021-03-12 22:11:52
 * @LastEditors: Michael Sun
 * @LastEditTime: 2021-03-13 21:56:18
 */
/* 搜索页面需要用到的JS */
document.addEventListener("DOMContentLoaded", function () {
  /* 激活列表特效 */
  {
    var wow = $(".joe_archive__list").attr("data-wow");
    if (wow !== "off" && wow)
      new WOW({
        boxClass: "wow",
        animateClass: "animated ".concat(wow),
        offset: 0,
        mobile: true,
        live: true,
        scrollContainer: null,
      }).init();
  }
});
