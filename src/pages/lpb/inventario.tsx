import LpbLayout from './Layout';
import TabInventario from './tabs/Inventario';

export default function LpbInventario() {
  return (
    <LpbLayout>
      {({ user, economy }) => <TabInventario economy={economy} user={user} />}
    </LpbLayout>
  );
}
