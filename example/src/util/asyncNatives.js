
import nativeFetch from '@system.fetch'

const natives = {
  /**
   * 网络请求
   * @param options
   * @return {Promise}
   */
  async fetch (options) {
    /* eslint-disable no-unused-vars */
    const p1 = new Promise((resolve, reject) => {
      /* eslint-enable no-unused-vars */
      options.success = function (data, code) {
        resolve({ data, code })
      }
      options.fail = function (data, code) {
        resolve({ data, code })
      }
      nativeFetch.fetch(options)
    })
    return p1
  }
}

export {
  natives
}
