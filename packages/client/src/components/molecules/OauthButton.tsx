import oauthButtonPicture from '../../../public/oauthButton.webp';
import generalAPI from '../../api/fetchTransport/generalApi';
import Button from '../atoms/Button';
import LINKS from '../../constants/links';
import { toast } from 'sonner';

const oauthRedirect = async () => {
  const clientId = await generalAPI.getClientId({
    redirect_uri: LINKS.selfRedirect,
  });
  if ('reason' in clientId) {
    toast.error(clientId.reason);
    return;
  }
  window.location.assign(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId.service_id}&redirect_uri=${LINKS.selfRedirect}`
  );
};

interface OauthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageClass?: string;
}

const OauthButton = (props: OauthButtonProps) => {
  return (
    <Button {...props} onClick={oauthRedirect}>
      <img
        src={oauthButtonPicture}
        alt="Войти с Яндекс ID"
        className={props.imageClass}
      />
    </Button>
  );
};

export default OauthButton;
