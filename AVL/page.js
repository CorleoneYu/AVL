let AVLtree1 = new AVL(null);
let AVLtree2 = new AVL(null);
//合并的树
let AVLtree3 = new AVL(null);

// 获取元素
// 用来渲染到页面
let container = document.getElementsByClassName('container');
let tips = document.getElementsByClassName('tips');

function initTips() {
    for(let i=0; i<tips.length; i++) {
        tips[i].innerHTML = '';
    }
}
container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
//赋值按钮点击事件
//树一
let createBtn = $('#tree1-create-btn');
let serachBtn = $('#tree1-search-btn');
let insertBtn = $('#tree1-insert-btn');
let removeBtn = $('#tree1-remove-btn');

//调用AVL接口
//查询
serachBtn.bind('click', function(){
  initTips();
  let num = $('#tree1-search-input').val();
  if( num == '' ) {

    tips[1].innerHTML = '请正确输入';
    return;
  }

  if( AVLtree1.AVLsearch(num) ) {

    tips[1].innerHTML = '查询的' + num + '存在';

  } else {

    tips[1].innerHTML ='查询的' + num + '不存在';
  }
  //重新渲染
  $('#tree1-search-input').val('');
  container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
})

//插入
insertBtn.bind('click', function() {
  initTips();
  let num = $('#tree1-insert-input').val();
  num = parseInt(num);
  if( num == '' ) {
    initTips();
    tips[2].innerHTML = '请正确输入';
    return;
  }

  let result = AVLtree1.AVLinsert(num);

  if( result == 'exist') {
    tips[2].innerHTML = num + '已经存在，不需要插入';

  } else {

    tips[2].innerHTML = '插入' + num + '成功';
  }
  //重新渲染
  $('#tree1-insert-input').val('');
  container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
})

//生成
createBtn.bind('click', function() {
    initTips();
  //重新初始化
  //最好先删除
  AVLtree1.root = null;

  let nums = $('#tree1-create-input').val();
  if( nums == '' ) {
    tips[0].innerHTML = '请正确输入';
    return;
  }

  nums = UTILS.Ary.ToIntAry(nums);

  //记录第一个插入的值
  //let result = AVLtree1.AVLinsert(nums[0]);
  //AVLtree1.root = result;
  for(let i=0; i<nums.length; i++) {
    AVLtree1.AVLinsert(nums[i]);
  }
  tips[0].innerHTML = '生成成功';

  //重新渲染
  $('#tree1-create-input').val('');
  container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
})

//删除
removeBtn.bind('click', function() {
  initTips();
  let num = $('#tree1-remove-input').val();
  if( num == '' ) {
    tips[3].innerHTML = '请正确输入';
    return;
  }

  let result = AVLtree1.AVLremove(num);
  if(  result == 'no-exist') {
    tips[3].innerHTML = num + '不存在，无法删除';

  } else if( result == 'empty'){
    tips[3].innerHTML = '空树';
  } else {
    tips[3].innerHTML = '删除' + num + '成功';
  }
  //重新渲染
  $('#tree1-remove-input').val('');
  container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
})

//树二
let createBtn2 = $('#tree2-create-btn');
let serachBtn2 = $('#tree2-search-btn');
let insertBtn2 = $('#tree2-insert-btn');
let removeBtn2 = $('#tree2-remove-btn');

//调用AVL接口
//查询
serachBtn2.bind('click', function(){
  initTips();
  let num = $('#tree2-search-input').val();
  if( num == '' ) {

    tips[5].innerHTML = '请正确输入';
    return;
  }

  if( AVLtree2.AVLsearch(num) ) {

    tips[5].innerHTML = '查询的' + num + '存在';

  } else {

    tips[5].innerHTML ='查询的' + num + '不存在';
  }
  //重新渲染
  $('#tree2-search-input').val('');
  container[1].innerHTML = UTILS.Tohtml.tree2html(AVLtree2.root);
})

//插入
insertBtn2.bind('click', function() {
  initTips();
  let num = $('#tree2-insert-input').val();
  num = parseInt(num);
  if( num == '' ) {
    initTips();
    tips[6].innerHTML = '请正确输入';
    return;
  }

  let result = AVLtree2.AVLinsert(num);

  if( result == 'exist') {
    tips[6].innerHTML = num + '已经存在，不需要插入';

  } else {

    tips[6].innerHTML = '插入' + num + '成功';
  }
  //重新渲染
  $('#tree2-insert-input').val('');
  container[1].innerHTML = UTILS.Tohtml.tree2html(AVLtree2.root);
})

//生成
createBtn2.bind('click', function() {
    initTips();
  //重新初始化
  //最好先删除
  AVLtree2.root = null;

  let nums = $('#tree2-create-input').val();

  if( nums == '' ) {
    tips[4].innerHTML = '请正确输入';
    return;
  }

  nums = UTILS.Ary.ToIntAry(nums);


  for(let i=0; i<nums.length; i++) {
    AVLtree2.AVLinsert(nums[i]);
  }
  tips[4].innerHTML = '生成成功';

  //重新渲染
  $('#tree2-create-input').val('');
  container[1].innerHTML = UTILS.Tohtml.tree2html(AVLtree2.root);
})

//删除
removeBtn2.bind('click', function() {
  initTips();
  let num = $('#tree2-remove-input').val();
  if( num == '' ) {
    tips[7].innerHTML = '请正确输入';
    return;
  }

  let result = AVLtree2.AVLremove(num);
  if(  result == 'no-exist') {
    tips[7].innerHTML = num + '不存在，无法删除';

  } else if( result == 'empty'){
    tips[7].innerHTML = '空树';
  } else {
    tips[7].innerHTML = '删除' + num + '成功';
  }
  //重新渲染
  $('#tree2-remove-input').val('');
  container[1].innerHTML = UTILS.Tohtml.tree2html(AVLtree2.root);
})

//树3
let mergeBtn = $('#merge-btn');
let divideBtn = $('#divide-btn');


mergeBtn.bind('click', function(){

    AVLtree1.AVLinOrder(function(node){ AVLtree3.AVLinsert(node.val);}, AVLtree3);
    AVLtree2.AVLinOrder(function(node){ AVLtree3.AVLinsert(node.val);},AVLtree3);
    container[2].innerHTML = UTILS.Tohtml.tree2html(AVLtree3.root);
})

divideBtn.bind('click', function(){
    initTips();

    let data = $('#divide-input').val();
    data = parseInt(data);
    console.log(data);

    //如果树三不存在这个值
    if( !AVLtree3.AVLsearch(data) ) {
        tips[9].innerHTML = data + '不存在';
        return;
    }
    //销毁原来的树
    AVLtree1.root = null;
    AVLtree2.root = null;
    AVLtree3.AVLinOrder(function(node) {
        if(node.val > data) {
            AVLtree1.AVLinsert(node.val);
        } else {
            AVLtree2.AVLinsert(node.val);
        }
    })
    tips[9].innerHTML = '分裂成功';
    $('#divide-input').val('');
    container[0].innerHTML = UTILS.Tohtml.tree2html(AVLtree1.root);
    container[1].innerHTML = UTILS.Tohtml.tree2html(AVLtree2.root);
})