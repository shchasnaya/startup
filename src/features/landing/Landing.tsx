import Main from "./main/Main";
import Statistic from "./statistic/Statistic";
import HowWork from "./howWork/HowWork";
import Audience from "./audience/Audience";
import Result from "./result/Result";
import Review from "./review/Review";

const Landing = () => {
  return (
    <div>
      <Main/>
      {/*<Statistic/>*/}
      <HowWork/>
      <Audience/>
      <Result/>
      <Review/>
    </div>
  );
};

export default Landing;