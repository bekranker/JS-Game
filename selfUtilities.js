function RandomNumber(min, max){
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function RemoveArrayElement(array, element){
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}