import COC from '../Core'
import Logger from '../Logger'
import _ from 'lodash'
export default class Objects {
  constructor(obj = {}, clone = false) {
    this.Logger = new Logger('COC Objects Class')
    if (typeof obj !== 'object') {
      this.Logger.Warn(
        'You must initialize the class with an object, Coc will create an empty object for you instead.'
      )
      this.val = {}
      return
    }
    this.val = this.setVal(obj, clone)
  }

  // Getters
  get get() {
    return this.val
  }

  get Keys() {
    return Object.keys(this.val)
  }

  setVal(val = {}, clone = false) {
    return clone ? _.cloneDeep(val) : val
  }

  // Methods And Voids
  FilterObjects(...args) {
    if (!this.val) {
      return new Arrays([])
    }
    return COC.FilterObjectOfObjects(this.val, args[0])
  }

  Mix(object) {
    const mixins = object
    Object.keys(mixins).forEach(i => {
      if (this.val[i] !== undefined) {
        if (typeof mixins[i] === 'object') {
          Object.keys(mixins[i]).forEach(j => {
            this.val[i][j] = mixins[i][j]
          })
        } else this.val[i] = mixins[i]
      }
    })
    return this
  }

  MixAndCreate(object) {
    const mixins = object
    if (typeof mixins !== 'object') {
      COC.DevWarn({
        message: `The object you want to mix is ${typeof mixins}, we cant mix an object with such data.`,
        component: 'COC Objects <Mix And Create>'
      })
      return
    }
    Object.keys(mixins).forEach(i => {
      if (mixins[i] && typeof mixins[i] === 'object') {
        Object.keys(mixins[i]).forEach(j => {
          if (!this.val[i]) {
            this.val[i] = {}
          }
          this.val[i][j] = mixins[i][j]
        })
      } else this.val[i] = mixins[i]
    })
    return this
  }
}
