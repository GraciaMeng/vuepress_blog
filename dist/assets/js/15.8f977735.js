(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{521:function(l,e,i){"use strict";i.r(e);var v=i(6),_=Object(v.a)({},(function(){var l=this,e=l.$createElement,i=l._self._c||e;return i("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[i("h1",{attrs:{id:"flex布局"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#flex布局"}},[l._v("#")]),l._v(" flex布局")]),l._v(" "),i("p",[l._v("flex-container：")]),l._v(" "),i("ul",[i("li",[l._v("display：flex/inline-flex\n"),i("ul",[i("li",[l._v("开启flex布局")])])]),l._v(" "),i("li",[l._v("flex-direction\n"),i("ul",[i("li",[l._v("决定主轴的方向")]),l._v(" "),i("li",[l._v("row：主轴从左到右")]),l._v(" "),i("li",[l._v("row-reverse：主轴从右到左")]),l._v(" "),i("li",[l._v("column：主轴从上到下")]),l._v(" "),i("li",[l._v("column：主轴从下到上")])])]),l._v(" "),i("li",[l._v("justify-content\n"),i("ul",[i("li",[l._v("决定主轴上flex-items如何排布")]),l._v(" "),i("li",[l._v("flex-start（默认值）：与main start对齐")]),l._v(" "),i("li",[l._v("flex-end：与mian end对齐")]),l._v(" "),i("li",[l._v("center：居中对齐")]),l._v(" "),i("li",[l._v("space-between：\n"),i("ul",[i("li",[l._v("flex items之间的距离相等")]),l._v(" "),i("li",[l._v("与main start 、main end两端对齐")])])]),l._v(" "),i("li",[l._v("space-evenly：\n"),i("ul",[i("li",[l._v("flex items 之间的距离相等")]),l._v(" "),i("li",[l._v("flex items 与main start 、main end之间的距离等于flex items之间的距离")])])]),l._v(" "),i("li",[l._v("space-around：\n"),i("ul",[i("li",[l._v("flex items之间的距离相等")]),l._v(" "),i("li",[l._v("flex items 与main start、main end之间的距离等于flex items之间距离的一半")])])])])]),l._v(" "),i("li",[l._v("align-items\n"),i("ul",[i("li",[l._v("决定flex-items在交叉轴上的对齐方式")]),l._v(" "),i("li",[l._v("normal：在弹性布局中，效果和stretch一样")]),l._v(" "),i("li",[l._v("stretch：当flex items在cross axis方向的size为auto时，会自动拉伸至填充flex container")]),l._v(" "),i("li",[l._v("flex-start：与cross start对齐")]),l._v(" "),i("li",[l._v("flex-end：与cross end对齐")]),l._v(" "),i("li",[l._v("center：居中对齐")]),l._v(" "),i("li",[l._v("baseline：与基准线对齐")])])]),l._v(" "),i("li",[l._v("flex-warp\n"),i("ul",[i("li",[l._v("nowrap（默认）：单行")]),l._v(" "),i("li",[l._v("wrap：多行")]),l._v(" "),i("li",[l._v("wrap-reverse：多行（对比wrap，cross start和cross end相反")])])]),l._v(" "),i("li",[l._v("flex-flow\n"),i("ul",[i("li",[l._v("flex-direction")]),l._v(" "),i("li",[l._v("flex-wrap")])])]),l._v(" "),i("li",[l._v("align-content\n"),i("ul",[i("li",[l._v("决定多行的flex-items在交叉轴上的对齐方式")])])])]),l._v(" "),i("h3",{attrs:{id:"flex-items"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#flex-items"}},[l._v("#")]),l._v(" flex-items")]),l._v(" "),i("ul",[i("li",[l._v("order\n"),i("ul",[i("li",[l._v("决定flex items的排布顺序")]),l._v(" "),i("li",[l._v("可以设置任意整数（正整数、负整数、0）值越小就越排在后面")]),l._v(" "),i("li",[l._v("默认值是0")])])]),l._v(" "),i("li",[l._v("align-self\n"),i("ul",[i("li",[l._v("flex items可以通过align-self覆盖flex container设置的align-items")]),l._v(" "),i("li",[l._v("auto（默认值）：遵从flex container的align-items设置")]),l._v(" "),i("li",[l._v("效果跟align-items一致")])])]),l._v(" "),i("li",[l._v("flex-grow决定flex items如何扩展\n"),i("ul",[i("li",[l._v("可以设置任意非负数字（正小数，正整数，0）默认是0")]),l._v(" "),i("li",[l._v("当flex container在main axis方向上有剩余size时，flex-grow属性才会有效")]),l._v(" "),i("li",[l._v("如果所有flex items的flex-grow总和sum超过1，每个flex item扩展的size为\n"),i("ul",[i("li",[l._v("flex container的剩余size*flex-grow/sum")])])]),l._v(" "),i("li",[l._v("如果所有flex items的flex-grow总和sum不超过1，每个flex item扩展的size为\n"),i("ul",[i("li",[l._v("flex container的剩余size*flex-grow")])])])])]),l._v(" "),i("li",[l._v("flex-shrink决定flex items如何收缩")]),l._v(" "),i("li",[l._v("flex-basis\n"),i("ul",[i("li",[l._v("用来设置flex items在main axis方向上的base size")]),l._v(" "),i("li",[l._v("auto默认值 具体的宽度数值")])])]),l._v(" "),i("li",[l._v("flex\n"),i("ul",[i("li",[l._v("flex-grow||flex-shrink||flex-basis的缩写属性")]),l._v(" "),i("li",[l._v("单值语法：值必须为以下其中之一\n"),i("ul",[i("li",[l._v("一个无单位数（"),i("number",[l._v("）：会被当做"),i("flex-grow")],1)],1),l._v(" "),i("li",[l._v("一个有效的宽度（width）值：会被当做"),i("flex-basis")],1),l._v(" "),i("li",[l._v("关键字none，auto或initial")])])]),l._v(" "),i("li",[l._v("双值语法：第一个值必须为一个无单位数，并且他会被当作"),i("flex-grow",[i("ul",[i("li",[l._v("第二个值必须为以下之一：\n"),i("ul",[i("li",[l._v("一个无单位数：会被当做"),i("flex-shrink")],1),l._v(" "),i("li",[l._v("一个有效的宽度值：会被当做"),i("flex-basis")],1)])])])])],1),l._v(" "),i("li",[l._v("三值语法：\n"),i("ul",[i("li",[l._v("第一个无单位数：会被当做"),i("flex-grow")],1),l._v(" "),i("li",[l._v("第二个无单位数：会被当做"),i("flex-shrink")],1),l._v(" "),i("li",[l._v("第三个有效的宽度值：会被当做"),i("flex-basis")],1)])])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);