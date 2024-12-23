//서버에서 받아온 데이터라고 가정
let data = [
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      price : 130000
    }
  ]; 

let imgPath = ['https://codingapple1.github.io/shop/shoes1.jpg',
    'https://codingapple1.github.io/shop/shoes2.jpg',
    'https://codingapple1.github.io/shop/shoes3.jpg'
];

// 하나를 export 하려면 : export default 변수명;
// 여러개를 export 하려면 : export {변수1, 변수2}
export {data, imgPath};
