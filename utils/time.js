export const formatTime = total => {
  const m = ~~(total / 60)
  const s = ~~total % 60
  let ret = ""

  ret += "" + m + ":" + (s < 10 ? "0" : "")
  ret += "" + s
  return ret
}
