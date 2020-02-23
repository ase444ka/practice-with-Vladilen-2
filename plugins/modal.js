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
  !options.closable && modal.querySelector(".modal-close").remove();
  options.width && (modal.querySelector('.modal-window').style.width = parseInt(options.width) + "px")
  document.body.appendChild(modal)
  return modal
}

/*

* width: string ('400px')
* destroy(): void

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
      document.body.addEventListener("click", event => {
      let tar = event.target;
      if (tar.className == "modal-overlay" ||
       tar.className == "modal-close" ||
       tar.tagName == "BUTTON" && tar.textContent == "Cancel"
       ) {
        this.close();
      }
      return;
    });
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
