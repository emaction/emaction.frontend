import { LitElement, css, html } from 'lit';

export class EmojiReaction extends LitElement {
  static properties = {
    showAvailable: {},
    availableArrayString: {},
    availableReactions: { attribute: false },
    endpoint: {},
    reactTargetId: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    #gray-smile:hover {
      border-color: #bbb !important;
    }
    .reaction-not-clicked:hover {
      background-color: #eaeef2;
    }
    .reaction-clicked:hover {
      background-color: #b6e3ff;
    }
    .reaction-clicked {
      background-color: #ddf4ff;
    }
    .available-reaction:hover {
      background-color: #f3f4f6 !important;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.showAvailable = false
    this.availableReactions = []
    this.initReactions()
  }

  async initReactions() {
    let arr_string = this?.availableArrayString
    if (!arr_string) {
      arr_string = '🎇,sparkler;🎉,party-popper;🎊,confetti-ball'
    }
    const arr = arr_string.split(';').map(val => {
      const [emoji, name] = val.split(',')
      return { emoji, name }
    })
    // 初始化 endpoint
    if (!this?.endpoint) {
      this.endpoint = 'https://api.emaction.cool'
    }
    // 请求接口，获取哪些 emoji 有 reaction 数量
    const url_without_hash = window.location.origin + window.location.pathname + window.location.search
    if (!this?.reactTargetId) {
      this.reactTargetId = await this._sha256(url_without_hash)
    }
    const { data: { reactionsGot } } = await fetch(this.endpoint + '/reactions?' + new URLSearchParams({
      targetId: this.reactTargetId,
    }), {
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp?.data || !Array.isArray(resp?.data?.reactionsGot)) {
        throw new Error("获取 reactions 出错！")
      }
      return resp;
    })
    // 获得的 reactions 数量放到 arr 里
    reactionsGot.forEach(reaction => {
      arr.forEach(availableReaction => {
        if (reaction.name === availableReaction.name) {
          availableReaction.count = reaction.count
        }
      });
    });
    // 读取 localStorage，获取当前用户点击过的 emoji
    const storageKey = `meReactedReactions_${this.reactTargetId}`
    const meReactedReactions = JSON.parse(window.localStorage.getItem(storageKey) || "[]")
    // 当前用户点击状态放到 arr
    meReactedReactions.forEach(reaction_name => {
      arr.forEach(availableReaction => {
        if (reaction_name === availableReaction.name) {
          availableReaction.meReacted = true
        }
      })
    })
    // 初始化 avaiableArray
    this.availableReactions = arr
  }

  // Render the UI as a function of component state
  render() {
    return html`
    <!-- container -->
    <div style="display: flex; gap: 0.375rem;">
      <!-- 灰色笑脸 -->
      <div style="position: relative; list-style: none; user-select: none;">
        <div id="gray-smile" @click="${this._showAvailable}"
          style="border-radius: 800px; border: 1px solid #d0d7de; width: 16px; height: 16px; background-color: #f6f8fa; padding: 0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" style="fill: #656d76; cursor: pointer;">
            <path
              d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z">
            </path>
          </svg>
        </div>
        <div style="display: ${this.showAvailable ? 'flex' : 'none'}; user-select: none; position: absolute; top: -3rem; font-size: 0.875rem; background-color: #fff; box-shadow: #8c959f33 0px 8px 24px 0px; border: 1px solid #d0d7de; border-radius: 0.375rem; padding: 0 0.125rem;">
          ${this.availableReactions.map(item => html`
            <span @click=${this._react} data-name="${item.name}" class="available-reaction" style="cursor: pointer; margin: 0.25rem 0.125rem; padding: 0.25rem; background-color: ${item?.meReacted ? '#ddf4ff' : 'fff'}; border-radius: 0.375rem;">${item.emoji}</span>
          `)}
        </div>
      </div>
      ${this.availableReactions.map(item => html`
        <div @click=${this._react} data-name="${item.name}" class="${item.meReacted ? 'reaction-clicked' : 'reaction-not-clicked'}" style="display: ${item?.count && item.count > 0 ? 'flex' : 'none'}; user-select: none; cursor: pointer; color: ${item.meReacted ? '#0969da' : '#656d76'}; justify-content: center; align-items: center; border: 1px solid ${item.meReacted ? '#0969da' : '#d0d7de'}; border-radius: 108px; padding: 0 0.25rem; font-size: 12px;">
          <span style="pointer-events: none;">${item.emoji}</span><span style="padding:0 0.375rem; pointer-events: none;">${item.count}</span>
        </div>
      `)}
    </div>
    `;
  }
  async _react(e) {
    const { name: reaction_name } = e.target.dataset
    const reaction = this.availableReactions.find(ele => ele.name === reaction_name)
    if (!reaction) {
      console.error("未知的 reaction!")
      return
    }
    const cancel = reaction?.meReacted ? true : false
    const count = Math.max(0, reaction?.count ? reaction.count + (cancel ? -1 : 1) : (cancel ? 0 : 1))
    const meReacted = !reaction.meReacted
    this.availableReactions = this.availableReactions.map(val => {
      if (val.name === reaction_name) {
        val.count = count
        val.meReacted = meReacted
      }
      return val
    })
    this.showAvailable = false
    // 请求接口，更新 react 数量
    await fetch(this.endpoint + '/reaction/update?' + new URLSearchParams({
      targetId: this.reactTargetId,
      reaction_name,
      diff: cancel ? -1 : 1
    }), { method: "PATCH"})
    // 更新 localStorage
    const storageKey = `meReactedReactions_${this.reactTargetId}`
    const meReactedReactionsSet = new Set(JSON.parse(window.localStorage.getItem(storageKey) || "[]"))
    if (cancel) {
      meReactedReactionsSet.delete(reaction_name)
    } else {
      meReactedReactionsSet.add(reaction_name)
    }
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(meReactedReactionsSet)))
  }
  _showAvailable(e) {
    e.preventDefault()
    this.showAvailable = !this.showAvailable
  }
  async _sha256(string) {
    return Array.from(new Uint8Array(
      await crypto.subtle.digest('sha-256', new TextEncoder().encode(string))
    ))
      .map(b => b.toString(16).padStart(2, "0")).join("")
  }
}
customElements.define('emoji-reaction', EmojiReaction);
