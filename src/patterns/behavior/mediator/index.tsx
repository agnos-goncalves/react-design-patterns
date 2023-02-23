import React, { useEffect, useState } from "react";
/**
  Criamos as interfaces do nosso Mediador de compras
*/
const enum Events {
  ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART",
}
interface Mediator {
  subscribe(event: Events, callback: Function): void;
  unsubscribe(event: Events, callback: Function): void;
  notify(event: Events, data: unknown): void;
}
type MediatorState = {
  [key: string]: Function[];
};

type Product = {
  name: string;
  price: number;
};

/**
  Criamos nosso Mediador de compras
  ele vai ser responsavel por notificar, inscrever, desinscrever,
  e interceptar os eventos relacionados a compra de produtos
 */
function MediatorPurchase(): Mediator {
  const [subscribers, setSubscribers] = useState<MediatorState>({});

  // inscreve assinantes(funcao)
  function subscribe(event: string, callback: Function) {
    setSubscribers((prevState) => ({
      ...prevState,
      [event]: [...(prevState[event] || []), callback],
    }));
  }

  // desinscrever assinantes(funcao)
  function unsubscribe(event: string, callback: Function) {
    setSubscribers((prevState) => ({
      ...prevState,
      [event]: prevState[event].filter((subscriber) => subscriber !== callback),
    }));
  }
  // notifica os incritos quando evento é disparado
  function notify(event: string, data: unknown) {
    if (subscribers[event]) {
      subscribers[event].forEach((subscriber) => subscriber(data));
    }
  }

  return {
    subscribe,
    unsubscribe,
    notify,
  };
}
type CartProps = {
  mediator: Mediator;
};

/**
  Sempre que o evento de adicionar produto ao carrinho
  é disparado, nosso Cart é notificado e logo em seguida
  ele adiciona esse produto na lista
 */
function Cart(props: CartProps) {
  const { mediator } = props;
  const [products, setProducts] = useState<Product[]>([]);
  function updateListProducts(product: Product) {
    setProducts([...products, product]);
  }
  useEffect(() => {
    mediator.subscribe(Events.ADD_PRODUCT_TO_CART, updateListProducts);
    return () =>
      mediator.unsubscribe(Events.ADD_PRODUCT_TO_CART, updateListProducts);
  }, [products]);

  return (
    <ul>
      {products.map((product, index) => (
        <li key={index + 1}>{product.name}</li>
      ))}
    </ul>
  );
}

type ProductShelfProps = {
  mediator: Mediator;
};
/** 
  Nosso componente é um produto de prateleira 
  que dispara o evento de adicionar produto
*/
function ProductShelf(props: ProductShelfProps) {
  const { mediator } = props;
  const product = { name: "my product", price: 240 };
  const addProductToCart = () =>
    mediator.notify(Events.ADD_PRODUCT_TO_CART, product);
  return (
    <div>
      <h4>{product.name}</h4>
      <button onClick={addProductToCart}>add cart</button>
    </div>
  );
}

function Example() {
  const mediatorPurchase = MediatorPurchase();
  return (
    <div>
      <ProductShelf mediator={mediatorPurchase} />
      <Cart mediator={mediatorPurchase} />
    </div>
  );
}
export default Example;
