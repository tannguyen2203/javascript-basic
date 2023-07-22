const postAPI = "https://6405e6d6eed195a99f902668.mockapi.io/api";

fetch(`${postAPI}/products`)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    var htmls = product.map((product) => {
      return `<li>
              <p>Name: ${product.product_name}</p>
              <p>Price: ${product.list_price}</p>
              <p>Description: ${product.description}</p>
      </li>`;
    });
    var html = htmls.join("");
    document.querySelector("#post-block").innerHTML = html;
  });
