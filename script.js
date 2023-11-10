let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let detailBtns = document.querySelectorAll('.detail-btn');

var routeData = [
  {
    route_id: 1,
    cityCN: "伦敦",
    cityEN: "London",
    words:"伦敦City Walk来不",
    pictureUrl: "London.png",
    duration: "一日游",
    originalPrice: "£180.00",
    discountPrice: "£150.00",
    viewPoints: [
                  {
                    viewPoint_id : 1,
                    viewPoint_name: "英国国家美术馆",
                    viewPoint_introduction: "英国的国家美术馆",
                  },
                  {
                    viewPoint_id : 2,
                    viewPoint_name: "自然历史博物馆",
                    viewPoint_introduction: "英国的自然历史博物馆",
                  },
                  {
                    viewPoint_id : 3,
                    viewPoint_name: "维多利亚和阿尔伯特博物馆",
                    viewPoint_introduction: "英国的维多利亚和阿尔伯特博物馆",
                  },
                  {
                    viewPoint_id : 4,
                    viewPoint_name: "海德公园",
                    viewPoint_introduction: "英国的海德公园",
                  },
                  {
                    viewPoint_id : 5,
                    viewPoint_name: "大英博物馆",
                    viewPoint_introduction: "英国的大英博物馆",
                  },
                ],
  },
  {
    route_id: 2,
    cityCN: "伦敦",
    cityEN: "London",
    words:"伦敦City Walk来不",
    pictureUrl: "London.png",
    duration: "一日游",
    originalPrice: "£180.00",
    discountPrice: "£150.00",
    viewPoints: [
                  {
                    viewPoint_id : 1,
                    viewPoint_name: "LIBERTY",
                    viewPoint_introduction: "英国的LIBERTY",
                  },
                  {
                    viewPoint_id : 2,
                    viewPoint_name: "锦城小巷",
                    viewPoint_introduction: "英国的锦城小巷",
                  },
                  {
                    viewPoint_id : 3,
                    viewPoint_name: "大英博物馆",
                    viewPoint_introduction: "英国的大英博物馆",
                  },
                  {
                    viewPoint_id : 4,
                    viewPoint_name: "伦敦中国城",
                    viewPoint_introduction: "英国的伦敦中国城",
                  },
                ],
  },
  {
    route_id: 3,
    cityCN: "爱丁堡",
    cityEN: "Edingburge",
    words:"城堡为爱守着秘密",
    pictureUrl: "London.png",
    duration: "一日游",
    originalPrice: "£180.00",
    discountPrice: "£150.00",
    viewPoints: [
                  {
                    viewPoint_id : 1,
                    viewPoint_name: "爱丁堡城堡",
                    viewPoint_introduction: "英国的爱丁堡城堡",
                  },
                  {
                    viewPoint_id : 2,
                    viewPoint_name: "亚瑟王座",
                    viewPoint_introduction: "英国的亚瑟王座",
                  },
                  {
                    viewPoint_id : 3,
                    viewPoint_name: "卡尔顿山",
                    viewPoint_introduction: "英国的卡尔顿山",
                  },
                  {
                    viewPoint_id : 4,
                    viewPoint_name: "饭店",
                    viewPoint_introduction: "英国的饭店",
                  },
                ],
  },
];

function appendRoute(data) {
  let routeContainer = document.querySelector(".route-container");
  /*remove previous options*/
  while (routeContainer.firstChild) {
    routeContainer.removeChild(routeContainer.firstChild);
  }
  
  data.forEach(route => {
      let newRoute = document.createElement("div");
      let viewPointsText = ""
      let viewContent = ""
      route.viewPoints.forEach(viewPoint => {
        viewPointsText += `${viewPoint.viewPoint_name} => `

        viewContent += `
                      <div class="route-detail-view">
                        <label>${viewPoint.viewPoint_name}</label>
                        <img src="images/routes/${route.route_id}/${viewPoint.viewPoint_id}-1.png">
                        <img src="images/routes/${route.route_id}/${viewPoint.viewPoint_id}-2.png">
                      </div>
                      `
      })
      viewPointsText = viewPointsText.slice(0,-3);
      newRoute.className = "box";

      let routeContent = `
        <div class="top-row">
          <img src="images/${route.pictureUrl}" alt="">
        </div>
        <div class="content" value="${route.route_id}">
          <h3>${route.cityEN}${route.cityCN}  ${route.duration}</h3>
          <p>${route.words}</p>
          <p>${viewPointsText}</p>
          <div class="price">${route.discountPrice} <span>${route.originalPrice}</span></div>
          
          <div class="route-detail">
            <label>行程路线</label>
            <div class="route-detail-map">
              <img src="images/routes/${route.route_id}/map.png">
            </div>
            <label>景点预览</label>
            <div class="route-detail-view-container">
              ${viewContent}
            </div>
          </div>
          <input type="submit" class="detail-btn" value="了解 更多" onclick="toggleRouteDetail(this)">
        </div>
      `;

      newRoute.innerHTML = routeContent;
      routeContainer.appendChild(newRoute);
  });
};

function appendRouteOption(data) {
  let selectElement = document.querySelector(".routeSelector");
  /*remove previous options*/
  while (selectElement.firstChild) {
      selectElement.removeChild(selectElement.firstChild);    
  }
  /*collect destination*/
  let uniqueRoutes = new Set();
  data.forEach(route =>{
    let searchText = `${route.cityEN}(${route.cityCN})`.toLowerCase();
    uniqueRoutes.add(searchText);
  });
  let sortedRoutes = Array.from(uniqueRoutes).sort();
  let option = document.createElement('option');
  option.value = "";
  option.textContent = "选择您想去的城市";
  selectElement.appendChild(option);
  /*add destination*/
  sortedRoutes.forEach(route => {
    let option = document.createElement('option');
    option.value = route;
    option.textContent = route;
    selectElement.appendChild(option);
  })
};

function searchRoute() {
  let selectElementValue = document.querySelector(".routeSelector").value.toLowerCase();
  let newData = [];
  if (selectElementValue !== "") {
    routeData.forEach(route => {
      let routeText = `${route.cityEN}(${route.cityCN})`.toLowerCase();
      if (routeText === selectElementValue) {
        newData.push(route);
      }
    });
  } else{
    newData = routeData;
  }
  appendRoute(newData);
};

function resetRoute() {
  appendRoute(routeData)
  appendRouteOption(routeData)
};

function toggleRouteDetail(button) {
  const routeDetail = button.previousElementSibling; // 获取按钮前面的 .route-detail 元素
  if (routeDetail.style.display === 'block') {
    routeDetail.style.display = 'none'; // 如果可见，隐藏它
    button.value = '了解更多';
  } else {
    routeDetail.style.display = 'block'; // 如果隐藏，显示它
    button.value = '隐藏内容'; // 修改按钮文本为 "隐藏内容"
  }

}

appendRoute(routeData)
appendRouteOption(routeData)

window.onscroll = () =>{
  searchBtn.classList.remove('el-icon-close');
  searchBar.classList.remove('active');
  menu.classList.remove('el-icon-close');
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
}

searchBtn.addEventListener('click', () =>{
  searchBtn.classList.toggle('el-icon-close');
  searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
  loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
  loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
  btn.addEventListener('click', ()=>{
      document.querySelector('.controls .active').classList.remove('active');
      btn.classList.add('active');
      let src = btn.getAttribute('data-src');
      document.querySelector('#video-slider').src = src;
  });
});

var swiper1 = new Swiper(".review-slider", {
  spaceBetween: 10,
  loop:true,
  autoplay: {
      delay: 2500,
      disableOnInteraction: false,
  },
  breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
  },
});

var swiper2 = new Swiper(".brand-slider", {
  spaceBetween: 20,
  loop:true,
  autoplay: {
      delay: 2500,
      disableOnInteraction: false,
  },
  breakpoints: {
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
});

menu.addEventListener('click', () =>{
menu.classList.toggle('fa-times');
navbar.classList.toggle('active');
});


