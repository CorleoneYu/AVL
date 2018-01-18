
  //将一颗二叉链表表示的二叉树转换为其对应的HTML代码，
  //side表示其为左子树还是右子树
  //会被添加到其class上
  function tree2html(root, side='') {
    if (root) {
      let leaf = !root.left && !root.right
      let both = root.left && root.right
      let onlyLeft = root.left && !root.right
      let onlyRight = !root.left && root.right

      let searched = root.search;
      let inserted = root.insert;
      return `
        <div class="tree ${side} ${both?'both':''} ${leaf?'leaf':''} ${onlyLeft?'only-has-left':''} ${onlyRight?'only-has-right':''} ${searched?'searched':''} ${inserted?'inserted':''}">
          <span><p id="nodeVal">${root.val}</p><p id="nodeHeight">${root.height}</p></span>
          ${tree2html(root.left, 'left')}
          ${tree2html(root.right, 'right')}
        </div>
      `
    } else {
      return ''
    }
  }

  /**
   * 将以空格分隔的数字字符串转换为整形数组
   * 参数为数字字符串
   * 返回整形数组
   */
function ToIntAry(nums) {
  nums = nums.split(" ");// 在每个逗号( )处进行分解。


  nums = nums.map((value)=>{
            return  parseInt(value);
          })

  return nums;
}

  /**
   * 初始化一棵树，返回树根
   */
  function init() {
    //初始化数组
    //let ary = [4,2,7,1,3,5];

    //return ary2tree(ary);
    return null;
  }

  /**
   * 取得节点高度
   * 参数为 结点
   * 返回节点高度
   */
  function getHeight(node) {
    if(node == null ) return 0;

    let lh = getHeight(node.left);
    let rh = getHeight(node.right);

    return lh>rh?lh+1:rh+1;
  }
  /**
   * 3+4重构
   * 参数为排序过的3个节点 4棵子树（也为节点表示）
   * 将参数对应的结构进行调整
   */
  function connect34(a,b,c,T0,T1,T2,T3) {
    a.left = T0; if(T0) T0.parent = a;
    a.right = T1; if(T1) T1.parent = a;
    a.height = getHeight(a);

    c.left = T2; if(T2) T2.parent = c;
    c.right = T3; if(T3) T3.parent = c;
    c.height = getHeight(c);

    b.left = a; a.parent = b;
    b.right = c; c.parent = b;
    b.height = getHeight(b);
  }
  /**
   * 使曾祖父的孩子节点更新为父亲节点
   * 参数 第一个为父亲节点 第二个为祖父节点
   * 差不多这个意思
   * 不用严格要求父亲与祖父有关系
   */
  function pgChange(p, g) {
    //g是根节点
    p.parent = g.parent;
    if( g.parent == null) {
      BSTroot = p;
      return;
    }
    if( g == g.parent.left) {
      g.parent.left = p;
    } else {
      g.parent.right = p;
    }
  }

  /**
   * 调用3+4重构
   */
  function rotateAt(node) {
    p = node.parent; //父亲节点
    g = p.parent; //祖父节点

    //父亲为祖父左孩子
    if( g.left == p) {
      //当前节点为父亲的左孩子
      if( node == p.left) {
        pgChange(p, g);
        return connect34(node,p,g,node.left,node.right,p.right,g.right);
      } else {
        pgChange(node, g);
        return connect34(p,node,g,p.left,node.left,node.right,g.right);
      }
    }
    else {
      if(node == p.right) {
        pgChange(p, g);
        console.log(p);
        return connect34(g, p, node, g.left, p.left, node.left, node.right);
      } else {
        pgChange(node, g);
        return connect34(g, node, p, g.left, node.left, node.right, p.right);
      }
    }

  }
  /**
   * 返回结点个高的孩子
   */
  function tallerChild(node) {
    let lh = getHeight(node.left);
    let rh = getHeight(node.right);

    let taller = lh>rh?node.left:node.right;
    return taller;
  }
  /**
   * 将失衡节点调整平衡
   * 调用rotateAt函数
   * node为失衡节点
   */
  function rebalance(g) {
    let p = tallerChild(g);
    let v = tallerChild(p);
    console.log('失衡节点'+g.val);
    console.log('父亲节点'+p.val);
    console.log('孩子节点'+v.val);
    return rotateAt(v); //对祖孙三代g, p, v做调整
  }
  /**
   * 参数为 树根， 查询的数据， 树根的父节点
   * 返回情况
   * 1. 节点不存在，返回其应该占有位置的父节点
   * 2. 节点存在， 返回节点
   */
  function search(root, data, parent) {

    //如果root为null， 则证明不存在
    if(root == null) {
      console.log(data + '不存在');
      console.log(data + '的父节点为');
      console.log(parent);

      return parent;
    }

    //root.search = true;
    //已经存在该值
    if(root.val == data ) {

      console.log(root);
      console.log(data + '存在');
      return root;
    }

    parent = root;
    //分情况递归进入左右子树
    if(root.val < data) {
      return search(root.right, data, parent);
    } else if(root.val > data) {
      return search(root.left, data, parent);
    }
  }

  /**
   * 插入操作
   * 参数为 树根 即将插入的数据
   * 返回情况
   * 1. 如果节点已经存在， 返回'exist'
   * 2. 节点不存在，构造节点插入，返回此节点
   */
  function insert(root, data) {

    //空树的时候，直接插入
    if(root == null ) {
        let node = {
          val: data,
          parent: null,
          left: null,
          right: null,
          insert: true,
          height: 1
        }
        root = node;
        console.log(root);
        return node;
    }
    let parent = search(root, data, null);

    //判断是否存在
    if(data == parent.val ) {
      console.log(data + "不需要插入");
      return 'exist';
    }

    //不存在的情况
    let node = {
      val: data,
      parent: parent,
      left: null,
      right: null,
      insert: true,
      height: 1
    }
    if(data > parent.val ) {
      console.log('插入右节点');
      parent.right = node;

    } else {
      console.log("插入左节点");
      parent.left = node;
    }

    //node.height = getHeight(node);

    //向上更新 若发现失衡则调整，不失衡则更新高度
    let nodePtr = node.parent;
    while(nodePtr != null ) {
      let lh = getHeight(nodePtr.left);
      let rh = getHeight(nodePtr.right);

      if( Math.abs(lh - rh) > 1) {
        //失衡的情况
        //4+3调整
        //调整完之后可以直接break
        console.log('-----rebalance-----');
        rebalance(nodePtr);
        break;
      } else {
        //更新高度
        let upH = getHeight(nodePtr);
        if( upH == nodePtr.height) break; //不用更新
        nodePtr.height = upH;
      }
      nodePtr = nodePtr.parent;
    }

    console.log(parent);
    //node 不为空的情况，返回Node节点
    return node;
  }

  /**
   * 交换两个节点的值
   */
  function swapeNodesVla(node1, node2) {
    console.log('交换前的值:' + node1.val + '  ' + node2.val);
    let temp = node1.val;
    node1.val = node2.val;
    node2.val = temp;
    console.log('交换的值:' + node1.val + '  ' + node2.val);
  }
  /**
   * 寻找节点的直接后继
   * 用于删除节点功能的函数
   * 参数节点有两个子树
   */
  function nextNode(root) {
    //一定有右子树 直接后继在右子树最左端
    if(root.right != null ) {
      let node = root.right;
      while(node.left != null) {
        node = node.left;
      }
      return node;
    }
  }
  /**
   * 向上遍历判断是否失衡 失衡则调整 不失衡则更新高度
   * 参数为被删除节点
   */
  function removeUpdateBF(node) {
      //父节点被删除一个元素 从父节点开始考察
      let nodePtr = node.parent;

      while( nodePtr != null) {
          let lh = getHeight(nodePtr.left);
          let rh = getHeight(nodePtr.right);

          if( Math.abs(lh - rh) > 1) {
            //失衡的情况
            //4+3调整
            //调整完之后可以直接break
            console.log('-----rebalance-----');
            rebalance(nodePtr);
            break;
          } else {
            //更新高度
            let upH = getHeight(nodePtr);
            if( upH == nodePtr.height) break; //不用更新
            nodePtr.height = upH;
          }
          nodePtr = nodePtr.parent;
      }

  }
  /**
   * 删除节点
   */
  function remove(root, data) {
    let node = search(root, data, null);
    //判断是否空树
    if( node == null ) {
      return 'empty';
    }
    //判断是否存在
    if(data == node.val ) {
      let parent = node.parent;
      //没有子树的话 直接删除
      if(node.left == null && node.right == null ) {
        if( parent.left == node ) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        removeUpdateBF(node);
        return;
      }
      //至多有一棵子树
      if(node.left == null && node.right != null) {
        if( parent.left == node ) {
          parent.left = node.right;
        } else {
          parent.right = node.right;
        }
        node.right.parent = parent;
        removeUpdateBF(node);
        return;
      } else if(node.left != null && node.right == null) {
        if( parent.left == node ) {
          parent.left = node.left;
        } else {
          parent.right = node.left;
        }
        node.left.parent = parent;
        removeUpdateBF(node);
        return;
      }

      //剩下的是 有两棵子树
      //找到后继节点
      let next = nextNode(node);
      //交换值
      swapeNodesVla(next, node);

      let nextParent = next.parent;
      //next肯定是夫妻的左孩子
      //next肯定没有左孩子
      nextParent.left = next.right;
      if(next.right) {
        next.right.parent = nextParent;
      }

      removeUpdateBF(next);

    } else {
      //不存在
      console.log(data + '不存在');
      return 'no-exist';
    }
  }
  // 获取元素
  // 用来渲染到页面
  let container = document.getElementById('container');

  //获得构造的二叉树根节点
  //接下来的一些操作都是对BSTroot作为参数
  let BSTroot = init();

  //赋值按钮点击事件
  let createBtn = $('#create-btn');
  let serachBtn = $('#search-btn');
  let insertBtn = $('#insert-btn');
  let removeBtn = $('#remove-btn');
  //查询
  serachBtn.bind('click', function(){
    let num = $('#search-input').val();
    if( num == '' ) {
      alert('请正确输入');
      return;
    }
    alert('查询' + num);
    if( search(BSTroot, num) ) {
      alert( num + '存在');
    } else {
      alert( num + '不存在');
    }
    //重新渲染
    $('#search-input').val('');
    container.innerHTML = tree2html(BSTroot);
  })

  //插入
  insertBtn.bind('click', function() {
    let num = $('#insert-input').val();
    if( num == '' ) {
      alert('请正确输入');
      return;
    }
    alert('插入' + num);

    let result = insert(BSTroot, num);

    if( result == 'exist') {
      alert(num + '已经存在，不需要插入');
    } else {
      //空树的时候
      //要手动连上
      if(BSTroot == null) {
        BSTroot = result;
      }
      alert(num + '插入成功');
    }
    //重新渲染
    $('#insert-input').val('');
    container.innerHTML = tree2html(BSTroot);
  })

  //生成
  createBtn.bind('click', function() {
    //重新初始化
    //最好先删除
    BSTroot = init();

    let nums = $('#create-input').val();
    if( nums == '' ) {
      alert('请正确输入');
      return;
    }

    nums = ToIntAry(nums);

    //记录第一个插入的值
    let result = insert(BSTroot, nums[0]);
    BSTroot = result;
    for(let i=1; i<nums.length; i++) {
      insert(BSTroot, nums[i]);
    }


    //重新渲染
    $('#insert-input').val('');
    container.innerHTML = tree2html(BSTroot);
  })

  //删除
  removeBtn.bind('click', function() {
    let num = $('#remove-input').val();
    if( num == '' ) {
      alert('请正确输入');
      return;
    }
    alert('删除' + num);

    let result = remove(BSTroot, num);
    if(  result == 'no-exist') {
      alert(num + '不存在，无法删除');

    } else if( result == 'empty'){
      alert('空树');
    } else {
      alert('删除' + num + '成功');
    }
    //重新渲染
    $('#remove-input').val('');
    container.innerHTML = tree2html(BSTroot);
  })