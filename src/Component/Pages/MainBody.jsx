import Main_Image from "../../assets/images/Main_Image.png";
import { useNavigate } from "react-router-dom";
const MainBody = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/about');
  };
  const handleNavigation1 = () => {
    navigate('/products');
  };
  return (
    <section className="relative top-[4rem] z-[-1] h-[70vh] md:h-[70vh] lg:h-[78vh] llg:h-[90vh]">
      <div
        className="bg-center lg:bg-right-top"
        style={{
          backgroundImage: `url(${Main_Image})`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="flex flex-col gap-8 llg:gap-11 absolute top-[20%] left-[5%] font-Montserrat text-white vsm:max-w-[345px] ssm:max-w-[400px] mdsm:max-w-[450px] md:top-[25%] lg:max-w-[600px] xl:max-w-[630px]">
          <div className="flex flex-col gap-3 ssm:gap-6 llg:gap-8 w-[100%]">
            <h1 className="text-2xl font-bold lg:text-3xl xl:text-4xl">Where Quality Meets Excellence</h1>
            <p className="font-light text-sm max-w-[345px] lg:text-[16px] xl:w-[100%] xl:max-w-[75%]">
              Discover the finest selection of premium, grass-fed meats from our
              family-owned shop. Committed to quality, sustainability, and
              exceptional flavor.
            </p>
          </div>
          <div className="flex gap-6 ssm:gap-10">
          <button
        className="text-[12px] px-4 py-[10px] xl:px-7 xl:py-[14px] bg-red rounded-br-2xl"
        onClick={handleNavigation}
      >
        GET STARTED
      </button>
      <button
        className="text-[12px] px-4 xl:px-7 bg-transparent border-[1px] rounded-br-2xl"
        onClick={handleNavigation1}
      >
        VIEW PRODUCTS
      </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBody;
