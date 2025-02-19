import { useEffect, useState } from "react";
import { event } from "react-ga";
import { isEmailValid, isMobileValid } from "../utils";
import {
  addContactedInfo,
  resetNewContact,
} from "../redux/contactsus/contactUsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { RAHATANI_BRANCH } from "../utils/constants";
import { Button, Spinner } from "@material-tailwind/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState<string>();
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [subjectError, setSubjectError] = useState(false);
  const [message, setMessage] = useState<string>();
  const [messageError, setMessageError] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const branch = useAppSelector((state: any) => state.website.branch);

  const { loading, error, contactus, newMessage } = useAppSelector(
    (state: any) => state.contactus
  );

  console.log("New Message", newMessage);
  const dispatch = useAppDispatch();

  const addContactUs = () => {
    let isErrorFound = false;
    if (!name || !name.trim()) {
      setNameError(true);
      isErrorFound = true;
    }

    if (!email || !email.trim()) {
      setEmailError("Please enter email id");
      isErrorFound = true;
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter valid email id");
      isErrorFound = true;
    }

    if (!phone || !phone.trim()) {
      setPhoneError("Please enter your mobile number");
      isErrorFound = true;
    } else if (!isMobileValid(phone)) {
      setPhoneError("Please enter valid mobile number");
      isErrorFound = true;
    }

    // if (!message || !message.trim()) {
    //   setMessageError(true);
    //   isErrorFound = true;
    // }

    // if (!subject || !subject.trim()) {
    //   setSubjectError(true);
    //   isErrorFound = true;
    // }

    if (isErrorFound) {
      return;
    }

    const contactBody: any = {
      name: name,
      subject: subject,
      message: message,
      email: email,
      mobile1: phone,
    };
    dispatch(addContactedInfo(contactBody));
  };

  useEffect(() => {
    if (newMessage) {
      console.log("New Messs Effff", newMessage);
      resetAllData();
      dispatch(resetNewContact());
      // toast("Wow so easy !");
      notify();
    }
  }, [newMessage]);

  const notify = () => {
    toast(
      "Thank you for getting in touch, we always try our best to respond as soon as possible, you can expect a reply in at most 48 hours",
      {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );
  };

  const resetAllData = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setPhone("");
  };

  return (
    <>
      {/* <!-- Header Start --> */}
      <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">Contact Us</h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">Contact Us</p>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Contact Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Get In Touch</span>
            </p>
            <h1 className="mb-4 text-4xl text-[#430c07]">
              Contact Us For Any Query
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-7 mb-5">
              <div className="contact-form">
                <div id="success"></div>
                {/* <form name="sentMessage" id="contactForm"> */}
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                    // data-validation-required-message="Please enter your name"
                    onChange={(event: any) => {
                      setName(event.target.value);
                      setNameError(false);
                    }}
                    value={name}
                  />
                  {nameError && (
                    <p className="help-block text-danger text-left text-xs ml-2">
                      Please enter your name
                    </p>
                  )}
                </div>
                <div className="control-group">
                  <input
                    type="phone"
                    className="form-control mt-3"
                    id="phone"
                    placeholder="Your mobile number"
                    required
                    // data-validation-required-message="Please enter your phone"
                    onChange={(event: any) => {
                      if (event.target.value.length <= 10) {
                        setPhone(event.target.value);
                        setPhoneError("");
                      }
                    }}
                    value={phone}
                  />
                  {phoneError && (
                    <p className="help-block text-danger text-left text-xs ml-2">
                      {phoneError}
                    </p>
                  )}
                </div>
                <div className="control-group">
                  <input
                    type="email"
                    className="form-control mt-3"
                    id="email"
                    placeholder="Your email Id"
                    required
                    // data-validation-required-message="Please enter your email"
                    onChange={(event: any) => {
                      setEmail(event.target.value);
                      setEmailError("");
                    }}
                    value={email}
                  />
                  {emailError && (
                    <p className="help-block text-danger text-left text-xs ml-2">
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="control-group">
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="subject"
                    placeholder="Subject"
                    required
                    // data-validation-required-message="Please enter a subject"
                    onChange={(event: any) => {
                      setSubject(event.target.value);
                      setSubjectError(false);
                    }}
                    value={subject}
                  />
                  {subjectError && (
                    <p className="help-block text-danger text-left text-xs ml-2">
                      Please enter subject
                    </p>
                  )}
                </div>
                <div className="control-group">
                  <textarea
                    className="form-control mt-3"
                    rows={6}
                    id="message"
                    placeholder="Message"
                    required
                    // data-validation-required-message="Please enter your message"
                    onChange={(event: any) => {
                      setMessage(event.target.value);
                      setMessageError(false);
                    }}
                    value={message}
                  ></textarea>
                  {messageError && (
                    <p className="help-block text-danger text-left text-xs ml-2">
                      Please enter message
                    </p>
                  )}
                </div>
                <div>
                  {/* <button
                    className="btn py-2 px-4 mt-3 bg-[#e9390d] text-white "
                    type="submit"
                    id="sendMessageButton"
                    onClick={() => addContactUs()}
                  >
                    Send Message
                  </button> */}
                  <Button
                    className="bg-[#e9390d] mt-4"
                    placeholder={undefined}
                    onClick={() => addContactUs()}
                  >
                    Send Message
                  </Button>
                </div>
                {/* </form> */}
              </div>
            </div>
            <div className="col-lg-5 mb-5 text-left">
              <p>
                Let's get this conversation started. Tell us a bit about
                yourself, and we will get in touch as soon as we can.
              </p>
              <div className="flex flex-row mt-2 ">
                <i
                  className="fa fa-map-marker-alt d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{ width: 45, height: 45 }}
                ></i>
                <div className="flex flex-col ml-3">
                  <h5>Address</h5>
                  <p className="w-[300px]">
                    {`${
                      branch === RAHATANI_BRANCH
                        ? "Sr.No. 7/2/1, Jay Malhar Nagar, Lane No.3, Near Maharashtra Bakery, Rahatani Phata, Thergaon, Pune - 411033"
                        : "Sr.No. 319, Sutart Wasti, At Maan Village, Tal. Mulashi, Dist. Pune 411057"
                    }`}
                  </p>
                  {/* <h5>Address</h5>
                  <p>
                    Sr.No. 7/2/1, Jay Malhar Nagar, Lane No.3, Near Maharashtra
                    Bakery, Rahatani Phata, Thergaon, Pune - 411033
                  </p> */}
                </div>
              </div>
              <div className="d-flex mt-2">
                <i
                  className="fa fa-envelope d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{ width: 45, height: 45 }}
                ></i>
                <div className="pl-3">
                  <h5>Email</h5>
                  <p>enquiry@sarasgurukul.com</p>
                </div>
              </div>
              <div className="d-flex mt-2">
                <i
                  className="fa fa-phone-alt d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{ width: 45, height: 45 }}
                ></i>
                <div className="pl-3">
                  <h5>Phone</h5>
                  <p>7249721117/8149768356</p>
                </div>
              </div>
              <div className="d-flex mt-2">
                <i
                  className="far fa-clock d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
                  style={{ width: 45, height: 45 }}
                ></i>
                <div className="pl-3">
                  <h5>Opening Hours</h5>
                  <strong>Sunday - Friday:</strong>
                  <p className="m-0">08:00 AM - 05:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}

      {loading && (
        <div
          className="h-screen w-full bg-blue-gray-200 top-0 absolute z-50 flex flex-col justify-center items-center"
          style={{ backgroundColor: "rgb(0,0,0, 0.3)" }}
        >
          <Spinner className="h-10 w-10" color="blue" />
        </div>
      )}
      <ToastContainer
        toastStyle={{ backgroundColor: "green", color: "white" }}
      />

      {/* {newMessage && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      )} */}
    </>
  );
};

export default Contact;
