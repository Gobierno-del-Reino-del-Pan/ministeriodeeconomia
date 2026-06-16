import LpbLayout from './Layout';
import TabCuenta from './tabs/Cuenta';

export default function LpbCuenta() {
  return (
    <LpbLayout>
      {({ user, economy }) => <TabCuenta economy={economy} user={user} />}
    </LpbLayout>
  );
}