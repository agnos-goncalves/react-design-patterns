/*
  Criamos a interface do PaymentCard que agrupo as caracteristicas que 
  todo cartao deve conter
*/
interface PaymentCard {
  total: (products: Product[]) => number;
}

type Product = {
  name: string;
  price: number;
};

/*
  Calcula o total a pagar de uma lista de produtos
  e tambem aplica desconto
*/
function getPriceTotal(products: Product[], discount = 0): number {
  const priceTotal = products.reduce(
    (prevPrice, product) => prevPrice + product.price,
    0
  );
  const discountTotal = priceTotal * (discount / 100);
  return priceTotal - discountTotal;
}

/*
  pagamentos com mastercard possui 10% de desconto
*/
function PaymentMasterCard(): PaymentCard {
  return {
    total: (products: Product[]) => getPriceTotal(products, 10),
  };
}

/*
  pagamentos com visa possui 20% de desconto
 */
function PaymentVisa(): PaymentCard {
  return {
    total: (products: Product[]) => getPriceTotal(products, 20),
  };
}

/*
  Um exemplo onde a bandeira do cartao é visa, podemos de forma
  dinamica e estrategica definir qual metodo de pagamento vamos aplicar.
*/
function Example() {
  const userCardFlag = "Visa";
  const PaymentMethod = {
    Visa: PaymentVisa,
    MasterCard: PaymentMasterCard,
  };
  const products = [
    {
      name: "notebook",
      price: 5600,
    },
    {
      name: "xicara",
      price: 7.5,
    },
    {
      name: "bolsa",
      price: 222,
    },
  ];
  const total = PaymentMethod[userCardFlag]().total(products);
  return <div>Total a pagar: {total}</div>;
}

export default Example;
