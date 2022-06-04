(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{523:function(l,e,i){"use strict";i.r(e);var v=i(6),_=Object(v.a)({},(function(){var l=this,e=l.$createElement,i=l._self._c||e;return i("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[i("h1",{attrs:{id:"flex-布局"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#flex-布局"}},[l._v("#")]),l._v(" flex 布局")]),l._v(" "),i("p",[l._v("flex-container：")]),l._v(" "),i("ul",[i("li",[l._v("display：flex/inline-flex\n"),i("ul",[i("li",[l._v("开启 flex 布局")])])]),l._v(" "),i("li",[l._v("flex-direction\n"),i("ul",[i("li",[l._v("决定主轴的方向")]),l._v(" "),i("li",[l._v("row：主轴从左到右")]),l._v(" "),i("li",[l._v("row-reverse：主轴从右到左")]),l._v(" "),i("li",[l._v("column：主轴从上到下")]),l._v(" "),i("li",[l._v("column：主轴从下到上")])])]),l._v(" "),i("li",[l._v("justify-content\n"),i("ul",[i("li",[l._v("决定主轴上 flex-items 如何排布")]),l._v(" "),i("li",[l._v("flex-start（默认值）：与 main start 对齐")]),l._v(" "),i("li",[l._v("flex-end：与 mian end 对齐")]),l._v(" "),i("li",[l._v("center：居中对齐")]),l._v(" "),i("li",[l._v("space-between：\n"),i("ul",[i("li",[l._v("flex items 之间的距离相等")]),l._v(" "),i("li",[l._v("与 main start 、main end 两端对齐")])])]),l._v(" "),i("li",[l._v("space-evenly：\n"),i("ul",[i("li",[l._v("flex items 之间的距离相等")]),l._v(" "),i("li",[l._v("flex items 与 main start 、main end 之间的距离等于 flex items 之间的距离")])])]),l._v(" "),i("li",[l._v("space-around：\n"),i("ul",[i("li",[l._v("flex items 之间的距离相等")]),l._v(" "),i("li",[l._v("flex items 与 main start、main end 之间的距离等于 flex items 之间距离的一半")])])])])]),l._v(" "),i("li",[l._v("align-items\n"),i("ul",[i("li",[l._v("决定 flex-items 在交叉轴上的对齐方式")]),l._v(" "),i("li",[l._v("normal：在弹性布局中，效果和 stretch 一样")]),l._v(" "),i("li",[l._v("stretch：当 flex items 在 cross axis 方向的 size 为 auto 时，会自动拉伸至填充 flex container")]),l._v(" "),i("li",[l._v("flex-start：与 cross start 对齐")]),l._v(" "),i("li",[l._v("flex-end：与 cross end 对齐")]),l._v(" "),i("li",[l._v("center：居中对齐")]),l._v(" "),i("li",[l._v("baseline：与基准线对齐")])])]),l._v(" "),i("li",[l._v("flex-warp\n"),i("ul",[i("li",[l._v("nowrap（默认）：单行")]),l._v(" "),i("li",[l._v("wrap：多行")]),l._v(" "),i("li",[l._v("wrap-reverse：多行（对比 wrap，cross start 和 cross end 相反")])])]),l._v(" "),i("li",[l._v("flex-flow\n"),i("ul",[i("li",[l._v("flex-direction")]),l._v(" "),i("li",[l._v("flex-wrap")])])]),l._v(" "),i("li",[l._v("align-content\n"),i("ul",[i("li",[l._v("决定多行的 flex-items 在交叉轴上的对齐方式")])])])]),l._v(" "),i("h3",{attrs:{id:"flex-items"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#flex-items"}},[l._v("#")]),l._v(" flex-items")]),l._v(" "),i("ul",[i("li",[l._v("order\n"),i("ul",[i("li",[l._v("决定 flex items 的排布顺序")]),l._v(" "),i("li",[l._v("可以设置任意整数（正整数、负整数、0）值越小就越排在后面")]),l._v(" "),i("li",[l._v("默认值是 0")])])]),l._v(" "),i("li",[l._v("align-self\n"),i("ul",[i("li",[l._v("flex items 可以通过 align-self 覆盖 flex container 设置的 align-items")]),l._v(" "),i("li",[l._v("auto（默认值）：遵从 flex container 的 align-items 设置")]),l._v(" "),i("li",[l._v("效果跟 align-items 一致")])])]),l._v(" "),i("li",[l._v("flex-grow 决定 flex items 如何扩展\n"),i("ul",[i("li",[l._v("可以设置任意非负数字（正小数，正整数，0）默认是 0")]),l._v(" "),i("li",[l._v("当 flex container 在 main axis 方向上有剩余 size 时，flex-grow 属性才会有效")]),l._v(" "),i("li",[l._v("如果所有 flex items 的 flex-grow 总和 sum 超过 1，每个 flex item 扩展的 size 为\n"),i("ul",[i("li",[l._v("flex container 的剩余 size*flex-grow/sum")])])]),l._v(" "),i("li",[l._v("如果所有 flex items 的 flex-grow 总和 sum 不超过 1，每个 flex item 扩展的 size 为\n"),i("ul",[i("li",[l._v("flex container 的剩余 size*flex-grow")])])])])]),l._v(" "),i("li",[l._v("flex-shrink 决定 flex items 如何收缩")]),l._v(" "),i("li",[l._v("flex-basis\n"),i("ul",[i("li",[l._v("用来设置 flex items 在 main axis 方向上的 base size")]),l._v(" "),i("li",[l._v("auto 默认值 具体的宽度数值")])])]),l._v(" "),i("li",[l._v("flex\n"),i("ul",[i("li",[l._v("flex-grow||flex-shrink||flex-basis 的缩写属性")]),l._v(" "),i("li",[l._v("单值语法：值必须为以下其中之一\n"),i("ul",[i("li",[l._v("一个无单位数（<number>）：会被当做<flex-grow>")]),l._v(" "),i("li",[l._v("一个有效的宽度（width）值：会被当做<flex-basis>")]),l._v(" "),i("li",[l._v("关键字 none，auto 或 initial")])])]),l._v(" "),i("li",[l._v("双值语法：第一个值必须为一个无单位数，并且他会被当作<flex-grow>\n"),i("ul",[i("li",[l._v("第二个值必须为以下之一：\n"),i("ul",[i("li",[l._v("一个无单位数：会被当做<flex-shrink>")]),l._v(" "),i("li",[l._v("一个有效的宽度值：会被当做<flex-basis>")])])])])]),l._v(" "),i("li",[l._v("三值语法：\n"),i("ul",[i("li",[l._v("第一个无单位数：会被当做<flex-grow>")]),l._v(" "),i("li",[l._v("第二个无单位数：会被当做<flex-shrink>")]),l._v(" "),i("li",[l._v("第三个有效的宽度值：会被当做<flex-basis>")])])])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);