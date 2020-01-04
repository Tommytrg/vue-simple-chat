// This code have been refactored from this stack overflow response:
// https://stackoverflow.com/questions/1181700/set-cursor-position-on-contenteditable-div
const voidNodeTags = [
  'AREA',
  'BASE',
  'BR',
  'COL',
  'EMBED',
  'HR',
  'IMG',
  'INPUT',
  'KEYGEN',
  'LINK',
  'MENUITEM',
  'META',
  'PARAM',
  'SOURCE',
  'TRACK',
  'WBR',
  'BASEFONT',
  'BGSOUND',
  'FRAME',
  'ISINDEX'
]
// TODO(): add correct types
export function setAtEndOfContentEditable (contentEditableElement: any) {
  while (
    getLastChildElement(contentEditableElement) &&
    canContainText(getLastChildElement(contentEditableElement as ChildNode))
  ) {
    contentEditableElement = getLastChildElement(contentEditableElement)
  }

  var range, selection
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange()
    range.selectNodeContents(contentEditableElement)
    range.collapse(false)
    selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
  } else if ((document as any).selection) {
    //IE 8 and lower
    range = (document.body as any).createTextRange()
    range.moveToElementText(contentEditableElement)
    range.collapse(false)
    range.select()
  }
}

function canContainText (node: any) {
  if (node.nodeType == 1) {
    //is an element node
    return !voidNodeTags.includes(node.nodeName)
  } else {
    //is not an element node
    return false
  }
}

function getLastChildElement (el: any) {
  var lc = el.lastChild
  while (lc && lc.nodeType != 1) {
    if (lc.previousSibling) lc = lc.previousSibling
    else break
  }
  return lc
}

export default setAtEndOfContentEditable
