import LpbLayout from './Layout';
import TabPrestamos from './tabs/Prestamos';

export default function LpbPrestamos() {
  return (
    <LpbLayout>
      {({ user, prestamos }) => <TabPrestamos prestamos={prestamos} discordId={user.discord_id} />}
    </LpbLayout>
  );
}