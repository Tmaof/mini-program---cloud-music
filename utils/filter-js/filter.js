/**
 * 将多个作者名进行拼接
 * @param list 
 * @param nameKey 
 */
export function getAuthorName(list, nameKey = 'name') {
  const strlist = []
  for (let i = 0; i < list.length; i++) {
    strlist.push(list[i][nameKey])
  }
  return strlist.join('/')
}