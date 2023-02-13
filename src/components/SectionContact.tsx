import React from "react";
import emailjs from "@emailjs/browser";

type Props = {};
type Ref = { ref: React.ForwardedRef<Props> };
type FormData = {
  nameInput: string;
  emailInput: string;
  messageTextarea: string;
};

const SectionContact = React.forwardRef<Props, Ref>((props, ref) => {
  console.log("SectionContact rendered");
  const contactRef = React.useRef<HTMLElement>(null);
  const [formData, setFormData] = React.useState<FormData>({
    nameInput: "",
    emailInput: "",
    messageTextarea: "",
  });
  const [error, setError] = React.useState<{ error: boolean; errorMsg: string }>({
    error: false,
    errorMsg: "",
  });
  const [modal, setModal] = React.useState<boolean>(false);
  const form = React.useRef<HTMLFormElement>(null);
  const [keys, setKeys] = React.useState<{ serviceID: string; templateID: string; publicKey: string }>({
    serviceID: "",
    templateID: "",
    publicKey: "",
  });
  const [timer, setTimer] = React.useState<number>(0);
  const [action, setAction] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  React.useEffect(() => {
    if (keys.publicKey === "") {
      setTimeout(() => {
        fetch("http://localhost:3001/api")
          .then((response) => response.json())
          .then((data) => {
            setKeys({
              serviceID: data.keys.serviceID,
              templateID: data.keys.templateID,
              publicKey: data.keys.publicKey,
            });
          })
          .catch((e) => {
            console.log(e);
            setError({
              error: true,
              errorMsg: e.message,
            });
            setAction((prevAction) => !prevAction);

            if (timer === 0) {
              setTimer(1000);
            }
          });
      }, timer);
    }
  }, [action]);

  React.useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setModal(false);
      }, 3100);
    }
  }, [modal]);

  function handleChange(value: string, name: string): void {
    if (error.error)
      setError({
        error: false,
        errorMsg: "",
      });

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    for (let object of Object.entries(formData)) {
      if (object[1].trim() === "") {
        setError({
          error: true,
          errorMsg: "Fields cannot be empty",
        });
        return;
      } else if (object[0] === "emailInput" && !/\S+@\S+\.\S+/.test(object[1])) {
        setError({
          error: true,
          errorMsg: "Please enter correct email",
        });
        return;
      }
    }

    if (keys.publicKey !== "") {
      emailjs
        .sendForm(keys.serviceID, keys.templateID, form.current as HTMLFormElement, keys.publicKey)
        .then(
          (result) => {
            setFormData({
              nameInput: "",
              emailInput: "",
              messageTextarea: "",
            });
            setModal(true);
            console.log(result.text + ". Email sent");
          },
          (error) => {
            console.log(error.text + ". Email wasn't sent");
          }
        )
        .catch((e) => {
          setError({
            error: true,
            errorMsg: e.message,
          });
        });
    } else {
      setError({
        error: true,
        errorMsg: "NetworkError when attempting to fetch resource.",
      });
    }
  }

  return (
    <section className="section-contact" ref={contactRef}>
      <div className="section-contact__description">
        <h1 className="section-contact__description__title">Contact</h1>
        <p className="section-contact__description__paragraph">
          Please fill in the form and I'll get back to you as soon as possible.
        </p>
      </div>
      <form ref={form} className="section-contact__form" onSubmit={handleSubmit}>
        {error && <span className="section-contact__form__error">{error.errorMsg}</span>}
        <input
          type="text"
          name="nameInput"
          className="section-contact__form__input"
          placeholder="NAME"
          maxLength={50}
          value={formData.nameInput}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <div className="line"></div>
        <input
          type="email"
          name="emailInput"
          className="section-contact__form__input"
          placeholder="EMAIL"
          maxLength={50}
          value={formData.emailInput}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <div className="line"></div>
        <textarea
          className="section-contact__form__input input-message"
          name="messageTextarea"
          placeholder="MESSAGE"
          maxLength={250}
          value={formData.messageTextarea}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        ></textarea>
        <div className="line message"></div>
        <button type="submit" className="section-contact__form__submit-btn" disabled={modal ? true : false}>
          SEND MESSAGE
        </button>
        {modal && (
          <p className="modal">
            Email sent!<i className="fa-regular fa-circle-check modal-icon"></i>
          </p>
        )}
      </form>
    </section>
  );
});
export default SectionContact;
