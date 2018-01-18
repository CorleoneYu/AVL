var UTILS = {};
//添加命名空间
UTILS.namespace = function(str) {
    var arr = str.split("."), o = UTILS;
    for(let i= (arr[0] == 'UTILS') ? 1 : 0; i<arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
}

//html相关
UTILS.namespace('Tohtml');
//将一颗二叉链表表示的二叉树转换为其对应的HTML代码，
//side表示其为左子树还是右子树
//会被添加到其class上
UTILS.Tohtml.tree2html = function(root, side='') {
    if (root) {
      let leaf = !root.left && !root.right
      let both = root.left && root.right
      let onlyLeft = root.left && !root.right
      let onlyRight = !root.left && root.right

      let searched = root.search;
      let inserted = root.insert;
      // <p id="nodeHeight">${root.height}</p>
      return `
        <div class="tree ${side} ${both?'both':''} ${leaf?'leaf':''} ${onlyLeft?'only-has-left':''} ${onlyRight?'only-has-right':''} ${searched?'searched':''} ${inserted?'inserted':''}">
          <span><p id="nodeVal">${root.val}</p></span>
          ${UTILS.Tohtml.tree2html(root.left, 'left')}
          ${UTILS.Tohtml.tree2html(root.right, 'right')}
        </div>
      `
    } else {
      return ''
    }
}

//Ary相关
UTILS.namespace('Ary');
/**
 * 将以空格分隔的数字字符串转换为整形数组
 * 参数为数字字符串
 * 返回整形数组
 */
UTILS.Ary.ToIntAry = function(nums) {
    nums = nums.split(" ");// 在每个空格( )处进行分解。

    nums = nums.map((value)=>{
          return  parseInt(value);
    })
    return nums;
}

