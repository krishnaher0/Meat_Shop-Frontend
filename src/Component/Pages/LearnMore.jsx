import MeatImg from "../../assets/images/MeatImg.png";
const LearnMore = () => {
  return (
    <section className="relative top-[4rem] z-[-1] bg-Learn">
      <div className="flex flex-col-reverse w-[92%] mx-auto gap-8 font-Montserrat md:flex-row py-20 lg:gap-2 lg:justify-between llg:gap-10 xl:gap-0 xl:w-[83%] xl:max-auto">
        <div className="flex flex-col gap-2 md:justify-evenly md:max-w-[495px] lg:w-[50%]">
          <div className="flex flex-col gap-1 md:max-w-[489px] llg:gap-2">
            <h2 className="text-red font-semibold text-2xl">
              Harvested by Hand, Delivered with Care
            </h2>
            <p className="text-md text-red italic">
              Learn more about the range of our services
            </p>
          </div>
          <p className="text-sm lg:max-w-[460px] xl:max-w-[490px]">
            At TryMeat, we bring you the freshest, most flavorful produce
            straight from our fields to your table. Grown with care and
            harvested at peak ripeness, our farm-fresh ingredients ensure
            quality and taste in every bite. Enjoy the best of nature, directly
            from our farm to your fork.
          </p>
          <button className="px-3 text-[13px] py-[8px] border-[2px] border-red w-[50%] text-red font-semibold vsm:max-w-[157px] mt-3">LEARN MORE</button>
        </div>
        <div className="my-auto mmd:max-w-[404px] lg:max-w-[590px] llg:max-w-[670px] xl:max-w-[700px] lg:w-[50%]">
          <img className="w-[100%] bg-center bg-cover" src={MeatImg} alt="Meat Image" />
        </div>
      </div>
    </section>
  );
};
export default LearnMore;
