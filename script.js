function createCard(product, productIndex, container, sorted) {
  let labels = '',
      card,
      imgSrc,
      oldPrice = '',
      price,
      sizes,
      colors;

  imgSrc = 'assets/pictures/product' + productIndex + '/' + product.images[0];

  if (product.labels.new) labels = '<div class="label">NEW</div>';

  if (product.labels.sale) {
    labels += '<div class="label discount">- ' + product.labels.sale + '%</div>'
  };

  if (product.oldPrice) {
    oldPrice =
      '<div class="price old-price">' +
        number_format(product.oldPrice, 0, '', ' ') +
      '</div>'
  };

  price =
    '<div class="price ' +
      (oldPrice == '' ? '">' : 'new-price">') +
      number_format(product.price, 0, '', ' ') +
    '</div>';

  sizes = '<span class="sizes-title uppercase">Размеры: </span>';

  for (let i = 0; i < product.sizes.length; i++) {
    let unavailable = product.sizes[i].available == false ? 'unavailable' : '';

    sizes +=
      '<span class="size ' + unavailable + '">' +
        product.sizes[i].value +
      ' </span>';
  };

  colors = '<span class="colors-title uppercase">Цвета: </span>';

  for (let i = 0; i < product.colors.length; i++) {
    colors +=
      '<div class="color' + (i == 0 ? ' active' : '') + '" ' +
      'data-color="' + product.colors[i] + '"' + '>' +
        '<div class="' + product.colors[i] + '"></div>' +
      '</div>';
  };

  card =
    '<div class="product-card ' + (sorted ? 'expanded' : '') +
    '" data-index="' + productIndex + '"><a>' +
      '<div class="labels">' + labels + '</div>' +
      '<div class="img">' +
        '<img src="' + imgSrc + '">' +
      '</div>' +
      '<div class="main-info">' +
        '<div class="name uppercase">' +
          product.name +
        '</div>' +
        '<div class="article">Арт. ' +
          product.article +
        '</div>' +
        '<div class="price-block">' +
          oldPrice +
          price +
        '</div>' +
      '</div>' +
      '<div class="other-info">' +
        '<div class="sizes">' +
          sizes +
        '</div>' +
        '<div class="colors">' +
          colors +
        '</div>' +
      '</div>' +
    '</a></div>';

  container.append(card);
};

function renderCards(container, filterStore) {
  if (filterStore) {
    let sortable = [];

    for (let i = 0; i < products.length; i++) {
      sortable.push([i, products[i].price]);
    };

    sortable.sort(function(a, b) {
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
    });

    sortable = sortable.map(function(item) {
      return item[0];
    }).slice(0, 3);

    for (let i = 0; i < products.length; i++) {
      if (sortable.indexOf(i) != -1) {
        createCard(products[i], i, container, filterStore);
      };
    };
  } else {
    for (let i = 0; i < products.length; i++) {
      createCard(products[i], i, container);
    };
  };

  $('.color').on('click', function() {
    let colorButton = $(this),
        color = colorButton.attr('data-color'),
        productCard,
        productIndex,
        picture;

    colorButton.addClass('active').siblings().removeClass('active');

    productCard = colorButton.closest('.product-card');

    productIndex = productCard.attr('data-index');

    picture = productCard.find('img');

    picture.attr(
      'src',
      'assets/pictures/product' + productIndex + '/' + color + '.jpg'
    );
  });
};

$(function() {
  const showcase = $('.showcase'),
        filterCheckbox = $('input');

  renderCards(showcase, filterCheckbox.is(':checked'));

  filterCheckbox.change(function() {
    let filterStore = filterCheckbox.is(':checked');

    showcase.empty();

    renderCards(showcase, filterStore);
  });
});
