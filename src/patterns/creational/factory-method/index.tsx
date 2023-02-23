type ProfileType = "ADMIN" | "BUYER" | "SELLER";

/* 
  nossos componentes definidos por perfil podem ter 
  sua complexidade isolada
*/
const ProfileSeller = () => <h4>seller profile</h4>;
const ProfileBuyer = () => <h4>buyer profile</h4>;
const ProfileAdmin = () => <h4>admin profile</h4>;

/* 
  Usando o tipo do usuario conseguimos criar o componente correto 
  aplicando o conceito de factory method
*/
function ProfileFactory(type: ProfileType) {
  const profilesType: Record<ProfileType, React.FC> = {
    ADMIN: () => <ProfileAdmin />,
    BUYER: () => <ProfileBuyer />,
    SELLER: () => <ProfileSeller />,
  };
  return profilesType[type];
}

/* 
  Agora renderizamos o componente
  nota-se que abstraimos completamante a complexidade de implementacao
*/
function Example() {
  const Profile = ProfileFactory("ADMIN");
  return (
    <div>
      <h3>My Profile</h3>
      <Profile />
    </div>
  );
}
export default Example;
