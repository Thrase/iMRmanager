/**
 * 代理JSON.parse
 */
export function parseProxy () {
  const rawParse = JSON.parse
  JSON.parse = function (str, defaults) {
    try {
      return rawParse(str)
    }
    catch (err) {
      console.error(`JSON解析失败：${str}, ${err.stack}`)
      return defaults
    }
  }
}

/**
 * 将回调函数绑定到页面对象，页面不可见或者销毁时，不执行回调函数
 */
export function bindPageLC () {
  Function.prototype.bindPage = function (vmInst) {
    const fn = this
    return function () {
      if (!vmInst) {
        throw new Error(`使用错误：请传递VM对象`)
      }
      if (vmInst.$valid && vmInst.$visible) {
        return fn.apply(vmInst, arguments)
      }
      else {
        console.info(`页面不可见或者销毁时，不执行回调函数`)
      }
    }
  }
}

parseProxy()
bindPageLC()
