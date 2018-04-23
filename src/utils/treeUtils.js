function toTree(list, parent, id, pid) {
  const children = list.filter(item => {
    return item[pid] === parent[id];
  });
  if (children.length !== 0) {
    parent.children = children;
    children.forEach(item => {
      toTree(list, item, id, pid);
    });
  }
}

function getParent(list, id, pid) {
  return list.filter(item => {
    return list.every(obj => {
      return item[pid] !== obj[id];
    });
  });
}

export function list2tree(list, id = 'id', pid = 'parentId') {
  const topList = getParent(list, id, pid);
  topList.forEach(item => toTree(list, item, id, pid));
  return topList;
}

export function findChildren(pid, list) {
  const tree = findTreeNode(pid, list2tree(list));
  if (tree) {
    return tree.children;
  } else {
    return [];
  }
}

function findTreeNode(treeId, treeList) {
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].id === treeId) {
      return treeList[i];
    } else {
      if(treeList[i].children&&treeList[i].children.length>0){
        const treeNode = findTreeNode(treeId, treeList[i].children);
        if(treeNode){
          return treeNode;
        }
      }
    }
  }
  return null;
}
