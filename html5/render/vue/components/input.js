import { base, inputCommon } from '../mixins'
import { extend, mapFormEvents } from '../utils'
import { validateStyles } from '../validator'

export default {
  mixins: [base, inputCommon],
  props: {
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return [
          'email', 'number', 'password', 'search', 'tel', 'text', 'url'
          // unsupported type:
          // button, checkbox, color, date, datetime, file, hidden, image,
          // month, radio, range, reset, submit, time, week,
        ].indexOf(value) !== -1
      }
    },
    value: String,
    placeholder: String,
    disabled: {
      type: [String, Boolean],
      default: false
    },
    autofocus: {
      type: [String, Boolean],
      default: false
    },
    maxlength: [String, Number],
    retunrKeytype: String
  },

  render (createElement) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      validateStyles('input', this.$vnode.data && this.$vnode.data.staticStyle)
    }
    const events = extend(this.createEventMap(), mapFormEvents(this))
    return createElement('html:input', {
      attrs: {
        'weex-type': 'input',
        type: this.type,
        value: this.value,
        disabled: (this.disabled !== 'false' && this.disabled !== false),
        autofocus: (this.autofocus !== 'false' && this.autofocus !== false),
        placeholder: this.placeholder,
        maxlength: this.maxlength,
        'returnKeyType': this.returnKeyType
      },
      on: this.createKeyboardEvent(events),
      staticClass: 'weex-input'
    })
  }
}
