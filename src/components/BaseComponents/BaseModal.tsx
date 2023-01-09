import BaseButton from "./BaseButton";
import "../../assets/css/BaseModal.css";
import BaseLoader from "./BaseLoader";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: JSX.Element;
  isLoading?: boolean;
}

function BaseModal(props: Props) {
  if (!props.show) return null;
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div>{props.children}</div>
        <div className="modal__btn">
          <BaseButton onClick={props.onClose} size="sm" color="red">
            <>Cancel</>
          </BaseButton>
          <BaseButton onClick={props.onSubmit} size="sm" color="green">
            <>Confirm</>
          </BaseButton>
        </div>
        {props.isLoading ? <BaseLoader size="md" /> : <></>}
      </div>
    </div>
  );
}

export default BaseModal;
