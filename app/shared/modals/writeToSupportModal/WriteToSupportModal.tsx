import { PropsModalData, useModal } from "@/app/core/provider/ModalProvider";
import styles from "./writeToSupportModal.module.scss";
import { TextArea } from "../../ui/textArea/TextArea";
import { Button } from "../../ui/button/Button";
import { InputField } from "../../ui/input/InputField";

export const WriteToSupportModal = ({ data }: { data: PropsModalData }) => {
  const { closeModal } = useModal();
  const click = () => closeModal();

  return (
    <form action={click} className={styles.writeToSupportModal}>
      <InputField
        titleText="Пошта для зворотнього звʼязку"
        placeholder="example@email.com"
      />
      <TextArea
        titleText="Повідомлення"
        placeholder="Напишіть ваше повідомлення"
      />

      <Button
        size="lg"
        variant="primary"
        classNameContainer={styles.btn}
        type="submit"
      >
        Відправити
      </Button>
    </form>
  );
};
