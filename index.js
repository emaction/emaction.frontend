const css = `<style>
#gray-smile:hover{
  border-color: #bbb !important;
}
</style>`
// 插入 style tag
document.head.insertAdjacentHTML("beforeend", css)
document.addEventListener("DOMContentLoaded", () => {
  const emaction = document.getElementById("emaction")
  const reactions_all = ['like']
  // TODO: 读取cookie，获取当前用户已点击的 reaction
  const IClicked = ['like']
  // TODO: 请求接口，获取当前 url 的 reaction 及数量
  const reactions_on_this = { like: 10 }
  // 组织 html
  let html = '<div style="display: flex; gap: 0.375rem;">'
  // 灰脸
  const gray_smile_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" style="fill: #656d76;"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"></path></svg>'
  html += '<div id="gray-smile" style="cursor: pointer; border-radius: 800px; border: 1px solid #d0d7de; width: 16px; height: 16px; background-color: #f6f8fa; padding: 0.25rem;">'
  html += gray_smile_svg
  html += '</div>'
  // reaction 及数量

  // 点击后弹出的
  // 设置 cookie
  html += '</div>'
  emaction.innerHTML = html
})
// 点击事件