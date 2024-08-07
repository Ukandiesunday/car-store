import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import "./Contact.css";
import contact from "../../assets/images/contact.png";
import TextInput from "../../components/textInput/TextInput";
import Button from "../../components/button/Button";
import { messageSchema } from "../../formSchema/schema";
import { useState } from "react";
import { toast } from "react-toastify";
const Contact = () => {
  const [isLoading, setLoading] = useState(false);
  const access_key = process.env.REACT_APP_ACCESS_KEY;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const handleFormSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data);
    try {
      setLoading(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        console.log(json);
        toast.success(
          "We have received your response. Check your mail after 2 mins"
        );
        reset();
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        console.log(error);

        setLoading(false);
      }
    }
  };
  return (
    <div className="contact-wrapper">
      <div className="contact">
        <div className="contact-left">
          <h1>contact us</h1>
          <div className="contact-img-container">
            <img src={contact} alt="" />
          </div>
          <p>
            <i className="ri-map-pin-fill"></i> No.53 Elios Rumoudara
            PortHarcourt
          </p>
          <p>
            <i className="ri-mail-fill"></i>Support: supportdoncars@gmail.com
          </p>
          <p>
            <a
              href="tel:+2349153678691"
              style={{ color: "gold", cursor: "pointer" }}
            >
              <i className="ri-cellphone-fill"></i> HAS A QUESTION?
              :+2349153678691
            </a>
          </p>
        </div>
        <div className="contact-right">
          <div className="form-container">
            <form
              className="form2 form "
              action=""
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <h2>Leave a message </h2>
              <input
                type="hidden"
                {...register("access_key")}
                value={access_key}
              />
              <div className="form-item-container">
                <TextInput
                  register={register("surname")}
                  placeholder={"Surname"}
                  label={"surname"}
                  type={"text"}
                  errorMessage={errors.surname?.message}
                  isError={errors}
                />

                <TextInput
                  register={register("otherNames")}
                  placeholder={"Other names"}
                  label={"Other names"}
                  type={"text"}
                  errorMessage={errors.otherNames?.message}
                  isError={errors}
                />
              </div>

              <div className="form-item-container">
                <TextInput
                  register={register("email")}
                  placeholder={"Email"}
                  label={"email"}
                  type={"text"}
                  errorMessage={errors.email?.message}
                  isError={errors}
                />

                <TextInput
                  register={register("phone")}
                  placeholder={"Phone"}
                  label={"phone"}
                  type={"text"}
                  errorMessage={errors.phone?.message}
                  isError={errors}
                />
              </div>
              <div className="item">
                <textarea
                  {...register("message")}
                  cols={15}
                  rows={10}
                  maxLength={200}
                  id="Message"
                  placeholder="Send a message...."
                ></textarea>
                {errors?.message && (
                  <p className="error">{errors?.message?.message}</p>
                )}
              </div>
              <Button
                type={"submit"}
                disabled={isLoading}
                label={isLoading ? "Processing..." : "Send response"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
