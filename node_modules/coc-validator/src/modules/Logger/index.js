import COC from '../Core'
export default class {
  constructor(component = 'Coc Logger') {
    this.component = component
  }
  get MainStyles() {
    return {
      title: 'font-size : 22px; font-family: monospace;',
      subtitle: 'font-size : 18px; font-family: monospace;',
      message: 'font-size : 12px; font-family: monospace;'
    }
  }
  toColor(color, key) {
    return `${this.MainStyles[key]} color: ${color}`
  }
  // Warning Loggers
  Warn(options) {
    if (
      !process.browser ||
      !window ||
      !COC.Mode ||
      COC.Mode !== 'development'
    ) {
      return
    }
    $nuxt.$Message.warning({
      content: 'There is a Dev Warning in your console'
    })
    console.warn('%cCOC Warining!', this.toColor('orange', 'title'))
    console.warn(
      `%cComponent: ${this.component}`,
      this.toColor('#2196f3', 'subtitle')
    )
    if (typeof options === 'string' || options.message) {
      console.warn(
        `%cMessage : ${
          typeof options === 'string' ? options : options.message
        }`,
        this.toColor('#880e4f', 'message')
      )
    }
    if (options.log) console.log(options.log)
  }

  // Info Loggers

  InfoLog(options) {
    if ($nuxt.$coc.Mode !== 'development') {
      return
    }
    console.log('%cCOC Info Log!', this.toColor('#1565c0', 'title'))
    console.log(
      `%cComponent : ${this.component}`,
      this.toColor('#2196f3', 'subtitle')
    )
    if (options.message) {
      console.log(
        `%cMessage : ${options.message}`,
        this.toColor('#880e4f', 'message')
      )
    }
    if (options.log) console.log(options.log)
    if (options.comments) {
      let i
      for (i = 0; i < options.comments.length; i += 1) {
        console.info(
          `%cComment : ${options.comments[i]}`,
          this.toColor('#757575', 'message')
        )
      }
    }
  }
}
