
    //-------------------------------------------辅助函数-----------------------------------------------
    //更新节点高度，绑定在节点height访问器中
    //被其调用
    function updateHeight(node) {
        if(node == null ) return 0;
        let lh = arguments.callee(node.left);
        let rh = arguments.callee(node.right);

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
      //a.height = getHeight(a);

      c.left = T2; if(T2) T2.parent = c;
      c.right = T3; if(T3) T3.parent = c;
      //c.height = getHeight(c);

      b.left = a; a.parent = b;
      b.right = c; c.parent = b;
      //b.height = getHeight(b);
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
        g.master.root = p;
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
      let lh = updateHeight(node.left);
      let rh = updateHeight(node.right);
      // let lh = node.left.height;
      // let rh = node.right.height;

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
            let lh = updateHeight(nodePtr.left);
            let rh = updateHeight(nodePtr.right);

            if( Math.abs(lh - rh) > 1) {
              //失衡的情况
              //4+3调整
              //调整完之后可以直接break
              console.log('-----rebalance-----');
              rebalance(nodePtr);
              break;
            } else {
              //更新高度
              let upH = updateHeight(nodePtr);
              if( upH == nodePtr.height) break; //不用更新
              nodePtr.height = upH;
            }
            nodePtr = nodePtr.parent;
        }

    }

    //---------------------------------------------------------------------------------------------------
    /**
     * AVL 节点的构造
     * 在插入的时候会用到
     * 所以一般都是传递值还有父节点,还有从属于的AVL
     */
    function AVLNode(val, parent, AVLtree) {
        //封装一下
        this._left = null;
        this._right = null;
        this.val = val;
        this.height = 1;
        this.parent = parent;
        //标记他是哪个AVLtree的节点
        this.master = AVLtree;
        Object.defineProperties(this, {

            //访问器
            left: {
                get: function() {
                    return this._left;
                },
                set: function(node) {
                    //判断一下类型
                    //只允许 AVLNode类型 以及 null
                    if( AVLNode.prototype.isPrototypeOf(node) || node == null ) {

                        this._left = node;
                        this.height = updateHeight(this);
                        return;
                    }
                    console.log('节点左孩子非法设置');
                }
            },
            right: {
                get: function() {
                    return this._right;
                },
                set: function(node) {
                    //判断一下类型
                    //只允许 AVLNode类型 以及 null
                    if( AVLNode.prototype.isPrototypeOf(node) || node == null ) {
                        if(AVLNode.prototype.isPrototypeOf(node)) {
                            console.log('node是AVLNode');
                        }
                        this._right = node;
                        this.height = updateHeight(this);
                        return;
                    }
                    console.log('节点右孩子非法设置');
                }
            }

        })
    }
    AVLNode.prototype = {
        constructor: AVLNode,

    }

    /**
    * AVL树的构造
    * 构造函数模式还有原型模式
    */
    //构造函数
    function AVL(root) {
        this.size = 0;
        this.root = null;
    }
    //原型
    AVL.prototype = {
        constructor: AVL,
        //判空
        AVLisEmpty: function() {
            if(this.root == null ) return true;
            return false;
        },
        //中序遍历
        AVLinOrder: function(visit) {
            inOrder(this.root, visit);
        },
        //前序遍历
        AVLpreOrder: function() {
            preOrder(this.root);
        },
        //查询值
        AVLsearch: function(data) {
            let result =  search(this.root, data);
            if( result == null || result.val != data ) return null;
            return result;

        },
        //插入值
        AVLinsert: function(data) {
            //空树的时候，直接插入
            if(this.root == null ) {
                let node = new AVLNode(data, null,this);
                this.root = node;
                this.size++;
                console.log(this.root);
                console.log('插入空树成功');
                return this.root;
            }
            let result = insert(this.root, data, this);
            if( result != 'exist') {
                this.size++;
            }
            return result;
        },
        //删除值
        AVLremove: function(data) {
            let result = remove(this.root, data);
            if(result != 'no-exist' && result != 'empty') {
                this.size--;
            }
            return result;
        }
    }


    //功能函数
    //中序遍历 参数为AVLNode节点
    function inOrder(node,visit) {
        if(node == null ) return;

        arguments.callee(node.left, visit);
        //obj.visit(node.val);.
        //visit()(node.val);
        visit(node);
        arguments.callee(node.right, visit);

    }
    //先序遍历 参数为AVLNode节点
    function preOrder(node) {
        if(node == null ) return;

        console.log(node.val);
        arguments.callee(node.left);
        arguments.callee(node.right);

    }

    /**
     * 节点值搜索
     * 参数为节点，以及要查找的data
     * 结果：
     * 查找成功则返回节点
     * 失败则返回节点应该在的位置的父节点
     */
    function search(node, data, parent) {

        //如果root为null， 则证明不存在
        if(node == null) {
          console.log(data + '不存在');
          console.log(data + '的父节点为');
          console.log(parent);

          return parent;
        }

        //root.search = true;
        //已经存在该值
        if(node.val == data ) {

          console.log(node);
          console.log(data + '存在');
          return node;
        }

        parent = node;
        //分情况递归进入左右子树
        if(node.val < data) {
          return search(node.right, data, parent);
        } else if(node.val > data) {
          return search(node.left, data, parent);
        }
    }

    /**
   * 插入操作
   * 参数为 树根 即将插入的数据
   * 返回情况
   * 1. 如果节点已经存在， 返回'exist'
   * 2. 节点不存在，构造节点插入，返回此节点
   */
  function insert(root, data, AVLtree) {

    //非空树
    let parent = search(root, data, null);

    //判断是否存在
    if(data == parent.val ) {
      console.log(data + "不需要插入");
      return 'exist';
    }

    //不存在的情况
    let node = new AVLNode(data, parent, AVLtree);

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

      let lh = updateHeight(nodePtr.left);
      let rh = updateHeight(nodePtr.right);

      if( Math.abs(lh - rh) > 1) {
        //失衡的情况
        //4+3调整
        //调整完之后可以直接break
        console.log('-----rebalance-----');
        rebalance(nodePtr);
        break;
      } else {
        //更新高度
        nodePtr.height = updateHeight(nodePtr);
        // if( upH == nodePtr.height) break; //不用更新
        // nodePtr.height = upH;
      }
      nodePtr = nodePtr.parent;
    }

    console.log(parent);
    //node 不为空的情况，返回Node节点
    return node;
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
      //如果next 是左孩子
      if(next == nextParent.left) {
        //next肯定没有左孩子
        nextParent.left = next.right;

      } else if(next == nextParent.right) {
        nextParent.right = next.right;
      }

      //如果next右孩子存在
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

/**
 * AVL 暴露接口
 * 各种遍历 AVLinOrder AVLpreOrder
 * 增 AVLinsert
 * 删 AVLremove
 * 查 AVLsearch
 * 判空 AVLisEmpty
 */