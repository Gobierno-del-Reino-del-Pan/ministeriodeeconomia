import LpbLayout from './Layout';
import TabEmpresa from './tabs/Empresa';

export default function LpbEmpresa() {
  return (
    <LpbLayout>
      {({ user, economy }) => <TabEmpresa economy={economy} user={user} />}
    </LpbLayout>
  );
}
