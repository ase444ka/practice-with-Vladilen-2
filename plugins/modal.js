function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title"></span>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">

        </div>
        <div class="modal-footer">
          <button>Ok</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  `)
  modal.querySelector(".modal-body").innerHTML = options.content || "<p>No content provided</p>"
  modal.querySelector(".modal-title").textContent = options.title || "new modal"
  document.body.appendChild(modal)
  return modal
}

/*
* title: string
* closable: boolean
* content: string
* width: string ('400px')
* destroy(): void
* Окно должно закрываться
* --------------
* setContent(html: string): void | PUBLIC
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
* --------------
* animate.css
* */

let _body =           `<p>Lorem ipsum dolor sit.</p>
<p>Lorem ipsum dolor sit.</p>`
$.modal = function(options) {
  const ANIMATION_SPEED = 200
  const $modal = _createModal(options)
  let closing = false
  

  return {
    open() {
      !closing && $modal.classList.add('open')
    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
      }, ANIMATION_SPEED)
    },
    destroy() {}
  }
}
