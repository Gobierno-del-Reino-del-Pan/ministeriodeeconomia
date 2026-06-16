import LpbLayout from './Layout';
import TabTransferencia from './tabs/Transferencia';

export default function LpbTransferencia() {
  return (
    <LpbLayout>
      {({ user, economy }) => <TabTransferencia senderDiscordId={user.discord_id} bank={economy?.bank ?? 0} />}
    </LpbLayout>
  );
}