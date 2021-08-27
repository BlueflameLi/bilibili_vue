import {
    debounce
} from 'lodash'

import {
    getFramePreview,
    getDanmu
} from '@/api'

// import {
//     trimHttp
// } from '../utils/format'

export default {
    install(Vue) {
        Vue.directive(
            'framepreview', {
                bind(element, binding) {
                    var aid = binding.value

                    if (aid && "number" == typeof aid) {
                        var entered = false
                        var first = true
                        var framePreview = null
                        var fpbarBox = null
                        var span = null
                        var frameData = {}

                        element.addEventListener('mouseenter', function () {
                            entered = true
                            debounce(() => {
                                if (entered) {
                                    if (first) {
                                        first = false
                                        framePreview = document.createElement("div")
                                        fpbarBox = document.createElement("div")
                                        span = document.createElement("span")

                                        framePreview.className = "van-framepreview"
                                        fpbarBox.className = "van-fpbar-box"
                                        span.style.backgroundPosition = "0 10px"

                                        fpbarBox.appendChild(span)
                                        framePreview.appendChild(fpbarBox)
                                        element.appendChild(framePreview)

                                        getFramePreview(aid).then(
                                            response => {
                                                frameData = response.data
                                                framePreview.style.backgroundImage = `url(${frameData.image[0]+'@85q.webp'})`
                                                setFramePosition(0)
                                            }
                                        )
                                    }
                                }
                            }, 350)()
                            if (framePreview)
                                framePreview.style.opacity = 1
                        })

                        element.addEventListener("mouseleave", function () {
                            entered = false
                            if (framePreview)
                                framePreview.style.opacity = 0
                        })
                        element.addEventListener("mousemove", function (event) {
                            frameData.index && entered && setFramePosition(event.layerX)
                        })
                    }

                    function setFramePosition(pos) {
                        var n = frameData.index.length,
                            elWidth = element.offsetWidth,
                            sale = frameData.img_y_size / frameData.img_x_size * elWidth,
                            widthr = Math.floor(pos / elWidth * 100),
                            bgSize = elWidth * frameData.img_x_len,
                            index = Math.floor(pos / elWidth * n),
                            xpos = -index % frameData.img_x_len * elWidth,
                            ypos = -Math.floor(index / frameData.img_x_len) * sale + 10;
                        framePreview.style.backgroundPosition = xpos + "px " + ypos + "px"
                        framePreview.style.backgroundSize = bgSize + "px"
                        span.style.width = widthr + "%"
                    }
                }
            })

        Vue.directive(
            'danmu', {
                bind(element, binding) {
                    var aid = binding.value

                    if (aid && "number" == typeof aid) {
                        var entered = false
                        var first = true
                        var length = 0
                        var danmu = null
                        var danmuList = []
                        var timer = 0
                        var index = 0
                        element.addEventListener('mouseenter', function () {
                            entered = true
                            debounce(() => {
                                if (entered) {
                                    if (first) {
                                        first = false

                                        getDanmu(aid).then(
                                            response => {
                                                let danmuData = response.data
                                                length = danmuData.length

                                                danmu = document.createElement("div")
                                                danmu.className = "van-danmu"

                                                for (let i = 0; i < length; i++) {
                                                    let danmuItem = document.createElement("span")
                                                    danmuItem.className = "van-danmu-item" + (i % 2 ? " row2" : "")
                                                    danmuItem.innerHTML = danmuData[i]
                                                    danmu.appendChild(danmuItem)
                                                    danmuList.push(danmuItem)
                                                }
                                                element.appendChild(danmu)
                                                danmu.style.opacity = entered ? 1 : 0

                                                if (length > 0)
                                                    setDanmu()
                                            })

                                    } else
                                        setDanmu()

                                    danmu && (danmu.style.opacity = 1)
                                }
                            }, 350)()
                        })

                        element.addEventListener("mouseleave", (function () {
                            entered = false,
                                danmu && (danmu.style.opacity = 0)
                        }))
                    }

                    function setDanmu() {
                        timer = setTimeout(() => {
                            clearTimeout(timer)
                            timer = null

                            if (danmuList[index]) {
                                let t = Math.floor(2e3 * Math.random() + 3e3)
                                danmuList[index].style.transition = "transform " + t / 1e3 + "s linear"
                                danmuList[index].style.transform = "translateX(" + (-danmuList[index].offsetWidth - danmuList[index].parentElement.offsetWidth) + "px)"

                                let cindex = index
                                danmuList[cindex].timeout = setTimeout(() => {
                                    clearTimeout(danmuList[cindex].timeout)
                                    danmuList[cindex].style.transition = ""
                                    danmuList[cindex].style.transform = "translateX(0)"
                                }, t)

                                index = (index + 1) % length
                                entered && setDanmu()
                            }
                        }, 1500)
                    }
                }
            })
    }
}