const Confirm = {
  init() {
    const style = `
    <style>
      .confirm {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 10px 15px;
        box-sizing: border-box;
      
        opacity: 0;
        animation-name: confrim---open;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
      
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .confirm--close {
        animation-name: confrim---close;
      }
      
      .confirm__window {
        width: 100%;
        max-width: 600px;
        background: white;
        font-size: 14px;
        font-family: sans-serif;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      
        opacity: 0;
        transform: scale(0.75);
        animation-name: confirm__window---open;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-delay: 0.2s;
      }
      .confirm__titlebar,
      .confirm__content,
      .confirm__buttons {
        padding: 1.25em;
      }
      .confirm__titlebar {
        background-color: #666666;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .confirm__title {
        color: #ffffff;
        font-weight: bold;
        font-size: 1.1em;
      }
      .confirm__close {
        background: none;
        outline: none;
        border: none;
        transform: scale(2.5);
        color: #ffffff;
        transition: color 0.15s;
      }
      
      .confirm__close:hover {
        color: #f44336;
        cursor: pointer;
      }
      .confirm__content {
        line-height: 1.25em;
      }
      .confirm__buttons {
        background-color: #f8f8f8;
        display: flex;
        justify-content: flex-end;
      }
      .confirm__button {
        padding: 0.4em 0.8em;
        border: 2px solid #50aaac;
        border-radius: 5px;
        background: #ffffff;
        color: #50aaac;
        font-weight: bold;
        font-size: 1.1em;
        font-family: sans-serif;
        margin-left: 0.6em;
        cursor: pointer;
        outline: none;
      }
      .confirm__button--fill {
        background: #50aaac;
        color: #ffffff;
      }
      .confirm__button:hover {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      }
      @keyframes confrim---open {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes confrim---close {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      @keyframes confirm__window---open {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>`;

    const template = document.createElement("template");
    template.innerHTML = style;
    document.head.appendChild(template.content);
  },

  open(options) {
    options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onOk: function () {},
        onCancel: function () {},
      },
      options
    );

    const html = `
    <div class="confirm">
      <div class="confirm__window">
        <div class="confirm__titlebar">
          <span class="confirm__title"> ${options.title} </span>
          <button class="confirm__close">&times;</button>
        </div>
        <div class="confirm__content">
        ${options.message} 
        </div>
        <div class="confirm__buttons">
          <button
            class="confirm__button confirm__button--ok confirm__button--fill"
          >
          ${options.okText} 
          </button>
          <button class="confirm__button confirm__button--cancel">
          ${options.cancelText}
          </button>
        </div>
      </div>
    </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = html;

    //ELEMENTS
    const confirmEl = template.content.querySelector(".confirm");
    const btnClose = template.content.querySelector(".confirm__close");
    const btnOk = template.content.querySelector(".confirm__button--ok");
    const btnCancel = template.content.querySelector(
      ".confirm__button--cancel"
    );

    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.onCancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", (e) => {
      options.onOk();
      this._close(confirmEl);
    });

    Array.from([btnClose, btnCancel]).forEach((el) => {
      el.addEventListener("click", (e) => {
        options.onCancel();
        this._close(confirmEl);
      });
    });

    document.body.appendChild(template.content);
  },

  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");

    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  },
};
