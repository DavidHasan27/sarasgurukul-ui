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

const TermsAndCondition = () => {
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
      {/* <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">
            Terms And Conditions
          </h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="/">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">Terms & Conditions</p>
          </div>
        </div>
      </div> */}
      {/* <!-- Header End --> */}

      {/* <!-- Contact Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className=" flex flex-row text-center bg-sub-head-image h-20 items-center justify-center">
            {/* <p className="section-title px-5">
              <span className="px-2">Get In Touch</span>
            </p> */}
            <h1 className="text-4xl text-white mt-3">Terms and Conditions</h1>
          </div>
          <div>
            <div className="w-full flex flex-col  items-start mt-4 mb-4">
              <label className="font-bold">Website Privacy Policy</label>
              <label className="font-normal">
                We are committed to safeguarding the privacy of our website
                visitors; this policy sets out how we will treat your personal
                information
              </label>

              <label className="font-bold mt-4">
                (1) What information do we collect?
              </label>
              <label className="font-normal">
                We may collect, store and use the following kinds of personal
                data:
              </label>

              <label className="font-normal ml-10">
                1. Information about your visits to and use of this website;
              </label>
              <label className="font-normal ml-10">
                2. Information about any transactions carried out between you
                and us on or in relation to this website;
              </label>
              <label className="font-normal ml-10 text-left">
                3. Information that you provide to us for the purpose of
                registering with us, and/or leaving guestbook comments, and/or
                subscribing to our website services and/or email notifications.
              </label>

              <label className="font-bold mt-4">
                (2) Information about website visits
              </label>

              <label className="font-normal text-left">
                We may collect information about your computer and your visits
                to this website such as your IP address, geographical location,
                browser type, referral source, length of visit and number of
                page views. We may use this information in the administration of
                this website, to improve the website's usability, and for
                marketing purposes.
              </label>

              <label className="font-normal text-left">
                We use cookies on this website. A cookie is a text file sent by
                a web server to a web browser, and stored by the browser. The
                text file is then sent back to the server each time the browser
                requests a page from the server. This enables the web server to
                identify and track the web browser.
              </label>

              <label className="font-normal text-left">
                We may send a cookie which may be stored by your browser on your
                computer's hard drive. We may use the information we obtain from
                the cookie in the administration of this website, to improve the
                website's usability and for marketing purposes. We may also use
                that information to recognise your computer when you visit our
                website, and to personalise our website for you.
              </label>

              <label className="font-normal text-left">
                Most browsers allow you to refuse cookies. (For example, in
                Internet Explorer you can refuse all cookies by clicking
                "Tools", "Internet Options", "Privacy", and selecting "Block all
                cookies" using the sliding selector.) This will, however, have a
                negative impact upon the usability of many websites.
              </label>

              <label className="font-bold mt-4">
                (3) Using your personal data
              </label>

              <label className="font-normal text-left">
                Personal data submitted to this website will be used for the
                purposes specified in this privacy policy or in relevant parts
                of the website. In addition to the uses identified elsewhere in
                this privacy policy, we may use your personal information to:
              </label>
              <label className="font-normal ml-10">
                1. Improve your browsing experience by personalising the
                website;
              </label>

              <label className="font-normal ml-10">
                2. Provide other organisations with statistical information
                about our users - but this information will not be used to
                identify any individual user.
              </label>
              <label className="font-normal text-left">
                We will not without your express consent provide your personal
                information to any third parties for the purpose of direct
                marketing.
              </label>

              <label className="font-bold mt-4">(4) Other disclosures</label>

              <label className="font-normal text-left">
                In addition to the disclosures reasonably necessary for the
                purposes identified elsewhere in this privacy policy, we may
                disclose information about you:
              </label>
              <label className="font-normal ml-10">
                1. To the extent that we are required to do so by law;
              </label>
              <label className="font-normal ml-10">
                2. In connection with any legal proceedings or prospective legal
                proceedings;
              </label>
              <label className="font-normal ml-10">
                3. In order to establish, exercise or defend our legal rights
                (including providing information to others for the purposes of
                fraud prevention and reducing credit risk);
              </label>
              <label className="font-normal ml-10">
                4. Except as provided in this privacy policy, we will not
                provide your information to third parties.
              </label>

              <label className="font-bold mt-4">
                (5) Security of your personal data
              </label>

              <label className="font-normal text-left">
                We will take reasonable precautions to prevent the loss, misuse
                or alteration of your personal information. Of course, data
                transmission over the internet is inherently insecure, and we
                cannot guarantee the security of data sent over the internet.
              </label>

              <label className="font-bold mt-4">(6) Policy amendments</label>
              <label className="font-normal text-left">
                We may update this privacy policy from time-to-time by posting a
                new version on our website. You should check this page
                occasionally to ensure you are happy with any changes.
              </label>

              <label className="font-bold mt-4">(7) Third party websites</label>
              <label className="font-normal text-left">
                The website contains links to other websites. We are not
                responsible for the privacy policies of third party websites.
              </label>

              <label className="font-bold mt-4">Website Disclaimer</label>

              <label className="font-bold mt-4">(1) Introduction</label>
              <label className="font-normal text-left">
                This disclaimer governs your use of our website; by using our
                website, you accept this disclaimer in full. If you disagree
                with any part of this disclaimer, do not use our website.
              </label>
              <label className="font-bold mt-4">
                (2) Intellectual property rights
              </label>
              <label className="font-normal text-left">
                Unless otherwise stated, we or our licensors own the
                intellectual property rights in the website and material on the
                website. Subject to the licence below, all our intellectual
                property rights are reserved.
              </label>

              <label className="font-bold mt-4">
                (3) Licence to use website
              </label>
              <label className="font-normal text-left">
                You may view, download for caching purposes only, and print
                pages from the website, provided that:
              </label>
              <label className="text-left font-normal ml-10">
                1. You must not republish material from this website (including
                republication on another website), or reproduce or store
                material from this website in any public or private electronic
                retrieval system;
              </label>
              <label className="text-left font-normal ml-10">
                2. You must not reproduce, duplicate, copy, sell, resell, visit,
                or otherwise exploit our website or material on our website for
                a commercial purpose, without our express written consent.
              </label>
              <label className="font-bold mt-4">
                (4) Limitations of liability
              </label>
              <label className="font-normal text-left">
                The information on this website is provided free-of-charge, and
                you acknowledge that it would be unreasonable to hold us liable
                in respect of this website and the information on this website.
              </label>
              <label className="font-normal text-left">
                Whilst we endeavour to ensure that the information on this
                website is correct, we do not warrant its completeness or
                accuracy; nor do we not commit to ensuring that the website
                remains available or that the material on this website is kept
                up-to-date.
              </label>

              <label className="font-normal text-left">
                To the maximum extent permitted by applicable law we exclude all
                representations, warranties and conditions (including, without
                limitation, the conditions implied by law of satisfactory
                quality, fitness for purpose and the use of reasonable care and
                skill).
              </label>

              <label className="font-normal text-left">
                Our liability is limited and excluded to the maximum extent
                permitted under applicable law. We will not be liable for any
                direct, indirect or consequential loss or damage arising under
                this disclaimer or in connection with our website, whether
                arising in tort, contract, or otherwise - including, without
                limitation, any loss of profit, contracts, business, goodwill,
                reputation, data, income, revenue or anticipated savings.
              </label>

              <label className="font-normal text-left">
                However, nothing in this disclaimer shall exclude or limit our
                liability for fraud, for death or personal injury caused by our
                negligence, or for any other liability which cannot be excluded
                or limited under applicable law.
              </label>
              <label className="font-bold mt-4">(5) Variation</label>
              <label className="font-normal text-left">
                We may revise this disclaimer from time-to-time. Please check
                this page regularly to ensure you are familiar with the current
                version.
              </label>

              <label className="font-bold mt-4">(6) Entire agreement</label>
              <label className="font-normal text-left">
                This disclaimer constitutes the entire agreement between you and
                us in relation to your use of our website, and supersedes all
                previous agreements in respect of your use of this website.
              </label>

              <label className="font-bold mt-4">(7) Law and jurisdiction</label>
              <label className="font-normal text-left">
                This notice will be governed by and construed in accordance with
                English law, and any disputes relating to this notice shall be
                subject to the exclusive jurisdiction of the courts of England.
              </label>
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

export default TermsAndCondition;
