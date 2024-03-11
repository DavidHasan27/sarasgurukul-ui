import badge from "../../view/assets/badge.png";
import classroom from "../../view/assets/classroom.png";
import group from "../../view/assets/group.png";
import degree from "../../view/assets/bachelor.png";
import handshake from "../../view/assets/hand-shake.png";
import intrgrity from "../../view/assets/integration.png";

const Facilities = () => {
  return (
    <div className="container-fluid pt-5">
      <div className="container pb-3">
        <div className="row">
          <div className="col-lg-4 col-md-6 pb-1 ">
            <div
              className="d-flex shadow-sm  rounded mb-4  h-[200px] bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  QUALITY
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We Believe every child deserves excellence in early programs
                  and service to make a difference in their lives and our
                  community.
                </p>
              </div>
              {/* <i className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"></i> */}

              <img src={badge} className="h-[60px]" alt="" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <div
              className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              {/* <i className="flaticon-022-drum h1 font-weight-normal text-primary mb-3"></i> */}
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  INTEGRITY
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We believe integrity is the bedrock of a trustworthy
                  orgnization which promotes effective relationship & assures
                  mindful stewadship of state resource.
                </p>
              </div>

              <img
                src={intrgrity}
                height={64}
                width={64}
                className="h-[60px] text-[#fff]"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <div
              className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  SERVICE
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We believe families and providers are unique and we strive to
                  understand, appreciate & serve their needs
                </p>
              </div>
              <img
                src={classroom}
                className="h-[60px] text-[#fff] ml-3"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <div
              className="d-flex  shadow-sm  rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              {/* <i className="flaticon-017-toy-car h1 font-weight-normal text-primary mb-3"></i> */}
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  TEAMWORK
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We believe working together results in a stronger organization
                  and community.
                </p>
              </div>
              <img
                src={group}
                height={64}
                width={64}
                className="h-[60px] text-[#fff]"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <div
              className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              {/* <i className="flaticon-025-sandwich h1 font-weight-normal text-primary mb-3"></i> */}
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  RESPECT
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We Believe respect is essential to building the relationships
                  that are critical to success and optimizing the talents &
                  diversity of our families
                </p>
              </div>
              <img
                src={handshake}
                height={64}
                width={64}
                className="h-[60px] text-[#fff]"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <div
              className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 7,
              }}
            >
              {/* <i className="flaticon-047-backpack h1 font-weight-normal text-primary mb-3"></i> */}
              <div className="pl-4">
                <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                  EDUCATION
                </h4>
                <p className="m-0 text-[#7c1e12] text-left mt-1">
                  We believe ongoing education & advocacy promotes positive
                  early learning experiences, providing all children the
                  opportunity to succeed.
                </p>
              </div>
              <img
                src={degree}
                height={64}
                width={64}
                className="h-[60px] text-[#fff]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
