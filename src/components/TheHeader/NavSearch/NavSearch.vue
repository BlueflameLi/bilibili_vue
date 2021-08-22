<template>
    <div class="nav-search-box" v-clickoutside="clickoutside">
        <div class="nav-search">
            <form id="nav_searchform">
                <input
                    :value="navSearchData.keyword"
                    @input="changeSearchKeyword"
                    type="text"
                    autocomplete="off"
                    accesskey="s"
                    class="nav-search-keyword"
                    :placeholder="navSearchData.default.name"
                    @keydown.enter="search"
                    @keydown.up.prevent="itemSelect(navSearchData.itemSelectIndex - 1)"
                    @keydown.down.prevent="itemSelect(navSearchData.itemSelectIndex + 1)"
                    @focus="navSearchData.isActivate = true"
                />
                <div class="nav-search-btn" @click="search">
                    <button
                        type="button"
                        class="bilifont bili-icon_dingdao_sousuo nav-search-submit"
                    ></button>
                </div>
            </form>
            <ul v-if="isShowSearchSuggest" id="search-suggest" class="search-suggest">
                <li
                    v-for="(item,index) in navSearchData.suggest"
                    :key="index"
                    class="suggest-item"
                    :class="index == navSearchData.itemSelectIndex ? 'selected' : ''"
                    @click.prevent="search"
                >
                    <a
                        :href="'//search.bilibili.com/all?keyword=' + item.value"
                        target="_blank"
                        v-html="item.name"
                    ></a>
                </li>
            </ul>
            <ul v-if="isShowSearchHistory" id="search-history" class="search-history">
                <li
                    v-for="(item,index) in navSearchData.searchHistory"
                    :key="index"
                    class="history-item"
                    :class="index == navSearchData.itemSelectIndex ? 'selected' : ''"
                >
                    <a :href="'//search.bilibili.com/all?keyword=' + item.value">{{ item.value }}</a>
                    <i
                        class="bilifont bili-icon_sousuo_yichu"
                        @click="navSearchData.searchHistory.splice(index, 1)"
                    ></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getSuggest, getSearchDefault } from '@/api'
import localStorage from '@/utils/storage'
export default {
    name: 'NavSearch',
    data() {
        return {
            navSearchData: {
                default: {
                    name: '',
                    url: ''
                },
                keyword: '',
                searchHistory: JSON.parse(localStorage.getItem('search_history')) || [],
                suggest: [],
                isActivate: false,
                itemSelectIndex: -1
            },

        }
    },
    computed: {
        isShowSearchSuggest() {
            return this.navSearchData.suggest.length && this.navSearchData.isActivate
        },
        isShowSearchHistory() {
            return this.navSearchData.searchHistory.length && this.navSearchData.isActivate && !this.isShowSearchSuggest
        },
    },
    methods: {
        setSearchDefault() {
            getSearchDefault().then(
                response => {
                    this.navSearchData.default.name = response.data.show_name
                    this.navSearchData.default.url = response.data.url
                })
        },
        setSuggest() {
            this.navSearchData.itemSelectIndex = -1
            getSuggest(this.navSearchData.keyword).then(
                response => {
                    this.navSearchData.suggest = Object.values(response)
                })
        },
        changeSearchKeyword(event) {
            this.navSearchData.keyword = event.target.value

            this.setSuggest()
        },
        addSearchHistory(keyword) {
            if (this.navSearchData.searchHistory.findIndex(function (obj) {
                return obj.value == keyword
            }) == -1) {
                this.navSearchData.searchHistory.unshift(
                    { value: keyword, timestamp: Date.now() }
                )
                if (this.navSearchData.searchHistory.length > 10)
                    this.navSearchData.searchHistory.pop()
            }
        },
        search() {
            if (this.navSearchData.keyword) {
                let { keyword } = this.navSearchData
                window.open('https://search.bilibili.com/all?keyword=' + keyword, "_blank")
                this.addSearchHistory(keyword)
                if (this.navSearchData.itemSelectIndex != -1)
                    this.setSuggest()
            }
            else
                window.open(this.navSearchData.default.url, "_blank")
            return false
        },
        clickoutside() {
            this.navSearchData.isActivate = false;
        },
        itemSelect(index) {
            if (this.isShowSearchSuggest) {
                if (index < 0)
                    this.navSearchData.itemSelectIndex = 0
                else if (index >= this.navSearchData.suggest.length)
                    this.navSearchData.itemSelectIndex = this.navSearchData.suggest.length - 1
                else
                    this.navSearchData.itemSelectIndex = index
                this.navSearchData.keyword = this.navSearchData.suggest[this.navSearchData.itemSelectIndex].value
            }
            else if (this.isShowSearchHistory) {
                if (!this.isShowSearchHistory) return
                if (index < 0)
                    this.navSearchData.itemSelectIndex = 0
                else if (index >= this.navSearchData.searchHistory.length)
                    this.navSearchData.itemSelectIndex = this.navSearchData.searchHistory.length - 1
                else
                    this.navSearchData.itemSelectIndex = index
                this.navSearchData.keyword = this.navSearchData.searchHistory[this.navSearchData.itemSelectIndex].value
            }
            else
                return
        },

    },
    watch: {
        'navSearchData.searchHistory'(value) {
            localStorage.setItem('search_history', JSON.stringify(value))
        },
    },
    mounted() {
        this.setSearchDefault()
    },
}
</script>
<style>
/* 顶部搜索框 */
.nav-search-box {
    margin: 0 10px;
    width: 500px;
    transition: width 0.3s;
}

@media screen and (max-width: 1190px) {
    .nav-search-box {
        display: none;
    }
}

.nav-search #nav_searchform {
    display: block;
    padding: 0 38px 0 16px;
    border: 1px solid hsla(0, 0%, 100%, 0);
    border-radius: 2px;
    background-color: #fff;
}

.nav-search .nav-search-keyword {
    overflow: hidden;
    width: 100%;
    height: 34px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    color: #999;
    font-size: 14px;
    line-height: 34px;
    transition: all 0.2s;
}

.nav-search .nav-search-keyword:focus {
    color: #222;
}

.nav-search .nav-search-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    width: 48px;
    height: 36px;
    border: none;
    border-radius: 2px;
    background: #e7e7e7;
    line-height: 26px;
    cursor: pointer;
}

.nav-search .nav-search-submit {
    position: absolute;
    top: 8px;
    right: 16px;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: #505050;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
}

.nav-search-btn:hover .nav-search-submit {
    color: #1890ff;
}

.international-header .mini-type .nav-search #nav_searchform,
.van-popover .mini-type .nav-search #nav_searchform {
    background: #f4f4f4;
    border: 1px solid #e7e7e7;
}

/* 顶部搜索建议 */
.search-suggest {
    position: absolute;
    width: 100%;
    border: 1px solid #e5e9ef;
    margin-top: 1px;
    background: #fff;
    z-index: 99999;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
    padding: 10px 0;
    font-size: 14px;
}

.search-suggest .suggest-item {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    display: block;
    color: #222;
    position: relative;
    transition: 0.2 ease;
}

.search-suggest .selected,
.search-suggest .suggest-item:hover {
    background-color: #f4f4f4;
}

.search-suggest .suggest-item .suggest_high_light {
    font-style: normal;
    color: #f25d8e;
}

/* 顶部搜索历史 */
.search-history {
    position: absolute;
    width: 100%;
    border: 1px solid #e5e9ef;
    margin-top: 1px;
    background: #fff;
    z-index: 99999;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
    padding: 10px 0;
    font-size: 14px;
}

.search-history .history-item {
    padding: 6px 10px 6px 16px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    color: #222;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s ease;
}

.search-history .history-item a {
    width: 100%;
    color: #222;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.search-history .bili-icon_sousuo_yichu {
    color: #999;
}

.search-history .bili-icon_sousuo_yichu:hover {
    color: #00a1d6;
}

.search-history .selected,
.search-history .history-item:hover {
    background-color: #f4f4f4;
}
</style>