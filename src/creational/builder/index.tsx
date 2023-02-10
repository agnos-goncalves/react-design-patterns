type UserType = "ADMIN" | "BUYER";
type HeaderProps = {
  userType: UserType;
};

/**
  Criamos nossos componentes que vao ser utilizados
  de acordo com perfil do usuario assim renderizamos 
  somente o necessario 
 */
const LinkMyProducts = () => <a>lista de produtos </a>;
const LinkMyWishList = () => <a>lista de desejos </a>;
const LinkManagerUsers = () => <a>gerenciar usuarios </a>;

/**
  Aqui aplicamos o builder pattern
 */
function MenuBuild() {
  const items: JSX.Element[] = [];
  // Funcao responsavel por criar nosso menu
  const build = () => <nav>{items.map((item) => item)}</nav>;

  // Adiciona partes do nosso menu de forma dinamica
  const addItem = (component: JSX.Element) => {
    items.push(component);
    return {
      addItem,
      build,
    };
  };
  return { addItem, build };
}

function Header({ userType }: HeaderProps): JSX.Element {
  /**
   Adicionando componentes padroes no menu
   esses podem ser acessos por qualquer perfil de usuario
 */
  const Menu = MenuBuild()
    .addItem(<LinkMyProducts />)
    .addItem(<LinkMyWishList />);

  // Nosso usuario admin tem acesso a um recurso exclusivo
  if (userType === "ADMIN") {
    Menu.addItem(<LinkManagerUsers />);
  }
  // aqui montamos o componente final que pode mudar baseado no perfil
  return Menu.build();
}

function Example() {
  return (
    <div>
      <Header userType="ADMIN" />
      <Header userType="BUYER" />
    </div>
  );
}

export default Example;
