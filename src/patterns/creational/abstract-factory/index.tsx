/*
  Caracteristicas compartilhas entre nossos componentes
  criamos as interface abaixo para garantir que
  nao vamos criar um componente invalido
*/
interface AbstractProfile {
  style: string;
  type: "ADMIN" | "BUYER" | "SELLER";
  goToProfile: () => void;
}
interface AbstractProfileFactory {
  createProfile: () => AbstractProfile;
}
interface ProfileProps {
  factory: AbstractProfileFactory;
}
/*
  Nossas funcoes fabricas abaixo criam
  componentes que compartilhar caracteristicas
  e garantimos a correta implementacao atraves de 
  interfaces.
*/
const AdminProfileFactory = (): AbstractProfileFactory => ({
  createProfile: () => ({
    style: "profile-admin",
    type: "ADMIN",
    goToProfile: () => location.assign("/perfil/admin"),
  }),
});

const BuyerProfileFactory = (): AbstractProfileFactory => ({
  createProfile: () => ({
    style: "profile-admin",
    type: "BUYER",
    goToProfile: () => location.assign("/perfil/buyer"),
  }),
});

const SellerProfileFactory = (): AbstractProfileFactory => ({
  createProfile: () => ({
    style: "profile-admin",
    type: "SELLER",
    goToProfile: () => location.assign("/perfil/seller"),
  }),
});

/*
  Esse Componente tem a responsabilidade 
  de renderizar o comportamento padrao de qualquer
  componente que compartilhe o comportamento 
  definido nas interfaces
*/
function ProfileUser(props: ProfileProps) {
  const { factory } = props;
  const { style, type, goToProfile } = factory.createProfile();
  return (
    <div className={style}>
      <button onClick={() => goToProfile()}>{type}</button>
    </div>
  );
}
/*
  Agora podemos carregar nossos perfils 
  em qualquer contexto necessario
  Seguindo as interfaces podemos ate criar novos perfis
  com seguranca que nao vamos quebrar o comportamento esperado
*/
function Example() {
  return (
    <div>
      <ProfileUser factory={AdminProfileFactory()} />
      <ProfileUser factory={BuyerProfileFactory()} />
      <ProfileUser factory={SellerProfileFactory()} />
    </div>
  );
}
export default Example;
