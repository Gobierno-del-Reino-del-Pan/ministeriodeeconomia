import LpbLayout from './Layout';
import TabTransferencia from './tabs/Transferencia';

export default function LpbTransferencia() {
  return (
    <LpbLayout>
      {({ user, economy }) => <TabTransferencia senderDiscordId={user.discord_id} cash={economy?.cash ?? 0} />}
    </LpbLayout>
  );
}