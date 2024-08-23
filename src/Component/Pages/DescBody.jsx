import Desc_Image from "../../assets/images/Desc_Image.png";
const DescBody = () => {
  return (
    <section className="relative top-[4rem] z-[-1]">
      <div className="w-[92%] mx-auto flex flex-col py-14 font-Montserrat gap-10">
        <div className="w-[100%] flex flex-col gap-3">
          <h2 className="text-red text-2xl text-center font-semibold">
            Our Specialty Cuts
          </h2>
          <p className="text-center text-sm xl:text-md">
            Explore our selection of premium, hand-cut meats, carefully sourced
            from local, sustainable farms.
          </p>
        </div>
        <div className="flex w-[100%] flex-col gap-6 md:flex-row md:justify-between md:gap-4 mmd:gap-6 lg:gap-2 llg:gap-0 xl:gap-0 xl:w-[90%] xl:mx-auto">
          <div className="flex flex-col w-[100%] order-2 gap-4 md:order-1 mmd:gap-5 mmmd:w-[50%] mmmd:justify-around lg:max-w-[460px] xl:max-w-[500px]">
            <div className="flex flex-col gap-1">
              <h3 className="text-red font-semibold xl:text-xl">
                Dry Aged Rib Eye
              </h3>
              <p className="text-sm xl:text-md">
                Our signature cut, expertly aged for unparalleled tenderness and
                flavor.Our Dry Aged Rib Eye boasts a complex, nutty flavor with
                a buttery texture, making it a favorite among steak
                connoisseurs.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-red font-semibold xl:text-xl">
                Grass-Fed Filet Mignon
              </h3>
              <p className="text-sm xl:text-md">
                Succulent and lean, our filet mignon is a true delicacy. Our
                Grass-Fed Filet Mignon delivers a clean, delicate flavor with
                subtle earthy undertones, reflecting its natural grass-fed diet.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-red font-semibold xl:text-xl">
                Heritage Pork Chops
              </h3>
              <p className="text-sm xl:text-md">
                Flavorful and juicy, our heritage pork chops are a customer
                favorite.Our Heritage Pork Chops boast a deep, rich flavor with
                a juicy, tender texture.Discover the rich, succulent taste of our Heritage Pork Chops.
              </p>
            </div>
          </div>
          <div className="w-[100%] order-1 md:order-2 ssmd:max-w-[348px] mmd:max-w-[360px] mmmd:w-[50%] mmmd:max-w-[400px] lg:max-w-[590px] llg:max-w-[670px] xl:max-w-[680px]">
            <img
              className="w-[100%] md:h-[100%] bg-cover bg-center"
              src={Desc_Image} 
              alt="Description Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default DescBody;
