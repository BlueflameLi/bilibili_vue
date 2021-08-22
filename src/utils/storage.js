export default {
    getItem: function (t) {
        try {
            return window.localStorage ? window.localStorage.getItem(t) : null
        } catch (t) {
            return null
        }
    },
    setItem: function (t, e) {
        try {
            window.localStorage && window.localStorage.setItem(t, e)
        } catch (t) {
            return null
        }
    },
    removeItem: function (t) {
        try {
            this.getItem(t) && window.localStorage.removeItem(t)
        } catch (t) {
            return null
        }
    }
}