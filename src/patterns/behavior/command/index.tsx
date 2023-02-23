import { useState } from "react";
/*
  Criamos a interface do pattern command
  uma operacao que pode ser executada 
  e desfeita
*/
interface Command {
  execute: Function;
  undo: Function;
}

type Product = {
  id?: string;
  name: string;
  price: number;
};

/*
  Aqui definimos uma funcao que pode criar um produto 
  e desfazer essa operacao. Em exemplos complexos poderiamos
  até gerenciar um historico de comandos.
*/
function ProductCreateCommand(productDTO: Product): Command {
  /*
    Salvamos um state com dados do produto. Vamos precisar do 
    id para deletar o produto criado
  */
  const [productData, setProductData] = useState<Product>();

  /*
    Criamos o produto e salvamos o response no state
  */
  async function execute() {
    const res = await fetch("my-api/product", {
      method: "POST",
      body: JSON.stringify(productDTO),
    });
    setProductData(await res.json());
  }
  /*
    Deletamos o produto com base no id do produto criado
  */
  function undo() {
    fetch(`my-api/product/${productData?.id}`, {
      method: "DELETE",
    });
  }
  return {
    execute,
    undo,
  };
}

function Example() {
  const command = ProductCreateCommand({ name: "Notebook", price: 5600 });
  return (
    <div>
      <button onClick={command.execute()}>Criar produto</button>
      <button onClick={command.undo()}>Desfazer operacao</button>
    </div>
  );
}

export default Example;
