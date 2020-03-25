export default {
    setStorage (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
          content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
      },
    
      /**
       * get localStorage
       */
    getStorage (name) {
    if (!name) return
    let content = window.localStorage.getItem(name)
    return content
    },
    removeStorage(name){
      window.localStorage.removeItem(name)
    }
}